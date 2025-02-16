import Image from "next/image";

export function CompanyLogos() {
  const companies = [
    { name: "Vodafone", logo: "/assets/Vodafone-Logo.png" },
    { name: "Intel", logo: "/assets/Intel-logo.png" },
    { name: "Tesla", logo: "/assets/Tesla.png" },
    { name: "AMD", logo: "/assets/AMD-Logo.png" },
    { name: "Talkit", logo: "/assets/talkit.webp" },
  ];

  return (
    <section className="py-12 border-t">
      <div className="container px-4">
        <h2 className="text-lg font-medium mb-8">Companies we helped grow</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-8 items-center">
          {companies.map((company, index) => (
            <div key={company.name} className="flex justify-center">
              <Image
                src={company.logo}
                alt={company.name}
                width={120}
                height={45}
                className="transition-transform transform hover:scale-150"
                priority={index === 0}
                loading={index === 0 ? "eager" : "lazy"}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
