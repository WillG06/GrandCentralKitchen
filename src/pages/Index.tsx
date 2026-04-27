import { motion, useScroll, useTransform } from "framer-motion";
import { Link } from "react-router-dom";
import { useRef } from "react";
import { ArrowUpRight, Star } from "lucide-react";
import Layout from "@/components/Layout";
import exterior from "@/assets/exterior.jpg";
import heroBreakfast from "@/assets/hero-breakfast.jpg";
import interior from "@/assets/interior.jpg";
import coffee from "@/assets/coffee.jpg";
import omelette from "@/assets/omelette.jpg";
import sandwich from "@/assets/sandwich.jpg";
import birmingham from "@/assets/birmingham.jpg";
import bread from "@/assets/bread.jpg";
import { REVIEWS } from "@/lib/content";

const ease = [0.22, 1, 0.36, 1] as const;

const Index = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroImgY = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const heroImgScale = useTransform(scrollYProgress, [0, 1], [1, 1.08]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.85], [1, 0.4]);

  // Decorative ambient image — drifts slowly behind text sections for depth
  const ambientRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: ambientProgress } = useScroll({
    target: ambientRef,
    offset: ["start end", "end start"],
  });
  const ambientY = useTransform(ambientProgress, [0, 1], ["-10%", "20%"]);

  return (
    <Layout>
      {/* ─────────── HERO ─────────── */}
      <section
        ref={heroRef}
        className="relative min-h-[100vh] pt-32 pb-32 md:pb-48 overflow-hidden bg-navy-deep text-beige-light grain"
      >
        {/* Vertical brand mark — kept */}
        <div className="hidden lg:flex absolute left-8 top-1/2 -translate-y-1/2 flex-col items-center gap-6 z-20">
          <span className="h-24 w-px bg-beige-light/30" />
          <span className="font-body text-[10px] uppercase tracking-[0.4em] text-beige-light/50 [writing-mode:vertical-rl]">
            Est. Birmingham · 7 Stephenson St
          </span>
          <span className="h-24 w-px bg-beige-light/30" />
        </div>

        {/* Right-edge full-bleed exterior image — extends beyond bounds so parallax never exposes the navy backdrop */}
        <motion.div
          style={{ opacity: heroOpacity }}
          aria-hidden
          className="absolute right-0 -top-[10%] -bottom-[10%] w-full md:w-[60%] z-0 overflow-hidden"
        >
          <motion.img
            src={exterior}
            alt="Grand Central Kitchen storefront on Stephenson Street, Birmingham, at dusk"
            style={{ y: heroImgY, scale: heroImgScale }}
            className="absolute inset-0 h-full w-full object-cover will-change-transform"
          />
          {/* Left-side veil — fades the image into the navy panel on the left for legible text */}
          <div className="absolute inset-0 bg-gradient-to-r from-navy-deep via-navy-deep/85 md:via-navy-deep/55 md:to-navy-deep/10 to-transparent" />
          {/* Top + bottom veil — softens the seam at section edges so it never "comes apart" on scroll */}
          <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-navy-deep to-transparent" />
          <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-navy-deep to-transparent" />
        </motion.div>

        <div className="container relative grid grid-cols-12 gap-6 z-10">
          {/* Eyebrow */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease }}
            className="col-span-12 lg:col-span-7 lg:col-start-2 flex items-center gap-4"
          >
            <span className="h-px w-12 bg-gold/70" />
            <span className="font-body uppercase text-[11px] tracking-[0.35em] text-gold/90">
              A Birmingham Kitchen — since 2014
            </span>
          </motion.div>

          {/* Headline — Grand Central big, Kitchen smaller */}
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.4, ease, delay: 0.1 }}
            className="col-span-12 lg:col-span-10 lg:col-start-2 mt-8 md:mt-10 font-display leading-[0.86] tracking-tight text-beige-light"
          >
            <span className="block text-[18vw] md:text-[11vw] font-extralight">
              Grand Central
            </span>
            <span className="block mt-3 md:mt-4 font-display italic text-gold text-[8vw] md:text-[4.5vw] tracking-tight">
              Kitchen <span className="not-italic text-gold/70">~</span>
            </span>
          </motion.h1>

          {/* Sub */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease, delay: 0.5 }}
            className="col-span-12 md:col-span-5 md:col-start-2 mt-12 md:mt-14"
          >
            <p className="font-body font-light text-base md:text-lg leading-relaxed text-beige-light/75 max-w-md">
              A small, easygoing kitchen on Stephenson Street — two minutes
              from New Street. Breakfast, baguettes, and the kind of coffee
              you remember.
            </p>
            <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4">
              <Link
                to="/menu"
                className="group inline-flex items-center gap-3 font-body text-xs uppercase tracking-[0.3em] text-beige-light hover:text-gold transition-colors duration-500"
              >
                See the menu
                <span className="h-px w-8 bg-current transition-all duration-500 group-hover:w-14" />
              </Link>
              <Link
                to="/reserve"
                className="font-body text-xs uppercase tracking-[0.3em] text-beige-light/60 hover:text-beige-light transition-colors duration-500"
              >
                Reserve
              </Link>
            </div>
          </motion.div>

          {/* Bottom rating */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, ease, delay: 0.9 }}
            className="col-span-12 lg:col-span-3 lg:col-start-2 mt-12 lg:mt-24 flex items-center gap-4"
          >
            <div className="flex items-center gap-1 text-gold">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} size={12} fill="currentColor" />
              ))}
            </div>
            <p className="font-body text-xs tracking-wider text-beige-light/55">
              4.8 · 2,220 reviews on Google
            </p>
          </motion.div>
        </div>

        {/* Gold hairline */}
        <div className="absolute left-0 right-0 bottom-12 h-px gold-line opacity-40" />
      </section>

      {/* ─────────── INTRO STRIP — text + breakfast plate, balanced ─────────── */}
      <section
        ref={ambientRef}
        className="relative bg-navy text-beige-light py-32 md:py-40 overflow-hidden grain"
      >
        {/* Ambient depth — bread loaves drift slowly behind the lower half */}
        <motion.div
          style={{ y: ambientY }}
          aria-hidden
          className="absolute left-0 right-0 bottom-0 h-[65%] z-0 pointer-events-none opacity-[0.07] mix-blend-screen"
        >
          <img src={bread} alt="" className="h-full w-full object-cover object-center" />
        </motion.div>

        {/* Soft coffee glow — fills the lower-left negative space */}
        <div
          aria-hidden
          className="absolute -left-40 bottom-0 w-[30rem] h-[30rem] opacity-[0.08] pointer-events-none rounded-full overflow-hidden blur-[2px]"
        >
          <img src={coffee} alt="" className="h-full w-full object-cover" />
        </div>

        <div className="container grid grid-cols-12 gap-6 md:gap-12 relative z-10 items-start">
          {/* Left — copy */}
          <div className="col-span-12 md:col-span-6">
            <p className="font-body uppercase text-xs tracking-[0.3em] text-gold/80">
              Our table
            </p>
            <h2 className="font-display text-5xl md:text-7xl mt-6 leading-[0.95] text-beige-light">
              Open from
              <br />
              <span className="italic text-gold">first light.</span>
            </h2>
            <div className="mt-12 max-w-md space-y-6">
              <p className="font-body font-light text-base md:text-lg leading-relaxed text-beige-light/80">
                The kettle goes on at six. The bread is shaped, the bacon laid
                out, the espresso machine warmed through. By seven the door is
                open and the room smells the way a kitchen should.
              </p>
              <p className="font-body font-light text-base md:text-lg leading-relaxed text-beige-light/80">
                We don't try to be everything. We try to be very good at a small
                number of things — and to make every plate feel like it was
                meant for you.
              </p>
            </div>
          </div>

          {/* Right — breakfast plate, in-flow, with caption */}
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1.4, ease }}
            className="col-span-12 md:col-span-5 md:col-start-8 mt-12 md:mt-0"
          >
            <div className="aspect-[3/4] overflow-hidden shadow-[0_40px_120px_-30px_rgba(0,0,0,0.7)]">
              <img
                src={heroBreakfast}
                alt="A full English breakfast on a navy plate"
                className="h-full w-full object-cover"
              />
            </div>
            <p className="mt-5 font-display italic text-sm md:text-base text-beige-light/70">
              ↑ The Big Breakfast — £9.95
            </p>
          </motion.div>
        </div>
      </section>

      {/* ─────────── EDITORIAL DIPTYCH — interior + coffee ─────────── */}
      <section className="relative py-32 md:py-44 bg-navy-deep text-beige-light overflow-hidden">
        {/* Faint coffee atmosphere */}
        <div aria-hidden className="absolute -left-20 top-1/4 w-96 h-96 opacity-[0.06] pointer-events-none">
          <img src={coffee} alt="" className="h-full w-full object-cover" />
        </div>

        <div className="container relative grid grid-cols-12 gap-6 md:gap-12 items-end">
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1.2, ease }}
            className="col-span-12 md:col-span-7 aspect-[4/3] overflow-hidden"
          >
            <img
              src={interior}
              alt="Pub interior with brass pendant lights and warm timber"
              loading="lazy"
              className="h-full w-full object-cover"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1.2, ease, delay: 0.2 }}
            className="col-span-12 md:col-span-4 md:col-start-9"
          >
            <p className="font-body uppercase text-xs tracking-[0.3em] text-beige-light/55">No. 01</p>
            <h3 className="font-display text-4xl md:text-5xl mt-4 leading-[1.05]">
              The room.
            </h3>
            <p className="mt-6 font-body font-light text-beige-light/65 leading-relaxed">
              Brass, oak, navy. A long bar, banquettes, a window onto the
              station. Quiet enough to think. Loud enough to feel like you're
              somewhere.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1.2, ease, delay: 0.1 }}
            className="col-span-12 md:col-span-4 md:col-start-2 md:row-start-2 md:mt-32"
          >
            <p className="font-body uppercase text-xs tracking-[0.3em] text-beige-light/55">No. 02</p>
            <h3 className="font-display text-4xl md:text-5xl mt-4 leading-[1.05]">
              The cup.
            </h3>
            <p className="mt-6 font-body font-light text-beige-light/65 leading-relaxed">
              Single-origin beans, ground to order. Pulled by hands that have
              done it ten thousand times. The cappuccino arrives the way it
              should — and the second one is always tempting.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1.2, ease, delay: 0.3 }}
            className="col-span-12 md:col-span-6 md:col-start-7 md:row-start-2 aspect-[4/5] overflow-hidden md:mt-20"
          >
            <img
              src={coffee}
              alt="Flat white in a beige cup on a dark counter"
              loading="lazy"
              className="h-full w-full object-cover"
            />
          </motion.div>
        </div>
      </section>

      {/* ─────────── PULL QUOTE — slow mornings ─────────── */}
      <section className="py-32 md:py-44 bg-navy text-beige-light grain relative overflow-hidden">
        <div className="container grid grid-cols-12 gap-6">
          <div className="col-span-12 md:col-span-2">
            <p className="font-body uppercase text-xs tracking-[0.3em] text-gold/70">A note</p>
          </div>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease }}
            className="col-span-12 md:col-span-9 md:col-start-3 font-display text-4xl md:text-6xl leading-[1.05] text-beige-light tracking-tight"
          >
            <span className="italic text-gold">Slow mornings.</span> Proper
            coffee. Plates worth the train ride.
          </motion.p>
        </div>
      </section>

      {/* ─────────── GALLERY TEASER ─────────── */}
      <section className="relative py-32 md:py-44 bg-navy-deep text-beige-light">
        <div className="container">
          <div className="flex items-end justify-between mb-12 md:mb-16">
            <div>
              <p className="font-body uppercase text-xs tracking-[0.3em] text-beige-light/55">Lookbook</p>
              <h2 className="font-display text-4xl md:text-7xl mt-4 leading-[0.95] tracking-tight">
                A few <span className="italic text-gold">moments.</span>
              </h2>
            </div>
            <Link
              to="/gallery"
              className="hidden md:inline-flex items-center gap-3 font-body text-xs uppercase tracking-[0.3em] text-beige-light hover:text-gold transition-colors duration-500 group"
            >
              The full gallery
              <ArrowUpRight size={16} className="transition-transform duration-500 group-hover:translate-x-1 group-hover:-translate-y-1" />
            </Link>
          </div>

          <div className="grid grid-cols-12 gap-3 md:gap-6">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease }}
              className="col-span-6 md:col-span-3 aspect-[3/4] overflow-hidden"
            >
              <img src={omelette} alt="Cheese omelette" loading="lazy" className="h-full w-full object-cover hover:scale-105 transition-transform duration-1000 ease-editorial" />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease, delay: 0.15 }}
              className="col-span-6 md:col-span-5 aspect-[4/5] overflow-hidden md:mt-16"
            >
              <img src={sandwich} alt="Roast pepper baguette" loading="lazy" className="h-full w-full object-cover hover:scale-105 transition-transform duration-1000 ease-editorial" />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease, delay: 0.3 }}
              className="col-span-12 md:col-span-4 aspect-[3/4] overflow-hidden md:-mt-8"
            >
              <img src={birmingham} alt="Grand Central Birmingham at blue hour" loading="lazy" className="h-full w-full object-cover hover:scale-105 transition-transform duration-1000 ease-editorial" />
            </motion.div>
          </div>

          <Link
            to="/gallery"
            className="mt-10 md:hidden inline-flex items-center gap-3 font-body text-xs uppercase tracking-[0.3em] text-beige-light"
          >
            The full gallery <ArrowUpRight size={16} />
          </Link>
        </div>
      </section>

      {/* ─────────── REVIEW — clay/beige break for contrast ─────────── */}
      <section className="py-32 md:py-44 bg-beige text-navy-deep relative overflow-hidden">
        {/* Soft ambient interior — pushed to the right edge, faded out smoothly */}
        <div aria-hidden className="absolute right-0 top-0 bottom-0 w-1/2 md:w-1/3 pointer-events-none">
          <img src={interior} alt="" className="h-full w-full object-cover opacity-[0.18]" />
          <div className="absolute inset-0 bg-gradient-to-r from-beige via-beige/60 to-transparent" />
        </div>
        <div className="container grid grid-cols-12 gap-6 relative z-10">
          <div className="col-span-12 md:col-span-2">
            <p className="font-body uppercase text-xs tracking-[0.3em] text-navy/60">From the diary</p>
          </div>
          <motion.blockquote
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease }}
            className="col-span-12 md:col-span-9 md:col-start-3"
          >
            <p className="font-display text-3xl md:text-5xl leading-[1.15] text-navy-deep tracking-tight">
              <span className="text-gold">"</span>
              {REVIEWS[1].body}
              <span className="text-gold">"</span>
            </p>
            <footer className="mt-10 flex items-center gap-4 font-body text-sm text-navy/60">
              <span className="h-px w-10 bg-navy/40" />
              {REVIEWS[1].author} · {REVIEWS[1].date}
            </footer>
          </motion.blockquote>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
