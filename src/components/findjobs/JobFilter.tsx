import { Checkbox } from "@/components/ui/checkbox";

export function JobFilters() {
  return (
    <div className="w-60 p-4 space-y-6">
      <div>
        <h3 className="font-semibold mb-4">Type of Employment</h3>
        <div className="space-y-2">
          <div className="flex items-center">
            <Checkbox id="full-time" />
            <label htmlFor="full-time" className="ml-2 text-sm">
              Full-time (3)
            </label>
          </div>
          <div className="flex items-center">
            <Checkbox id="part-time" />
            <label htmlFor="part-time" className="ml-2 text-sm">
              Part-Time (5)
            </label>
          </div>
          <div className="flex items-center">
            <Checkbox id="remote" />
            <label htmlFor="remote" className="ml-2 text-sm">
              Remote (2)
            </label>
          </div>
        </div>
      </div>

      <div>
        <h3 className="font-semibold mb-4">Categories</h3>
        <div className="space-y-2">
          <div className="flex items-center">
            <Checkbox id="design" />
            <label htmlFor="design" className="ml-2 text-sm">
              Design (24)
            </label>
          </div>
          <div className="flex items-center">
            <Checkbox id="technology" />
            <label htmlFor="technology" className="ml-2 text-sm">
              Technology (5)
            </label>
          </div>
          <div className="flex items-center">
            <Checkbox id="business" />
            <label htmlFor="business" className="ml-2 text-sm">
              Business (3)
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}
