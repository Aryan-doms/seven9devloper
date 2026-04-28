'use client'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function LeadForm({ projectName = 'General Enquiry', formAction = '' }) {
  const [status, setStatus] = useState('idle') // idle, loading, success, error
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    message: '',
    hp_field: '' // Honeypot field
  })
  const [touched, setTouched] = useState({
    name: false,
    phone: false
  })
  const [startTime] = useState(Date.now()) // Time-lock: record mount time

  // Validation checks
  const isNameValid = formData.name.trim().length >= 2
  const isPhoneValid = formData.phone.length === 10

  // The Entry IDs extracted from the image and verified
  const ENTRY_IDS = {
    name: '380551884',
    phone: '1389846949',
    message: '17075168',
    project: '156772390'
  }

  const GOOGLE_FORM_ACTION = formAction || 'https://docs.google.com/forms/u/0/d/e/1FAIpQLSfcm8mN598jEd2wCeBtsaMa5aRcjtQDQzhXmegICUL5A9G9rQ/formResponse'

  const handleSubmit = async (e) => {
    e.preventDefault()

    // Set all fields to touched on submit attempt
    setTouched({ name: true, phone: true })

    if (!isNameValid || !isPhoneValid) return

    // Anti-spam 1: Honeypot (if filled, it's a bot)
    if (formData.hp_field) {
      console.warn('Bot detected: Honeypot filled')
      setStatus('success') // Fake success to confuse the bot
      return
    }

    // Anti-spam 2: Time-lock (if submitted under 1000ms, it's likely a bot)
    if (Date.now() - startTime < 1000) {
      console.warn('Bot detected: Submitted too fast')
      setStatus('success') // Fake success
      return
    }

    setStatus('loading')

    // Final check for project name
    const finalProjectName = projectName || 'General Enquiry'

    // Prepare the form data for Google Forms
    const formDataBody = new URLSearchParams()
    formDataBody.append(`entry.${ENTRY_IDS.name}`, formData.name)
    formDataBody.append(`entry.${ENTRY_IDS.phone}`, formData.phone)
    formDataBody.append(`entry.${ENTRY_IDS.message}`, formData.message)
    formDataBody.append(`entry.${ENTRY_IDS.project}`, finalProjectName)

    try {
      await fetch(GOOGLE_FORM_ACTION, {
        method: 'POST',
        mode: 'no-cors',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: formDataBody.toString()
      })

      setStatus('success')
      setFormData({ name: '', phone: '', message: '', hp_field: '' })
      setTouched({ name: false, phone: false })
      setTimeout(() => setStatus('idle'), 5000)
    } catch (error) {
      console.error('Form submission error:', error)
      setStatus('error')
    }
  }

  return (
    <div className="w-full">
      <AnimatePresence mode="wait">
        {status === 'success' ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="bg-brand-clay/10 border border-brand-clay/20 p-8 rounded-sm text-center py-12"
          >
            <h3 className="text-brand-primary font-serif italic text-2xl mb-3">Thank You!</h3>
            <p className="text-brand-secondary text-sm font-light leading-relaxed">
              We have received your enquiry for <span className="font-semibold text-brand-primary">{projectName || 'General Enquiry'}</span>. <br /> Our team will get back to you shortly.
            </p>
            <button
              onClick={() => setStatus('idle')}
              className="mt-6 text-[10px] uppercase tracking-widest text-brand-primary font-semibold border-b border-brand-primary/20 pb-1 hover:border-brand-primary transition-colors"
            >
              Send another message
            </button>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onSubmit={handleSubmit}
            className="flex flex-col gap-5"
          >
            {/* Honeypot field (hidden from users) */}
            <div className="hidden" aria-hidden="true">
              <input
                type="text"
                name="hp_field"
                tabIndex="-1"
                autoComplete="off"
                value={formData.hp_field}
                onChange={(e) => setFormData({ ...formData, hp_field: e.target.value })}
              />
            </div>

            {/* Hidden field for Project Name */}
            <input
              type="hidden"
              name={`entry.${ENTRY_IDS.project}`}
              value={projectName || 'General Enquiry'}
            />

            <div className="flex flex-col gap-1">
              <input
                type="text"
                placeholder="Full Name"
                required
                disabled={status === 'loading'}
                value={formData.name}
                onBlur={() => setTouched({ ...touched, name: true })}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className={`w-full border ${touched.name && !isNameValid ? 'border-red-400' : 'border-brand-stone'} bg-white text-brand-primary placeholder:text-brand-secondary/50 text-sm font-light px-5 py-4 outline-none focus:border-brand-clay transition-colors duration-300 disabled:opacity-50`}
              />
              {touched.name && !isNameValid && (
                <p className="text-[10px] text-red-500 uppercase tracking-widest mt-1">Name is too short</p>
              )}
            </div>

            <div className="flex flex-col gap-1">
              <input
                type="tel"
                inputMode="tel"
                pattern="[0-9]*"
                maxLength={10}
                placeholder="Phone Number (10 digits)"
                required
                disabled={status === 'loading'}
                value={formData.phone}
                onBlur={() => setTouched({ ...touched, phone: true })}
                onChange={(e) => {
                  const val = e.target.value.replace(/\D/g, '').slice(0, 10)
                  setFormData({ ...formData, phone: val })
                }}
                className={`w-full border ${touched.phone && !isPhoneValid ? 'border-red-400' : 'border-brand-stone'} bg-white text-brand-primary placeholder:text-brand-secondary/50 text-sm font-light px-5 py-4 outline-none focus:border-brand-clay transition-colors duration-300 disabled:opacity-50`}
              />
              {touched.phone && !isPhoneValid && (
                <p className="text-[10px] text-red-500 uppercase tracking-widest mt-1">Please enter a valid 10-digit number</p>
              )}
            </div>

            <div className="flex flex-col gap-1">
              <textarea
                rows={3}
                placeholder="Message (optional)"
                disabled={status === 'loading'}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="w-full border border-brand-stone bg-white text-brand-primary placeholder:text-brand-secondary/50 text-sm font-light px-5 py-4 outline-none focus:border-brand-clay transition-colors duration-300 resize-none disabled:opacity-50"
              />
            </div>

            <button
              type="submit"
              disabled={status === 'loading' || formData.name.trim().length < 2 || formData.phone.length !== 10}
              className="w-full bg-brand-clay text-brand-primary uppercase tracking-[0.2em] text-xs font-semibold py-5 hover:bg-brand-stone transition-colors duration-300 shadow-sm disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
            >
              {status === 'loading' ? (
                <>
                  <span className="w-4 h-4 border-2 border-brand-primary/30 border-t-brand-primary rounded-full animate-spin"></span>
                  Processing...
                </>
              ) : 'Send Enquiry'}
            </button>

            {status === 'error' && (
              <p className="text-red-500 text-[10px] uppercase tracking-widest text-center mt-2">
                Something went wrong. Please try again.
              </p>
            )}
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  )
}
