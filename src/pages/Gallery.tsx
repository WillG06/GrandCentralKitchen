import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Layout from "@/components/Layout";
import { fetchGallery, type GalleryImage } from "@/lib/content";

const ease = [0.22, 1, 0.36, 1] as const;

/* ── A single parallax photo — drifts vertically as it crosses the viewport. ── */
interface PhotoProps {
  src: string;
  alt: string;
  caption?: string;
  className?: string;
  intensity?: number; // -1 .. 1, sign controls direction
  imgClassName?: string;
}
const Photo = ({ src, alt, caption, className = "", intensity = 0.2, imgClassName = "", eager = false }: PhotoProps & { eager?: boolean }) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const dir = intensity >= 0 ? 1 : -1;
  const amp = Math.abs(intensity) * 100;
  const y = useTransform(scrollYProgress, [0, 1], [`${-amp * dir}px`, `${amp * dir}px`]);

  return (
    <div ref={ref} className={`relative overflow-hidden bg-navy-deep ${className}`}>
      <motion.img
        src={src}
        alt={alt}
        loading={eager ? "eager" : "lazy"}
        style={{ y }}
        className={`absolute left-0 right-0 top-[-12%] h-[125%] w-full object-cover ${imgClassName}`}
      />
      {caption && (
        <span className="absolute bottom-3 left-3 z-10 font-body text-[10px] uppercase tracking-[0.3em] text-beige-light/80 bg-navy-deep/40 backdrop-blur-sm px-2 py-1">
          {caption}
        </span>
      )}
    </div>
  );
};

