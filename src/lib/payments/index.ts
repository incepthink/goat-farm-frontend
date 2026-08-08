/**
 * Payment gateway adapter.
 *
 * The donate page talks only to this interface. Today it resolves to a mock; when the
 * client confirms a provider and supplies an account, add the implementation alongside
 * `mock.ts` and return it from `getGateway()`. No page or component changes.
 *
 * Razorpay is the likely target — it is the standard for Indian non-profits and handles
 * UPI, cards and international giving. The shape below is deliberately Razorpay-flavoured
 * (amounts in paise, an order id, a handler callback) so the swap is mechanical.
 *
 * See docs/CLIENT-QUESTIONS.md §1.
 */

export type DonationIntent = {
  /** In paise, the smallest unit — the convention every Indian gateway uses. */
  amountPaise: number
  frequency: 'one-time' | 'monthly'
  tierId: string | null
  donor: {
    name: string
    email: string
    phone: string
    pan?: string
    address?: string
  }
}

export type PaymentResult =
  | { status: 'success'; reference: string }
  | { status: 'cancelled' }
  | { status: 'failed'; message: string }
  | { status: 'unconfigured' }

export interface PaymentGateway {
  readonly id: string
  readonly isLive: boolean
  /** Human-readable note the UI shows so nobody mistakes a mock run for a real payment. */
  readonly notice: string | null
  pay(intent: DonationIntent): Promise<PaymentResult>
}

import { mockGateway } from './mock'

export function getGateway(): PaymentGateway {
  const provider = import.meta.env.VITE_PAYMENT_PROVIDER as string | undefined

  switch (provider) {
    // case 'razorpay':
    //   return razorpayGateway   // add when the client supplies VITE_RAZORPAY_KEY_ID
    default:
      return mockGateway
  }
}

export function formatRupees(paise: number): string {
  return (paise / 100).toLocaleString('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  })
}
