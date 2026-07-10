'use client';

import { useState, useEffect, useRef } from 'react';
import ContactForm from '@/components/venue/ContactForm';
import Lightbox from '@/components/venue/Lightbox';

// ==========================================
// TEMPLATE CONFIGURATION VARIABLES (SWAP HERE)
// ==========================================
const VENUE_NAME = "The Aurelia Grand Manor";
const TAGLINE = "Where Dream Celebrations Meet 5-Star Luxury";
const LOCATION_CITY = "Beverly Hills, California";
const FULL_ADDRESS = "9500 Wilshire Blvd, Beverly Hills, CA 90212";

// Contact Details
const PHONE_NUMBER = "+1 (555) 234-5678";
const WHATSAPP_NUMBER = "15552345678"; // Format: international number, digits only, no '+' or spaces
const EMAIL = "celebrations@aureliagrandmanor.com";

// Capacity details
const CAPACITY_MIN = 100;
const CAPACITY_MAX = 850;

// Embed URL for Google Maps (iframe src)
const MAP_EMBED_LOCATION = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3305.107026775191!2d-118.40248232386927!3d34.06675541697203!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80c2bc0ecbc7cd3d%3A0xe6bf4ccad320af64!2sBeverly%20Wilshire%2C%20A%20Four%20Seasons%20Hotel!5e0!3m2!1sen!2sus!4v1700000000000!5m2!1sen!2sus";

// Hero Banner Image
const HERO_IMAGE = "/images/venue/hero.jpg";

// Gallery Category Filter Options: All, Wedding, Reception, Mehendi
const GALLERY_IMAGES = [
  {
    src: "/images/venue/wedding.jpg",
    category: "Wedding",
    alt: "Luxurious traditional wedding mandap with white roses",
    title: "The Royal Mandap Ceremony",
    description: "An elegant, custom floral mandap under ambient lighting, perfect for traditional and modern vow exchanges."
  },
  {
    src: "/images/venue/mehendi.jpg",
    category: "Mehendi",
    alt: "Vibrant outdoor mehendi ceremony setup",
    title: "Sun-Drenched Garden Mehendi",
    description: "Vibrant colors, fresh marigold hangings, and low-seating arrangements create a warm, celebratory afternoon vibe."
  },
  {
    src: "/images/venue/reception.jpg",
    category: "Reception",
    alt: "Elegant reception ballroom dinner tables",
    title: "The Grand Reception Ballroom",
    description: "Indoors with tall candelabras, detailed tableware, gold Chiavari chairs, and high ceilings."
  },
  {
    src: "/images/venue/hero.jpg",
    category: "Reception",
    alt: "Panoramic banquet hall view with chandeliers",
    title: "Chandelier Ballroom Setup",
    description: "A wide-angle preview of our premier ballroom dressed in navy and gold drapery, setting the tone for an epic night."
  }
];

// Tiered Packages Setup
const PACKAGES = [
  {
    name: "Classic Elegance (Silver)",
    priceRange: "$15,000 - $22,000",
    description: "Perfect for intimate celebrations with premium essentials and high-end coordination.",
    included: [
      "Up to 6 Hours Venue Rental (Hall & Lounge)",
      "Standard Floral Stage Decoration & Lighting",
      "Executive Buffet Menu (3 Appetizers, 4 Mains)",
      "Complimentary Luxury Bridal Suite",
      "Basic DJ & Sound System Integration",
      "Dedicated On-site Event Coordinator"
    ]
  },
  {
    name: "Royal Majesty (Gold)",
    priceRange: "$28,000 - $38,000",
    description: "Our signature tier featuring gourmet culinary layouts, upgraded lighting, and customized styling.",
    included: [
      "Up to 8 Hours Venue Rental",
      "Bespoke Grand Floral Alter & Entrance Styling",
      "Premium Buffet or 3-Course Plated Dinner",
      "Bridal Suite + Separate Groom Lounge",
      "Professional Lighting Truss & Concert Sound",
      "Valet Parking for up to 150 Vehicles",
      "Mocktail Bar with dedicated Mixologists"
    ]
  },
  {
    name: "Imperial Luxury (Platinum)",
    priceRange: "$48,000 - $60,000",
    description: "A completely custom, ultra-luxury celebration experience with premium enhancements included.",
    included: [
      "Full Day Venue Buyout (Exclusive Use)",
      "Elite Stage Scenography by Master Decorators",
      "Custom 5-Course Plated Fine Dining Service",
      "Bridal Suite Overnight Stay Voucher",
      "Premium LED Video Walls & Live Stream Setup",
      "Unlimited Valet Parking + VIP Red Carpet Entry",
      "Bespoke Dessert Table & Culinary Live Stations"
    ]
  }
];

// Customer Testimonials
const TESTIMONIALS = [
  {
    name: "Aria & Kenneth",
    quote: "The Aurelia Grand Manor made our dream wedding a reality. The ambiance, the staff's attention to detail, and the food were unmatched. Our guests are still raving about the chandeliers and the service a year later!",
    eventType: "Wedding & Reception"
  },
  {
    name: "Priyah & Dev",
    quote: "We hosted our Mehendi and Wedding here. Having access to the garden and the ballroom made transitions seamless. The team handled everything flawlessly, allowing us to completely live in the moment.",
    eventType: "Multi-Day Wedding"
  },
  {
    name: "Victoria & Robert",
    quote: "Pure 5-star hospitality. From the initial booking enquiry to the late-night departure, the team treated us like royalty. If you want a zero-stress, beautiful wedding, this is the place.",
    eventType: "Reception Ceremony"
  }
];

