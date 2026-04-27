import { motion } from "framer-motion";
import Layout from "@/components/Layout";
import ParallaxImage from "@/components/ParallaxImage";
import interior from "@/assets/interior.jpg";
import bread from "@/assets/bread.jpg";
import espresso from "@/assets/espresso.jpg";
import { REVIEWS } from "@/lib/content";

const ease = [0.22, 1, 0.36, 1] as const;

const Story = () => {
  return (
    <Layout>
      <section className="pt-40 pb-20">
        <div className="container grid grid-cols-12 gap-6">
          <div className="col-span-12 md:col-span-2">
            <p className="editorial-eyebrow">Chapter</p>
          </div>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease }}
            className="col-span-12 md:col-span-9 md:col-start-3 font-display text-[10vw] md:text-[6.5vw] leading-[0.95]"
          >
            A small kitchen,
            <br />
            <span className="italic text-gold">two minutes</span> from the platform.
          </motion.h1>
        </div>
      </section>

      <section className="py-20">
        <div className="container grid grid-cols-12 gap-6">
          <div className="col-span-12 md:col-span-5 md:col-start-2 space-y-6 font-body font-light text-lg leading-relaxed text-muted-foreground">
            <p>
              <span className="font-display text-foreground text-2xl float-left mr-3 leading-none">G</span>
              rand Central Kitchen began with a simple thought: that the city
              centre needed a quiet place to start the day properly. A room
              where the bread was baked that morning, the coffee was made by
              someone who cared, and where you could read the paper without
              being rushed.
            </p>
            <p>
              We opened on Stephenson Street in 2014. Two minutes from New
              Street Station, behind a small navy door. We've not moved.
            </p>
          </div>
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease }}
            className="col-span-12 md:col-span-4 md:col-start-8 md:mt-24"
          >
            <ParallaxImage src={bread} alt="Sourdough loaves cooling on the counter" className="aspect-[4/5]" intensity={0.15} />
            <p className="mt-3 font-body text-xs tracking-wider text-muted-foreground">
              Loaves shaped at five, baked by seven.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Pull quote */}
      <section className="py-32 bg-navy text-beige-light grain relative">
        <div className="container">
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease }}
            className="font-display text-4xl md:text-6xl leading-[1.1] max-w-4xl mx-auto text-center"
          >
            <span className="text-gold">"</span>We don't try to be everything.
            We try to be very good at a small number of things.<span className="text-gold">"</span>
          </motion.p>
          <p className="mt-10 text-center font-body text-xs uppercase tracking-[0.3em] text-beige-light/60">
            — DC, owner
          </p>
        </div>
      </section>

      {/* Three pillars */}
      <section className="py-32 md:py-44">
        <div className="container grid grid-cols-12 gap-12">
          {[
            { n: "01", title: "Sourced near home", body: "Bread, eggs, bacon and sausages from West Midlands suppliers we know by first name." },
            { n: "02", title: "Cooked with care", body: "Eggs poached one at a time. Bacon laid out, never piled. Tomatoes grilled until they sing." },
            { n: "03", title: "Served without fuss", body: "Welcome at the door, water on the table, the bill when you ask for it. That's it." },
          ].map((p, i) => (
            <motion.div
              key={p.n}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 1, ease, delay: i * 0.15 }}
              className="col-span-12 md:col-span-4"
            >
              <p className="font-display italic text-5xl text-gold/70">{p.n}</p>
              <h3 className="font-display text-3xl mt-6">{p.title}</h3>
              <p className="mt-4 font-body font-light text-muted-foreground leading-relaxed">{p.body}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Diptych */}
      <section className="py-12">
        <div className="container grid grid-cols-12 gap-6">
          <ParallaxImage src={interior} alt="Pub interior" className="col-span-12 md:col-span-7 aspect-[4/3]" intensity={0.15} />
          <ParallaxImage src={espresso} alt="Espresso shot" className="col-span-12 md:col-span-4 md:col-start-9 aspect-[3/4] md:mt-16" intensity={0.18} />
        </div>
      </section>

      {/* Reviews */}
      <section className="py-32 md:py-44">
        <div className="container">
          <p className="editorial-eyebrow">From our table to yours</p>
          <h2 className="font-display text-5xl md:text-6xl mt-4 mb-16">
            What people <span className="italic text-gold">say.</span>
          </h2>
          <div className="grid grid-cols-12 gap-12">
            {REVIEWS.map((r, i) => (
              <motion.blockquote
                key={r.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1, ease, delay: i * 0.1 }}
                className="col-span-12 md:col-span-4 border-t border-border pt-8"
              >
                <p className="font-display text-xl leading-relaxed text-foreground">
                  <span className="text-gold">"</span>{r.body}<span className="text-gold">"</span>
                </p>
                <footer className="mt-6 font-body text-xs uppercase tracking-[0.3em] text-muted-foreground">
                  {r.author} · {r.date}
                </footer>
              </motion.blockquote>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Story;
