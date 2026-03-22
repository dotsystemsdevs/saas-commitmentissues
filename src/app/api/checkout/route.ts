import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  const { repo } = await req.json()

  const Stripe = (await import('stripe')).default
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: '2026-02-25.clover',
  })

  const base = process.env.NEXT_PUBLIC_BASE_URL ?? 'https://commitmentissues.dev'

  const session = await stripe.checkout.sessions.create({
    mode: 'payment',
    line_items: [{ price: process.env.STRIPE_PRICE_ID!, quantity: 1 }],
    success_url: `${base}/success`,
    cancel_url: `${base}/pricing`,
    metadata: { repo: repo ?? '' },
  })

  return NextResponse.json({ url: session.url })
}
