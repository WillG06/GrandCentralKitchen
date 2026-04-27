import { Link } from "react-router-dom";
import { Instagram } from "lucide-react";

const SiteFooter = () => {
  return (
    <footer className="relative bg-navy text-beige-light overflow-hidden">
      <div className="container py-24 grid md:grid-cols-12 gap-12">
        <div className="md:col-span-5">
          <p className="editorial-eyebrow text-gold/80">Est. Birmingham</p>
          <h3 className="font-display text-5xl md:text-6xl mt-4 leading-[0.95]">
            Grand Central
            <br />
            <span className="italic text-gold">Kitchen</span>
          </h3>
          <p className="mt-8 max-w-sm text-beige-light/70 font-body font-light leading-relaxed">
            A small, easygoing kitchen on Stephenson Street — pouring proper
            coffee and feeding the city since first light.
          </p>
        </div>

        <div className="md:col-span-3">
          <p className="editorial-eyebrow text-gold/80">Visit</p>
          <address className="not-italic mt-6 font-body text-sm leading-loose text-beige-light/85">
            7 Stephenson Street<br />
            Birmingham B2 4BL<br />
            <a href="tel:01216333883" className="hover:text-gold transition-colors">
              0121 633 3883
            </a>
          </address>
        </div>

        <div className="md:col-span-2">
          <p className="editorial-eyebrow text-gold/80">Hours</p>
          <ul className="mt-6 font-body text-sm leading-loose text-beige-light/85">
            <li>Mon – Fri · 7am – 4pm</li>
            <li>Sat · 8am – 4pm</li>
            <li>Sun · 9am – 3pm</li>
          </ul>
        </div>

        <div className="md:col-span-2">
          <p className="editorial-eyebrow text-gold/80">Index</p>
          <ul className="mt-6 space-y-2 font-body text-sm">
            <li><Link to="/menu" className="text-beige-light/85 hover:text-gold transition-colors">Menu</Link></li>
            <li><Link to="/gallery" className="text-beige-light/85 hover:text-gold transition-colors">Gallery</Link></li>
            <li><Link to="/story" className="text-beige-light/85 hover:text-gold transition-colors">Story</Link></li>
            <li><Link to="/visit" className="text-beige-light/85 hover:text-gold transition-colors">Visit</Link></li>
            <li><Link to="/reserve" className="text-beige-light/85 hover:text-gold transition-colors">Reserve</Link></li>
          </ul>
        </div>
      </div>

      <div className="container border-t border-beige-light/10 py-8 flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
        <p className="font-body text-xs uppercase tracking-[0.3em] text-beige-light/50">
          © {new Date().getFullYear()} Grand Central Kitchen
        </p>
        <div className="flex items-center gap-6">
          <a
            href="#"
            aria-label="Instagram"
            className="text-beige-light/60 hover:text-gold transition-colors"
          >
            <Instagram size={16} />
          </a>
          <a
            href="https://maps.google.com"
            target="_blank"
            rel="noreferrer"
            className="font-body text-xs uppercase tracking-[0.3em] text-beige-light/60 hover:text-gold transition-colors"
          >
            Find us
          </a>
        </div>
      </div>

      {/* Decorative hairline */}
      <div className="absolute bottom-0 inset-x-0 h-px gold-line opacity-40" />
    </footer>
  );
};

export default SiteFooter;
