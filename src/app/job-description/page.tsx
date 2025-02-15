import { Heart, Building2, GraduationCap, Users, Coffee, Train, Gift, Wallet } from "lucide-react"
import { JobHeader } from "@/components/job-header"
import { Tag } from "@/components/ui/tag"
import { BenefitsCard } from "@/components/benefits-card"
import { Card } from "@/components/ui/card"
import {Header} from "@/components/header"
 
export default function JobPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto py-6 mt-20">
        <Card>
          <JobHeader title="Social Media Assistant" company="Stripe" location="Paris, France" type="Full-Time" />

          <div className="p-6 grid gap-8">
            <section>
              <h2 className="text-xl font-semibold mb-4">Description</h2>
              <p className="text-muted-foreground">
                Stripe is looking for Social Media Marketing expert to help manage our online networks. You will be
                responsible for monitoring our social media channels, creating content, finding effective ways to engage
                the community and working with our team to engage on our channels.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-4">Required Skills</h2>
              <div className="flex flex-wrap gap-2">
                <Tag>Project Management</Tag>
                <Tag>Copywriting</Tag>
                <Tag>Social Media Marketing</Tag>
                <Tag>English</Tag>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-4">Perks & Benefits</h2>
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <BenefitsCard
                  icon={Heart}
                  title="Full Healthcare"
                  description="We believe in thriving communities and that starts with our team being happy and healthy."
                />
                <BenefitsCard
                  icon={Building2}
                  title="Unlimited Vacation"
                  description="We believe you should have a flexible schedule that makes room for family, wellness, and fun."
                />
                <BenefitsCard
                  icon={GraduationCap}
                  title="Skill Development"
                  description="We believe in always learning and leveling up our skills, whether it's technical or personal growth."
                />
                <BenefitsCard
                  icon={Users}
                  title="Team Summits"
                  description="Every 6 months we have a full team summit where we have fun, connect and plan for the coming quarter."
                />
                <BenefitsCard
                  icon={Coffee}
                  title="Remote Working"
                  description="You know how you work your best! Work from home, a coffee shop or anywhere when you feel like it."
                />
                <BenefitsCard
                  icon={Train}
                  title="Commuter Benefits"
                  description="We're grateful for all the time and energy you spend getting to work every day."
                />
                <BenefitsCard
                  icon={Gift}
                  title="We give back"
                  description="We donate $500 to any organization that makes life better for others."
                />
                <BenefitsCard
                  icon={Wallet}
                  title="Competitive Salary"
                  description="We offer competitive compensation packages with opportunities for raises and bonuses."
                />
              </div>
            </section>
          </div>
        </Card>
      </main>
    </div>
  )
}

