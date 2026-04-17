'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { buttonVariants } from '@/components/ui/button'

const schema = z.object({
  name: z.string().min(2, 'Name is required'),
  email: z.string().email('Valid email required'),
  business: z.string().min(2, 'Business name required'),
  message: z.string().min(10, 'Tell me a bit more'),
})

type FormData = z.infer<typeof schema>

export function ContactForm() {
  const [submitSucceeded, setSubmitSucceeded] = useState(false)
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    setError,
  } = useForm<FormData>({ resolver: zodResolver(schema) })

  async function onSubmit(data: FormData) {
    const res = await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })
    if (res.ok) {
      reset()
      setSubmitSucceeded(true)
      return
    }
    let message = 'Something went wrong. Try again in a moment.'
    try {
      const payload = (await res.json()) as { error?: string }
      if (payload.error) message = payload.error
    } catch {
      /* ignore */
    }
    setError('root', { message })
  }

  if (submitSucceeded) {
    return (
      <div className="text-center py-8">
        <p className="text-lg font-medium mb-1">Got it — I&apos;ll be in touch soon.</p>
        <p className="text-muted-foreground text-sm">Usually within one business day.</p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {errors.root && (
        <p className="text-sm text-destructive" role="alert">
          {errors.root.message}
        </p>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="contact-name" className="sr-only">
            Your name
          </label>
          <input
            id="contact-name"
            {...register('name')}
            autoComplete="name"
            placeholder="Your name"
            className="w-full bg-muted border border-border rounded-md px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
          />
          {errors.name && (
            <p className="text-xs text-destructive mt-1">{errors.name.message}</p>
          )}
        </div>
        <div>
          <label htmlFor="contact-email" className="sr-only">
            Email address
          </label>
          <input
            id="contact-email"
            {...register('email')}
            type="email"
            autoComplete="email"
            placeholder="Email address"
            className="w-full bg-muted border border-border rounded-md px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
          />
          {errors.email && (
            <p className="text-xs text-destructive mt-1">{errors.email.message}</p>
          )}
        </div>
      </div>
      <div>
        <label htmlFor="contact-business" className="sr-only">
          Your business name
        </label>
        <input
          id="contact-business"
          {...register('business')}
          autoComplete="organization"
          placeholder="Your business name"
          className="w-full bg-muted border border-border rounded-md px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
        />
        {errors.business && (
          <p className="text-xs text-destructive mt-1">{errors.business.message}</p>
        )}
      </div>
      <div>
        <label htmlFor="contact-message" className="sr-only">
          What are you working on?
        </label>
        <textarea
          id="contact-message"
          {...register('message')}
          placeholder="What are you working on?"
          rows={4}
          className="w-full bg-muted border border-border rounded-md px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring resize-none"
        />
        {errors.message && (
          <p className="text-xs text-destructive mt-1">{errors.message.message}</p>
        )}
      </div>
      <button
        type="submit"
        disabled={isSubmitting}
        className={buttonVariants({ variant: 'default', size: 'lg' })}
      >
        {isSubmitting ? 'Sending...' : 'Send message'}
      </button>
    </form>
  )
}
