import { motion } from "framer-motion";
import Layout from "@/components/Layout";
import ParallaxImage from "@/components/ParallaxImage";
import exterior from "@/assets/exterior.jpg";
import birmingham from "@/assets/birmingham.jpg";
import interior from "@/assets/interior.jpg";
import coffee from "@/assets/coffee.jpg";
import { Phone, MapPin, Clock, Train } from "lucide-react";

const ease = [0.22, 1, 0.36, 1] as const;

const Visit = () => {
  return (
    <Layout>
      {/* ── Intro ── */}
      <section className="pt-40 pb-16">
        <div className="container grid grid-cols-12 gap-6">
          <div className="col-span-12 md:col-span-2">
            <p className="editorial-eyebrow">Find us</p>
          </div>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease }}
            className="col-span-12 md:col-span-9 md:col-start-3 font-display text-[12vw] md:text-[7.5vw] leading-[0.92]"
          >
            7 Stephenson St,
            <br />
            <span className="italic text-gold">Birmingham.</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="col-span-12 md:col-span-5 md:col-start-3 mt-8 font-body font-light text-muted-foreground leading-relaxed max-w-md"
          >
            Tucked between New Street Station and the Bullring — walk out of
            the platform, turn left, and we're the lit windows on the right.
          </motion.p>
        </div>
      </section>

      {/* ── Hero exterior — clean, no overlapping card ── */}
      <section className="relative">
        <ParallaxImage
          src={exterior}
          alt="Grand Central Kitchen exterior, Stephenson Street, at dusk"
          className="h-[70vh] md:h-[80vh]"
          intensity={0.18}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-navy-deep/45 via-transparent to-transparent pointer-events-none" />
        <div className="container relative">
          <p className="absolute right-4 md:right-8 -bottom-8 font-body italic text-xs md:text-sm text-muted-foreground">
            ↑ 7 Stephenson Street, just before opening.
          </p>
        </div>
      </section>

      {/* ── Essentials — three editorial columns, integrated into the page ── */}
      <section className="pt-32 md:pt-40 pb-20 md:pb-28">
        <div className="container">
          <div className="mb-16 md:mb-20 grid grid-cols-12 gap-6">
            <div className="col-span-12 md:col-span-2">
              <p className="editorial-eyebrow">Essentials</p>
            </div>
            <h2 className="col-span-12 md:col-span-9 md:col-start-3 font-display text-4xl md:text-6xl leading-[1.05]">
              Everything you need
              <br />
              <span className="italic text-gold">before the door.</span>
            </h2>
          </div>

          <div className="grid grid-cols-12 gap-y-16 gap-x-6 md:gap-x-12">
            {/* Address */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease }}
              className="col-span-12 md:col-span-4 border-t border-border pt-8"
            >
              <div className="flex items-center gap-3">
                <MapPin className="text-gold" size={18} strokeWidth={1.25} />
                <p className="editorial-eyebrow">Address</p>
              </div>
              <p className="font-display text-2xl md:text-3xl mt-6 leading-snug">
                7 Stephenson Street<br />
                Birmingham B2 4BL
              </p>
              <a
                href="https://maps.google.com/?q=Grand+Central+Kitchen+7+Stephenson+St+Birmingham"
                target="_blank"
                rel="noreferrer"
                className="mt-8 inline-flex items-center gap-3 font-body text-xs uppercase tracking-[0.3em] text-foreground hover:text-gold transition-colors duration-500 group"
              >
                Open in Maps
                <span className="h-px w-8 bg-current transition-all duration-500 group-hover:w-14" />
              </a>
            </motion.div>

            {/* Hours */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease, delay: 0.1 }}
              className="col-span-12 md:col-span-4 border-t border-border pt-8"
            >
              <div className="flex items-center gap-3">
                <Clock className="text-gold" size={18} strokeWidth={1.25} />
                <p className="editorial-eyebrow">Hours</p>
              </div>
              <ul className="mt-6 font-display text-xl md:text-2xl space-y-3 leading-snug">
                <li className="flex justify-between gap-6 border-b border-border/50 pb-2"><span>Mon — Fri</span> <span className="text-muted-foreground tabular-nums">7 — 4</span></li>
                <li className="flex justify-between gap-6 border-b border-border/50 pb-2"><span>Saturday</span> <span className="text-muted-foreground tabular-nums">8 — 4</span></li>
                <li className="flex justify-between gap-6"><span>Sunday</span> <span className="text-muted-foreground tabular-nums">9 — 3</span></li>
              </ul>
              <p className="mt-6 font-body font-light text-sm text-muted-foreground italic">
                Kitchen serves until 30 minutes before close.
              </p>
            </motion.div>

            {/* Reservations */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease, delay: 0.2 }}
              className="col-span-12 md:col-span-4 border-t border-border pt-8"
            >
              <div className="flex items-center gap-3">
                <Phone className="text-gold" size={18} strokeWidth={1.25} />
                <p className="editorial-eyebrow">Reservations</p>
              </div>
              <a href="tel:01216333883" className="font-display text-2xl md:text-3xl mt-6 block hover:text-gold transition-colors">
                0121 633 3883
              </a>
              <p className="mt-4 font-body font-light text-sm text-muted-foreground leading-relaxed">
                Walk-ins always welcome. Booking encouraged for parties of
                four or more, weekend mornings, and the day before a match.
              </p>
              <a
                href="mailto:hello@grandcentralkitchen.shop"
                className="mt-6 inline-flex items-center gap-3 font-body text-xs uppercase tracking-[0.3em] text-foreground hover:text-gold transition-colors duration-500 group"
              >
                Email us
                <span className="h-px w-8 bg-current transition-all duration-500 group-hover:w-14" />
              </a>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Getting here ── */}
      <section className="py-32 md:py-44">
        <div className="container grid grid-cols-12 gap-6 md:gap-12">
          <div className="col-span-12 md:col-span-4">
            <p className="editorial-eyebrow">Getting here</p>
            <h2 className="font-display text-4xl md:text-5xl mt-4 leading-[1.05]">
              Two minutes
              <br />
              <span className="italic text-gold">from the platform.</span>
            </h2>
          </div>

          <div className="col-span-12 md:col-span-7 md:col-start-6 space-y-10 mt-4">
            <div className="flex gap-6 border-t border-border pt-8">
              <Train className="text-gold shrink-0 mt-1" size={20} strokeWidth={1.25} />
              <div>
                <p className="editorial-eyebrow">By train</p>
                <p className="mt-3 font-body font-light text-muted-foreground leading-relaxed">
                  Birmingham New Street is a 2-minute walk. Leave via the
                  Stephenson Street exit (Grand Central) — we're directly
                  opposite.
                </p>
              </div>
            </div>
            <div className="flex gap-6 border-t border-border pt-8">
              <MapPin className="text-gold shrink-0 mt-1" size={20} strokeWidth={1.25} />
              <div>
                <p className="editorial-eyebrow">On foot</p>
                <p className="mt-3 font-body font-light text-muted-foreground leading-relaxed">
                  From the Bullring, head towards New Street Station and
                  follow Stephenson Street west. We're between the station
                  and Pinfold Street, on the south side.
                </p>
              </div>
            </div>
            <div className="flex gap-6 border-t border-border pt-8">
              <Clock className="text-gold shrink-0 mt-1" size={20} strokeWidth={1.25} />
              <div>
                <p className="editorial-eyebrow">Best times</p>
                <p className="mt-3 font-body font-light text-muted-foreground leading-relaxed">
                  Quietest before 9am and after 2.30pm. Weekend mornings get
                  busy — we hold a few tables back for walk-ins.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Map + Birmingham at blue hour ── */}
      <section className="pb-12">
        <div className="container grid grid-cols-12 gap-6">
          <motion.iframe
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.4, ease }}
            title="Map showing Grand Central Kitchen at 7 Stephenson Street, Birmingham"
            src="https://www.google.com/maps?q=7+Stephenson+St,+Birmingham+B2+4BL&output=embed"
            className="col-span-12 md:col-span-7 aspect-[4/3] w-full border-0 grayscale-[0.4] contrast-[0.95]"
            loading="lazy"
          />
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease, delay: 0.2 }}
            className="col-span-12 md:col-span-4 md:col-start-9 md:mt-24"
          >
            <ParallaxImage src={birmingham} alt="Grand Central Birmingham at blue hour" className="aspect-[3/4]" intensity={0.18} />
            <p className="mt-3 font-body text-xs tracking-wider text-muted-foreground italic">
              The walk from New Street.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── Service icons strip ── */}
      <section className="py-24 border-t border-border">
        <div className="container grid grid-cols-2 md:grid-cols-4 gap-10 text-center">
          {[
            { label: "Dine-in" },
            { label: "Takeaway" },
            { label: "Delivery" },
            { label: "LGBTQ+ friendly" },
          ].map((s) => (
            <div key={s.label} className="border-l border-border first:border-l-0 md:px-6">
              <p className="font-display text-2xl">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Closing diptych with overlap ── */}
      <section className="relative py-32 md:py-44 overflow-hidden">
        <div className="container grid grid-cols-12 gap-6 items-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease }}
            className="col-span-12 md:col-span-6"
          >
            <ParallaxImage src={interior} alt="Pub interior" className="aspect-[5/6]" intensity={0.15} />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease, delay: 0.2 }}
            className="col-span-12 md:col-span-5 md:col-start-8 md:-ml-16 relative z-10 bg-background md:p-12"
          >
            <p className="editorial-eyebrow">See you soon</p>
            <h2 className="font-display text-5xl md:text-6xl mt-6 leading-[0.95]">
              We'll keep
              <br />
              <span className="italic text-gold">a table</span> for you.
            </h2>
            <p className="mt-8 font-body font-light text-muted-foreground leading-relaxed max-w-sm">
              Bring the paper, bring a friend, bring the dog. The kettle's on
              and there's a seat near the window with your name on it.
            </p>
            <div className="mt-10 flex items-center gap-8">
              <a
                href="tel:01216333883"
                className="group inline-flex items-center gap-3 font-body text-xs uppercase tracking-[0.3em] text-foreground hover:text-gold transition-colors duration-500"
              >
                Call to reserve
                <span className="h-px w-8 bg-current transition-all duration-500 group-hover:w-14" />
              </a>
            </div>
          </motion.div>
        </div>

        {/* tiny coffee accent peeking from edge */}
        <div className="hidden md:block absolute right-0 top-12 w-40 aspect-square overflow-hidden opacity-90">
          <img src={coffee} alt="" aria-hidden className="h-full w-full object-cover" />
        </div>
      </section>
    </Layout>
  );
};

export default Visit;
