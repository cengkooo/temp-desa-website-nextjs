import { CheckCircle2 } from "lucide-react"

interface LayananFeatureListProps {
  features: string[]
}

export default function LayananFeatureList({ features }: LayananFeatureListProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
      {features.map((feature) => (
        <div key={feature} className="flex items-center gap-3 text-slate-700">
          <span className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center">
            <CheckCircle2 className="w-4 h-4 text-blue-600" />
          </span>
          <span>{feature}</span>
        </div>
      ))}
    </div>
  )
}
