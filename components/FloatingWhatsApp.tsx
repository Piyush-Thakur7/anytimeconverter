'use client';

import { useState, useEffect } from 'react';

export default function FloatingWhatsApp() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Show button after scrolling down 300px
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    // Trigger check immediately in case page was refreshed halfway down
    toggleVisibility();
    
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const phoneNumber = "919876543210"; // Placeholder number, user can configure
  const message = encodeURIComponent("Hi! I'm interested in joining Anytime Fitness Sikandrabad. Can you please share membership details and free trial info?");
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;

  if (!isVisible) return null;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 flex items-center justify-center bg-[#25D366] hover:bg-[#20ba5a] text-white p-3.5 rounded-full shadow-[0_4px_20px_rgba(37,211,102,0.4)] hover:shadow-[0_4px_30px_rgba(37,211,102,0.6)] transition-all duration-300 hover:scale-110 group cursor-pointer"
      aria-label="Chat on WhatsApp"
    >
      {/* Ripple Animation */}
      <span className="absolute inset-0 rounded-full bg-[#25D366] opacity-40 animate-ping group-hover:animate-none"></span>
      
      {/* SVG Icon */}
      <svg className="w-6 h-6 relative z-10" fill="currentColor" viewBox="0 0 24 24">
        <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.455L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.725 1.451 5.436.002 9.852-4.41 9.855-9.852.002-2.636-1.02-5.115-2.879-6.973-1.859-1.859-4.34-2.88-6.98-2.882-5.437 0-9.856 4.417-9.858 9.853-.001 2.062.535 4.075 1.552 5.86l-.99 3.617 3.71-.973zm12.046-6.641c-.268-.134-1.581-.78-1.821-.867-.24-.087-.415-.13-.59.134-.175.263-.676.867-.828 1.04-.152.173-.304.195-.572.061-.268-.134-1.132-.417-2.156-1.331-.797-.711-1.336-1.59-1.492-1.858-.157-.269-.017-.414.118-.548.12-.121.268-.312.402-.469.135-.156.179-.26.269-.434.09-.173.045-.325-.022-.459-.068-.134-.59-1.42-.809-1.947-.213-.515-.446-.445-.61-.453-.158-.007-.339-.009-.52-.009-.181 0-.476.068-.724.339-.249.271-.95.928-.95 2.264 0 1.336.973 2.625 1.109 2.808.136.183 1.914 2.923 4.637 4.101.648.28 1.153.447 1.547.572.651.207 1.243.178 1.71.108.522-.078 1.581-.647 1.802-1.272.222-.625.222-1.161.156-1.272-.066-.111-.24-.175-.508-.309z"/>
      </svg>
      
      {/* Tooltip on Hover */}
      <span className="absolute right-16 scale-0 transition-all duration-300 origin-right group-hover:scale-100 bg-neutral-900 text-white text-xs font-semibold px-3 py-1.5 rounded-lg border border-neutral-800 shadow-xl whitespace-nowrap">
        Chat with us
      </span>
    </a>
  );
}
