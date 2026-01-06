import { Link } from "wouter";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { SectionHeading } from "@/components/SectionHeading";
import { motion } from "framer-motion";
import { Star, Clock, MapPin, ChefHat, ArrowRight } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      {/* Hero Section */}
      <section className="relative h-screen min-h-[600px] flex items-center justify-center text-center overflow-hidden">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-black/50 z-10" />
          {/* restaurant upscale dining table candle light */}
          <img 
            src="https://pixabay.com/get/gd69f3c4e756d610991ea1634ad50880db6c2a102517422a09951ed822244b2eab9c80b4e45c0a965fce240f76d7bab54c99271963eb1de627ebd1b6fdaad0173_1280.jpg" 
            alt="Osteria Interior" 
            className="w-full h-full object-cover animate-in fade-in zoom-in duration-[2000ms]"
          />
        </div>

        <div className="relative z-20 px-6 max-w-4xl mx-auto space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <span className="text-white/90 text-sm md:text-base font-medium tracking-[0.2em] uppercase mb-4 block">
              Welcome to
            </span>
            <h1 className="text-6xl md:text-8xl lg:text-9xl font-serif font-bold text-white tracking-tight mb-6">
              Osteria
            </h1>
            <p className="text-xl md:text-2xl text-white/90 font-light max-w-2xl mx-auto leading-relaxed">
              Authentic Italian Dining in the Heart of New Cairo
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center pt-8"
          >
            <Link href="/reservations">
              <button className="px-8 py-4 bg-primary text-white text-sm font-semibold tracking-wider uppercase hover:bg-primary/90 transition-all duration-300 min-w-[180px]">
                Reserve a Table
              </button>
            </Link>
            <Link href="/menu">
              <button className="px-8 py-4 bg-transparent border border-white text-white text-sm font-semibold tracking-wider uppercase hover:bg-white hover:text-black transition-all duration-300 min-w-[180px]">
                View Menu
              </button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-6">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <div className="lg:w-1/2">
              {/* chef plating food elegant close up */}
              <img 
                src="https://images.unsplash.com/photo-1559339352-11d035aa65de?w=800&h=1000&fit=crop" 
                alt="Chef Plating" 
                className="w-full h-auto rounded-sm shadow-xl"
              />
            </div>
            <div className="lg:w-1/2 space-y-8">
              <SectionHeading 
                title="A Taste of Tradition" 
                subtitle="Our Story" 
                centered={false} 
              />
              <p className="text-lg text-muted-foreground leading-relaxed">
                At Osteria, we believe that great food starts with exceptional ingredients. 
                Our culinary team brings the authentic flavors of Italy to New Cairo, 
                crafting dishes that honor tradition while embracing modern elegance.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                From our handmade pastas to our carefully curated wine selection, 
                every detail is designed to transport you to the sun-drenched hills of Tuscany.
              </p>
              <div className="pt-4">
                <Link href="/menu" className="inline-flex items-center gap-2 text-primary font-medium hover:text-primary/80 transition-colors uppercase tracking-widest text-sm border-b border-primary pb-1">
                  Discover Our Menu <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Highlights Section */}
      <section className="py-24 bg-secondary/30">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { 
                icon: ChefHat, 
                title: "Authentic Recipes", 
                desc: "Handcrafted pasta and traditional sauces passed down through generations." 
              },
              { 
                icon: Star, 
                title: "4.8 Stars", 
                desc: "Loved by our guests with over 278 5-star reviews." 
              },
              { 
                icon: Clock, 
                title: "Open Late", 
                desc: "Serving dinner and drinks until 1:00 AM daily." 
              },
              { 
                icon: MapPin, 
                title: "Prime Location", 
                desc: "Located in the heart of New Cairo at Square One." 
              },
            ].map((item, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-background p-8 rounded-sm shadow-sm border border-border/50 text-center hover:shadow-md transition-shadow duration-300"
              >
                <item.icon className="w-10 h-10 text-primary mx-auto mb-6" />
                <h3 className="font-serif text-xl font-bold mb-3">{item.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Location / Hours CTA */}
      <section className="relative py-32 bg-foreground text-background overflow-hidden">
        {/* dark textured background */}
        <div className="absolute inset-0 opacity-10" 
          style={{ backgroundImage: `url('https://www.transparenttextures.com/patterns/dark-leather.png')` }} 
        />
        
        <div className="container mx-auto px-6 relative z-10 text-center">
          <SectionHeading 
            title="Join Us Tonight" 
            subtitle="Reservations" 
            light 
            className="mb-8"
          />
          <p className="text-xl text-white/80 max-w-2xl mx-auto mb-12 font-light">
            Whether it's a romantic dinner for two or a celebration with friends, 
            we look forward to welcoming you.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto mb-16 text-center">
             <div className="space-y-2">
               <h4 className="font-serif text-lg text-primary">Find Us</h4>
               <p className="text-white/70">Square One, New Cairo</p>
             </div>
             <div className="space-y-2">
               <h4 className="font-serif text-lg text-primary">Call Us</h4>
               <p className="text-white/70">011 03991537</p>
             </div>
             <div className="space-y-2">
               <h4 className="font-serif text-lg text-primary">Hours</h4>
               <p className="text-white/70">Daily 12PM - 1AM</p>
             </div>
          </div>

          <Link href="/reservations">
            <button className="px-10 py-5 bg-white text-black text-base font-semibold tracking-wider uppercase hover:bg-primary hover:text-white transition-all duration-300 shadow-xl shadow-black/20">
              Book Your Table
            </button>
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
