import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Layout from "@/components/Layout";
import { fetchMenu, type MenuCategory, type MenuItem } from "@/lib/content";
import bread from "@/assets/bread.jpg";
import heroBreakfast from "@/assets/hero-breakfast.jpg";
import coffee from "@/assets/coffee.jpg";
import sandwich from "@/assets/sandwich.jpg";
import panini from "@/assets/panini.jpg";
import avocado from "@/assets/avocado-toast.jpg";
import espresso from "@/assets/espresso.jpg";
import omelette from "@/assets/omelette.jpg";

const ease = [0.22, 1, 0.36, 1] as const;

const CATEGORIES: {
  id: MenuCategory;
  label: string;
  subtitle: string;
  primary: string;
  primaryAlt: string;
  secondary: string;
  secondaryAlt: string;
}[] = [
  {
    id: "breakfast",
    label: "Breakfast",
    subtitle: "All day, every day.",
    primary: heroBreakfast,
    primaryAlt: "Full English breakfast on a navy plate",
    secondary: omelette,
    secondaryAlt: "Cheese omelette with herbs",
  },
  {
    id: "coffee",
    label: "Coffee & Hot Drinks",
    subtitle: "Pulled to order.",
    primary: coffee,
    primaryAlt: "Flat white with latte art",
    secondary: espresso,
    secondaryAlt: "Espresso shot pulling into a beige cup",
  },
  {
    id: "baguettes",
    label: "Baguettes & Sandwiches",
    subtitle: "Stone-baked, daily.",
    primary: sandwich,
    primaryAlt: "Roast pepper baguette",
    secondary: bread,
    secondaryAlt: "Sourdough loaves baked each morning",
  },
  {
    id: "panini",
    label: "Panini & Ciabatta",
    subtitle: "Pressed, hot, golden.",
    primary: panini,
    primaryAlt: "Stone-baked panini cut in half",
    secondary: bread,
    secondaryAlt: "Ciabatta crust, just out of the oven",
  },
  {
    id: "cold",
    label: "Cold Plates",
    subtitle: "When the day is warm.",
    primary: avocado,
    primaryAlt: "Avocado on sourdough with chilli",
    secondary: sandwich,
    secondaryAlt: "Sliced cold plate on warm beige",
  },
];

