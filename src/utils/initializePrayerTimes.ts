
import { supabase } from "@/integrations/supabase/client";

export const initializePrayerTimes = async () => {
  const today = new Date();
  const formattedDate = today.toISOString().split('T')[0];
  
  // Check if we already have prayer times for today
  const { data: existingTimes } = await supabase
    .from('prayer_times')
    .select('id')
    .eq('date', formattedDate)
    .limit(1);

  if (existingTimes && existingTimes.length > 0) {
    return; // Prayer times already exist for today
  }

  // Sample prayer times for demonstration
  const prayerTimes = [
    { prayer_name: "Subuh", prayer_time: "03:53:00", location: "Malang, East Java", date: formattedDate },
    { prayer_name: "Dzuhur", prayer_time: "11:20:00", location: "Malang, East Java", date: formattedDate },
    { prayer_name: "Ashar", prayer_time: "14:21:00", location: "Malang, East Java", date: formattedDate },
    { prayer_name: "Maghrib", prayer_time: "17:26:00", location: "Malang, East Java", date: formattedDate },
    { prayer_name: "Isya'", prayer_time: "18:34:00", location: "Malang, East Java", date: formattedDate },
  ];

  // Insert prayer times for today
  const { error } = await supabase
    .from('prayer_times')
    .insert(prayerTimes);

  if (error) {
    console.error('Error initializing prayer times:', error);
  }
};
