
import { Bell, MapPin } from "lucide-react";
import Navigation from "@/components/Navigation";

const Index = () => {
  const prayerTimes = [
    { name: "Subuh", time: "03:53" },
    { name: "Dzuhur", time: "11:20" },
    { name: "Ashar", time: "14:21" },
    { name: "Maghrib", time: "17:26" },
    { name: "Isya'", time: "18:34" },
  ];

  const dailyPrayers = [
    { icon: "🍽️", title: "Prayer for eating" },
    { icon: "📚", title: "Study prayer" },
    { icon: "🌙", title: "Bedtime prayers" },
  ];

  return (
    <div className="min-h-screen bg-white pb-16">
      {/* Header */}
      <header className="bg-white p-4 flex justify-between items-center">
        <div className="flex items-center">
          <MapPin className="text-primary" size={20} />
          <span className="ml-2 text-sm font-medium">Malang, East Java</span>
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
              <h3 className="text-4xl font-bold">17:21</h3>
              <p className="text-sm text-gray-600">Maghrib less than 05:23</p>
            </div>
          </div>
        </div>

        {/* Prayer Times */}
        <div className="bg-white rounded-2xl shadow-sm border mb-6">
          <div className="grid grid-cols-5 gap-2 p-4">
            {prayerTimes.map((prayer) => (
              <div
                key={prayer.name}
                className="flex flex-col items-center text-center"
              >
                <span className="text-xs text-gray-600">{prayer.name}</span>
                <span className="text-sm font-medium mt-1">{prayer.time}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Daily Prayers */}
        <section>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">Daily Prayer</h2>
            <button className="text-primary text-sm">See All</button>
          </div>
          <div className="grid grid-cols-3 gap-4">
            {dailyPrayers.map((prayer) => (
              <div
                key={prayer.title}
                className="bg-white p-4 rounded-xl border flex flex-col items-center text-center"
              >
                <span className="text-2xl mb-2">{prayer.icon}</span>
                <span className="text-xs text-gray-600">{prayer.title}</span>
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* Navigation */}
      <Navigation />
    </div>
  );
};

export default Index;