const Menu = () => {
  const [menu, setMenu] = useState<MenuItem[]>([]);
  const [active, setActive] = useState<MenuCategory>("breakfast");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMenu().then((data) => {
      setMenu(data);
      setLoading(false);
    });
  }, []);

  const items = menu.filter((m) => m.category === active);

  return (
    <Layout>
      {/* Hero */}
      <section className="relative pt-40 pb-20">
        <div className="container grid grid-cols-12 gap-6">
          <div className="col-span-12 md:col-span-2">
            <p className="editorial-eyebrow">The card</p>
          </div>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease }}
            className="col-span-12 md:col-span-8 md:col-start-3 font-display text-[12vw] md:text-[8vw] leading-[0.92]"
          >
            The <span className="italic text-gold">menu.</span>
          </motion.h1>
          <p className="col-span-12 md:col-span-5 md:col-start-7 mt-8 font-body font-light text-muted-foreground max-w-md leading-relaxed">
            A short, considered card that changes with the seasons. Bread baked
            each morning, coffee roasted weekly, and a full English that needs
            no introduction.
          </p>
        </div>
      </section>

      {/* Category nav */}
      <section className="sticky top-20 z-30 bg-background/85 backdrop-blur-md border-y border-border/60">
        <div className="container py-5 overflow-x-auto">
          <ul className="flex items-center gap-8 md:gap-12 min-w-max">
            {CATEGORIES.map((c) => (
              <li key={c.id}>
                <button
                  onClick={() => setActive(c.id)}
                  className={`relative font-body text-xs uppercase tracking-[0.3em] py-2 transition-colors duration-500 ${
                    active === c.id ? "text-foreground" : "text-foreground/40 hover:text-foreground/70"
                  }`}
                >
                  {c.label}
                  {active === c.id && (
                    <motion.span
                      layoutId="menu-cat-underline"
                      className="absolute -bottom-0 left-0 right-0 h-px bg-gold"
                      transition={{ duration: 0.6, ease }}
                    />
                  )}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Items */}
      <section className="py-20 md:py-32">
        <div className="container grid grid-cols-12 gap-6 md:gap-12">
          <div className="col-span-12 md:col-span-4 md:sticky md:top-44 md:self-start">
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.7, ease }}
              >
                <p className="editorial-eyebrow">Section</p>
                <h2 className="font-display text-5xl md:text-6xl mt-3 leading-[1]">
                  {CATEGORIES.find((c) => c.id === active)?.label.split(" & ")[0]}
                  {CATEGORIES.find((c) => c.id === active)?.label.includes("&") && (
                    <span className="italic text-gold"> &amp; {CATEGORIES.find((c) => c.id === active)?.label.split(" & ")[1]}</span>
                  )}
                </h2>
                <p className="mt-4 font-display italic text-lg text-muted-foreground">
                  {CATEGORIES.find((c) => c.id === active)?.subtitle}
                </p>
                {(() => {
                  const cat = CATEGORIES.find((c) => c.id === active);
                  if (!cat) return null;
                  return (
                    <div className="hidden md:grid mt-12 grid-cols-5 gap-3">
                      <div className="col-span-3 aspect-[4/5] overflow-hidden">
                        <img
                          src={cat.primary}
                          alt={cat.primaryAlt}
                          loading="lazy"
                          className="h-full w-full object-cover transition-transform duration-[1200ms] ease-editorial hover:scale-[1.04]"
                        />
                      </div>
                      <div className="col-span-2 aspect-[3/4] overflow-hidden mt-10">
                        <img
                          src={cat.secondary}
                          alt={cat.secondaryAlt}
                          loading="lazy"
                          className="h-full w-full object-cover transition-transform duration-[1200ms] ease-editorial hover:scale-[1.04]"
                        />
                      </div>
                    </div>
                  );
                })()}
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="col-span-12 md:col-span-7 md:col-start-6">
            <AnimatePresence mode="wait">
              <motion.ul
                key={active}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5, ease }}
                className="divide-y divide-border"
              >
                {loading ? (
                  Array.from({ length: 4 }).map((_, i) => (
                    <li key={i} className="py-8">
                      <div className="h-6 w-1/2 bg-muted/60 animate-pulse mb-3" />
                      <div className="h-4 w-3/4 bg-muted/40 animate-pulse" />
                    </li>
                  ))
                ) : (
                  items.map((item, i) => (
                    <motion.li
                      key={item.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, ease, delay: i * 0.06 }}
                      className="py-8 group"
                    >
                      <div className="flex items-baseline gap-6">
                        <h3 className="font-display text-2xl md:text-3xl text-foreground flex-1">
                          {item.name}
                          {item.popular && (
                            <span className="ml-3 align-middle inline-block font-body text-[9px] uppercase tracking-[0.3em] text-gold border border-gold/40 px-2 py-0.5">
                              Loved
                            </span>
                          )}
                        </h3>
                        <span aria-hidden className="hidden md:block flex-1 border-b border-dotted border-border translate-y-[-6px]" />
                        <span className="font-display text-2xl text-foreground tabular-nums">
                          £{item.price.toFixed(2)}
                        </span>
                      </div>
                      {item.description && (
                        <p className="mt-2 font-body font-light text-muted-foreground max-w-2xl leading-relaxed">
                          {item.description}
                        </p>
                      )}
                    </motion.li>
                  ))
                )}
              </motion.ul>
            </AnimatePresence>

            <p className="mt-16 font-body text-xs uppercase tracking-[0.3em] text-muted-foreground">
              · Vegetarian and gluten-free options available — please ask ·
            </p>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Menu;
