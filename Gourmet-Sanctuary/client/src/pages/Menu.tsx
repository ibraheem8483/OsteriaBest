import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { SectionHeading } from "@/components/SectionHeading";
import { useMenu } from "@/hooks/use-menu";
import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";

export default function Menu() {
  const { data: menuItems, isLoading, error } = useMenu();

 

  const groupedItems = menuItems?.reduce((acc, item) => {
    if (!acc[item.category]) acc[item.category] = [];
    acc[item.category].push(item);
    return acc;
  }, {} as Record<string, typeof menuItems>);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      
      {/* Header */}
      <div className="relative pt-40 pb-20 bg-foreground text-white text-center px-6">
        {/* abstract food background dark */}
        <div className="absolute inset-0 z-0 opacity-20">
          <img 
            src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1920&h=600&fit=crop" 
            alt="Menu Header" 
            className="w-full h-full object-cover"
          />
        </div>
        <div className="relative z-10">
          <h1 className="font-serif text-5xl md:text-6xl font-bold mb-4">Our Menu</h1>
          <p className="text-lg text-white/70 max-w-2xl mx-auto font-light">
            Seasonal ingredients, traditional recipes, modern execution.
          </p>
        </div>
      </div>

      <div className="flex-grow container mx-auto px-6 py-20 max-w-4xl">
        {isLoading ? (
          <div className="flex justify-center items-center py-32">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
          </div>
        ) : error ? (
          <div className="text-center py-20 text-destructive">
            Failed to load menu. Please try again later.
          </div>
        ) : (
          <div className="space-y-24">
            {Object.entries(groupedItems ?? {}).map(([category, items]) => {
            if (!items.length) return null;

              return (
                <motion.div 
                  key={category}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.6 }}
                >
                  <SectionHeading title={category} centered className="mb-16" />
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-12">
                    {items.map((item) => (
                      <div key={item.id} className="group">
                        <div className="flex justify-between items-baseline mb-2 border-b border-dashed border-border/50 pb-1">
                          <h3 className="font-serif text-xl font-medium text-foreground group-hover:text-primary transition-colors">
                            {item.name}
                          </h3>
                          <span className="font-medium text-lg text-primary ml-4 whitespace-nowrap">
                            {item.price}
                          </span>
                        </div>
                        <p className="text-muted-foreground text-sm leading-relaxed">
                          {item.description}
                        </p>
                      </div>
                    ))}
                  </div>
                </motion.div>
              );
            })}

            <div className="text-center pt-12 pb-8 border-t border-border">
              <p className="text-sm text-muted-foreground italic">
                * Menu items and prices may vary based on seasonal availability.
                <br />
                Please inform your server of any food allergies.
              </p>
            </div>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}
