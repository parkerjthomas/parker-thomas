import { NextResponse } from 'next/server'
import { Resend } from 'resend'
import { z } from 'zod'

const schema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  business: z.string().min(2),
  message: z.string().min(10),
})

function escapeHtml(text: string) {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

export async function POST(req: Request) {
  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey) {
    return NextResponse.json(
      { error: 'Email is not configured on this deployment.' },
      { status: 503 },
    )
  }

  const resend = new Resend(apiKey)

  let body: unknown
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 })
  }

  const parsed = schema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json({ error: 'Invalid input' }, { status: 400 })
  }

  const { name, email, business, message } = parsed.data
  const safeName = escapeHtml(name)
  const safeEmail = escapeHtml(email)
  const safeBusiness = escapeHtml(business)
  const safeMessage = escapeHtml(message).replace(/\n/g, '<br>')

  const { error } = await resend.emails.send({
    from: process.env.RESEND_FROM_EMAIL ?? 'hello@hi.parker-thomas.com',
    to: 'hello@hi.parker-thomas.com',
    replyTo: email,
    subject: `New inquiry from ${name} — ${business}`,
    html: `
      <p><strong>Name:</strong> ${safeName}</p>
      <p><strong>Email:</strong> ${safeEmail}</p>
      <p><strong>Business:</strong> ${safeBusiness}</p>
      <p><strong>Message:</strong><br>${safeMessage}</p>
    `,
  })

  if (error) {
    return NextResponse.json({ error: 'Send failed' }, { status: 500 })
  }

  return NextResponse.json({ ok: true })
}
