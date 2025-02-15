import { Search, MapPin } from "lucide-react";

export const SearchBar = () => {
  return (
    <div className="flex gap-3 w-full max-w-4xl mx-auto">
      <div className="flex-1 relative">
        <Search
          className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          size={20}
        />
        <input
          type="text"
          placeholder="Company name or keyword"
          className="w-full pl-10 pr-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
        />
      </div>
      <div className="relative w-64">
        <MapPin
          className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          size={20}
        />
        <input
          type="text"
          defaultValue="Florence, Italy"
          className="w-full pl-10 pr-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
        />
      </div>
      <button className="px-6 py-2.5 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
        Search
      </button>
    </div>
  );
};
