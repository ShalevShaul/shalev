import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'

const IL_PHONE = /^(05\d{8}|0[2-489]\d{7})$/

const schema = z.object({
  name: z.string().min(2).max(100),
  email: z.email(),
  phone: z
    .string()
    .refine((val) => val === '' || IL_PHONE.test(val))
    .optional(),
  message: z.string().min(10).max(5000),
  locale: z.enum(['en', 'he']),
  timestamp: z.string(),
})

function sanitize(val: string): string {
  return val.trim().replace(/<[^>]*>/g, '')
}

export async function POST(req: NextRequest) {
  const contentType = req.headers.get('content-type') ?? ''
  if (!contentType.includes('application/json')) {
    return NextResponse.json({ error: 'Invalid content type' }, { status: 415 })
  }

  const webhookUrl = process.env.N8N_WEBHOOK_URL
  const secret = process.env.N8N_WEBHOOK_SECRET

  if (!webhookUrl) {
    return NextResponse.json({ error: 'Not configured' }, { status: 500 })
  }

  const body = await req.json().catch(() => null)
  const parsed = schema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json({ error: 'Invalid data' }, { status: 400 })
  }

  const { name, email, phone, message, locale, timestamp } = parsed.data
  const safe = {
    name: sanitize(name),
    email: sanitize(email),
    phone: phone ? sanitize(phone) : undefined,
    message: sanitize(message),
    locale,
    timestamp,
  }

  const res = await fetch(webhookUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...(secret ? { 'x-webhook-secret': secret } : {}),
    },
    body: JSON.stringify(safe),
  })

  if (!res.ok) {
    return NextResponse.json({ error: 'Upstream error' }, { status: 502 })
  }

  return NextResponse.json({ ok: true })
}