// Amenities Grid
const AMENITIES = [
  {
    label: "Grand AC Ballroom",
    description: "Climate-controlled luxury banquet hall with towering high ceilings.",
    icon: (
      <svg className="w-6 h-6 text-[#c5a880]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v18M3 12h18m-3-9L6 21m12 0L6 3" />
      </svg>
    )
  },
  {
    label: "Private Parking / Valet",
    description: "Spacious dedicated parking with professional valet concierge service.",
    icon: (
      <svg className="w-6 h-6 text-[#c5a880]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124l-.09-1.446M12 3.75a9 9 0 019 9v1.125A1.125 1.125 0 0118.875 15h-13.75A1.125 1.125 0 014 13.875V12.75A9 9 0 0112 3.75z" />
      </svg>
    )
  },
  {
    label: "Gourmet Catering",
    description: "In-house award-winning chefs serving global customized cuisines.",
    icon: (
      <svg className="w-6 h-6 text-[#c5a880]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
      </svg>
    )
  },
  {
    label: "Luxury Bridal Suites",
    description: "Bespoke vanity stations, premium lounge seating, and private baths.",
    icon: (
      <svg className="w-6 h-6 text-[#c5a880]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
      </svg>
    )
  },
  {
    label: "State-of-the-Art Sound",
    description: "Intelligent ambient lighting, professional acoustic trusses, and acoustics.",
    icon: (
      <svg className="w-6 h-6 text-[#c5a880]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.114 5.636a9 9 0 010 12.728M16.463 8.288a5.25 5.25 0 010 7.424M6.75 8.25l4.72-4.72a.75.75 0 011.28.53v15.88a.75.75 0 01-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.01 9.01 0 012.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75z" />
      </svg>
    )
  },
  {
    label: "Lush Outdoor Gardens",
    description: "Manicured lawn setups under fairy lights for open-air functions.",
    icon: (
      <svg className="w-6 h-6 text-[#c5a880]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.905 0-5.64-.507-8.157-1.418M0 0h24v24H0z" fill="none" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 3c-1.2 3-3 5.5-5 8.5a9.7 9.7 0 004 7.5c2-1 4.5-3.5 5.5-6.5a18 18 0 00-4.5-9.5z" />
      </svg>
    )
  }
];

// ==========================================

