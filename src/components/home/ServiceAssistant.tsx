import { useState, type FormEvent } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Bot, MessageCircle, Send, X } from 'lucide-react'
import { Link } from 'react-router-dom'
import { site } from '../../data/site'

const suggestions = ['IT support', 'AMC', 'Solar', 'Talk to the team']

function answerFor(query: string) {
  const value = query.toLowerCase()
  if (value.includes('solar') || value.includes('esg')) return 'We provide site surveys, solar system design, installation and ongoing maintenance.'
  if (value.includes('amc') || value.includes('maintenance')) return 'Our AMC service covers regular checks, preventive maintenance, repairs and clear service reports.'
  if (value.includes('support') || value.includes('helpdesk') || value.includes('it')) return 'We provide remote helpdesk support and on-site engineers for IT issues, installations and repairs.'
  if (value.includes('hardware')) return 'We help select, supply, install, upgrade and repair computers, servers and network equipment.'
  if (value.includes('duct') || value.includes('robot')) return 'Our camera-guided robots inspect and clean HVAC ducts with clear before-and-after documentation.'
  if (value.includes('cloud')) return 'We can set up, migrate and manage cloud servers, data, access and backups.'
  if (value.includes('vehicle') || value.includes('transport') || value.includes('fleet')) return 'We help companies procure the number and type of new vehicles they need, with clear pricing, delivery and ongoing support.'
  if (value.includes('tele') || value.includes('call')) return 'Our trained team can manage customer calls, follow-ups and agreed communication processes.'
  if (value.includes('contact') || value.includes('team') || value.includes('price') || value.includes('quote')) return `You can call us at ${site.contact.phone}, WhatsApp us, or send an enquiry from the contact page.`
  return 'We can help with AMC, hardware, IT infrastructure, cloud, technical support, tele services, robotic duct cleaning, ESG and vehicle services. Please choose a service or ask your question.'
}

export default function ServiceAssistant() {
  const [open, setOpen] = useState(false)
  const [input, setInput] = useState('')
  const [messages, setMessages] = useState<string[]>(['Hello. We are here to help with your business services.'])

  const ask = (question: string) => {
    if (!question.trim()) return
    setMessages((current) => [...current, question, answerFor(question)])
    setInput('')
  }

  const submit = (event: FormEvent) => {
    event.preventDefault()
    ask(input)
  }

  return (
    <div className="service-assistant fixed bottom-3 right-3 z-[70] sm:bottom-7 sm:right-7">
      <AnimatePresence>
        {open && (
          <motion.div initial={{ opacity: 0, y: 20, scale: .96 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 15, scale: .96 }} className="mb-3 flex h-[32rem] max-h-[calc(100dvh-5.5rem)] w-[calc(100vw-1.5rem)] flex-col overflow-hidden rounded-2xl border border-white/15 sm:rounded-3xl bg-navy-950 text-white shadow-[0_24px_80px_rgba(4,14,37,.38)] sm:w-96">
            <div className="flex items-center gap-3 bg-gradient-to-r from-teal-600 to-[#4777e8] px-5 py-4">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white/15"><Bot className="h-5 w-5" /></span>
              <div className="min-w-0 flex-1"><p className="font-display font-semibold">Infynex Service Assistant</p><p className="flex items-center gap-1.5 text-xs text-white/80"><span className="h-2 w-2 rounded-full bg-emerald-300" />Online and ready to help</p></div>
              <button onClick={() => setOpen(false)} aria-label="Close service assistant" className="rounded-full p-2 hover:bg-white/15"><X className="h-5 w-5" /></button>
            </div>
            <div className="flex-1 space-y-3 overflow-y-auto p-4">
              {messages.map((message, index) => <div key={`${message}-${index}`} className={`max-w-[88%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${index % 2 ? 'ml-auto bg-teal-500 text-white' : 'bg-white/10 text-white/85'}`}>{message}</div>)}
            </div>
            <div className="flex flex-wrap gap-2 px-4 pb-3">{suggestions.map((item) => <button key={item} onClick={() => ask(item)} className="rounded-full border border-white/15 px-3 py-1.5 text-xs hover:border-teal-400 hover:text-teal-300">{item}</button>)}</div>
            <div className="flex items-center justify-between border-t border-white/10 px-4 py-3 text-xs"><Link to="/contact" className="text-teal-300 hover:text-white">Contact page</Link><a href={site.social.whatsapp} target="_blank" rel="noreferrer" className="font-semibold text-[#55e987]">WhatsApp</a></div>
            <form onSubmit={submit} className="flex gap-2 border-t border-white/10 p-3"><input value={input} onChange={(e) => setInput(e.target.value)} aria-label="Ask about our services" placeholder="Ask about a service..." className="min-w-0 flex-1 rounded-full bg-white/10 px-4 py-3 text-sm outline-none placeholder:text-white/45 focus:ring-2 focus:ring-teal-400" /><button aria-label="Send question" className="flex h-11 w-11 items-center justify-center rounded-full bg-teal-500 hover:bg-teal-400"><Send className="h-4 w-4" /></button></form>
          </motion.div>
        )}
      </AnimatePresence>
      <motion.button onClick={() => setOpen((value) => !value)} whileHover={{ scale: 1.035, y: -2 }} whileTap={{ scale: .97 }} aria-label="Open Infynex service assistant" className="group relative ml-auto flex h-11 items-center sm:h-16 gap-3 overflow-visible rounded-full bg-gradient-to-br from-teal-500 via-sky-500 to-[#486ee8] px-1 text-white shadow-[0_16px_42px_rgba(26,157,195,.42)] sm:px-4">
        <span aria-hidden className="absolute inset-0 -z-10 animate-ping rounded-full bg-sky-400/25 [animation-duration:2.4s]" />
        <span className="relative flex h-9 w-9 items-center justify-center rounded-full border border-white/25 bg-white/15 shadow-inner backdrop-blur-sm sm:h-11 sm:w-11"><MessageCircle className="h-5 w-5 transition-transform duration-300 group-hover:rotate-[-8deg] sm:h-6 sm:w-6" /><span className="absolute -right-0.5 -top-0.5 h-3 w-3 rounded-full border-2 border-sky-500 bg-emerald-300" /></span>
        <span className="hidden pr-2 text-left leading-tight sm:block"><span className="block font-display text-sm font-semibold">Ask Infynex</span><span className="mt-1 block text-[11px] text-white/75">Quick service help</span></span>
      </motion.button>
    </div>
  )
}
