import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  centered?: boolean;
  className?: string;
  light?: boolean;
}

export function SectionHeading({ title, subtitle, centered = true, className, light = false }: SectionHeadingProps) {
  return (
    <div className={cn("mb-12", centered && "text-center", className)}>
      {subtitle && (
        <span className={cn(
          "block text-xs font-bold tracking-widest uppercase mb-3",
          light ? "text-primary/90" : "text-primary"
        )}>
          {subtitle}
        </span>
      )}
      <h2 className={cn(
        "font-serif text-3xl md:text-4xl lg:text-5xl font-medium",
        light ? "text-white" : "text-foreground"
      )}>
        {title}
      </h2>
      <div className={cn(
        "h-1 w-16 bg-primary mt-6",
        centered && "mx-auto"
      )} />
    </div>
  );
}
