'use client'

import { useState, useMemo } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { motion } from 'framer-motion'
import { useReducedMotion } from 'framer-motion'
import { useTranslations } from 'next-intl'
import { useLocale } from 'next-intl'
import SectionWrapper from '@/components/ui/SectionWrapper'
import SectionHeader from '@/components/ui/SectionHeader'
import Button from '@/components/ui/Button'

type Status = 'idle' | 'loading' | 'success' | 'error'

const INPUT_CLASSES =
  'w-full rounded-xl border border-border bg-surface px-4 py-3 text-[15px] text-text-primary placeholder:text-text-muted transition-colors duration-200 focus-visible:border-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/30 aria-[invalid=true]:border-red-500'

export default function Contact() {
  const t = useTranslations('contact')
  const locale = useLocale()
  const [status, setStatus] = useState<Status>('idle')
  const prefersReduced = useReducedMotion()

  const schema = useMemo(
    () =>
      z.object({
        name: z.string().min(2, { message: t('nameError') }),
        email: z.string().email({ message: t('emailError') }),
        message: z.string().min(10, { message: t('messageError') }),
      }),
    [t],
  )

  type FormData = z.infer<typeof schema>

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) })

  async function onSubmit(data: FormData) {
    setStatus('loading')
    const webhookUrl = process.env.NEXT_PUBLIC_N8N_WEBHOOK_URL
    if (!webhookUrl) {
      setStatus('error')
      return
    }
    try {
      const res = await fetch(webhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...data, locale, timestamp: new Date().toISOString() }),
      })
      if (!res.ok) throw new Error('Network error')
      setStatus('success')
      reset()
    } catch {
      setStatus('error')
    }
  }

  return (
    <SectionWrapper id="contact">
      <div className="mx-auto max-w-2xl">
        <SectionHeader id="contact" title={t('title')} subtitle={t('subtitle')} />

        {status === 'success' ? (
          <motion.p
            initial={prefersReduced ? undefined : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            role="status"
            className="rounded-2xl border border-accent/30 bg-accent/10 p-8 text-center text-[16px] leading-[1.7] text-text-primary"
          >
            {t('success')}
          </motion.p>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)} noValidate className="flex flex-col gap-5">
            {/* Name */}
            <div>
              <label htmlFor="contact-name" className="mb-2 block text-[14px] font-medium text-text-primary">
                {t('name')}
              </label>
              <input
                id="contact-name"
                type="text"
                placeholder={t('namePlaceholder')}
                aria-invalid={errors.name ? 'true' : 'false'}
                aria-describedby={errors.name ? 'contact-name-error' : undefined}
                {...register('name')}
                className={INPUT_CLASSES}
              />
              {errors.name && (
                <p id="contact-name-error" role="alert" className="mt-1.5 text-[13px] text-red-500">
                  {errors.name.message}
                </p>
              )}
            </div>

            {/* Email */}
            <div>
              <label htmlFor="contact-email" className="mb-2 block text-[14px] font-medium text-text-primary">
                {t('email')}
              </label>
              <input
                id="contact-email"
                type="email"
                placeholder={t('emailPlaceholder')}
                aria-invalid={errors.email ? 'true' : 'false'}
                aria-describedby={errors.email ? 'contact-email-error' : undefined}
                {...register('email')}
                className={INPUT_CLASSES}
              />
              {errors.email && (
                <p id="contact-email-error" role="alert" className="mt-1.5 text-[13px] text-red-500">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Message */}
            <div>
              <label htmlFor="contact-message" className="mb-2 block text-[14px] font-medium text-text-primary">
                {t('message')}
              </label>
              <textarea
                id="contact-message"
                rows={5}
                placeholder={t('messagePlaceholder')}
                aria-invalid={errors.message ? 'true' : 'false'}
                aria-describedby={errors.message ? 'contact-message-error' : undefined}
                {...register('message')}
                className={`${INPUT_CLASSES} resize-none`}
              />
              {errors.message && (
                <p id="contact-message-error" role="alert" className="mt-1.5 text-[13px] text-red-500">
                  {errors.message.message}
                </p>
              )}
            </div>

            {status === 'error' && (
              <p role="alert" className="text-[14px] text-red-500">
                {t('error')}
              </p>
            )}

            <div className="pt-1">
              <Button type="submit" disabled={status === 'loading'}>
                {status === 'loading' ? t('sending') : t('submit')}
              </Button>
            </div>
          </form>
        )}
      </div>
    </SectionWrapper>
  )
}
