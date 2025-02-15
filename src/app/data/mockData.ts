import { Company, Category } from "../../types/index";

export const recommendedCompanies: Company[] = [
  {
    id: "nomad",
    name: "Nomad",
    logo: "/companies/nomad.png",
    description:
      "Nomad is located in Paris, France. Nomad has generates $728,000 in sales (USD).",
    jobCount: 3,
    tags: ["Business Service"],
  },
  {
    id: "discord",
    name: "Discord",
    logo: "/companies/discord.png",
    description:
      "Wed love to work with someone like you. We care about creating a delightful experience.",
    jobCount: 3,
    tags: ["Business Service"],
  },
  {
    id: "maze",
    name: "Maze",
    logo: "/companies/maze.png",
    description:
      "Were a passionate bunch working from all over the world to build the future of rapid testing together.",
    jobCount: 3,
    tags: ["Business Service"],
  },
];

export const categories: Category[] = [
  {
    id: "design",
    name: "Design",
    icon: "/icons/design.svg",
    resultCount: 24,
  },
  {
    id: "fintech",
    name: "Fintech",
    icon: "/icons/fintech.svg",
    resultCount: 16,
  },
  {
    id: "hosting",
    name: "Hosting",
    icon: "/icons/hosting.svg",
    resultCount: 12,
  },
];
