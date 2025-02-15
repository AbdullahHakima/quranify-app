
import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import Navigation from "@/components/Navigation";
import { Bell, Moon, Sun, MapPin } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/components/ui/use-toast";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Toggle } from "@/components/ui/toggle";

const Profile = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [location, setLocation] = useState("");

  const { data: preferences, isLoading } = useQuery({
    queryKey: ["userPreferences"],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Not authenticated");

      const { data, error } = await supabase
        .from("user_preferences")
        .select("*")
        .eq("user_id", user.id)
        .single();

      if (error) throw error;
      return data;
    },
  });

  const updatePreferencesMutation = useMutation({
    mutationFn: async (values: {
      theme?: string;
      notification_enabled?: boolean;
      location?: string;
    }) => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Not authenticated");

      const { error } = await supabase
        .from("user_preferences")
        .update(values)
        .eq("user_id", user.id);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["userPreferences"] });
      toast({
        title: "Success",
        description: "Your preferences have been updated.",
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Failed to update preferences: " + error.message,
        variant: "destructive",
      });
    },
  });

  const handleThemeToggle = () => {
    updatePreferencesMutation.mutate({
      theme: preferences?.theme === "light" ? "dark" : "light",
    });
  };

  const handleNotificationToggle = () => {
    updatePreferencesMutation.mutate({
      notification_enabled: !preferences?.notification_enabled,
    });
  };

  const handleLocationUpdate = () => {
    if (location.trim()) {
      updatePreferencesMutation.mutate({ location });
      setLocation("");
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white pb-16">
        <div className="text-center py-8">Loading...</div>
        <Navigation />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white pb-16">
      <header className="bg-white p-4">
        <h1 className="text-xl font-semibold">Profile Settings</h1>
      </header>

      <main className="px-4 space-y-6">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              {preferences?.theme === "light" ? (
                <Sun className="h-5 w-5" />
              ) : (
                <Moon className="h-5 w-5" />
              )}
              <Label htmlFor="theme">Theme</Label>
            </div>
            <Toggle
              id="theme"
              pressed={preferences?.theme === "dark"}
              onPressedChange={handleThemeToggle}
            >
              {preferences?.theme === "light" ? "Light" : "Dark"}
            </Toggle>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Bell className="h-5 w-5" />
              <Label htmlFor="notifications">Notifications</Label>
            </div>
            <Switch
              id="notifications"
              checked={preferences?.notification_enabled}
              onCheckedChange={handleNotificationToggle}
            />
          </div>

          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <MapPin className="h-5 w-5" />
              <Label htmlFor="location">Location</Label>
            </div>
            <div className="flex space-x-2">
              <Input
                id="location"
                placeholder={preferences?.location || "Enter your location"}
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="flex-1"
              />
              <button
                onClick={handleLocationUpdate}
                className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90"
              >
                Update
              </button>
            </div>
          </div>
        </div>
      </main>

      <Navigation />
    </div>
  );
};

export default Profile;
