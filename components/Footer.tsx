'use client';

import Logo from './Logo';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const handleScrollTo = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const targetElement = document.querySelector(href);
    if (targetElement) {
      const offset = 80;
      const elementPosition = targetElement.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <footer className="bg-[#050505] border-t border-neutral-900 py-16 text-neutral-400 relative z-10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          {/* Logo & Tagline */}
          <div className="md:col-span-2 flex flex-col space-y-6 items-start">
            <div className="flex items-center space-x-3">
              <Logo className="h-16 w-auto" isFooter={true} />
              <span className="font-bebas text-2xl tracking-widest text-white font-bold">
                ANYTIME FITNESS
              </span>
            </div>
            <p className="text-neutral-400 font-medium max-w-sm text-sm sm:text-base leading-relaxed">
              &quot;Your Transformation Starts Here&quot;
              <br />
              Anytime Fitness Sikandrabad is your ultimate fitness partner. We are committed to building a stronger, healthier version of you everyday.
            </p>
            {/* Social Links */}
            <div className="flex space-x-4">
              <a 
                href="https://instagram.com/anytimefitness2026" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="w-10 h-10 rounded-full border border-neutral-800 flex items-center justify-center text-white hover:bg-accent hover:border-accent transition-all duration-300"
                aria-label="Instagram"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                </svg>
              </a>
              <a 
                href="https://facebook.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="w-10 h-10 rounded-full border border-neutral-800 flex items-center justify-center text-white hover:bg-accent hover:border-accent transition-all duration-300"
                aria-label="Facebook"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"/>
                </svg>
              </a>
              <a 
                href="https://youtube.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="w-10 h-10 rounded-full border border-neutral-800 flex items-center justify-center text-white hover:bg-accent hover:border-accent transition-all duration-300"
                aria-label="YouTube"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.498 6.163a3.003 3.003 0 0 0-2.11-2.11C19.518 3.545 12 3.545 12 3.545s-7.519 0-9.388.508a3.003 3.003 0 0 0-2.11 2.11C0 8.033 0 12 0 12s0 3.967.502 5.837a3.003 3.003 0 0 0 2.11 2.11c1.87.508 9.388.508 9.388.508s7.519 0 9.388-.508a3.003 3.003 0 0 0 2.11-2.11C24 15.967 24 12 24 12s0-3.967-.502-5.837zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Navigation Links */}
          <div className="flex flex-col space-y-4">
            <h3 className="font-bebas text-lg tracking-wider text-white uppercase font-bold">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#home" onClick={(e) => handleScrollTo(e, '#home')} className="hover:text-accent transition-colors duration-300">Home</a>
              </li>
              <li>
                <a href="#programs" onClick={(e) => handleScrollTo(e, '#programs')} className="hover:text-accent transition-colors duration-300">Programs</a>
              </li>
              <li>
                <a href="#gallery" onClick={(e) => handleScrollTo(e, '#gallery')} className="hover:text-accent transition-colors duration-300">Gallery</a>
              </li>
              <li>
                <a href="#pricing" onClick={(e) => handleScrollTo(e, '#pricing')} className="hover:text-accent transition-colors duration-300">Pricing</a>
              </li>
              <li>
                <a href="#contact" onClick={(e) => handleScrollTo(e, '#contact')} className="hover:text-accent transition-colors duration-300">Contact Us</a>
              </li>
            </ul>
          </div>

          {/* Contact Details */}
          <div className="flex flex-col space-y-4">
            <h3 className="font-bebas text-lg tracking-wider text-white uppercase font-bold">Gym Hours</h3>
            <ul className="space-y-2 text-sm">
              <li className="flex justify-between border-b border-neutral-900 pb-1">
                <span>Monday - Saturday:</span>
                <span className="text-white font-medium">05:00 AM - 10:00 PM</span>
              </li>
              <li className="flex justify-between">
                <span>Sunday:</span>
                <span className="text-accent font-medium">Closed</span>
              </li>
              <li className="pt-2 text-xs text-neutral-500">
                * Note: Gym is fully closed on Sundays. Please inquire at the desk for personal training session booking slots.
              </li>
            </ul>
          </div>
        </div>

        {/* Footer Bottom Bar */}
        <div className="pt-8 border-t border-neutral-900 flex flex-col md:flex-row items-center justify-between text-xs text-neutral-500">
          <p>&copy; {currentYear} Anytime Fitness Sikandrabad. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#privacy" className="hover:underline hover:text-white transition-colors">Privacy Policy</a>
            <a href="#terms" className="hover:underline hover:text-white transition-colors">Terms of Service</a>
            <span className="text-neutral-700">|</span>
            <span className="text-neutral-600">Designed by Antigravity</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
