
import { useEffect, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import Navigation from "@/components/Navigation";
import { User, Bell, LogOut } from "lucide-react";

const Profile = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [isEditing, setIsEditing] = useState(false);

  const { data: profile, isLoading: profileLoading } = useQuery({
    queryKey: ["profile"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("user_profiles")
        .select("*")
        .eq("id", user?.id)
        .single();

      if (error) throw error;
      return data;
    },
  });

  const { data: preferences, isLoading: preferencesLoading } = useQuery({
    queryKey: ["preferences"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("user_preferences")
        .select("*")
        .eq("user_id", user?.id)
        .single();

      if (error) throw error;
      return data;
    },
  });

  const updateProfileMutation = useMutation({
    mutationFn: async (updates: { full_name?: string; username?: string }) => {
      const { error } = await supabase
        .from("user_profiles")
        .update(updates)
        .eq("id", user?.id);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["profile"] });
      toast({
        title: "Profile updated",
        description: "Your profile has been successfully updated.",
      });
      setIsEditing(false);
    },
  });

  const updatePreferencesMutation = useMutation({
    mutationFn: async (updates: {
      notification_enabled?: boolean;
      location?: string;
      theme?: string;
    }) => {
      const { error } = await supabase
        .from("user_preferences")
        .update(updates)
        .eq("user_id", user?.id);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["preferences"] });
      toast({
        title: "Preferences updated",
        description: "Your preferences have been successfully updated.",
      });
    },
  });

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      toast({
        title: "Error",
        description: "Failed to sign out. Please try again.",
        variant: "destructive",
      });
    }
  };

  const [formData, setFormData] = useState({
    full_name: "",
    username: "",
    location: "",
  });

  useEffect(() => {
    if (profile && preferences) {
      setFormData({
        full_name: profile.full_name || "",
        username: profile.username || "",
        location: preferences.location || "",
      });
    }
  }, [profile, preferences]);

  if (profileLoading || preferencesLoading) {
    return (
      <div className="min-h-screen bg-white pb-16">
        <div className="p-4">Loading...</div>
        <Navigation />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white pb-16">
      <div className="p-4 space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold">Profile</h1>
          <Button variant="ghost" onClick={handleLogout}>
            <LogOut className="w-4 h-4 mr-2" />
            Sign out
          </Button>
        </div>

        <div className="space-y-6">
          {/* Profile Section */}
          <div className="bg-white p-4 rounded-lg border">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <User className="w-5 h-5 text-gray-500 mr-2" />
                <h2 className="text-lg font-medium">Personal Information</h2>
              </div>
              <Button
                variant="ghost"
                onClick={() => setIsEditing(!isEditing)}
              >
                {isEditing ? "Cancel" : "Edit"}
              </Button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-sm text-gray-500">Full Name</label>
                <Input
                  value={formData.full_name}
                  onChange={(e) =>
                    setFormData({ ...formData, full_name: e.target.value })
                  }
                  disabled={!isEditing}
                  placeholder="Enter your full name"
                />
              </div>

              <div>
                <label className="text-sm text-gray-500">Username</label>
                <Input
                  value={formData.username}
                  onChange={(e) =>
                    setFormData({ ...formData, username: e.target.value })
                  }
                  disabled={!isEditing}
                  placeholder="Enter your username"
                />
              </div>

              {isEditing && (
                <Button
                  onClick={() =>
                    updateProfileMutation.mutate({
                      full_name: formData.full_name,
                      username: formData.username,
                    })
                  }
                >
                  Save Changes
                </Button>
              )}
            </div>
          </div>

          {/* Preferences Section */}
          <div className="bg-white p-4 rounded-lg border">
            <div className="flex items-center mb-4">
              <Bell className="w-5 h-5 text-gray-500 mr-2" />
              <h2 className="text-lg font-medium">Preferences</h2>
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-sm text-gray-500">Location</label>
                <Input
                  value={formData.location}
                  onChange={(e) =>
                    setFormData({ ...formData, location: e.target.value })
                  }
                  placeholder="Enter your location"
                  onBlur={() =>
                    updatePreferencesMutation.mutate({
                      location: formData.location,
                    })
                  }
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <label className="text-sm text-gray-500">
                    Prayer Notifications
                  </label>
                  <p className="text-xs text-gray-400">
                    Receive notifications for prayer times
                  </p>
                </div>
                <Switch
                  checked={preferences?.notification_enabled || false}
                  onCheckedChange={(checked) =>
                    updatePreferencesMutation.mutate({
                      notification_enabled: checked,
                    })
                  }
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <Navigation />
    </div>
  );
};

export default Profile;
