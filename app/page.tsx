'use client';

import { useState } from 'react';

// Interfaces for our data structures
interface ProgramCard {
  title: string;
  description: string;
  icon: React.ReactNode;
}

interface GalleryImage {
  id: number;
  src: string;
  alt: string;
  caption: string;
}

interface PricingPlan {
  name: string;
  price: string;
  period: string;
  features: string[];
  popular: boolean;
  tagline: string;
}

interface Testimonial {
  name: string;
  role: string;
  image: string;
  quote: string;
  rating: number;
}

export default function GymHomePage() {
  // Lightbox State for Gallery
  const [activeImage, setActiveImage] = useState<GalleryImage | null>(null);

  // Form State
  const [formData, setFormData] = useState({ name: '', phone: '', message: '' });
  const [formSubmitted, setFormSubmitted] = useState(false);

  // Contact form submission handler
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) return;
    
    // Simulate successful form submission
    setFormSubmitted(true);
    setTimeout(() => {
      setFormSubmitted(false);
      setFormData({ name: '', phone: '', message: '' });
    }, 4000);
  };

  // Smooth scroll handler
  const handleScrollTo = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const targetElement = document.querySelector(href);
    if (targetElement) {
      const offset = 80; // height of the navbar
      const elementPosition = targetElement.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  // Programs Data
  const programs: ProgramCard[] = [
    {
      title: "Strength Training",
      description: "Build lean muscle, increase bone density, and sculpt your physique with our elite selection of free weights and selectorized plate-loaded machines.",
      icon: (
        <svg className="w-8 h-8 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5m-9-6v6.75m-3-6.75h6" />
        </svg>
      )
    },
    {
      title: "Cardio Fitness",
      description: "Improve heart health and torch calories on our commercial treadmills, ellipticals, spin bikes, and skill-rowers.",
      icon: (
        <svg className="w-8 h-8 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
      )
    },
    {
      title: "Personal Training",
      description: "Get one-on-one customized workout programming, nutritional counseling, and daily accountability from certified coaches.",
      icon: (
        <svg className="w-8 h-8 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a6 6 0 00-3.44-5.04M18 18.72h3V18a6 6 0 00-5.83-7M18 18.72v-1.5a6 6 0 00-5.83-7M12 12a4 4 0 100-8 4 4 0 000 8zm0 0v1.5a6 6 0 00-5.83 7M12 12h-3V18a6 6 0 005.83-7m-5.83 7H3v-1.5a6 6 0 015.83-7M3 18.72v-1.5" />
        </svg>
      )
    },
    {
      title: "Group Classes",
      description: "Stay motivated in structured group settings including HIIT circuits, functional fitness, core blast, and bodyweight bootcamp.",
      icon: (
        <svg className="w-8 h-8 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      )
    },
    {
      title: "Zumba Dance",
      description: "Ditch the workout and join the party. Burn fat and boost cardiovascular health with high-energy dance routines set to latin beats.",
      icon: (
        <svg className="w-8 h-8 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
        </svg>
      )
    },
    {
      title: "Transformation Program",
      description: "Our flagship 12-week body re-composition system featuring custom meal plans, body scans, and weekly progress reviews.",
      icon: (
        <svg className="w-8 h-8 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      )
    }
  ];

  // Gallery Data (Using optimized Unsplash fitness imagery)
  const galleryImages: GalleryImage[] = [
    {
      id: 1,
      src: "https://images.unsplash.com/photo-1526506118085-60ce8714f8c5?q=80&w=800&auto=format&fit=crop",
      alt: "Barbell heavy lift",
      caption: "Heavy deadlifts and strength progression zone"
    },
    {
      id: 2,
      src: "https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?q=80&w=800&auto=format&fit=crop",
      alt: "Sprints on treadmill",
      caption: "Cardio performance tracking deck"
    },
    {
      id: 3,
      src: "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=800&auto=format&fit=crop",
      alt: "Dumbbell weight workout",
      caption: "Free weights area with specialized coaching"
    },
    {
      id: 4,
      src: "https://images.unsplash.com/photo-1605296867304-46d5465a25f1?q=80&w=800&auto=format&fit=crop",
      alt: "Power Rack and gym equipment",
      caption: "Full range of premium squat racks and barbells"
    },
    {
      id: 5,
      src: "https://images.unsplash.com/photo-1599058917212-d750089bc07e?q=80&w=800&auto=format&fit=crop",
      alt: "Functional crossfit training",
      caption: "High-intensity circuits and team fitness"
    },
    {
      id: 6,
      src: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?q=80&w=800&auto=format&fit=crop",
      alt: "Core workout and stretching",
      caption: "Stretching, abdominal conditioning, and yoga mats"
    }
  ];

  // Pricing Data
  const pricingPlans: PricingPlan[] = [
    {
      name: "Monthly",
      price: "₹1,499",
      period: "Month",
      tagline: "Build The Habit",
      popular: false,
      features: [
        "Access during operating hours",
        "Free baseline body assessment",
        "Standard machine guidance",
        "Locker and shower access",
        "Free Wi-Fi access"
      ]
    },
    {
      name: "Quarterly",
      price: "₹3,999",
      period: "3 Months",
      tagline: "Unleash The Drive",
      popular: false,
      features: [
        "Full 24/7 keyfob gym access",
        "1x Fitness & posture assessment",
        "3x Personal training sessions",
        "Customized workout template",
        "Locker and shower access"
      ]
    },
    {
      name: "Annual",
      price: "₹11,999",
      period: "Year",
      tagline: "Ultimate Transformation",
      popular: true,
      features: [
        "Full 24/7 keyfob gym access",
        "Unlimited fitness assessments",
        "Complete personalized nutrition blueprint",
        "Monthly transformation progress reviews",
        "10% discount on in-gym supplements",
        "Priority registration for group classes"
      ]
    }
  ];

  // Testimonials Data
  const testimonials: Testimonial[] = [
    {
      name: "Rohit Sharma",
      role: "Member since 2024 (Lost 18kg)",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=150&auto=format&fit=crop",
      quote: "Anytime Fitness Sikandrabad literally changed my life. The trainers are incredibly supportive and the atmosphere is intensely motivational. I followed the 12-week transformation plan and shed 18kg, while gaining solid muscle.",
      rating: 5
    },
    {
      name: "Pooja Chaudhary",
      role: "Powerlifter & Member",
      image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=150&auto=format&fit=crop",
      quote: "The equipment here is top-tier. Unlike other gyms in Bulandshahr, they have premium squat cages, bumper plates, and a designated deadlift zone. It's clean, safe for women, and the 24/7 access is a total game changer.",
      rating: 5
    },
    {
      name: "Amit Yadav",
      role: "Member since 2025",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=150&auto=format&fit=crop",
      quote: "Best gym experience in Sikandrabad! The pricing is extremely transparent and highly valuable. The community of members feels like a family where everyone pushes you to lift heavier and train harder.",
      rating: 5
    }
  ];

  return (
    <div className="relative w-full overflow-hidden bg-[#0a0a0a] text-white">
      
      {/* 1. HERO SECTION */}
      <section 
        id="home" 
        className="relative h-screen flex items-center justify-center overflow-hidden"
      >
        {/* Background Image with Dark Cinematic Overlay */}
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=1920&auto=format&fit=crop" 
            alt="Anytime Fitness Sikandrabad Training Arena" 
            className="w-full h-full object-cover filter brightness-[0.25] contrast-[1.1]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-black/75 to-transparent"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0a] via-transparent to-[#0a0a0a] opacity-60"></div>
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center justify-center h-full pt-16">
          
          <div className="inline-flex items-center space-x-2 rounded-full border border-accent/20 bg-accent/10 px-4 py-1.5 text-xs font-bold text-accent tracking-widest uppercase mb-6 animate-fade-in">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-accent"></span>
            </span>
            <span>Now Open in Sikandrabad</span>
          </div>

          <h1 className="font-bebas text-5xl sm:text-7xl md:text-8xl lg:text-9xl tracking-tight leading-none text-white max-w-5xl mb-6">
            YOUR TRANSFORMATION <br />
            <span className="text-accent drop-shadow-[0_0_15px_rgba(225,29,46,0.3)]">STARTS HERE</span>
          </h1>

          <p className="text-neutral-300 font-medium text-base sm:text-xl max-w-2xl mb-10 leading-relaxed font-sans">
            Train Hard. Stay Strong. Sweat. Hustle. Repeat. <br className="hidden sm:inline" />
            Join the premium fitness destination in Sikandrabad, Bulandshahr today.
          </p>

          <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-6">
            <a
              href="#contact"
              onClick={(e) => handleScrollTo(e, '#contact')}
              className="bg-accent hover:bg-red-700 text-white font-bebas text-xl px-10 py-4 tracking-widest uppercase transition-all duration-300 red-glow-hover transform hover:-translate-y-1 block text-center"
            >
              Book Free Trial
            </a>
            <a
              href="#programs"
              onClick={(e) => handleScrollTo(e, '#programs')}
              className="border-2 border-white hover:bg-white hover:text-black text-white font-bebas text-xl px-10 py-4 tracking-widest uppercase transition-all duration-300 transform hover:-translate-y-1 block text-center"
            >
              View Programs
            </a>
          </div>

          {/* Stat Strip Below Fold */}
          <div className="absolute bottom-12 left-0 right-0 w-full">
            <div className="max-w-4xl mx-auto px-4">
              <div className="border-y border-neutral-900 bg-black/60 backdrop-blur-md py-4 grid grid-cols-3 gap-4 text-center">
                <div>
                  <p className="text-accent font-bebas text-2xl sm:text-3xl tracking-wider font-bold">5.0 ★★★★★</p>
                  <p className="text-xs sm:text-sm text-neutral-400 font-semibold uppercase tracking-wider">Rated Reviews</p>
                </div>
                <div className="border-x border-neutral-900">
                  <p className="text-white font-bebas text-2xl sm:text-3xl tracking-wider font-bold">24/7 OPEN</p>
                  <p className="text-xs sm:text-sm text-neutral-400 font-semibold uppercase tracking-wider">Access for Members</p>
                </div>
                <div>
                  <p className="text-white font-bebas text-2xl sm:text-3xl tracking-wider font-bold">SIKANDRABAD</p>
                  <p className="text-xs sm:text-sm text-neutral-400 font-semibold uppercase tracking-wider">Bulandshahr, UP</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 hidden md:block">
          <a href="#about" onClick={(e) => handleScrollTo(e, '#about')} className="text-neutral-500 hover:text-white transition-colors duration-300">
            <svg className="w-8 h-8 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </a>
        </div>
      </section>


      {/* 2. ABOUT SECTION */}
      <section 
        id="about" 
        className="py-24 bg-[#0a0a0a] relative z-10 border-t border-neutral-950"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            
            {/* Left side: Image layout */}
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-accent to-red-900 rounded-none opacity-20 blur-lg group-hover:opacity-30 transition duration-1000"></div>
              <div className="relative overflow-hidden aspect-[4/3] sm:aspect-[16/10] lg:aspect-square">
                <img 
                  src="https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=1000&auto=format&fit=crop" 
                  alt="Transformation weights at Anytime Fitness Sikandrabad" 
                  className="w-full h-full object-cover grayscale brightness-90 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-transparent"></div>
                <div className="absolute bottom-6 left-6">
                  <p className="font-bebas text-3xl text-white tracking-widest uppercase font-bold">Building Stronger You Everyday</p>
                  <p className="text-xs text-accent font-bold uppercase tracking-wider">Anytime Fitness Premium Zone</p>
                </div>
              </div>
            </div>

            {/* Right side: Content */}
            <div className="flex flex-col space-y-8">
              <div className="space-y-4">
                <p className="text-accent font-bebas text-xl tracking-widest uppercase font-bold">About Anytime Fitness</p>
                <h2 className="font-bebas text-4xl sm:text-5xl md:text-6xl tracking-tight text-white uppercase font-bold leading-none">
                  MORE THAN A GYM — <br />
                  <span className="text-stroke-white font-extrabold">A TRANSFORMATION ZONE</span>
                </h2>
              </div>

              <p className="text-neutral-400 text-base sm:text-lg leading-relaxed">
                Located in the heart of Sikandrabad, Bulandshahr, Anytime Fitness is more than just a place to sweat. We are a results-driven fitness community dedicated to unlocking your peak potential.
              </p>

              <p className="text-neutral-400 text-base sm:text-lg leading-relaxed">
                With secure 24-hour keyfob access, elite-level strength and conditioning equipment, and a team of certified personal trainers, we remove every barrier between you and your goals. Whether you want to shed weight, gain strength, or build a disciplined lifestyle, your journey begins here.
              </p>

              {/* Icon Stats Grid */}
              <div className="grid grid-cols-2 gap-6 pt-4 border-t border-neutral-900">
                <div className="flex items-start space-x-3">
                  <div className="p-2 bg-neutral-900 border border-neutral-800 text-accent">
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-bebas text-2xl text-white tracking-wide font-bold">1500+</h4>
                    <p className="text-xs text-neutral-400 uppercase tracking-wider font-semibold">Members Trained</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="p-2 bg-neutral-900 border border-neutral-800 text-accent">
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-bebas text-2xl text-white tracking-wide font-bold">5+ Years</h4>
                    <p className="text-xs text-neutral-400 uppercase tracking-wider font-semibold">Active in region</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="p-2 bg-neutral-900 border border-neutral-800 text-accent">
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 12c0-1.232-.046-2.453-.138-3.662a4.006 4.006 0 00-3.7-3.7 48.656 48.656 0 00-7.324 0 4.006 4.006 0 00-3.7 3.7c-.017.22-.032.441-.046.662M19.5 12l3-3m-3 3l-3-3M3 12a15.004 15.004 0 0114.998-14.998M3 12l-3-3m3 3l3-3m13.5 3c0 1.232.046 2.453.138 3.662a4.006 4.006 0 01-3.7 3.7 48.656 48.656 0 01-7.324 0 4.006 4.006 0 01-3.7-3.7c.017-.22.032-.441.046-.662M18 12a6 6 0 11-12 0 6 6 0 0112 0z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-bebas text-2xl text-white tracking-wide font-bold">60+</h4>
                    <p className="text-xs text-neutral-400 uppercase tracking-wider font-semibold">Elite Equipment</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="p-2 bg-neutral-900 border border-neutral-800 text-accent">
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-bebas text-2xl text-white tracking-wide font-bold">24 Hours</h4>
                    <p className="text-xs text-neutral-400 uppercase tracking-wider font-semibold">Secure Key Access</p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>


      {/* 3. PROGRAMS/SERVICES SECTION */}
      <section 
        id="programs" 
        className="py-24 bg-[#080808] relative z-10 border-t border-neutral-950"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center space-y-4 mb-16">
            <p className="text-accent font-bebas text-xl tracking-widest uppercase font-bold">Our Programs</p>
            <h2 className="font-bebas text-4xl sm:text-6xl tracking-tight text-white uppercase font-bold">
              Choose Your <span className="text-accent">Weapon</span>
            </h2>
            <div className="w-16 h-1 bg-accent mx-auto"></div>
            <p className="text-neutral-400 font-sans max-w-xl mx-auto text-sm sm:text-base">
              Explore our range of professional programs tailored to push your physical and mental limits. No shortcuts. Just dedication.
            </p>
          </div>

          {/* Programs Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {programs.map((prog, idx) => (
              <div 
                key={idx} 
                className="gym-card p-8 flex flex-col items-start justify-between min-h-[300px] relative overflow-hidden group"
              >
                {/* Subtle corner line */}
                <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-transparent group-hover:border-accent transition-all duration-300"></div>
                
                <div className="space-y-6">
                  {/* Icon wrap */}
                  <div className="p-3 bg-neutral-900 border border-neutral-800 inline-block group-hover:bg-accent/10 group-hover:border-accent transition-all duration-300">
                    {prog.icon}
                  </div>
                  
                  <h3 className="font-bebas text-2xl sm:text-3xl text-white tracking-wider uppercase font-bold group-hover:text-accent transition-colors duration-300">
                    {prog.title}
                  </h3>
                  
                  <p className="text-neutral-400 text-sm sm:text-base leading-relaxed">
                    {prog.description}
                  </p>
                </div>

                <a 
                  href="#contact" 
                  onClick={(e) => handleScrollTo(e, '#contact')}
                  className="mt-8 text-xs font-bold uppercase tracking-widest text-accent group-hover:translate-x-1.5 transition-transform duration-300 flex items-center space-x-1"
                >
                  <span>Learn More</span>
                  <span>&rarr;</span>
                </a>
              </div>
            ))}
          </div>

        </div>
      </section>


      {/* 4. GALLERY SECTION */}
      <section 
        id="gallery" 
        className="py-24 bg-[#0a0a0a] relative z-10 border-t border-neutral-950"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center space-y-4 mb-16">
            <p className="text-accent font-bebas text-xl tracking-widest uppercase font-bold">Gym Gallery</p>
            <h2 className="font-bebas text-4xl sm:text-6xl tracking-tight text-white uppercase font-bold">
              Inside <span className="text-accent">The Grind</span>
            </h2>
            <div className="w-16 h-1 bg-accent mx-auto"></div>
            <p className="text-neutral-400 font-sans max-w-xl mx-auto text-sm sm:text-base">
              Take a virtual tour of our high-intensity training grounds. The machinery, the plates, and the raw energy.
            </p>
          </div>

          {/* Photo Gallery Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {galleryImages.map((image) => (
              <div 
                key={image.id}
                onClick={() => setActiveImage(image)}
                className="relative overflow-hidden aspect-[4/3] cursor-pointer group bg-neutral-950 border border-neutral-900"
              >
                <img 
                  src={image.src} 
                  alt={image.alt}
                  className="w-full h-full object-cover grayscale brightness-90 group-hover:scale-110 group-hover:grayscale-0 group-hover:brightness-100 transition-all duration-700" 
                  loading="lazy"
                />
                {/* Hover overlay details */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/45 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col justify-end p-6">
                  <span className="text-accent font-bebas text-lg tracking-wider font-bold">View Fullscreen</span>
                  <h4 className="font-bebas text-2xl text-white tracking-widest uppercase font-bold mt-1">{image.alt}</h4>
                  <p className="text-xs text-neutral-400 mt-1">{image.caption}</p>
                </div>
              </div>
            ))}
          </div>

        </div>

        {/* Dynamic Lightbox Component */}
        {activeImage && (
          <div 
            className="fixed inset-0 z-50 flex items-center justify-center lightbox-backdrop p-4 animate-fade-in"
            onClick={() => setActiveImage(null)}
          >
            {/* Close button */}
            <button 
              className="absolute top-6 right-6 text-neutral-400 hover:text-white transition-colors duration-300"
              onClick={() => setActiveImage(null)}
              aria-label="Close Lightbox"
            >
              <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Lightbox Container */}
            <div 
              className="relative max-w-4xl w-full bg-[#121212] border border-neutral-800 shadow-2xl flex flex-col max-h-[85vh]"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="overflow-hidden flex-grow flex items-center justify-center p-2 bg-black">
                <img 
                  src={activeImage.src} 
                  alt={activeImage.alt}
                  className="max-w-full max-h-[70vh] object-contain"
                />
              </div>
              <div className="p-6 border-t border-neutral-900">
                <span className="text-accent font-bebas text-sm tracking-widest font-bold uppercase">Anytime Fitness Sikandrabad</span>
                <h3 className="font-bebas text-3xl text-white tracking-wide uppercase font-bold mt-1">{activeImage.alt}</h3>
                <p className="text-neutral-400 text-sm mt-2">{activeImage.caption}</p>
              </div>
            </div>
          </div>
        )}
      </section>


      {/* 5. PRICING SECTION */}
      <section 
        id="pricing" 
        className="py-24 bg-[#080808] relative z-10 border-t border-neutral-950"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center space-y-4 mb-16">
            <p className="text-accent font-bebas text-xl tracking-widest uppercase font-bold">Gym Pricing</p>
            <h2 className="font-bebas text-4xl sm:text-6xl tracking-tight text-white uppercase font-bold">
              Transparent <span className="text-accent">Memberships</span>
            </h2>
            <div className="w-16 h-1 bg-accent mx-auto"></div>
            <p className="text-neutral-400 font-sans max-w-xl mx-auto text-sm sm:text-base">
              Choose the layout that aligns with your timeline. No hidden registration fees. Just pure access to results.
            </p>
          </div>

          {/* Pricing Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {pricingPlans.map((plan, idx) => (
              <div 
                key={idx}
                className={`relative flex flex-col justify-between p-8 bg-[#121212] transition-all duration-300 ${
                  plan.popular 
                    ? 'border-2 border-accent shadow-[0_15px_45px_rgba(225,29,46,0.15)] md:-translate-y-4' 
                    : 'border border-neutral-900 hover:border-neutral-800'
                }`}
              >
                {/* Popular Badge */}
                {plan.popular && (
                  <span className="absolute top-0 right-1/2 transform translate-x-1/2 -translate-y-1/2 bg-accent text-white text-xs font-bold uppercase tracking-widest px-4 py-1">
                    Most Popular
                  </span>
                )}

                <div>
                  <span className="text-xs uppercase tracking-widest text-neutral-500 font-bold">{plan.tagline}</span>
                  <h3 className="font-bebas text-3xl text-white font-bold tracking-wide mt-2">{plan.name} Plan</h3>
                  
                  {/* Price display */}
                  <div className="mt-6 flex items-baseline">
                    <span className="font-bebas text-6xl text-white font-bold leading-none">{plan.price}</span>
                    <span className="text-neutral-500 text-sm ml-2 font-semibold">/ {plan.period}</span>
                  </div>

                  <div className="w-full h-[1px] bg-neutral-900 my-8"></div>

                  {/* Features List */}
                  <ul className="space-y-4 text-sm text-neutral-300 font-medium">
                    {plan.features.map((feature, fIdx) => (
                      <li key={fIdx} className="flex items-start space-x-3">
                        <svg className="w-5 h-5 text-accent shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-10">
                  <a
                    href="#contact"
                    onClick={(e) => handleScrollTo(e, '#contact')}
                    className={`block text-center font-bebas text-lg py-3.5 tracking-widest uppercase transition-all duration-300 ${
                      plan.popular 
                        ? 'bg-accent hover:bg-red-700 text-white red-glow-hover' 
                        : 'border border-neutral-800 hover:border-white hover:text-black text-white'
                    }`}
                  >
                    Choose Plan
                  </a>
                </div>

              </div>
            ))}
          </div>

        </div>
      </section>


      {/* 6. TESTIMONIALS SECTION */}
      <section 
        id="testimonials" 
        className="py-24 bg-[#0a0a0a] relative z-10 border-t border-neutral-950"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center space-y-4 mb-16">
            <p className="text-accent font-bebas text-xl tracking-widest uppercase font-bold">Success Stories</p>
            <h2 className="font-bebas text-4xl sm:text-6xl tracking-tight text-white uppercase font-bold">
              Member <span className="text-accent">Testimonials</span>
            </h2>
            <div className="w-16 h-1 bg-accent mx-auto"></div>
            <p className="text-neutral-400 font-sans max-w-xl mx-auto text-sm sm:text-base">
              Listen to the honest transformation reviews from members training everyday at Anytime Fitness Sikandrabad.
            </p>
          </div>

          {/* Testimonial Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((test, idx) => (
              <div 
                key={idx}
                className="bg-[#121212] border border-neutral-900 p-8 flex flex-col justify-between relative"
              >
                {/* Red Quote Accent */}
                <div className="absolute top-6 right-8 text-neutral-800 opacity-20">
                  <svg className="w-16 h-16 fill-accent" viewBox="0 0 24 24">
                    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"/>
                  </svg>
                </div>

                <div className="space-y-6 relative z-10">
                  {/* Stars */}
                  <div className="flex space-x-1 text-amber-500">
                    {[...Array(test.rating)].map((_, sIdx) => (
                      <svg key={sIdx} className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                      </svg>
                    ))}
                  </div>
                  
                  <p className="text-neutral-300 italic text-sm sm:text-base leading-relaxed">
                    &quot;{test.quote}&quot;
                  </p>
                </div>

                {/* Profile Details */}
                <div className="flex items-center space-x-4 mt-8 border-t border-neutral-900 pt-6">
                  <img 
                    src={test.image} 
                    alt={test.name}
                    className="w-12 h-12 rounded-full object-cover border border-neutral-800"
                    loading="lazy"
                  />
                  <div>
                    <h4 className="font-bebas text-lg text-white font-bold tracking-wide uppercase">{test.name}</h4>
                    <p className="text-xs text-neutral-500 font-semibold uppercase tracking-wider">{test.role}</p>
                  </div>
                </div>

              </div>
            ))}
          </div>

        </div>
      </section>


      {/* 7. CTA BANNER SECTION */}
      <section className="relative py-20 bg-gradient-to-r from-accent to-red-800 text-white text-center z-10 shadow-2xl">
        <div className="absolute inset-0 z-0 opacity-15">
          <div className="w-full h-full bg-cover bg-center" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?q=80&w=800')" }}></div>
        </div>
        
        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <h2 className="font-bebas text-4xl sm:text-6xl tracking-tight uppercase font-bold leading-none">
            Ready to Start Your Transformation?
          </h2>
          <p className="text-white/80 font-bebas text-xl sm:text-2xl tracking-widest uppercase">
            No excuses. Just results.
          </p>
          <div className="pt-4">
            <a
              href="#contact"
              onClick={(e) => handleScrollTo(e, '#contact')}
              className="bg-black hover:bg-neutral-900 text-white font-bebas text-xl px-12 py-4 tracking-widest uppercase transition-all duration-300 transform hover:-translate-y-1 inline-block shadow-lg"
            >
              Book Your Free Trial
            </a>
          </div>
        </div>
      </section>


      {/* 8. CONTACT + MAP SECTION */}
      <section 
        id="contact" 
        className="py-24 bg-[#0a0a0a] relative z-10 border-t border-neutral-950"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center space-y-4 mb-16">
            <p className="text-accent font-bebas text-xl tracking-widest uppercase font-bold">Contact Us</p>
            <h2 className="font-bebas text-4xl sm:text-6xl tracking-tight text-white uppercase font-bold">
              Start Your <span className="text-accent">Journey</span>
            </h2>
            <div className="w-16 h-1 bg-accent mx-auto"></div>
            <p className="text-neutral-400 font-sans max-w-xl mx-auto text-sm sm:text-base">
              Submit your details to activate your 1-day free trial keyfob. Our team will contact you within 24 hours.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            
            {/* Left side: Interactive Form */}
            <div className="bg-[#121212] border border-neutral-900 p-8 shadow-2xl relative">
              <h3 className="font-bebas text-2xl tracking-wider text-white uppercase font-bold mb-6">Request A Trial</h3>

              {formSubmitted ? (
                <div className="absolute inset-0 bg-[#121212] z-10 flex flex-col items-center justify-center p-8 text-center animate-fade-in">
                  <div className="w-16 h-16 bg-accent rounded-full flex items-center justify-center text-white mb-6 animate-scale-up shadow-[0_0_20px_rgba(225,29,46,0.4)]">
                    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h4 className="font-bebas text-3xl text-white uppercase font-bold tracking-wide">Request Submitted!</h4>
                  <p className="text-neutral-400 text-sm mt-2 max-w-xs mx-auto leading-relaxed">
                    Thank you! Your free trial pass is pending activation. One of our advisors will contact you shortly.
                  </p>
                </div>
              ) : null}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-xs uppercase tracking-wider text-neutral-400 font-bold mb-2">Full Name *</label>
                  <input
                    type="text"
                    id="name"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-[#0a0a0a] border border-neutral-800 focus:border-accent text-white px-4 py-3 text-sm focus:outline-none transition-all duration-300"
                    placeholder="Enter your name"
                  />
                </div>

                <div>
                  <label htmlFor="phone" className="block text-xs uppercase tracking-wider text-neutral-400 font-bold mb-2">Phone Number *</label>
                  <input
                    type="tel"
                    id="phone"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full bg-[#0a0a0a] border border-neutral-800 focus:border-accent text-white px-4 py-3 text-sm focus:outline-none transition-all duration-300"
                    placeholder="Enter mobile number"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-xs uppercase tracking-wider text-neutral-400 font-bold mb-2">Your Goals (Optional)</label>
                  <textarea
                    id="message"
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full bg-[#0a0a0a] border border-neutral-800 focus:border-accent text-white px-4 py-3 text-sm focus:outline-none transition-all duration-300 resize-none"
                    placeholder="Tell us what you want to achieve e.g., Weight loss, strength training..."
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full bg-accent hover:bg-red-700 text-white font-bebas text-lg py-4 tracking-widest uppercase transition-all duration-300 hover:shadow-[0_0_20px_rgba(225,29,46,0.3)] cursor-pointer"
                  >
                    Submit Request
                  </button>
                </div>
              </form>
            </div>

            {/* Right side: Map & Address Info */}
            <div className="flex flex-col justify-between space-y-8">
              {/* Map Holder */}
              <div className="border border-neutral-900 bg-neutral-950 p-2 overflow-hidden aspect-[16/9] lg:aspect-auto lg:flex-grow">
                {/* Embed Map focused on Sikandrabad area */}
                <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14041.520265215715!2d77.71262276587979!3d28.445479633390235!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390c968f9a2e6f47%3A0xa1f13b6320a0665!2sSikandrabad%2C%20Uttar%20Pradesh%20203205!5e0!3m2!1sen!2sin!4v1719782500000!5m2!1sen!2sin" 
                  className="w-full h-full border-0 filter grayscale invert contrast-[1.2] opacity-80" 
                  allowFullScreen={true}
                  loading="lazy" 
                  title="Anytime Fitness Sikandrabad Map Location"
                />
              </div>

              {/* Physical Info Details */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-[#121212] border border-neutral-900 p-6">
                <div className="space-y-3">
                  <h4 className="font-bebas text-lg text-white font-bold tracking-wide uppercase">Gym Location</h4>
                  <p className="text-sm text-neutral-400 leading-relaxed font-sans">
                    Anytime Fitness Sikandrabad, <br />
                    GT Road, Near City Center, <br />
                    Sikandrabad, Bulandshahr, <br />
                    Uttar Pradesh - 203205
                  </p>
                </div>

                <div className="space-y-4">
                  <div>
                    <h4 className="font-bebas text-lg text-white font-bold tracking-wide uppercase">Call / WhatsApp</h4>
                    <p className="text-sm text-neutral-400 font-sans">+91 98765 43210</p>
                  </div>
                  <div>
                    <a
                      href="https://wa.me/919876543210?text=Hi!%20I%20am%20interested%20in%20joining%20Anytime%20Fitness%20Sikandrabad"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center space-x-2 bg-[#25D366] hover:bg-[#20ba5a] text-white text-xs font-bold uppercase tracking-wider px-4 py-2.5 rounded-none shadow-md hover:shadow-lg transition-all duration-300"
                    >
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.455L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.725 1.451 5.436.002 9.852-4.41 9.855-9.852.002-2.636-1.02-5.115-2.879-6.973-1.859-1.859-4.34-2.88-6.98-2.882-5.437 0-9.856 4.417-9.858 9.853-.001 2.062.535 4.075 1.552 5.86l-.99 3.617 3.71-.973zm12.046-6.641c-.268-.134-1.581-.78-1.821-.867-.24-.087-.415-.13-.59.134-.175.263-.676.867-.828 1.04-.152.173-.304.195-.572.061-.268-.134-1.132-.417-2.156-1.331-.797-.711-1.336-1.59-1.492-1.858-.157-.269-.017-.414.118-.548.12-.121.268-.312.402-.469.135-.156.179-.26.269-.434.09-.173.045-.325-.022-.459-.068-.134-.59-1.42-.809-1.947-.213-.515-.446-.445-.61-.453-.158-.007-.339-.009-.52-.009-.181 0-.476.068-.724.339-.249.271-.95.928-.95 2.264 0 1.336.973 2.625 1.109 2.808.136.183 1.914 2.923 4.637 4.101.648.28 1.153.447 1.547.572.651.207 1.243.178 1.71.108.522-.078 1.581-.647 1.802-1.272.222-.625.222-1.161.156-1.272-.066-.111-.24-.175-.508-.309z"/>
                      </svg>
                      <span>WhatsApp Info</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>

          </div>

        </div>
      </section>

    </div>
  );
}
