interface LayananSectionCardProps {
  title: string
  children: React.ReactNode
  className?: string
  titleClassName?: string
}

export default function LayananSectionCard({
  title,
  children,
  className,
  titleClassName
}: LayananSectionCardProps) {
  return (
    <div className={`bg-white border border-slate-200 rounded-2xl p-6 ${className || ""}`}>
      <h2
        className={`text-2xl font-bold text-slate-900 ${titleClassName || "mb-4"}`}
      >
        {title}
      </h2>
      {children}
    </div>
  )
}
