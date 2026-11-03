/**
 * Situation FAQ content — single source of truth.
 *
 * Consumed twice:
 *   1. SituationPage.jsx renders these as a visible, crawlable FAQ block
 *      (keyed by situationSlug).
 *   2. App.jsx builds FAQPage JSON-LD from the same objects, so the
 *      structured data always matches the on-page content (Google's
 *      requirement for FAQPage markup).
 *
 * Compliance (RECO 5.1/5.3, LSO 3.1, Resolve voice):
 *   Calm and factual. No outcome guarantees, no "we buy", no urgency,
 *   no em dashes, no exclamation marks. Practitioner is a Salesperson;
 *   legal / tax / credit specifics are routed to the reader's own
 *   advisors. Answers are written to match the real questions Ontario
 *   homeowners search, so they can earn People-Also-Ask and AI-answer
 *   coverage without overstating anything.
 */
export const SITUATION_FAQS = {
  'power-of-sale': [
    {
      q: 'What is power of sale in Ontario?',
      a: 'Power of sale lets a mortgage lender sell a property after a borrower falls behind, without the court process that foreclosure requires. The lender must give statutory notice and account for the sale. After the mortgage, arrears, and costs are paid, any surplus belongs to the homeowner.',
    },
    {
      q: 'Can I still sell my own home after power of sale has started?',
      a: 'Often yes. Until the lender completes a sale, many homeowners can list and sell the property themselves inside the notice window. A sale you control usually gives you more say over price and timing than a lender-run sale. The window is tight, so it helps to speak with a Salesperson early.',
    },
    {
      q: 'Will I lose all my equity in a power of sale?',
      a: 'Not necessarily. The lender is entitled to the outstanding mortgage, arrears, and its costs, but any remaining equity is yours. A sale priced to the market and run on a proper listing generally preserves more of that equity than a rushed lender sale.',
    },
    {
      q: 'How long do I have after a Notice of Sale?',
      a: 'Ontario sets statutory notice periods before a lender can complete a sale, and the exact timing depends on your mortgage and circumstances. Your lawyer confirms the deadlines on your file. The sooner you act, the more options remain open.',
    },
    {
      q: 'Is a power of sale conversation confidential?',
      a: 'Yes. Resolve works discreetly, and nothing is made public without your direction.',
    },
  ],

  'notice-of-sale': [
    {
      q: 'How long do I have after a Notice of Sale in Ontario?',
      a: 'Ontario’s Mortgages Act says the sale cannot happen until at least 35 days after the notice is given (section 32). Your notice states the date that applies to your mortgage, and your lawyer can confirm it. The earlier you act inside that window, the more choices you have.',
    },
    {
      q: 'Can I stop the sale by paying the arrears?',
      a: 'The Mortgages Act lets an owner pay the amount in arrears, plus the lender’s necessary expenses, at any time before the sale and be relieved of the default (section 22). Your lawyer can confirm the exact figure on your file.',
    },
    {
      q: 'Can I sell my house after getting a Notice of Sale?',
      a: 'Usually, yes. Until the lender completes its own sale, you can list the home, accept an offer and close. The sale has to pay out the mortgage, or the lender has to agree to accept the net proceeds.',
    },
    {
      q: 'Is a Notice of Sale the same as foreclosure?',
      a: 'No. Under power of sale the lender sells the home and is paid from the proceeds, and any surplus belongs to the owner. Foreclosure is a court process in which the lender can take ownership, and it is rarely used in Ontario.',
    },
  ],

  'sell-during-power-of-sale': [
    {
      q: 'Can I sell my house if my lender has started power of sale?',
      a: 'Usually, yes. Until the lender sells the home itself, you can list it, accept an offer and close. The lender is paid from the sale proceeds on closing.',
    },
    {
      q: 'Do I need the lender’s permission to list my home?',
      a: 'No. You do not need permission to list your own home. The lender’s agreement matters at closing: the mortgage has to be paid out, or the lender has to accept the net proceeds, for the sale to close.',
    },
    {
      q: 'What if the sale price is less than what I owe?',
      a: 'The lender has to agree to discharge the mortgage for the net proceeds, and any shortfall normally remains a debt. A sale at full market value keeps that shortfall as small as possible.',
    },
    {
      q: 'Can I stay in the house while it is for sale?',
      a: 'In most cases, yes, unless the lender has already taken possession. A lived-in, well-kept home usually shows better than a vacant one.',
    },
  ],

  'mortgage-arrears': [
    {
      q: 'Can I sell a house that is in mortgage arrears?',
      a: 'Yes. Being behind on payments does not stop you from listing and selling. The outstanding balance and arrears are paid from the sale proceeds at closing, and any remaining equity is yours.',
    },
    {
      q: 'I am behind on my mortgage. Should I sell?',
      a: 'Selling is one option among several and it is not right for everyone. If keeping the home is not realistic, selling while you still control the process usually protects more of your equity than waiting for the lender to act. A no-obligation conversation can help you see the numbers clearly.',
    },
    {
      q: 'Does selling hurt my credit more than missing payments?',
      a: 'A completed sale that pays out the mortgage generally reflects better than continued missed payments or a lender-driven sale. Credit questions specific to your file sit with your own advisors. Resolve handles the real estate side of the sale.',
    },
    {
      q: 'How quickly can a sale happen when I am in arrears?',
      a: 'It depends on the property and the market, but a focused, well-priced listing can move quickly. Resolve works on a realistic timeline for your situation and coordinates with your lender and lawyer so the pieces line up.',
    },
  ],

  'estate-sale': [
    {
      q: 'Can an executor sell a house before probate is granted in Ontario?',
      a: 'It depends on the estate and the will. In many Ontario estates a home can be listed while probate is in progress, with the closing timed to the grant. Your estate lawyer confirms what your file allows, and Resolve coordinates the sale around that timeline.',
    },
    {
      q: 'Who can sign the listing for an estate property?',
      a: 'Generally the named executor or estate trustee, once their authority is established. Resolve works with the executor and the estate lawyer so the paperwork matches the estate’s authority.',
    },
    {
      q: 'What if the beneficiaries disagree about selling?',
      a: 'Resolve stays neutral and keeps everyone informed with the same numbers and updates. Decisions about the estate rest with the executor and counsel. Our role is a clean, well-documented sale.',
    },
    {
      q: 'Is there pressure to sell an estate home quickly?',
      a: 'No. Estate sales move at the pace the estate allows. Resolve works to the estate’s timeline, in coordination with the estate lawyer, rather than against it.',
    },
  ],

  'time-sensitive-sales': [
    {
      q: 'Can you sell my home before a firm closing date on my next purchase?',
      a: 'Often yes. Resolve runs time-sensitive sales inside the window available and coordinates with the lawyers and lenders on both transactions so the dates line up as closely as possible.',
    },
    {
      q: 'What counts as a time-sensitive sale?',
      a: 'A closing date on your next home, a relocation, an estate or probate timeline, a health or family deadline, or a financial deadline. Any sale where the calendar is not fully in your control.',
    },
    {
      q: 'Does selling under a deadline mean accepting a lower price?',
      a: 'Not automatically. A deadline changes the strategy, not the goal. Resolve prices and markets to reach the strongest result the available time allows.',
    },
    {
      q: 'How fast can Resolve list a time-sensitive property?',
      a: 'Resolve can move quickly once we understand the property and the deadline. The first step is a short, no-obligation conversation.',
    },
  ],

  'financial-pressure': [
    {
      q: 'Should I sell before I fall behind on mortgage payments?',
      a: 'Acting before the first missed payment is usually the strongest position. You keep full control of price and timing, your credit is intact, and no lender process has started. If the numbers no longer work, selling early preserves the most options.',
    },
    {
      q: 'My mortgage renewal payment jumped and I cannot carry it. What are my options?',
      a: 'Renewal shock is common right now. Options can include selling, refinancing, or restructuring, and the right one depends on your equity and income. Resolve helps you understand what a sale would look like so you can compare it against the alternatives with your own advisors.',
    },
    {
      q: 'Is it too early to talk to an agent if I am only worried?',
      a: 'No. A private, no-obligation conversation early gives you a clear picture and more room to plan. Many conversations do not lead to a listing, and that is fine.',
    },
    {
      q: 'Will a financial-pressure conversation stay private?',
      a: 'Yes. Nothing is made public, and the conversation stays confidential.',
    },
  ],
}