const Gallery = () => {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchGallery().then((data) => {
      setImages(data);
      setLoading(false);
    });
  }, []);

  // Intro scroll mask
  const introRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: introProgress } = useScroll({
    target: introRef,
    offset: ["start start", "end start"],
  });
  const introY = useTransform(introProgress, [0, 1], ["0%", "-25%"]);
  const introOpacity = useTransform(introProgress, [0, 0.8], [1, 0.2]);

  if (loading || images.length === 0) {
    return (
      <Layout>
        <section className="pt-40 pb-24 container">
          <div className="grid grid-cols-12 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className={`bg-muted/40 animate-pulse ${
                  i % 3 === 0
                    ? "col-span-12 md:col-span-8 aspect-[16/9]"
                    : "col-span-6 md:col-span-4 aspect-[3/4]"
                }`}
              />
            ))}
          </div>
        </section>
      </Layout>
    );
  }

  return (
    <Layout>
      {/* ─── Intro ─── */}
      <section ref={introRef} className="relative pt-32 md:pt-40 pb-16 md:pb-24">
        <motion.div style={{ y: introY, opacity: introOpacity }} className="container grid grid-cols-12 gap-6">
          <div className="col-span-12 md:col-span-2">
            <p className="editorial-eyebrow">Vol. I</p>
          </div>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease }}
            className="col-span-12 md:col-span-8 md:col-start-3 font-display text-[16vw] md:text-[9vw] leading-[0.9] tracking-tight"
          >
            The <span className="italic text-gold">lookbook.</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="col-span-12 md:col-span-5 md:col-start-7 mt-8 md:mt-10 font-body font-light text-muted-foreground leading-relaxed max-w-md"
          >
            Quiet mornings, full plates, slow afternoons. Scroll through the
            kitchen, the room, and the city it sits in.
          </motion.p>
        </motion.div>
      </section>

      {/* ─── Opening pair — caption + portrait, no full-bleed hero ─── */}
      <section className="py-12 md:py-20">
        <div className="container grid grid-cols-12 gap-6 items-end">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease }}
            className="col-span-12 md:col-span-3 md:col-start-2 md:pb-10"
          >
            <p className="editorial-eyebrow">Plate · 01</p>
            <p className="font-display text-2xl md:text-3xl mt-3 italic text-foreground tracking-tight leading-snug">
              {images[0].caption}
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease, delay: 0.15 }}
            className="col-span-12 md:col-span-6 md:col-start-6"
          >
            <Photo src={images[0].src} alt={images[0].alt} className="aspect-[4/5]" intensity={0.18} />
          </motion.div>
        </div>
      </section>

      {/* ─── Drifting strip — three columns moving at different speeds ─── */}
      <section className="py-20 md:py-32 bg-background overflow-hidden">
        <div className="container grid grid-cols-12 gap-3 md:gap-6">
          <Photo
            src={images[2].src}
            alt={images[2].alt}
            caption={images[2].tag}
            className="col-span-4 aspect-[3/4]"
            intensity={0.25}
          />
          <Photo
            src={images[4].src}
            alt={images[4].alt}
            caption={images[4].tag}
            className="col-span-4 aspect-[3/4] mt-12 md:mt-24"
            intensity={-0.2}
          />
          <Photo
            src={images[5].src}
            alt={images[5].alt}
            caption={images[5].tag}
            className="col-span-4 aspect-[3/4] mt-4 md:mt-8"
            intensity={0.3}
          />
        </div>
      </section>

      {/* ─── Asymmetric pair w/ caption ─── */}
      <section className="py-16 md:py-24">
        <div className="container grid grid-cols-12 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1.2, ease }}
            className="col-span-12 md:col-span-7"
          >
            <Photo src={images[1].src} alt={images[1].alt} className="aspect-[4/3]" intensity={0.18} />
            <p className="mt-4 font-body text-xs uppercase tracking-[0.3em] text-muted-foreground">
              {images[1].caption}
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1.2, ease, delay: 0.2 }}
            className="col-span-12 md:col-span-4 md:col-start-9 md:mt-32"
          >
            <Photo src={images[7].src} alt={images[7].alt} className="aspect-[3/4]" intensity={-0.22} />
            <p className="mt-4 font-body text-xs uppercase tracking-[0.3em] text-muted-foreground">
              {images[7].caption}
            </p>
          </motion.div>
        </div>
      </section>

      {/* ─── Full-width landscape ─── */}
      <section className="py-12">
        <Photo
          src={images[8].src}
          alt={images[8].alt}
          className="h-[80vh] w-full"
          intensity={0.22}
        />
        <div className="container mt-6 flex justify-end">
          <p className="font-body text-xs uppercase tracking-[0.3em] text-muted-foreground max-w-xs text-right">
            {images[8].caption}
          </p>
        </div>
      </section>

      {/* ─── Triptych "From the kitchen" ─── */}
      <section className="py-20 md:py-32">
        <div className="container">
          <p className="editorial-eyebrow mb-8">From the kitchen</p>
          <div className="grid grid-cols-12 gap-3 md:gap-6">
            <Photo
              src={images[4].src}
              alt={images[4].alt}
              className="col-span-12 md:col-span-4 aspect-[3/4]"
              intensity={0.15}
            />
            <Photo
              src={images[5].src}
              alt={images[5].alt}
              className="col-span-12 md:col-span-4 aspect-[3/4] md:mt-16"
              intensity={-0.18}
            />
            <Photo
              src={images[6].src}
              alt={images[6].alt}
              className="col-span-12 md:col-span-4 aspect-[3/4]"
              intensity={0.2}
            />
          </div>
        </div>
      </section>

      {/* ─── Off-centre quiet image w/ side text ─── */}
      <section className="py-20 md:py-32 bg-clay/30">
        <div className="container grid grid-cols-12 gap-6 items-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease }}
            className="col-span-12 md:col-span-3 md:col-start-2"
          >
            <p className="editorial-eyebrow">No. 03</p>
            <h3 className="font-display text-4xl md:text-5xl mt-4 italic text-gold tracking-tight">
              {images[3].caption.split('—')[0]}
            </h3>
            <p className="mt-4 font-body font-light text-muted-foreground leading-relaxed">
              {images[3].caption}
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease, delay: 0.2 }}
            className="col-span-12 md:col-span-6 md:col-start-7"
          >
            <Photo src={images[3].src} alt={images[3].alt} className="aspect-[3/4]" intensity={0.2} />
          </motion.div>
        </div>
      </section>

      {/* ─── Marquee row of small thumbs ─── */}
      <section className="py-16 md:py-24 overflow-hidden">
        <div className="grid grid-cols-12 gap-3 md:gap-6">
          <Photo src={images[6].src} alt={images[6].alt} className="col-span-3 aspect-square" intensity={0.3} />
          <Photo src={images[9].src} alt={images[9].alt} className="col-span-3 aspect-square mt-8 md:mt-16" intensity={-0.25} />
          <Photo src={images[7].src} alt={images[7].alt} className="col-span-3 aspect-square" intensity={0.2} />
          <Photo src={images[2].src} alt={images[2].alt} className="col-span-3 aspect-square mt-4 md:mt-10" intensity={-0.3} />
        </div>
      </section>

      {/* ─── Closing full-bleed ─── */}
      <section className="relative h-[90vh] overflow-hidden bg-navy-deep">
        <Photo src={images[10].src} alt={images[10].alt} className="absolute inset-0 w-full h-full" intensity={0.28} />
        <div className="absolute inset-0 z-[1] bg-gradient-to-t from-navy-deep/50 via-transparent to-transparent" />
        <div className="container relative z-10 h-full flex items-end pb-12 md:pb-16">
          <p className="font-display text-2xl md:text-5xl text-beige-light italic max-w-xl tracking-tight">
            {images[10].caption}
          </p>
        </div>
      </section>
    </Layout>
  );
};

export default Gallery;
