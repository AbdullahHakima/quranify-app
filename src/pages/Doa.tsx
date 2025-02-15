
import { Search } from "lucide-react";
import Navigation from "@/components/Navigation";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useState } from "react";

const Doa = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const { data: doaList, isLoading } = useQuery({
    queryKey: ["doa"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("doa")
        .select("*")
        .order("created_at");

      if (error) throw error;
      return data;
    },
  });

  const filteredDoa = doaList?.filter(
    (doa) =>
      doa.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doa.translation.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-white pb-16">
      <header className="bg-white p-4">
        <h1 className="text-xl font-semibold mb-4">Daily Prayers</h1>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Search prayers..."
            className="w-full pl-10 pr-4 py-2 border rounded-lg"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </header>

      <main className="px-4 pt-2">
        {isLoading ? (
          <div className="text-center py-8">Loading...</div>
        ) : (
          <div className="grid gap-4">
            {filteredDoa?.map((doa) => (
              <div
                key={doa.id}
                className="bg-white rounded-xl border p-4 shadow-sm"
              >
                <h2 className="text-lg font-semibold mb-3">{doa.title}</h2>
                <div className="mb-3">
                  <p className="text-right font-arabic text-xl leading-loose mb-2">
                    {doa.arabic_text}
                  </p>
                  <p className="text-gray-600 text-sm">{doa.translation}</p>
                </div>
                {doa.category && (
                  <div className="mt-2">
                    <span className="inline-block bg-primary/10 text-primary text-xs px-2 py-1 rounded">
                      {doa.category}
                    </span>
                  </div>
                )}
                {doa.tags && doa.tags.length > 0 && (
                  <div className="flex gap-2 mt-2">
                    {doa.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </main>

      <Navigation />
    </div>
  );
};

export default Doa;
