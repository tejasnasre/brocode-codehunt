import Link from "next/link"
import { Palette, TrendingUp, MessageSquare, PieChart, Monitor, Code, Building2, Users } from "lucide-react"

const categories = [
  {
    icon: Palette,
    name: "Design",
    count: 235,
    color: "text-blue-500",
  },
  {
    icon: TrendingUp,
    name: "Sales",
    count: 756,
    color: "text-purple-500",
  },
  {
    icon: MessageSquare,
    name: "Marketing",
    count: 140,
    color: "text-primary",
  },
  {
    icon: PieChart,
    name: "Finance",
    count: 325,
    color: "text-green-500",
  },
  {
    icon: Monitor,
    name: "Technology",
    count: 463,
    color: "text-orange-500",
  },
  {
    icon: Code,
    name: "Engineering",
    count: 544,
    color: "text-red-500",
  },
  {
    icon: Building2,
    name: "Business",
    count: 271,
    color: "text-yellow-500",
  },
  {
    icon: Users,
    name: "Human Resource",
    count: 345,
    color: "text-pink-500",
  },
]

export function Categories() {
  return (
    <section className="py-16">
      <div className="container px-4">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold">
            Explore by <span className="text-primary">category</span>
          </h2>
          <Link href="/categories" className="text-primary hover:underline">
            Show all jobs →
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {categories.map((category) => (
            <Link
              key={category.name}
              href={`/categories/${category.name.toLowerCase()}`}
              className="group p-6 bg-white border rounded-lg hover:border-primary transition-colors"
            >
              <category.icon className={`h-8 w-8 ${category.color} mb-4`} />
              <h3 className="font-semibold mb-2">{category.name}</h3>
              <p className="text-sm text-muted-foreground">{category.count} jobs available →</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

