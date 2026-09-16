import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Target, ShieldCheck, CheckCircle2, Loader2 } from 'lucide-react';
import AnimatedText from '../components/ui/AnimatedText';
import MagneticButton from '../components/ui/MagneticButton';
import { site } from '../data/site';
import { services } from '../data/services';
import { EASE, fadeUp } from '../utils/motion';
import usePageTitle from '../hooks/usePageTitle';
const initial = { name: '', email: '', phone: '', company: '', service: '', message: '' };
function validate(f) {
    const e = {};
    if (f.name.trim().length < 2)
        e.name = 'Please enter your name.';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(f.email))
        e.email = 'Please enter a valid email address.';
    if (f.phone && !/^[+\d][\d\s()-]{6,}$/.test(f.phone))
        e.phone = 'Please enter a valid phone number.';
    if (f.message.trim().length < 10)
        e.message = 'Tell us a little more (at least 10 characters).';
    return e;
}
/**
 * Contact — premium split layout. Left: contact details, WhatsApp / LinkedIn
 * and a network visual; right: an animated form with floating labels,
 * validation, loading and success states.
 *
 * Submission: currently simulated. Wire `submit()` to your backend / email
 * service (e.g. a form endpoint) to send real enquiries.
 */
export default function Contact() {
    usePageTitle('Contact — Infynex Technologies');
    const [fields, setFields] = useState(initial);
    const [errors, setErrors] = useState({});
    const [status, setStatus] = useState('idle');
    const set = (k) => (e) => {
        setFields((f) => ({ ...f, [k]: e.target.value }));
        if (errors[k])
            setErrors((er) => ({ ...er, [k]: undefined }));
    };
    const submit = async (e) => {
        e.preventDefault();
        const errs = validate(fields);
        setErrors(errs);
        if (Object.keys(errs).length)
            return;
        setStatus('loading');
        // TODO: replace with a real request, e.g. fetch('/api/enquiry', { method: 'POST', body: JSON.stringify(fields) })
        await new Promise((r) => setTimeout(r, 1400));
        setStatus('success');
    };
    return (<>
      <section className="relative overflow-hidden bg-ivory-50">
        <div aria-hidden className="absolute inset-0 grid-lines"/>
        <div className="contact-page-layout container-x relative grid gap-16 pb-20 pt-28 lg:grid-cols-[1fr_1.15fr] lg:gap-24 lg:pt-32">
          {/* Left */}
          <div>
            <motion.p initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3, duration: 0.8 }} className="eyebrow mb-6 flex items-center gap-3 text-teal-600">
              <span className="h-px w-10 bg-teal-500"/> Contact
            </motion.p>
            <h1 className="contact-page-title font-display text-4xl font-semibold leading-[1.04] text-navy-900 sm:text-[2.75rem] lg:text-5xl">
              <AnimatedText text="Helpful Support" trigger="mount" delay={0.4}/><br />
              <span className="text-teal-600"><AnimatedText text="For Your Business." trigger="mount" delay={0.6}/></span>
            </h1>
            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.9, duration: 0.8, ease: EASE }} className="mt-6 max-w-md text-lg text-ink-600">
              Please share what you need. Our team will listen carefully and guide you through the next step.
            </motion.p>

            <motion.div initial="hidden" animate="visible" variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.12, delayChildren: 1 } } }} className="contact-principles mt-8 grid max-w-lg gap-3">
              {[
            {
                icon: Target,
                label: 'Our Mission',
                text: 'Simplifying business through reliable technology, infrastructure, and managed services.',
            },
            {
                icon: ShieldCheck,
                label: 'Our Values',
                text: 'Integrity, responsiveness, and measurable quality define every engagement and lasting partnership.',
            },
        ].map(({ icon: Icon, label, text }) => (<motion.article key={label} variants={fadeUp} className="flex items-start gap-3 rounded-2xl border border-navy-800/10 bg-white/80 p-4 shadow-[0_14px_38px_-28px_rgba(11,21,51,.35)] backdrop-blur-sm">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-navy-900 text-white"><Icon className="h-4 w-4"/></span>
                  <div>
                    <h2 className="font-display text-base font-semibold text-navy-900">{label}</h2>
                    <p className="mt-1 text-sm leading-snug text-ink-600">{text}</p>
                  </div>
                </motion.article>))}
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.5, duration: 0.8, ease: EASE }} className="contact-social-actions mt-8 flex flex-wrap gap-3">
              <a href={site.social.whatsapp} target="_blank" rel="noreferrer" aria-label="Contact Infynex on WhatsApp" title="WhatsApp" className="group grid h-12 w-12 place-items-center rounded-full bg-[#25D366] text-white shadow-[0_12px_28px_-12px_rgba(37,211,102,.8)] transition duration-300 hover:-translate-y-1 hover:bg-[#1eaa52]">
                <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="h-5 w-5"><path d="M20.52 3.48A11.87 11.87 0 0 0 12.04 0C5.46 0 .1 5.35.1 11.93c0 2.1.55 4.16 1.6 5.98L0 24l6.25-1.64a11.92 11.92 0 0 0 5.78 1.47h.01c6.58 0 11.93-5.35 11.96-11.94a11.86 11.86 0 0 0-3.48-8.41ZM12.04 21.8a9.9 9.9 0 0 1-5.05-1.38l-.36-.22-3.75.99 1-3.66-.24-.38a9.85 9.85 0 0 1-1.51-5.22c0-5.47 4.45-9.92 9.93-9.92a9.87 9.87 0 0 1 7.02 2.91 9.87 9.87 0 0 1 2.9 7.03c-.02 5.47-4.47 9.85-9.94 9.85Zm5.44-7.4c-.3-.15-1.77-.87-2.04-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.23-.65.08-.3-.15-1.26-.46-2.4-1.47-.89-.79-1.49-1.77-1.66-2.07-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.18.2-.3.3-.5.1-.2.05-.38-.03-.53-.07-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.08-.79.38-.27.3-1.04 1.02-1.04 2.49s1.07 2.89 1.22 3.09c.15.2 2.1 3.2 5.09 4.49.71.31 1.27.49 1.7.63.71.23 1.35.2 1.86.12.57-.08 1.77-.72 2.02-1.42.25-.7.25-1.3.17-1.42-.07-.13-.27-.2-.57-.35Z"/></svg>
              </a>
              <a href={site.social.linkedin} target="_blank" rel="noreferrer" aria-label="Visit Infynex on LinkedIn" title="LinkedIn" className="group grid h-12 w-12 place-items-center rounded-full bg-[#0A66C2] text-white shadow-[0_12px_28px_-12px_rgba(10,102,194,.8)] transition duration-300 hover:-translate-y-1 hover:bg-[#084f96]">
                <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="h-5 w-5"><path d="M20.45 2H3.55C2.69 2 2 2.68 2 3.52v16.96c0 .84.69 1.52 1.55 1.52h16.9c.86 0 1.55-.68 1.55-1.52V3.52c0-.84-.69-1.52-1.55-1.52ZM7.93 18.75H4.98V9.2h2.95v9.55ZM6.45 7.9a1.71 1.71 0 1 1 0-3.42 1.71 1.71 0 0 1 0 3.42Zm12.3 10.85H15.8V14.1c0-1.11-.02-2.54-1.55-2.54-1.55 0-1.79 1.21-1.79 2.46v4.73H9.51V9.2h2.83v1.3h.04c.39-.74 1.36-1.53 2.79-1.53 2.99 0 3.58 1.97 3.58 4.54v5.24Z"/></svg>
              </a>
            </motion.div>
          </div>

          {/* Form */}
          <motion.div initial={{ opacity: 0, y: 60, rotateX: 8 }} animate={{ opacity: 1, y: 0, rotateX: 0 }} transition={{ delay: 0.7, duration: 1.1, ease: EASE }} className="perspective">
            <div className="contact-form-panel relative rounded-[2rem] border border-navy-800/10 bg-white p-8 shadow-[0_50px_120px_-50px_rgba(11,21,51,0.4)] md:p-12">
              <AnimatePresence mode="wait">
                {status === 'success' ? (<motion.div key="ok" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6, ease: EASE }} className="flex min-h-[28rem] flex-col items-center justify-center text-center">
                    <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', stiffness: 200, damping: 12, delay: 0.2 }} className="flex h-20 w-20 items-center justify-center rounded-full bg-teal-500 text-white"><CheckCircle2 className="h-10 w-10"/></motion.span>
                    <h2 className="mt-8 font-display text-3xl font-semibold text-navy-900">Enquiry received</h2>
                    <p className="mt-3 max-w-sm text-ink-600">Thank you, {fields.name.split(' ')[0]}. We will be in touch at {fields.email}.</p>
                    <button onClick={() => { setFields(initial); setStatus('idle'); }} className="mt-8 font-display text-sm font-semibold text-teal-600">Send another enquiry</button>
                  </motion.div>) : (<motion.form key="form" onSubmit={submit} noValidate initial="hidden" animate="visible" variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.08, delayChildren: 1 } } }} className="space-y-2">
                    <motion.p variants={fadeUp} className="eyebrow text-teal-600">Send an enquiry</motion.p>
                    <div className="grid gap-x-8 md:grid-cols-2">
                      <Field id="name" label="Name" fields={fields} errors={errors} set={set}/>
                      <Field id="email" label="Email" type="email" fields={fields} errors={errors} set={set}/>
                      <Field id="phone" label="Phone" type="tel" fields={fields} errors={errors} set={set}/>
                      <Field id="company" label="Company" fields={fields} errors={errors} set={set}/>
                    </div>
                    <motion.div variants={fadeUp} className="field">
                      <select id="service" value={fields.service} onChange={set('service')} className="w-full border-0 border-b border-navy-800/20 bg-transparent py-3 pt-6 text-navy-900 outline-none focus:border-teal-500">
                        <option value="">Service of interest (optional)</option>
                        {services.map((s) => <option key={s.slug} value={s.slug}>{s.title}</option>)}
                      </select>
                    </motion.div>
                    <Field id="message" label="Message" textarea fields={fields} errors={errors} set={set}/>
                    <motion.div variants={fadeUp} className="pt-6">
                      <MagneticButton type="submit" disabled={status === 'loading'} className="w-full md:w-auto" icon={status !== 'loading'}>
                        {status === 'loading' ? <span className="flex items-center gap-2"><Loader2 className="h-4 w-4 animate-spin"/> Sending…</span> : 'Send Enquiry'}
                      </MagneticButton>
                    </motion.div>
                  </motion.form>)}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </section>

    </>);
}
/** Floating-label field with animated underline and inline validation. Defined at module level so inputs keep focus across renders. */
function Field({ id, label, type = 'text', textarea = false, fields, errors, set }) {
    return (<motion.div variants={fadeUp} className={`field ${errors[id] ? 'error' : ''}`}>
      {textarea ? (<textarea id={id} rows={4} placeholder=" " value={fields[id]} onChange={set(id)} aria-invalid={!!errors[id]} aria-describedby={errors[id] ? `${id}-err` : undefined}/>) : (<input id={id} type={type} placeholder=" " value={fields[id]} onChange={set(id)} aria-invalid={!!errors[id]} aria-describedby={errors[id] ? `${id}-err` : undefined}/>)}
      <label htmlFor={id}>{label}</label>
      <span className="bar"/>
      <AnimatePresence>
        {errors[id] && (<motion.p id={`${id}-err`} initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="mt-2 text-xs text-red-600">{errors[id]}</motion.p>)}
      </AnimatePresence>
    </motion.div>);
}