export default function VenueHome() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showFixedPrice, setShowFixedPrice] = useState(false);
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  // Intersection Observer for scroll animation triggers
  const animatedRefs = useRef<(HTMLDivElement | null)[]>([]);
  
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);

    // Scroll reveal logic
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('opacity-100', 'translate-y-0');
            entry.target.classList.remove('opacity-0', 'translate-y-8');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: '0px 0px -50px 0px' }
    );

    animatedRefs.current.forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      observer.disconnect();
    };
  }, []);

  // Filter gallery
  const filteredGallery = activeCategory === "All"
    ? GALLERY_IMAGES
    : GALLERY_IMAGES.filter(img => img.category === activeCategory);

  const openLightbox = (index: number) => {
    // Find index of image in global array
    const globalIndex = GALLERY_IMAGES.findIndex(img => img.src === filteredGallery[index].src);
    setLightboxIndex(globalIndex !== -1 ? globalIndex : 0);
    setLightboxOpen(true);
  };

  const getWhatsAppLink = (message: string) => {
    return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
  };

  const handleScrollTo = (id: string) => {
    setIsMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#faf7f2] font-sans antialiased text-[#0f172a]">
      
      {/* 1. STICKY NAVIGATION BAR */}
      <header 
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
          isScrolled 
            ? 'bg-[#faf7f2]/95 backdrop-blur-md py-4 shadow-[0_4px_30px_rgba(197,168,128,0.1)] border-b border-[#c5a880]/15' 
            : 'bg-transparent py-6 border-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <button 
            onClick={() => handleScrollTo('hero')}
            className="flex flex-col items-start group text-left cursor-pointer"
          >
            <span className="font-serif text-xl sm:text-2xl font-bold tracking-wide text-[#6b1d2f] group-hover:text-[#c5a880] transition-colors duration-300">
              {VENUE_NAME}
            </span>
            <span className="text-[9px] uppercase font-bold tracking-widest text-[#c5a880]/90 mt-0.5 group-hover:text-[#6b1d2f] transition-colors duration-300">
              {LOCATION_CITY}
            </span>
          </button>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center space-x-8">
            {['About', 'Amenities', 'Packages', 'Gallery', 'Testimonials', 'Location'].map((item) => (
              <button
                key={item}
                onClick={() => handleScrollTo(item.toLowerCase())}
                className="text-xs font-bold uppercase tracking-wider text-[#0f172a]/70 hover:text-[#6b1d2f] hover:translate-y-[-1px] transition-all duration-200 cursor-pointer"
              >
                {item}
              </button>
            ))}
          </nav>

          {/* Action CTA */}
          <div className="flex items-center space-x-4">
            <a
              href={getWhatsAppLink(`Hi! I am interested in checking availability for ${VENUE_NAME} for my wedding event. Can you help?`)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider bg-gradient-to-r from-[#6b1d2f] to-[#4a1525] hover:from-[#7e253a] hover:to-[#581a2c] text-white shadow-md hover:shadow-lg hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 cursor-pointer"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.455L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.725 1.451 5.436.002 9.852-4.41 9.855-9.852.002-2.636-1.02-5.115-2.879-6.973-1.859-1.859-4.34-2.88-6.98-2.882-5.437 0-9.856 4.417-9.858 9.853-.001 2.062.535 4.075 1.552 5.86l-.99 3.617 3.71-.973zm12.046-6.641c-.268-.134-1.581-.78-1.821-.867-.24-.087-.415-.13-.59.134-.175.263-.676.867-.828 1.04-.152.173-.304.195-.572.061-.268-.134-1.132-.417-2.156-1.331-.797-.711-1.336-1.59-1.492-1.858-.157-.269-.017-.414.118-.548.12-.121.268-.312.402-.469.135-.156.179-.26.269-.434.09-.173.045-.325-.022-.459-.068-.134-.59-1.42-.809-1.947-.213-.515-.446-.445-.61-.453-.158-.007-.339-.009-.52-.009-.181 0-.476.068-.724.339-.249.271-.95.928-.95 2.264 0 1.336.973 2.625 1.109 2.808.136.183 1.914 2.923 4.637 4.101.648.28 1.153.447 1.547.572.651.207 1.243.178 1.71.108.522-.078 1.581-.647 1.802-1.272.222-.625.222-1.161.156-1.272-.066-.111-.24-.175-.508-.309z"/>
              </svg>
              <span className="hidden sm:inline">Enquire Now</span>
            </a>

            {/* Mobile Hamburger menu */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 text-[#0f172a] hover:text-[#6b1d2f]"
              aria-label="Toggle menu"
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                {isMobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {isMobileMenuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-[#faf7f2] border-b border-[#c5a880]/15 py-4 px-6 shadow-xl animate-fade-in">
            <nav className="flex flex-col space-y-4">
              {['About', 'Amenities', 'Packages', 'Gallery', 'Testimonials', 'Location'].map((item) => (
                <button
                  key={item}
                  onClick={() => handleScrollTo(item.toLowerCase())}
                  className="text-sm font-bold uppercase tracking-wider text-[#0f172a]/80 hover:text-[#6b1d2f] py-1 text-left cursor-pointer"
                >
                  {item}
                </button>
              ))}
            </nav>
          </div>
        )}
      </header>

      {/* 2. HERO SECTION */}
      <section 
        id="hero" 
        className="relative h-screen flex items-center justify-center overflow-hidden"
      >
        {/* Background Image Container */}
        <div className="absolute inset-0 z-0 select-none">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img 
            src={HERO_IMAGE} 
            alt="Luxury wedding banquet interior at Aurelia Grand Manor" 
            className="w-full h-full object-cover scale-105 animate-fade-in"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/45 to-black/85"></div>
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-5xl mx-auto px-4 text-center space-y-6 sm:space-y-8 select-text">
          <div className="space-y-4 animate-fade-in">
            {/* Elegant Tag */}
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-[10px] uppercase font-bold tracking-widest bg-white/10 text-[#e2d1b8] border border-white/20">
              <span className="w-1.5 h-1.5 rounded-full bg-[#c5a880] animate-pulse"></span>
              Accommodates {CAPACITY_MIN} - {CAPACITY_MAX} Guests
            </span>

            {/* Venue Title */}
            <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl font-bold text-white tracking-tight leading-[1.1] max-w-4xl mx-auto drop-shadow-xl">
              {VENUE_NAME}
            </h1>

            {/* Tagline */}
            <p className="font-serif italic text-base sm:text-2xl text-[#e2d1b8]/90 max-w-2xl mx-auto font-light leading-relaxed">
              {TAGLINE}
            </p>
            <p className="text-xs sm:text-sm font-semibold tracking-wider uppercase text-white/70">
              {LOCATION_CITY}
            </p>
          </div>

          {/* Action CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-2 animate-fade-in">
            <a
              href={getWhatsAppLink(`Hi! I am interested in checking availability for ${VENUE_NAME}. Can you please share pricing and date details?`)}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-8 py-4 rounded-full text-xs font-bold uppercase tracking-wider bg-gradient-to-r from-[#6b1d2f] to-[#4a1525] hover:from-[#7e253a] hover:to-[#581a2c] text-white shadow-xl hover:shadow-[0_10px_25px_rgba(107,29,47,0.4)] hover:scale-[1.03] active:scale-[0.98] transition-all duration-300 flex items-center justify-center gap-2.5 cursor-pointer"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12.003 21.162c-3.414 0-6.643-1.921-8.238-4.997L2.077 21l4.981-1.306c1.478.804 3.143 1.228 4.935 1.23h.005c6.11 0 11.085-4.975 11.085-11.085 0-2.96-1.152-5.742-3.245-7.837C17.742 1.156 14.962 0 12.003 0c-6.11 0-11.086 4.975-11.086 11.085 0 1.956.516 3.864 1.492 5.549L1.003 24l7.397-1.94a11.026 11.026 0 005.127 1.267h.005c6.11 0 11.093-4.978 11.093-11.085 0-1.93-.526-3.83-1.522-5.513l-1.01 1.748c.83 1.411 1.268 3.018 1.268 4.673 0 5.12-4.167 9.287-9.288 9.287h-.003c-1.63 0-3.14-.424-4.47-1.189l-.427-.245-4.403 1.155 1.176-4.293-.274-.436a9.231 9.231 0 01-1.423-4.945c0-5.12 4.167-9.288 9.287-9.288 2.482 0 4.815.967 6.57 2.722 1.756 1.756 2.722 4.09 2.722 6.571-.002 5.12-4.172 9.288-9.29 9.288z"/>
              </svg>
              <span>Enquire via WhatsApp</span>
            </a>
            <button
              onClick={() => handleScrollTo('gallery')}
              className="w-full sm:w-auto px-8 py-4 rounded-full text-xs font-bold uppercase tracking-wider bg-transparent hover:bg-white/10 text-white border border-white/30 hover:border-white transition-all duration-300 cursor-pointer flex items-center justify-center gap-2"
            >
              <span>Explore Gallery</span>
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 13l-7 7-7-7m14-6l-7 7-7-7" />
              </svg>
            </button>
          </div>
        </div>

        {/* Scroll Helper */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 opacity-50 animate-bounce select-none">
          <span className="text-[9px] uppercase tracking-widest text-[#faf7f2] font-semibold">Scroll Down</span>
          <svg className="w-4 h-4 text-[#e2d1b8]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </section>

      {/* 3. ABOUT / WHY US SECTION */}
      <section 
        id="about" 
        className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-b border-[#c5a880]/15"
      >
        <div 
          ref={(el) => { animatedRefs.current[0] = el; }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 sm:gap-16 items-center opacity-0 translate-y-8 transition-all duration-800"
        >
          {/* Text Content */}
          <div className="space-y-6">
            <span className="text-xs uppercase font-bold tracking-widest text-[#c5a880]">Our Heritage & Vision</span>
            <h2 className="font-serif text-3xl sm:text-4.5xl font-bold tracking-tight text-[#6b1d2f]">
              Crafting Grand Celebrations and Royal Memories
            </h2>
            <p className="text-base text-[#0f172a]/75 font-light leading-relaxed">
              Nestled in the prestige of {LOCATION_CITY}, {VENUE_NAME} is an architectural marvel designed specifically for bespoke social milestones. We harmonize modern 5-star hospitality with historic architectural details, creating a luxury sanctuary that guarantees an unforgettable backdrop for your family&apos;s most cherished day.
            </p>
            
            {/* Trust points */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4">
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-[#c5a880]/10 border border-[#c5a880]/30 flex items-center justify-center text-[#6b1d2f]">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-serif text-base font-bold text-[#6b1d2f]">Elite Experience</h4>
                  <p className="text-xs text-[#0f172a]/60 leading-relaxed mt-0.5">Over 15 years of curating high-profile weddings and ceremonies.</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-[#c5a880]/10 border border-[#c5a880]/30 flex items-center justify-center text-[#6b1d2f]">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-serif text-base font-bold text-[#6b1d2f]">Bespoke Planning</h4>
                  <p className="text-xs text-[#0f172a]/60 leading-relaxed mt-0.5">Custom layout adjustments, catering design, and floral mapping.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Visual Showcase collage */}
          <div className="relative h-[300px] sm:h-[450px] w-full rounded-2xl overflow-hidden border border-[#c5a880]/30 shadow-2xl group">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img 
              src="/images/venue/wedding.jpg" 
              alt="Traditional ceremony at Aurelia Grand Manor" 
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
            <div className="absolute bottom-6 left-6 text-white space-y-1">
              <span className="text-[10px] uppercase font-bold tracking-widest text-[#e2d1b8]">Ceremony Arena</span>
              <h3 className="font-serif text-xl font-bold">The Royal Rose Courtyard</h3>
            </div>
          </div>
        </div>
      </section>

      {/* 4. AMENITIES / FACILITIES GRID */}
      <section 
        id="amenities" 
        className="py-20 sm:py-28 bg-[#f5efe6]/40 border-b border-[#c5a880]/15"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          <div 
            ref={(el) => { animatedRefs.current[1] = el; }}
            className="text-center max-w-2xl mx-auto space-y-3 opacity-0 translate-y-8 transition-all duration-800"
          >
            <span className="text-xs uppercase font-bold tracking-widest text-[#c5a880]">Premium Amenities</span>
            <h2 className="font-serif text-3xl sm:text-4.5xl font-bold text-[#6b1d2f]">
              Designed for Seamless Celebrations
            </h2>
            <p className="text-sm sm:text-base text-[#0f172a]/65 font-light leading-relaxed">
              Every detail is engineered to offer ultimate hospitality comfort. Enjoy premium client amenities curated to exceed 5-star standards.
            </p>
          </div>

          <div 
            ref={(el) => { animatedRefs.current[2] = el; }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 opacity-0 translate-y-8 transition-all duration-800"
          >
            {AMENITIES.map((amenity, index) => (
              <div
                key={index}
                className="bg-[#faf7f2] border border-[#c5a880]/20 hover:border-[#c5a880]/60 rounded-xl p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg group"
              >
                <div className="p-3 bg-[#f5efe6] border border-[#c5a880]/15 rounded-lg w-fit text-[#6b1d2f] group-hover:bg-[#6b1d2f]/10 group-hover:border-[#6b1d2f]/30 transition-all duration-300">
                  {amenity.icon}
                </div>
                <h3 className="font-serif text-lg font-bold text-[#6b1d2f] mt-4 mb-2">
                  {amenity.label}
                </h3>
                <p className="text-xs text-[#0f172a]/70 font-light leading-relaxed">
                  {amenity.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. PACKAGES SECTION */}
      <section 
        id="packages" 
        className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-b border-[#c5a880]/15"
      >
        <div className="space-y-12">
          {/* Section Header */}
          <div 
            ref={(el) => { animatedRefs.current[3] = el; }}
            className="flex flex-col md:flex-row md:items-end justify-between gap-6 opacity-0 translate-y-8 transition-all duration-800"
          >
            <div className="space-y-3">
              <span className="text-xs uppercase font-bold tracking-widest text-[#c5a880]">Bespoke Pricing</span>
              <h2 className="font-serif text-3xl sm:text-4.5xl font-bold text-[#6b1d2f]">
                Tailored Venue Packages
              </h2>
              <p className="text-sm sm:text-base text-[#0f172a]/65 font-light leading-relaxed max-w-xl">
                Choose a structured experience tier or request a customized catering and design layout for your guest count.
              </p>
            </div>

            {/* Toggle Button for fixed/custom pricing */}
            <div className="flex items-center gap-3 bg-[#f5efe6] p-1.5 rounded-full border border-[#c5a880]/20 w-fit self-start md:self-auto">
              <button
                onClick={() => setShowFixedPrice(false)}
                className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-300 cursor-pointer ${
                  !showFixedPrice 
                    ? 'bg-[#6b1d2f] text-white shadow-md' 
                    : 'text-[#0f172a]/60 hover:text-[#0f172a]'
                }`}
              >
                Custom Quotes
              </button>
              <button
                onClick={() => setShowFixedPrice(true)}
                className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-300 cursor-pointer ${
                  showFixedPrice 
                    ? 'bg-[#6b1d2f] text-white shadow-md' 
                    : 'text-[#0f172a]/60 hover:text-[#0f172a]'
                }`}
              >
                Estimated Tiers
              </button>
            </div>
          </div>

          {/* Cards Grid */}
          <div 
            ref={(el) => { animatedRefs.current[4] = el; }}
            className="grid grid-cols-1 lg:grid-cols-3 gap-8 opacity-0 translate-y-8 transition-all duration-800"
          >
            {PACKAGES.map((pkg, index) => {
              const isPopular = index === 1; // Middle one Gold
              return (
                <div
                  key={index}
                  className={`border rounded-2xl p-6 sm:p-8 flex flex-col justify-between transition-all duration-300 relative ${
                    isPopular 
                      ? 'bg-gradient-to-b from-[#faf7f2] to-[#f5efe6] border-[#6b1d2f]/50 shadow-xl lg:scale-[1.03] lg:-translate-y-2' 
                      : 'bg-[#faf7f2] border-[#c5a880]/20 hover:border-[#c5a880]/60'
                  }`}
                >
                  {isPopular && (
                    <span className="absolute top-0 right-1/2 translate-x-1/2 -translate-y-1/2 px-4 py-1 rounded-full text-[9px] font-bold uppercase tracking-widest bg-gradient-to-r from-[#6b1d2f] to-[#4a1525] text-[#e2d1b8] border border-[#c5a880]/30 shadow-md">
                      Most Selected
                    </span>
                  )}

                  <div className="space-y-6">
                    <div className="space-y-1">
                      <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#6b1d2f]">{pkg.name}</h3>
                      <p className="text-xs text-[#0f172a]/60 leading-relaxed font-light">{pkg.description}</p>
                    </div>

                    <div className="py-4 border-y border-[#c5a880]/15">
                      <span className="text-[10px] uppercase font-bold tracking-widest text-[#c5a880]/90">
                        {showFixedPrice ? "Est. Base Cost" : "Quoting Strategy"}
                      </span>
                      <div className="font-serif text-2xl sm:text-3xl font-bold text-[#6b1d2f] mt-1">
                        {showFixedPrice ? pkg.priceRange : "Bespoke / Custom"}
                      </div>
                    </div>

                    {/* Features list */}
                    <div className="space-y-3">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-[#0f172a]/80">What&apos;s Included:</h4>
                      <ul className="space-y-2.5">
                        {pkg.included.map((item, itemIdx) => (
                          <li key={itemIdx} className="flex gap-2.5 items-start">
                            <svg className="w-4 h-4 text-[#c5a880] flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                            </svg>
                            <span className="text-xs text-[#0f172a]/85 font-light leading-snug">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="pt-8">
                    <a
                      href={getWhatsAppLink(`Hi! I am interested in getting a quote for the ${pkg.name} package at ${VENUE_NAME} for my event.`)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`w-full py-3.5 px-4 rounded-lg text-xs font-bold uppercase tracking-wider transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer ${
                        isPopular
                          ? 'bg-gradient-to-r from-[#6b1d2f] to-[#4a1525] hover:from-[#7e253a] hover:to-[#581a2c] text-white shadow-md'
                          : 'bg-transparent border border-[#6b1d2f] text-[#6b1d2f] hover:bg-[#6b1d2f] hover:text-white'
                      }`}
                    >
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.455L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.725 1.451 5.436.002 9.852-4.41 9.855-9.852.002-2.636-1.02-5.115-2.879-6.973-1.859-1.859-4.34-2.88-6.98-2.882-5.437 0-9.856 4.417-9.858 9.853-.001 2.062.535 4.075 1.552 5.86l-.99 3.617 3.71-.973zm12.046-6.641c-.268-.134-1.581-.78-1.821-.867-.24-.087-.415-.13-.59.134-.175.263-.676.867-.828 1.04-.152.173-.304.195-.572.061-.268-.134-1.132-.417-2.156-1.331-.797-.711-1.336-1.59-1.492-1.858-.157-.269-.017-.414.118-.548.12-.121.268-.312.402-.469.135-.156.179-.26.269-.434.09-.173.045-.325-.022-.459-.068-.134-.59-1.42-.809-1.947-.213-.515-.446-.445-.61-.453-.158-.007-.339-.009-.52-.009-.181 0-.476.068-.724.339-.249.271-.95.928-.95 2.264 0 1.336.973 2.625 1.109 2.808.136.183 1.914 2.923 4.637 4.101.648.28 1.153.447 1.547.572.651.207 1.243.178 1.71.108.522-.078 1.581-.647 1.802-1.272.222-.625.222-1.161.156-1.272-.066-.111-.24-.175-.508-.309z"/>
                      </svg>
                      <span>Get Custom Quote</span>
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 6. PHOTO GALLERY */}
      <section 
        id="gallery" 
        className="py-20 sm:py-28 bg-[#f5efe6]/40 border-b border-[#c5a880]/15"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          {/* Section Title & Filter Tabs */}
          <div 
            ref={(el) => { animatedRefs.current[5] = el; }}
            className="flex flex-col md:flex-row md:items-end justify-between gap-6 opacity-0 translate-y-8 transition-all duration-800"
          >
            <div className="space-y-3">
              <span className="text-xs uppercase font-bold tracking-widest text-[#c5a880]">Our Galleries</span>
              <h2 className="font-serif text-3xl sm:text-4.5xl font-bold text-[#6b1d2f]">
                Visualizing Your Masterpiece
              </h2>
              <p className="text-sm text-[#0f172a]/65 font-light max-w-md">
                Browse layouts from past celebrations in our grand halls, suites, and lush outer courtyards.
              </p>
            </div>

            {/* Filter buttons */}
            <div className="flex flex-wrap gap-2 pt-2 md:pt-0">
              {["All", "Wedding", "Reception", "Mehendi"].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider border transition-all duration-300 cursor-pointer ${
                    activeCategory === cat
                      ? 'bg-[#6b1d2f] border-[#6b1d2f] text-white shadow-md'
                      : 'bg-transparent border-[#c5a880]/30 text-[#0f172a]/70 hover:border-[#6b1d2f]/50 hover:text-[#6b1d2f]'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Masonry-like Grid Layout */}
          <div 
            ref={(el) => { animatedRefs.current[6] = el; }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 opacity-0 translate-y-8 transition-all duration-800"
          >
            {filteredGallery.map((img, index) => (
              <div
                key={index}
                onClick={() => openLightbox(index)}
                className="group relative h-72 sm:h-80 w-full overflow-hidden rounded-xl border border-[#c5a880]/20 bg-[#faf7f2] shadow-sm hover:shadow-2xl cursor-zoom-in transition-all duration-300 hover:-translate-y-0.5 select-none"
              >
                {/* Image */}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={img.src}
                  alt={img.alt}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />

                {/* Overlay details */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-350 flex flex-col justify-end p-5 text-white">
                  <span className="text-[9px] uppercase font-bold tracking-widest text-[#e2d1b8] mb-1">
                    {img.category}
                  </span>
                  <h4 className="font-serif text-base font-bold leading-tight text-[#faf7f2]">
                    {img.title}
                  </h4>
                  <p className="text-[10px] text-white/70 font-light mt-1 line-clamp-2 leading-relaxed">
                    {img.description}
                  </p>
                </div>

                {/* Constant mobile tag */}
                <div className="absolute bottom-3 left-3 bg-[#6b1d2f]/90 border border-[#c5a880]/40 text-[#faf7f2] px-3 py-1 rounded text-[9px] font-bold uppercase tracking-wider block group-hover:hidden shadow">
                  {img.title}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. TESTIMONIALS */}
      <section 
        id="testimonials" 
        className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-b border-[#c5a880]/15"
      >
        <div className="space-y-16">
          <div 
            ref={(el) => { animatedRefs.current[7] = el; }}
            className="text-center max-w-2xl mx-auto space-y-3 opacity-0 translate-y-8 transition-all duration-800"
          >
            <span className="text-xs uppercase font-bold tracking-widest text-[#c5a880]">Kind Words</span>
            <h2 className="font-serif text-3xl sm:text-4.5xl font-bold text-[#6b1d2f]">
              Testimonials from Celebrated Hosts
            </h2>
            <p className="text-sm sm:text-base text-[#0f172a]/65 font-light leading-relaxed">
              We take pride in delivering perfect experiences. Hear from families who trust us with their landmark life moments.
            </p>
          </div>

          {/* Testimonial Active Display Card */}
          <div 
            ref={(el) => { animatedRefs.current[8] = el; }}
            className="max-w-4xl mx-auto opacity-0 translate-y-8 transition-all duration-800"
          >
            <div className="bg-[#f5efe6]/40 border border-[#c5a880]/20 rounded-2xl p-8 sm:p-12 shadow-md relative overflow-hidden flex flex-col justify-between min-h-[300px]">
              
              {/* Giant Quote Mark decoration */}
              <span className="absolute -top-6 -left-4 font-serif text-[180px] leading-none text-[#c5a880]/10 select-none pointer-events-none">
                &ldquo;
              </span>

              <div className="relative z-10 space-y-6">
                <p className="font-serif italic text-base sm:text-xl md:text-2xl text-[#6b1d2f]/90 leading-relaxed font-light">
                  &ldquo;{TESTIMONIALS[activeTestimonial].quote}&rdquo;
                </p>
                
                <div className="flex items-center gap-3">
                  <div className="w-10 h-1 bg-[#6b1d2f] rounded-full"></div>
                  <div>
                    <h4 className="font-serif text-base font-bold text-[#6b1d2f]">
                      {TESTIMONIALS[activeTestimonial].name}
                    </h4>
                    <p className="text-[10px] uppercase font-bold tracking-widest text-[#c5a880] mt-0.5">
                      Hosted: {TESTIMONIALS[activeTestimonial].eventType}
                    </p>
                  </div>
                </div>
              </div>

              {/* Indicator Controls */}
              <div className="flex gap-2.5 justify-end mt-8 pt-4 border-t border-[#c5a880]/10 relative z-10">
                {TESTIMONIALS.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveTestimonial(idx)}
                    className={`w-3.5 h-3.5 rounded-full border transition-all duration-300 cursor-pointer ${
                      activeTestimonial === idx
                        ? 'bg-[#6b1d2f] border-[#6b1d2f] scale-110'
                        : 'bg-transparent border-[#c5a880]/40 hover:border-[#6b1d2f]/50'
                    }`}
                    aria-label={`Go to testimonial ${idx + 1}`}
                  ></button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 8. LOCATION / INTEGRATION */}
      <section 
        id="location" 
        className="py-20 sm:py-28 bg-[#f5efe6]/40 border-b border-[#c5a880]/15"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          <div 
            ref={(el) => { animatedRefs.current[9] = el; }}
            className="text-center max-w-2xl mx-auto space-y-3 opacity-0 translate-y-8 transition-all duration-800"
          >
            <span className="text-xs uppercase font-bold tracking-widest text-[#c5a880]">Our Location</span>
            <h2 className="font-serif text-3xl sm:text-4.5xl font-bold text-[#6b1d2f]">
              Easy to Reach, Hard to Forget
            </h2>
            <p className="text-sm text-[#0f172a]/65 font-light">
              We are located in the heart of {LOCATION_CITY}, offering seamless traffic access and adjacent luxury stays.
            </p>
          </div>

          <div 
            ref={(el) => { animatedRefs.current[10] = el; }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch opacity-0 translate-y-8 transition-all duration-800"
          >
            {/* Map Frame */}
            <div className="lg:col-span-7 h-[300px] sm:h-[450px] w-full rounded-2xl overflow-hidden border border-[#c5a880]/30 shadow-md">
              <iframe
                title={`${VENUE_NAME} Google Map Embed Location`}
                src={MAP_EMBED_LOCATION}
                className="w-full h-full border-0"
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>

            {/* Address details card & secondary enquiry form */}
            <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
              <div className="bg-[#faf7f2] border border-[#c5a880]/20 rounded-2xl p-6 space-y-4 shadow-sm">
                <h3 className="font-serif text-lg font-bold text-[#6b1d2f]">Address Details</h3>
                <div className="space-y-3 text-xs sm:text-sm text-[#0f172a]/75">
                  <div className="flex gap-3">
                    <svg className="w-5 h-5 text-[#c5a880] flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                    </svg>
                    <span>{FULL_ADDRESS}</span>
                  </div>
                  <div className="flex gap-3">
                    <svg className="w-5 h-5 text-[#c5a880] flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-2.824-1.802-5.194-4.172-7-7l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                    </svg>
                    <span>{PHONE_NUMBER}</span>
                  </div>
                  <div className="flex gap-3">
                    <svg className="w-5 h-5 text-[#c5a880] flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                    </svg>
                    <span>{EMAIL}</span>
                  </div>
                </div>

                <div className="pt-2">
                  <a
                    href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(FULL_ADDRESS)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-lg text-xs font-bold uppercase tracking-wider bg-transparent border border-[#6b1d2f] text-[#6b1d2f] hover:bg-[#6b1d2f] hover:text-white transition-all duration-300 cursor-pointer"
                  >
                    <span>Get Directions on Maps</span>
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                    </svg>
                  </a>
                </div>
              </div>

              {/* Instant Call Out */}
              <div className="bg-[#6b1d2f] text-[#faf7f2] border border-[#c5a880]/30 rounded-2xl p-6 space-y-2.5 shadow-md flex-grow flex flex-col justify-center">
                <h4 className="font-serif text-lg font-bold text-[#e2d1b8]">Need Immediate Assistance?</h4>
                <p className="text-xs text-[#faf7f2]/80 leading-relaxed font-light">
                  Our frontdesk is active from 9:00 AM to 8:00 PM. Give us a voice call directly to discuss urgent reservation inquiries or custom requirements.
                </p>
                <div className="pt-2">
                  <a
                    href={`tel:${WHATSAPP_NUMBER}`}
                    className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#e2d1b8] hover:text-white transition-colors duration-250"
                  >
                    <span>Direct Call: {PHONE_NUMBER}</span>
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 9. FINAL CTA SECTION & FORM */}
      <section 
        id="proposal-form"
        className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 sm:gap-16 items-center">
          
          {/* Text block */}
          <div 
            ref={(el) => { animatedRefs.current[11] = el; }}
            className="lg:col-span-6 space-y-6 opacity-0 translate-y-8 transition-all duration-800"
          >
            <span className="text-xs uppercase font-bold tracking-widest text-[#c5a880]">Secure Your Date</span>
            <h2 className="font-serif text-3xl sm:text-5xl font-bold text-[#6b1d2f] leading-tight">
              Ready to Plan Your Dream Wedding?
            </h2>
            <p className="text-base text-[#0f172a]/75 font-light leading-relaxed">
              Draping the ballroom, crafting the menus, and illuminating the paths — our experts are here to walk with you through every decision. Contact us today via direct WhatsApp for instant details, or fill out the enquiry form for a comprehensive proposal sent straight to your email.
            </p>

            <div className="flex flex-wrap gap-4 pt-2">
              <a
                href={getWhatsAppLink(`Hi! I am ready to discuss booking ${VENUE_NAME} for my wedding. Let's arrange a site visit!`)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-full text-xs font-bold uppercase tracking-wider bg-[#25D366] hover:bg-[#20ba5a] text-white shadow-md hover:shadow-lg transition-all duration-300 hover:scale-[1.02] cursor-pointer"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.455L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.725 1.451 5.436.002 9.852-4.41 9.855-9.852.002-2.636-1.02-5.115-2.879-6.973-1.859-1.859-4.34-2.88-6.98-2.882-5.437 0-9.856 4.417-9.858 9.853-.001 2.062.535 4.075 1.552 5.86l-.99 3.617 3.71-.973zm12.046-6.641c-.268-.134-1.581-.78-1.821-.867-.24-.087-.415-.13-.59.134-.175.263-.676.867-.828 1.04-.152.173-.304.195-.572.061-.268-.134-1.132-.417-2.156-1.331-.797-.711-1.336-1.59-1.492-1.858-.157-.269-.017-.414.118-.548.12-.121.268-.312.402-.469.135-.156.179-.26.269-.434.09-.173.045-.325-.022-.459-.068-.134-.59-1.42-.809-1.947-.213-.515-.446-.445-.61-.453-.158-.007-.339-.009-.52-.009-.181 0-.476.068-.724.339-.249.271-.95.928-.95 2.264 0 1.336.973 2.625 1.109 2.808.136.183 1.914 2.923 4.637 4.101.648.28 1.153.447 1.547.572.651.207 1.243.178 1.71.108.522-.078 1.581-.647 1.802-1.272.222-.625.222-1.161.156-1.272-.066-.111-.24-.175-.508-.309z"/>
                </svg>
                <span>WhatsApp Event Team</span>
              </a>
              
              <a
                href={`tel:${WHATSAPP_NUMBER}`}
                className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-full text-xs font-bold uppercase tracking-wider bg-transparent border border-[#6b1d2f] text-[#6b1d2f] hover:bg-[#6b1d2f] hover:text-white transition-all duration-300 cursor-pointer"
              >
                <span>Direct Voice Call</span>
              </a>
            </div>
          </div>

          {/* Form container */}
          <div 
            ref={(el) => { animatedRefs.current[12] = el; }}
            className="lg:col-span-6 opacity-0 translate-y-8 transition-all duration-800"
          >
            <ContactForm venueName={VENUE_NAME} whatsappNumber={WHATSAPP_NUMBER} />
          </div>
        </div>
      </section>

      {/* 10. FOOTER */}
      <footer className="bg-[#0f172a] text-[#faf7f2] border-t border-[#c5a880]/15 py-16 sm:py-20 select-text">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 sm:gap-12 pb-12 border-b border-[#c5a880]/10">
          
          {/* Logo & description */}
          <div className="space-y-4">
            <h3 className="font-serif text-2xl font-bold tracking-wide text-[#e2d1b8]">
              {VENUE_NAME}
            </h3>
            <p className="text-xs text-[#faf7f2]/60 font-light leading-relaxed">
              A premium, five-star banquet and wedding celebration manor providing bespoke event staging, custom global culinary options, and flawless execution.
            </p>
            {/* Social Icons */}
            <div className="flex gap-4 pt-2">
              {['facebook', 'instagram', 'pinterest'].map((social) => (
                <a
                  key={social}
                  href="#"
                  className="w-8 h-8 rounded-full bg-white/5 border border-white/10 hover:border-[#c5a880] text-white/60 hover:text-[#e2d1b8] flex items-center justify-center transition-all duration-200"
                  aria-label={`Follow us on ${social}`}
                >
                  <span className="text-[10px] uppercase font-bold tracking-wider">{social[0]}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Quick links */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-widest text-[#e2d1b8]">Navigation</h4>
            <ul className="space-y-2 text-xs text-[#faf7f2]/70 font-light">
              {['About', 'Amenities', 'Packages', 'Gallery', 'Testimonials', 'Location'].map((item) => (
                <li key={item}>
                  <button
                    onClick={() => handleScrollTo(item.toLowerCase())}
                    className="hover:text-white hover:underline transition-all cursor-pointer text-left"
                  >
                    {item} Overview
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact details */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-widest text-[#e2d1b8]">Contact Celebrations</h4>
            <ul className="space-y-3.5 text-xs text-[#faf7f2]/70 font-light">
              <li className="flex gap-2">
                <span className="text-[#c5a880] font-bold">A:</span>
                <span>{FULL_ADDRESS}</span>
              </li>
              <li className="flex gap-2">
                <span className="text-[#c5a880] font-bold">P:</span>
                <span>{PHONE_NUMBER}</span>
              </li>
              <li className="flex gap-2">
                <span className="text-[#c5a880] font-bold">E:</span>
                <span>{EMAIL}</span>
              </li>
            </ul>
          </div>

          {/* Capacity/Policy Callout */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-widest text-[#e2d1b8]">Operational Policies</h4>
            <ul className="space-y-2 text-xs text-[#faf7f2]/70 font-light">
              <li>Guest capacity limits: {CAPACITY_MIN} - {CAPACITY_MAX} seated.</li>
              <li>Booking deposits: 25% to secure dates.</li>
              <li>Outside vendors: Welcomed with prior authorization.</li>
              <li>Alcohol & bar options: Exclusive licensed services only.</li>
            </ul>
          </div>
        </div>

        {/* Bottom copyright details */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-[10px] text-[#faf7f2]/40 font-semibold uppercase tracking-wider">
          <span>&copy; {new Date().getFullYear()} {VENUE_NAME}. All Rights Reserved.</span>
          <div className="flex gap-4">
            <a href="#" className="hover:text-white">Privacy Policy</a>
            <span>&bull;</span>
            <a href="#" className="hover:text-white">Terms of Reservation</a>
          </div>
        </div>
      </footer>

      {/* Floating Action WhatsApp Bubble */}
      <a
        href={getWhatsAppLink(`Hi! I am exploring ${VENUE_NAME} and would love to chat with a wedding specialist.`)}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-30 p-4 rounded-full bg-[#25D366] text-white shadow-[0_4px_25px_rgba(37,211,102,0.45)] hover:shadow-[0_4px_35px_rgba(37,211,102,0.7)] hover:scale-105 active:scale-95 transition-all duration-300 group flex items-center justify-center cursor-pointer"
        aria-label="Contact us on WhatsApp"
      >
        <span className="absolute inset-0 rounded-full bg-[#25D366] opacity-35 animate-ping group-hover:animate-none"></span>
        <svg className="w-6 h-6 relative z-10" fill="currentColor" viewBox="0 0 24 24">
          <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.455L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.725 1.451 5.436.002 9.852-4.41 9.855-9.852.002-2.636-1.02-5.115-2.879-6.973-1.859-1.859-4.34-2.88-6.98-2.882-5.437 0-9.856 4.417-9.858 9.853-.001 2.062.535 4.075 1.552 5.86l-.99 3.617 3.71-.973zm12.046-6.641c-.268-.134-1.581-.78-1.821-.867-.24-.087-.415-.13-.59.134-.175.263-.676.867-.828 1.04-.152.173-.304.195-.572.061-.268-.134-1.132-.417-2.156-1.331-.797-.711-1.336-1.59-1.492-1.858-.157-.269-.017-.414.118-.548.12-.121.268-.312.402-.469.135-.156.179-.26.269-.434.09-.173.045-.325-.022-.459-.068-.134-.59-1.42-.809-1.947-.213-.515-.446-.445-.61-.453-.158-.007-.339-.009-.52-.009-.181 0-.476.068-.724.339-.249.271-.95.928-.95 2.264 0 1.336.973 2.625 1.109 2.808.136.183 1.914 2.923 4.637 4.101.648.28 1.153.447 1.547.572.651.207 1.243.178 1.71.108.522-.078 1.581-.647 1.802-1.272.222-.625.222-1.161.156-1.272-.066-.111-.24-.175-.508-.309z"/>
        </svg>
        <span className="absolute right-16 scale-0 transition-all duration-300 origin-right group-hover:scale-100 bg-[#0f172a] border border-[#c5a880]/30 text-[#e2d1b8] text-xs font-bold px-3 py-1.5 rounded-lg shadow-xl whitespace-nowrap">
          Chat with Us
        </span>
      </a>

      {/* LIGHTBOX MODAL */}
      <Lightbox
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        images={GALLERY_IMAGES}
        currentIndex={lightboxIndex}
        onNavigate={setLightboxIndex}
      />

    </div>
  );
}
