import Image from "next/image";

export function CompanyLogos() {
  const companies = [
    { name: "Vodafone", logo: "/placeholder.svg" },
    { name: "Intel", logo: "/placeholder.svg" },
    { name: "Tesla", logo: "/placeholder.svg" },
    { name: "AMD", logo: "/placeholder.svg" },
    { name: "Talkit", logo: "/placeholder.svg" },
  ];

  return (
    <section className="py-12 border-t">
      <div className="container px-4">
        <h2 className="text-lg font-medium mb-8">Companies we helped grow</h2>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 items-center">
          {companies.map((company, index) => (
            <div key={company.name} className="flex justify-center">
              <Image
                src={company.logo}
                alt={company.name}
                width={120}
                height={40}
                className="h-8 w-auto opacity-50 hover:opacity-100 transition-opacity"
                priority={index === 0} // ✅ First image loads first to avoid mismatch
                loading={index === 0 ? "eager" : "lazy"} // ✅ Prevent hydration mismatch
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
