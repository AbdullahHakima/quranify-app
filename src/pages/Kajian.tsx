
import { Clock, MapPin } from "lucide-react";
import Navigation from "@/components/Navigation";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { format } from "date-fns";

const Kajian = () => {
  const { data: kajianList, isLoading } = useQuery({
    queryKey: ["kajian"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("kajian")
        .select("*")
        .order("date");

      if (error) throw error;
      return data;
    },
  });

  return (
    <div className="min-h-screen bg-white pb-16">
      <header className="bg-white p-4">
        <h1 className="text-xl font-semibold">Islamic Lectures</h1>
      </header>

      <main className="px-4 pt-2">
        {isLoading ? (
          <div className="text-center py-8">Loading...</div>
        ) : (
          <div className="grid gap-4">
            {kajianList?.map((kajian) => (
              <div
                key={kajian.id}
                className="bg-white rounded-xl border p-4 shadow-sm"
              >
                {kajian.image_url && (
                  <img
                    src={kajian.image_url}
                    alt={kajian.title}
                    className="w-full h-48 object-cover rounded-lg mb-4"
                  />
                )}
                <h2 className="text-lg font-semibold mb-2">{kajian.title}</h2>
                <p className="text-gray-600 text-sm mb-3">
                  {kajian.description}
                </p>
                <div className="flex items-center text-sm text-gray-500 mb-2">
                  <Clock size={16} className="mr-2" />
                  {format(new Date(kajian.date), "PPP p")}
                </div>
                <div className="flex items-center text-sm text-gray-500">
                  <MapPin size={16} className="mr-2" />
                  {kajian.location}
                </div>
                <div className="mt-3 pt-3 border-t">
                  <span className="text-primary font-medium">
                    Speaker: {kajian.speaker}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      <Navigation />
    </div>
  );
};

export default Kajian;
