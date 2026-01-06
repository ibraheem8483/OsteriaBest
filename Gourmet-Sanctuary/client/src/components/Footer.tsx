import { Instagram, Facebook, MapPin, Phone, Clock } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-foreground text-background pt-16 pb-8">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          
          {/* Brand */}
          <div className="space-y-4">
            <h3 className="font-serif text-3xl font-bold tracking-tight text-white">Osteria</h3>
            <p className="text-white/60 text-sm max-w-xs leading-relaxed">
              Authentic Italian dining experience in the heart of New Cairo. 
              Celebrating tradition, premium ingredients, and the joy of gathering.
            </p>
            <div className="flex gap-4 pt-2">
              <a href="#" className="p-2 rounded-full border border-white/10 hover:border-primary hover:text-primary transition-colors">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="#" className="p-2 rounded-full border border-white/10 hover:border-primary hover:text-primary transition-colors">
                <Facebook className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h4 className="font-serif text-lg text-white">Contact</h4>
            <div className="space-y-3 text-sm text-white/60">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                <p>Chueifat Road, New Cairo 1,<br/>Cairo Governorate 11865, Square One</p>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-primary shrink-0" />
                <p>011 03991537</p>
              </div>
            </div>
          </div>

          {/* Hours */}
          <div className="space-y-4">
            <h4 className="font-serif text-lg text-white">Hours</h4>
            <div className="space-y-3 text-sm text-white/60">
              <div className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                <div>
                  <p className="mb-1">Open Daily</p>
                  <p className="text-white">12:00 PM – 1:00 AM</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 text-center md:text-left flex flex-col md:flex-row justify-between items-center text-xs text-white/40">
          <p>© {new Date().getFullYear()} Osteria. All rights reserved.</p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
