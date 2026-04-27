import { Link, NavLink as RouterNavLink, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";

const NAV = [
  { to: "/", label: "Home" },
  { to: "/menu", label: "Menu" },
  { to: "/gallery", label: "Gallery" },
  { to: "/story", label: "Story" },
  { to: "/visit", label: "Visit" },
  { to: "/reserve", label: "Reserve" },
];

const SiteHeader = () => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const location = useLocation();

  // The home page is dark — header inverts to beige text on transparent
  const isDark = location.pathname === "/";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  // Color tokens depending on theme + scroll
  const baseText = isDark ? "text-beige-light" : "text-foreground";
  const mutedText = isDark ? "text-beige-light/60" : "text-foreground/60";
  const hoverBase = isDark ? "hover:text-beige-light" : "hover:text-foreground";
  const surfaceScrolled = isDark
    ? "bg-navy-deep/80 backdrop-blur-md border-b border-beige-light/10"
    : "bg-background/85 backdrop-blur-md border-b border-border/60";

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-700 ease-editorial ${
        scrolled ? surfaceScrolled : "bg-transparent"
      }`}
    >
      <div className="container flex h-20 items-center justify-between">
        <Link to="/" className="group flex items-baseline gap-2">
          <span className={`font-display text-2xl tracking-tight ${baseText}`}>
            Grand Central
          </span>
          <span className="font-body text-[10px] uppercase tracking-[0.4em] text-gold">
            Kitchen
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-10">
          {NAV.map((item) => (
            <RouterNavLink
              key={item.to}
              to={item.to}
              end={item.to === "/"}
              className={({ isActive }) =>
                `relative font-body text-xs uppercase tracking-[0.3em] transition-colors duration-500 ${
                  isActive ? baseText : `${mutedText} ${hoverBase}`
                }`
              }
            >
              {({ isActive }) => (
                <>
                  {item.label}
                  {isActive && (
                    <motion.span
                      layoutId="nav-underline"
                      className="absolute -bottom-2 left-0 right-0 h-px bg-gold"
                      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                    />
                  )}
                </>
              )}
            </RouterNavLink>
          ))}
        </nav>

        <Link
          to="/reserve"
          className={`hidden lg:inline-flex items-center gap-3 font-body text-xs uppercase tracking-[0.3em] ${baseText} hover:text-gold transition-colors duration-500 group ml-6`}
        >
          Book a table
          <span className="h-px w-6 bg-current transition-all duration-500 group-hover:w-10" />
        </Link>

        <button
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((v) => !v)}
          className={`md:hidden ${baseText} p-2 -mr-2`}
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className={
              isDark
                ? "md:hidden bg-navy-deep border-t border-beige-light/10"
                : "md:hidden bg-background border-t border-border"
            }
          >
            <nav className="container py-8 flex flex-col gap-6">
              {NAV.map((item) => (
                <RouterNavLink
                  key={item.to}
                  to={item.to}
                  end={item.to === "/"}
                  className={({ isActive }) =>
                    `font-display text-3xl ${
                      isActive ? "text-gold" : baseText
                    }`
                  }
                >
                  {item.label}
                </RouterNavLink>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default SiteHeader;
