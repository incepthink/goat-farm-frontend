import type { DonationIntent, PaymentGateway, PaymentResult } from './index'

/**
 * The mock gateway. Exercises the full donate flow — pending state, success, reference
 * number — without moving any money.
 *
 * It is loud about being a mock. A donation page that looks like it took a payment and
 * did not is the worst possible failure mode on this site, so the UI surfaces `notice`
 * prominently and the returned reference is prefixed MOCK- so it can never be mistaken
 * for a real transaction id.
 */
export const mockGateway: PaymentGateway = {
  id: 'mock',
  isLive: false,
  notice:
    'No payment gateway is connected yet, so nothing is charged and no money is taken. This form records your intent and the team will contact you to complete it.',

  async pay(intent: DonationIntent): Promise<PaymentResult> {
    // Simulate the round trip so the pending state is real rather than instantaneous.
    await new Promise((resolve) => setTimeout(resolve, 900))

    if (intent.amountPaise <= 0) {
      return { status: 'failed', message: 'Enter an amount greater than zero.' }
    }

    const reference = `MOCK-${Date.now().toString(36).toUpperCase()}`
    if (import.meta.env.DEV) {
      console.info('[payments:mock] intent recorded', { reference, ...intent })
    }

    return { status: 'success', reference }
  },
}
