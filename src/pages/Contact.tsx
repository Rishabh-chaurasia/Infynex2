import { useState, type FormEvent } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Mail, Phone, MapPin, Clock, MessageCircle, CheckCircle2, Loader2 } from 'lucide-react'
import AnimatedText from '../components/ui/AnimatedText'
import MagneticButton from '../components/ui/MagneticButton'
import { site } from '../data/site'
import { services } from '../data/services'
import { EASE, fadeUp } from '../utils/motion'
import usePageTitle from '../hooks/usePageTitle'

type Fields = { name: string; email: string; phone: string; company: string; service: string; message: string }
type Errors = Partial<Record<keyof Fields, string>>

const initial: Fields = { name: '', email: '', phone: '', company: '', service: '', message: '' }

function validate(f: Fields): Errors {
  const e: Errors = {}
  if (f.name.trim().length < 2) e.name = 'Please enter your name.'
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(f.email)) e.email = 'Please enter a valid email address.'
  if (f.phone && !/^[+\d][\d\s()-]{6,}$/.test(f.phone)) e.phone = 'Please enter a valid phone number.'
  if (f.message.trim().length < 10) e.message = 'Tell us a little more (at least 10 characters).'
  return e
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
  usePageTitle('Contact — Infynex Technologies')
  const [fields, setFields] = useState<Fields>(initial)
  const [errors, setErrors] = useState<Errors>({})
  const [status, setStatus] = useState<'idle' | 'loading' | 'success'>('idle')

  const set = (k: keyof Fields) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFields((f) => ({ ...f, [k]: e.target.value }))
    if (errors[k]) setErrors((er) => ({ ...er, [k]: undefined }))
  }

  const submit = async (e: FormEvent) => {
    e.preventDefault()
    const errs = validate(fields)
    setErrors(errs)
    if (Object.keys(errs).length) return
    setStatus('loading')
    // TODO: replace with a real request, e.g. fetch('/api/enquiry', { method: 'POST', body: JSON.stringify(fields) })
    await new Promise((r) => setTimeout(r, 1400))
    setStatus('success')
  }

  return (
    <>
      <section className="relative overflow-hidden bg-ivory-50">
        <div aria-hidden className="absolute inset-0 grid-lines" />
        <div className="contact-page-layout container-x relative grid gap-16 pb-20 pt-28 lg:grid-cols-[1fr_1.15fr] lg:gap-24 lg:pt-32">
          {/* Left */}
          <div>
            <motion.p initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3, duration: 0.8 }} className="eyebrow mb-6 flex items-center gap-3 text-teal-600">
              <span className="h-px w-10 bg-teal-500" /> Contact
            </motion.p>
            <h1 className="font-display text-4xl font-semibold leading-[1.04] text-navy-900 sm:text-[2.75rem] lg:text-5xl">
              <AnimatedText text="Helpful support" trigger="mount" delay={0.4} /><br />
              <span className="text-teal-600"><AnimatedText text="for your business." trigger="mount" delay={0.6} /></span>
            </h1>
            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.9, duration: 0.8, ease: EASE }} className="mt-6 max-w-md text-lg text-ink-600">
              Please share what you need. Our team will listen carefully and guide you through the next step.
            </motion.p>

            <motion.ul initial="hidden" animate="visible" variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.1, delayChildren: 1 } } }} className="mt-8 grid gap-x-6 gap-y-5 sm:grid-cols-2">
              {[
                { icon: Mail, label: 'Email', value: site.contact.email, href: `mailto:${site.contact.email}` },
                { icon: Phone, label: 'Phone', value: site.contact.phone, href: `tel:${site.contact.phone}` },
                { icon: MapPin, label: 'Address', value: site.contact.address },
                { icon: Clock, label: 'Hours', value: site.contact.hours },
              ].map(({ icon: Icon, label, value, href }) => (
                <motion.li key={label} variants={fadeUp} className={`flex items-start gap-3 ${label === 'Address' || label === 'Hours' ? 'sm:col-span-2' : ''}`}>
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-navy-900 text-white"><Icon className="h-4 w-4" /></span>
                  <span><span className="eyebrow block text-[0.6rem] text-ink-400">{label}</span>{href ? <a href={href} className="font-display font-semibold text-navy-900 hover:text-teal-600">{value}</a> : <span className="font-display font-semibold text-navy-900">{value}</span>}</span>
                </motion.li>
              ))}
            </motion.ul>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.5, duration: 0.8, ease: EASE }} className="mt-12 flex flex-wrap gap-4">
              <MagneticButton href={site.social.whatsapp} variant="dark" icon={false} className="!bg-[#25D366] hover:!bg-[#1eaa52]"><span className="flex items-center gap-2"><MessageCircle className="h-4 w-4" /> WhatsApp</span></MagneticButton>
              <MagneticButton href={site.social.linkedin} variant="ghost" className="!border-[#0A66C2] !bg-[#0A66C2] !text-white hover:!bg-[#084f96]">LinkedIn</MagneticButton>
            </motion.div>
          </div>

          {/* Form */}
          <motion.div initial={{ opacity: 0, y: 60, rotateX: 8 }} animate={{ opacity: 1, y: 0, rotateX: 0 }} transition={{ delay: 0.7, duration: 1.1, ease: EASE }} className="perspective">
            <div className="relative rounded-[2rem] border border-navy-800/10 bg-white p-8 shadow-[0_50px_120px_-50px_rgba(11,21,51,0.4)] md:p-12">
              <AnimatePresence mode="wait">
                {status === 'success' ? (
                  <motion.div key="ok" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6, ease: EASE }} className="flex min-h-[28rem] flex-col items-center justify-center text-center">
                    <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', stiffness: 200, damping: 12, delay: 0.2 }} className="flex h-20 w-20 items-center justify-center rounded-full bg-teal-500 text-white"><CheckCircle2 className="h-10 w-10" /></motion.span>
                    <h2 className="mt-8 font-display text-3xl font-semibold text-navy-900">Enquiry received</h2>
                    <p className="mt-3 max-w-sm text-ink-600">Thank you, {fields.name.split(' ')[0]}. We will be in touch at {fields.email}.</p>
                    <button onClick={() => { setFields(initial); setStatus('idle') }} className="mt-8 font-display text-sm font-semibold text-teal-600">Send another enquiry</button>
                  </motion.div>
                ) : (
                  <motion.form key="form" onSubmit={submit} noValidate initial="hidden" animate="visible" variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.08, delayChildren: 1 } } }} className="space-y-2">
                    <motion.p variants={fadeUp} className="eyebrow text-teal-600">Send an enquiry</motion.p>
                    <div className="grid gap-x-8 md:grid-cols-2">
                      <Field id="name" label="Name" fields={fields} errors={errors} set={set} />
                      <Field id="email" label="Email" type="email" fields={fields} errors={errors} set={set} />
                      <Field id="phone" label="Phone" type="tel" fields={fields} errors={errors} set={set} />
                      <Field id="company" label="Company" fields={fields} errors={errors} set={set} />
                    </div>
                    <motion.div variants={fadeUp} className="field">
                      <select id="service" value={fields.service} onChange={set('service')} className="w-full border-0 border-b border-navy-800/20 bg-transparent py-3 pt-6 text-navy-900 outline-none focus:border-teal-500">
                        <option value="">Service of interest (optional)</option>
                        {services.map((s) => <option key={s.slug} value={s.slug}>{s.title}</option>)}
                      </select>
                    </motion.div>
                    <Field id="message" label="Message" textarea fields={fields} errors={errors} set={set} />
                    <motion.div variants={fadeUp} className="pt-6">
                      <MagneticButton type="submit" disabled={status === 'loading'} className="w-full md:w-auto" icon={status !== 'loading'}>
                        {status === 'loading' ? <span className="flex items-center gap-2"><Loader2 className="h-4 w-4 animate-spin" /> Sending…</span> : 'Send Enquiry'}
                      </MagneticButton>
                    </motion.div>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </section>

    </>
  )
}

interface FieldProps {
  id: keyof Fields
  label: string
  type?: string
  textarea?: boolean
  fields: Fields
  errors: Errors
  set: (k: keyof Fields) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void
}

/** Floating-label field with animated underline and inline validation. Defined at module level so inputs keep focus across renders. */
function Field({ id, label, type = 'text', textarea = false, fields, errors, set }: FieldProps) {
  return (
    <motion.div variants={fadeUp} className={`field ${errors[id] ? 'error' : ''}`}>
      {textarea ? (
        <textarea id={id} rows={4} placeholder=" " value={fields[id]} onChange={set(id)} aria-invalid={!!errors[id]} aria-describedby={errors[id] ? `${id}-err` : undefined} />
      ) : (
        <input id={id} type={type} placeholder=" " value={fields[id]} onChange={set(id)} aria-invalid={!!errors[id]} aria-describedby={errors[id] ? `${id}-err` : undefined} />
      )}
      <label htmlFor={id}>{label}</label>
      <span className="bar" />
      <AnimatePresence>
        {errors[id] && (
          <motion.p id={`${id}-err`} initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="mt-2 text-xs text-red-600">{errors[id]}</motion.p>
        )}
      </AnimatePresence>
    </motion.div>
  )
}
