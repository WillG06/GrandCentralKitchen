import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Calendar, Clock, Users, Phone, Mail, User, Check, ArrowLeft } from "lucide-react";
import Layout from "@/components/Layout";
import interior from "@/assets/interior.jpg";

const ease = [0.22, 1, 0.36, 1] as const;

const TIMES = [
  "07:30", "08:00", "08:30", "09:00", "09:30", "10:00", "10:30", "11:00",
  "11:30", "12:00", "12:30", "13:00", "13:30", "14:00", "14:30", "15:00",
];

interface FormState {
  name: string;
  email: string;
  phone: string;
  date: string;
  time: string;
  guests: string;
  occasion: string;
  notes: string;
}

const empty: FormState = {
  name: "",
  email: "",
  phone: "",
  date: "",
  time: "",
  guests: "2",
  occasion: "",
  notes: "",
};

const today = () => {
  const d = new Date();
  return d.toISOString().split("T")[0];
};

const Reserve = () => {
  const [form, setForm] = useState<FormState>(empty);
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const set = <K extends keyof FormState>(k: K, v: FormState[K]) => {
    setForm((f) => ({ ...f, [k]: v }));
    setErrors((e) => ({ ...e, [k]: undefined }));
  };

  const validate = () => {
    const e: Partial<Record<keyof FormState, string>> = {};
    if (!form.name.trim()) e.name = "Please tell us your name.";
    if (!form.email.trim() || !/^\S+@\S+\.\S+$/.test(form.email)) e.email = "A valid email, please.";
    if (!form.phone.trim() || form.phone.replace(/\D/g, "").length < 7) e.phone = "A contact number, please.";
    if (!form.date) e.date = "Pick a date.";
    else if (form.date < today()) e.date = "Date must be today or later.";
    if (!form.time) e.time = "Pick a time.";
    const g = parseInt(form.guests, 10);
    if (!g || g < 1 || g > 20) e.guests = "Between 1 and 20 guests.";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const onSubmit = async (ev: React.FormEvent) => {
    ev.preventDefault();
    if (!validate()) return;
    setSubmitting(true);
    // Mock async — would be a real backend call in production
    await new Promise((r) => setTimeout(r, 900));
    setSubmitting(false);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <Layout>
        <section className="min-h-[80vh] flex items-center pt-32 pb-24">
          <div className="container grid grid-cols-12 gap-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease }}
              className="col-span-12 md:col-span-8 md:col-start-3 text-center"
            >
              <div className="mx-auto w-16 h-16 border border-gold/50 rounded-full flex items-center justify-center">
                <Check className="text-gold" size={28} strokeWidth={1.25} />
              </div>
              <p className="editorial-eyebrow mt-8 text-gold">Confirmed</p>
              <h1 className="font-display text-5xl md:text-7xl mt-4 leading-[0.95]">
                A table is held for
                <br />
                <span className="italic text-gold">{form.name.split(" ")[0]}.</span>
              </h1>
              <p className="mt-8 font-body font-light text-lg text-muted-foreground max-w-lg mx-auto leading-relaxed">
                We've sent a confirmation to{" "}
                <span className="text-foreground">{form.email}</span>. We'll see
                you on{" "}
                <span className="text-foreground">
                  {new Date(form.date).toLocaleDateString("en-GB", {
                    weekday: "long",
                    day: "numeric",
                    month: "long",
                  })}
                </span>{" "}
                at <span className="text-foreground">{form.time}</span> for{" "}
                <span className="text-foreground">{form.guests} {parseInt(form.guests) === 1 ? "guest" : "guests"}</span>.
              </p>

              <div className="mt-12 inline-flex items-center gap-8">
                <Link
                  to="/"
                  className="group inline-flex items-center gap-3 font-body text-xs uppercase tracking-[0.3em] hover:text-gold transition-colors duration-500"
                >
                  <ArrowLeft size={14} className="transition-transform duration-500 group-hover:-translate-x-1" />
                  Back home
                </Link>
                <Link
                  to="/menu"
                  className="font-body text-xs uppercase tracking-[0.3em] text-muted-foreground hover:text-foreground transition-colors duration-500"
                >
                  See the menu
                </Link>
              </div>
            </motion.div>
          </div>
        </section>
      </Layout>
    );
  }

  return (
    <Layout>
      {/* Hero header */}
      <section className="pt-32 md:pt-40 pb-12 md:pb-20">
        <div className="container grid grid-cols-12 gap-6">
          <div className="col-span-12 md:col-span-2">
            <p className="editorial-eyebrow">Reserve</p>
          </div>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease }}
            className="col-span-12 md:col-span-9 md:col-start-3 font-display text-[14vw] md:text-[7.5vw] leading-[0.92] tracking-tight"
          >
            Hold a
            <br />
            <span className="italic text-gold">table.</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="col-span-12 md:col-span-5 md:col-start-3 mt-8 font-body font-light text-muted-foreground leading-relaxed max-w-md"
          >
            Walk-ins are always welcome — but for weekend mornings, parties of
            four or more, or the day before a big match, a quiet word ahead
            helps.
          </motion.p>
        </div>
      </section>

      {/* Form + side image */}
      <section className="pb-32 md:pb-44">
        <div className="container grid grid-cols-12 gap-6 md:gap-12">
          {/* Side image — hidden on small screens */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease }}
            className="hidden md:block col-span-5 sticky top-32 self-start"
          >
            <div className="aspect-[4/5] overflow-hidden">
              <img src={interior} alt="A table by the window" className="h-full w-full object-cover" />
            </div>
            <div className="mt-8 border-t border-border pt-6 space-y-4 font-body text-sm text-muted-foreground">
              <p>
                <span className="block editorial-eyebrow mb-1">Address</span>
                7 Stephenson Street, Birmingham B2 4BL
              </p>
              <p>
                <span className="block editorial-eyebrow mb-1">Open</span>
                Mon–Fri 7–4 · Sat 8–4 · Sun 9–3
              </p>
              <p>
                <span className="block editorial-eyebrow mb-1">Or call</span>
                <a href="tel:01216333883" className="text-foreground hover:text-gold transition-colors">0121 633 3883</a>
              </p>
            </div>
          </motion.div>

          {/* The form */}
          <motion.form
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease, delay: 0.15 }}
            onSubmit={onSubmit}
            noValidate
            className="col-span-12 md:col-span-7"
          >
            {/* Group: Date / time / guests */}
            <fieldset className="border-t border-border pt-8">
              <legend className="editorial-eyebrow mb-6">When</legend>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                <Field label="Date" icon={<Calendar size={14} />} error={errors.date}>
                  <input
                    type="date"
                    min={today()}
                    value={form.date}
                    onChange={(e) => set("date", e.target.value)}
                    className="bare-input"
                  />
                </Field>
                <Field label="Time" icon={<Clock size={14} />} error={errors.time}>
                  <select value={form.time} onChange={(e) => set("time", e.target.value)} className="bare-input">
                    <option value="">Select</option>
                    {TIMES.map((t) => (
                      <option key={t} value={t}>{t}</option>
                    ))}
                  </select>
                </Field>
                <Field label="Guests" icon={<Users size={14} />} error={errors.guests}>
                  <select value={form.guests} onChange={(e) => set("guests", e.target.value)} className="bare-input">
                    {Array.from({ length: 12 }, (_, i) => i + 1).map((n) => (
                      <option key={n} value={n}>{n} {n === 1 ? "guest" : "guests"}</option>
                    ))}
                    <option value="14">Larger party (14+)</option>
                  </select>
                </Field>
              </div>
            </fieldset>

            {/* Group: Contact */}
            <fieldset className="border-t border-border pt-8 mt-12">
              <legend className="editorial-eyebrow mb-6">You</legend>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <Field label="Full name" icon={<User size={14} />} error={errors.name} className="sm:col-span-2">
                  <input
                    type="text"
                    autoComplete="name"
                    value={form.name}
                    onChange={(e) => set("name", e.target.value)}
                    className="bare-input"
                    placeholder="Jane Doe"
                  />
                </Field>
                <Field label="Email" icon={<Mail size={14} />} error={errors.email}>
                  <input
                    type="email"
                    autoComplete="email"
                    value={form.email}
                    onChange={(e) => set("email", e.target.value)}
                    className="bare-input"
                    placeholder="jane@email.com"
                  />
                </Field>
                <Field label="Phone" icon={<Phone size={14} />} error={errors.phone}>
                  <input
                    type="tel"
                    autoComplete="tel"
                    value={form.phone}
                    onChange={(e) => set("phone", e.target.value)}
                    className="bare-input"
                    placeholder="07…"
                  />
                </Field>
              </div>
            </fieldset>

            {/* Group: Optional */}
            <fieldset className="border-t border-border pt-8 mt-12">
              <legend className="editorial-eyebrow mb-6">Anything else</legend>
              <div className="grid grid-cols-1 gap-6">
                <Field label="Occasion (optional)">
                  <select value={form.occasion} onChange={(e) => set("occasion", e.target.value)} className="bare-input">
                    <option value="">—</option>
                    <option>Birthday</option>
                    <option>Anniversary</option>
                    <option>Business</option>
                    <option>Just hungry</option>
                  </select>
                </Field>
                <Field label="Notes (allergies, high chair, window seat…)">
                  <textarea
                    rows={3}
                    value={form.notes}
                    onChange={(e) => set("notes", e.target.value)}
                    className="bare-input resize-none"
                  />
                </Field>
              </div>
            </fieldset>

            <div className="mt-12 flex flex-col sm:flex-row sm:items-center gap-6 sm:gap-10">
              <button
                type="submit"
                disabled={submitting}
                className="group inline-flex items-center justify-center gap-3 bg-navy text-beige-light px-10 py-5 font-body text-xs uppercase tracking-[0.3em] hover:bg-navy-deep transition-colors duration-500 disabled:opacity-60"
              >
                {submitting ? "Holding the table…" : "Confirm reservation"}
                <span className="h-px w-6 bg-current transition-all duration-500 group-hover:w-12" />
              </button>
              <p className="font-body text-xs text-muted-foreground max-w-xs leading-relaxed">
                We'll confirm by email within the hour. No card required.
              </p>
            </div>
          </motion.form>
        </div>
      </section>
    </Layout>
  );
};

interface FieldProps {
  label: string;
  icon?: React.ReactNode;
  error?: string;
  className?: string;
  children: React.ReactNode;
}
const Field = ({ label, icon, error, className = "", children }: FieldProps) => (
  <label className={`block ${className}`}>
    <span className="flex items-center gap-2 editorial-eyebrow mb-3">
      {icon && <span className="text-gold">{icon}</span>}
      {label}
    </span>
    {children}
    {error && (
      <span className="block mt-2 font-body text-[11px] uppercase tracking-[0.2em] text-destructive">
        {error}
      </span>
    )}
    <style>{`
      .bare-input {
        width: 100%;
        background: transparent;
        border: 0;
        border-bottom: 1px solid hsl(var(--border));
        padding: 0.5rem 0;
        font-family: 'Jost', sans-serif;
        font-weight: 300;
        font-size: 1.05rem;
        color: hsl(var(--foreground));
        outline: none;
        transition: border-color 0.5s cubic-bezier(0.22,1,0.36,1);
      }
      .bare-input:focus { border-color: hsl(var(--gold)); }
      .bare-input::placeholder { color: hsl(var(--muted-foreground) / 0.6); }
    `}</style>
  </label>
);

export default Reserve;
