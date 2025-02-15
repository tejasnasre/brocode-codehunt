import { CategoryGrid } from "@/components/browsecompanies/CategoryGrid";
import { CompanyCard } from "@/components/browsecompanies/CompanyCard";
import { SearchBar } from "@/components/browsecompanies/SearchBar";
import Footer from "@/components/Footer";
// import { Header } from "@/components/Header";
import { categories, recommendedCompanies } from "../data/mockData";

export default function CompaniesPage() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* <Header /> */}
      <main className="flex-grow max-w-7xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">
            Browse <span className="text-blue-500">Companies</span>
          </h1>
          <p className="text-gray-600">
            Explore companies to find your dream job
          </p>
        </div>

        <SearchBar />

        <div className="mt-12">
          <h2 className="text-2xl font-semibold mb-6">Recommended Companies</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recommendedCompanies.map((company) => (
              <CompanyCard key={company.id} company={company} />
            ))}
          </div>
        </div>

        <div className="mt-16">
          <h2 className="text-2xl font-semibold mb-6">Companies by Category</h2>
          <CategoryGrid categories={categories} />
        </div>
      </main>
      <Footer />
    </div>
  );
}
