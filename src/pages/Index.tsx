
import { Bell, MapPin } from "lucide-react";
import Navigation from "@/components/Navigation";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { format } from "date-fns";

const Index = () => {
  const today = new Date();
  const formattedDate = format(today, "yyyy-MM-dd");

  const { data: prayerTimes, isLoading: isLoadingPrayers } = useQuery({
    queryKey: ["prayerTimes", formattedDate],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("prayer_times")
        .select("*")
        .eq("date", formattedDate)
        .order("prayer_time");

      if (error) throw error;
      return data;
    },
  });

  const { data: dailyPrayers, isLoading: isLoadingDailyPrayers } = useQuery({
    queryKey: ["dailyPrayers"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("daily_prayers")
        .select("*")
        .limit(3);

      if (error) throw error;
      return data;
    },
  });

  const { data: userPreferences } = useQuery({
    queryKey: ["userPreferences"],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return null;

      const { data, error } = await supabase
        .from("user_preferences")
        .select("*")
        .eq("user_id", user.id)
        .single();

      if (error && error.code !== "PGRST116") throw error;
      return data;
    },
  });

  const nextPrayer = prayerTimes?.[0];
  const location = userPreferences?.location || "Malang, East Java";

  return (
    <div className="min-h-screen bg-white pb-16">
      {/* Header */}
      <header className="bg-white p-4 flex justify-between items-center">
        <div className="flex items-center">
          <MapPin className="text-primary" size={20} />
          <span className="ml-2 text-sm font-medium">{location}</span>
        </div>
        <Bell size={20} className="text-gray-600" />
      </header>

      {/* Main Content */}
      <main className="px-4 pt-2 animate-fade-in">
        {/* Prayer Banner */}
        <div className="bg-primary/10 rounded-2xl p-6 mb-6">
          <h2 className="text-sm text-gray-600 mb-1">
            Start your day with these prayers
          </h2>
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-4xl font-bold">
                {nextPrayer?.prayer_time?.slice(0, 5) || "--:--"}
              </h3>
              <p className="text-sm text-gray-600">
                {nextPrayer?.prayer_name || "Loading..."} is next
              </p>
            </div>
          </div>
        </div>

        {/* Prayer Times */}
        <div className="bg-white rounded-2xl shadow-sm border mb-6">
          <div className="grid grid-cols-5 gap-2 p-4">
            {isLoadingPrayers ? (
              <div className="col-span-5 text-center py-4">Loading...</div>
            ) : (
              prayerTimes?.map((prayer) => (
                <div
                  key={prayer.id}
                  className="flex flex-col items-center text-center"
                >
                  <span className="text-xs text-gray-600">
                    {prayer.prayer_name}
                  </span>
                  <span className="text-sm font-medium mt-1">
                    {prayer.prayer_time.slice(0, 5)}
                  </span>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Daily Prayers */}
        <section>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">Daily Prayer</h2>
            <button className="text-primary text-sm">See All</button>
          </div>
          <div className="grid grid-cols-3 gap-4">
            {isLoadingDailyPrayers ? (
              <div className="col-span-3 text-center py-4">Loading...</div>
            ) : (
              dailyPrayers?.map((prayer) => (
                <div
                  key={prayer.id}
                  className="bg-white p-4 rounded-xl border flex flex-col items-center text-center"
                >
                  <span className="text-2xl mb-2">{prayer.icon}</span>
                  <span className="text-xs text-gray-600">{prayer.title}</span>
                </div>
              ))
            )}
          </div>
        </section>
      </main>

      {/* Navigation */}
      <Navigation />
    </div>
  );
};

export default Index;
