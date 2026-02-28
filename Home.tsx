import { Linkedin, Youtube, Mail } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-brand-blue text-white">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <span className="font-serif text-2xl font-bold tracking-tight">Kevin Nuber</span>
            <p className="mt-4 text-sm text-gray-300 max-w-xs">
              Advisor Development Consultant helping financial professionals Build, Scale, and Capitalize their business.
            </p>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-brand-accent">Connect</h3>
            <div className="mt-4 flex space-x-6">
              <a href="https://www.linkedin.com/in/kevin-nuber-ricp-a8587313a/" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white transition-colors">
                <span className="sr-only">LinkedIn</span>
                <Linkedin className="h-6 w-6" />
              </a>
              <a href="https://www.youtube.com/@TheKnuber" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white transition-colors">
                <span className="sr-only">YouTube</span>
                <Youtube className="h-6 w-6" />
              </a>
              <a href="mailto:kevin.nuber@simplicitygroup.com" className="text-gray-300 hover:text-white transition-colors">
                <span className="sr-only">Email</span>
                <Mail className="h-6 w-6" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-brand-accent">Quick Links</h3>
            <ul className="mt-4 space-y-2">
              <li>
                <a href="https://calendly.com/kevin-nuber" target="_blank" rel="noopener noreferrer" className="text-sm text-gray-300 hover:text-white transition-colors">
                  Book an Appointment
                </a>
              </li>
              <li>
                <a href="https://www.lifepro.com/Blog/solve-a-problem-dont-sell-a-product" target="_blank" rel="noopener noreferrer" className="text-sm text-gray-300 hover:text-white transition-colors">
                  LifePro Articles
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-12 border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-gray-400">
            &copy; {new Date().getFullYear()} Kevin Nuber. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
