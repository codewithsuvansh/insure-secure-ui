export interface InvestmentDetail {
  intro: string;
  suits: string[];
  howItWorks: { title: string; detail: string }[];
  attractions: string[];
  watchOut: string[];
  tips: string[];
  faqs: { q: string; a: string }[];
  relatedInvestments: string[];
  relatedInsurance: string[];
  tool: { href: string; label: string };
}

const sipTool = { href: '/tools/sip-calculator/', label: 'Try the SIP calculator' };
const goalTool = { href: '/tools/goal-planner/', label: 'Plan a goal' };

export const investmentDetails: Record<string, InvestmentDetail> = {
  'mutual-funds': {
    intro: 'A mutual fund pools money from many investors and puts it into shares, bonds or both, managed by professionals. It gives you a spread of investments without having to pick each one yourself.',
    suits: ['First-time investors who want a simple start', 'People saving for goals that are years away', 'Anyone with money sitting idle in a savings account'],
    howItWorks: [
      { title: 'Choose a type of fund', detail: 'Equity funds invest in shares, debt funds in bonds and similar instruments, and hybrid funds in a mix.' },
      { title: 'Buy units', detail: 'Your money buys units at that day’s net asset value (NAV), by lump sum or through a SIP.' },
      { title: 'The value moves with the market', detail: 'The NAV rises and falls with the investments the fund holds, so your value changes daily.' },
      { title: 'Withdraw when you need to', detail: 'Most open-ended funds let you redeem at any time, subject to exit loads, lock-ins and tax.' },
    ],
    attractions: ['Spread across many investments', 'Professional fund management', 'Start with a modest amount', 'Regulated by SEBI, with regular disclosures'],
    watchOut: ['Returns are not promised, and you can lose money', 'Expense ratios and exit loads reduce what you keep', 'Too many similar funds add clutter and not safety', 'Tax on gains depends on the fund type and current law'],
    tips: ['Match the fund to how soon you need the money', 'Check the riskometer on the scheme document', 'Look beyond recent returns, since they may not continue'],
    faqs: [
      { q: 'Are mutual funds safe?', a: 'They are regulated, but they are not risk-free. Equity funds can fall sharply in the short term, and debt funds also carry risks. The right choice depends on your goal and time frame.' },
      { q: 'How much money do I need to start?', a: 'Many schemes accept small amounts, and minimums vary by scheme. We can show you what is possible within your budget.' },
    ],
    relatedInvestments: ['sip', 'goal-based-investing', 'debt-and-liquid-funds'],
    relatedInsurance: ['term-life-insurance', 'family-floater-health-insurance'],
    tool: sipTool,
  },
  sip: {
    intro: 'A Systematic Investment Plan (SIP) invests a fixed amount into a mutual fund at regular intervals, usually monthly. It turns investing into a habit, and you do not have to guess the right time to start.',
    suits: ['Salaried people who want to invest every month', 'Young investors with time on their side', 'Anyone who finds it hard to save what is left at the end of the month'],
    howItWorks: [
      { title: 'Choose an amount and a fund', detail: 'Pick a monthly amount that you can comfortably continue through good and bad markets.' },
      { title: 'Set up auto-debit', detail: 'A bank mandate moves the money on your chosen date each month.' },
      { title: 'Buy at different prices', detail: 'You buy more units when prices are low and fewer when they are high, which averages your cost over time.' },
      { title: 'Increase it as you earn more', detail: 'A yearly step-up can make a large difference over a long period.' },
    ],
    attractions: ['Builds a monthly investing habit', 'Removes the pressure of timing the market', 'Easy to pause, change or stop', 'Time and regular investing can compound over the years'],
    watchOut: ['A SIP does not protect you from losses in a falling market', 'Stopping during a market fall can lock in losses', 'A missed debit can bring bank charges', 'Long-term benefits depend on actually staying invested'],
    tips: ['Link each SIP to a specific goal', 'Start with an amount you will not need to stop', 'Review once a year, not every day'],
    faqs: [
      { q: 'Can I stop a SIP whenever I want?', a: 'Generally yes. You can usually stop or pause without a penalty, though exit loads may apply when you withdraw. ELSS funds also have a lock-in on each instalment.' },
      { q: 'SIP or lump sum: which is better?', a: 'It depends on whether you have regular income or a large amount to invest, and on your comfort with market swings. Our guide explains both.' },
    ],
    relatedInvestments: ['mutual-funds', 'goal-based-investing', 'tax-saving-funds'],
    relatedInsurance: ['term-life-insurance', 'child-insurance-plan'],
    tool: sipTool,
  },
  'goal-based-investing': {
    intro: 'Goal-based investing begins with what the money is for, such as a child’s college, a home or a wedding. Knowing the amount and the deadline makes it easier to decide how much to invest and where.',
    suits: ['Parents planning for education', 'Families saving towards a home', 'Anyone with several goals competing for the same income'],
    howItWorks: [
      { title: 'Name the goal', detail: 'Decide what it is, when you need the money and what it would cost today.' },
      { title: 'Allow for inflation', detail: 'Estimate what the same goal is likely to cost by the time you need it.' },
      { title: 'Match the investment to the time frame', detail: 'Longer goals can usually take more market risk than goals only a few years away.' },
      { title: 'Move to safety as you get close', detail: 'Shifting gradually to lower-risk funds near the deadline can protect what you have built.' },
    ],
    attractions: ['A clear reason to stay invested', 'A monthly number you can act on', 'Each goal is tracked on its own', 'Easier decisions when markets are volatile'],
    watchOut: ['Assumed returns may not be achieved', 'Inflation for education can be higher than you expect', 'Leaving equity too late can put a goal at risk', 'Life changes, so plans need regular review'],
    tips: ['Build an emergency fund and buy insurance first', 'Keep separate records for each goal', 'Protect the goal with term cover, so that it survives you'],
    faqs: [
      { q: 'How many goals can I plan for?', a: 'As many as your income allows. It helps to rank them, so that the most important goals are funded first.' },
      { q: 'What if I cannot afford the full amount?', a: 'Start with what you can and increase it each year. You can also adjust the target or the deadline.' },
    ],
    relatedInvestments: ['sip', 'retirement-investing', 'mutual-funds'],
    relatedInsurance: ['term-life-insurance', 'child-insurance-plan'],
    tool: goalTool,
  },
  'retirement-investing': {
    intro: 'Retirement can last for decades, and few people in private work or business have a pension to rely on. Starting early gives your money more time to grow towards the income you will need.',
    suits: ['Self-employed people and business owners without a pension', 'Employees who want more than their provident fund', 'People close to retirement planning how to draw an income'],
    howItWorks: [
      { title: 'Estimate your future expenses', detail: 'Think about your monthly costs in today’s money, and allow for inflation.' },
      { title: 'Build the fund', detail: 'SIPs in suitable funds, with yearly increases, can build a fund over your working life.' },
      { title: 'Reduce risk gradually', detail: 'Move part of the fund towards lower-risk options as retirement gets closer.' },
      { title: 'Draw an income', detail: 'A systematic withdrawal plan (SWP) can pay you a chosen amount each month from your fund.' },
    ],
    attractions: ['Starting early does much of the work', 'Flexible compared with many locked-in options', 'Regular income is possible through an SWP', 'Can sit alongside pension plans and annuities'],
    watchOut: ['Withdrawing too much can run the fund down', 'Market falls near retirement can hurt the most', 'Medical costs rise with age, so keep health cover', 'Taxes depend on the fund type and current law'],
    tips: ['Keep health insurance into retirement', 'Hold a few years of expenses in lower-risk funds', 'Review your withdrawal amount each year'],
    faqs: [
      { q: 'When should I start?', a: 'As early as you can, but it is rarely too late to improve your position. Starting later usually means investing more each month.' },
      { q: 'Is this better than a pension plan?', a: 'They do different things. Pension plans and annuities can offer more predictable income, while mutual funds offer flexibility with market risk. Many people use both.' },
    ],
    relatedInvestments: ['goal-based-investing', 'debt-and-liquid-funds', 'sip'],
    relatedInsurance: ['retirement-pension-plan', 'annuity-plan', 'senior-citizen-health-insurance'],
    tool: goalTool,
  },
  'tax-saving-funds': {
    intro: 'Equity Linked Savings Schemes (ELSS) are equity mutual funds with a three-year lock-in. They may also offer a tax deduction, depending on current tax law and the tax regime you choose.',
    suits: ['Taxpayers on a regime that allows the deduction', 'Long-term investors comfortable with equity risk', 'People who want a lock-in to discourage early withdrawal'],
    howItWorks: [
      { title: 'Check your tax position', detail: 'Find out whether the deduction applies to you. Ask your tax adviser if you are unsure.' },
      { title: 'Invest by lump sum or SIP', detail: 'Starting early in the financial year avoids a last-minute rush in March.' },
      { title: 'Respect the lock-in', detail: 'Each investment is locked in for three years from its own date, including each SIP instalment.' },
      { title: 'Stay as long as your goal needs', detail: 'You do not have to sell after three years, as equity generally suits longer periods.' },
    ],
    attractions: ['A shorter lock-in than many tax-saving options', 'Exposure to equity markets', 'Can be started through a monthly SIP', 'A built-in reason to stay invested'],
    watchOut: ['The value can fall, and the lock-in still applies', 'The deduction may not be available under your tax regime', 'Gains on sale may be taxable', 'Tax saving alone is a poor reason to choose an investment'],
    tips: ['Confirm the current rules before investing for tax', 'Do not invest money you may need within three years', 'Avoid a rushed decision at the end of the year'],
    faqs: [
      { q: 'Can I withdraw after three years?', a: 'Yes, once each investment completes its three-year lock-in. With SIPs, each instalment unlocks three years after its own date.' },
      { q: 'How much tax will I save?', a: 'That depends on your income, your regime and current law. A tax adviser can confirm this for your situation.' },
    ],
    relatedInvestments: ['sip', 'mutual-funds', 'goal-based-investing'],
    relatedInsurance: ['term-life-insurance', 'family-floater-health-insurance'],
    tool: sipTool,
  },
  'debt-and-liquid-funds': {
    intro: 'Debt funds invest in instruments such as government and corporate bonds, while liquid funds hold very short-term instruments. They are often used for shorter goals and for money you may need soon.',
    suits: ['People saving for goals one to three years away', 'Businesses and individuals parking surplus cash', 'Investors who want to balance their equity holdings'],
    howItWorks: [
      { title: 'Start with your time frame', detail: 'Choose according to when you might need the money, and how much movement you can accept.' },
      { title: 'Understand what the fund holds', detail: 'Check the credit quality and maturity of its investments, not just its name.' },
      { title: 'Withdraw when needed', detail: 'Redemption is usually quick, although exit loads and processing times vary by fund.' },
    ],
    attractions: ['Usually steadier than equity funds', 'Useful for an emergency reserve or surplus cash', 'Many schemes have no lock-in', 'A way to balance a portfolio'],
    watchOut: ['They are not bank deposits and carry no assured return', 'Interest rate changes can move their value', 'A bond issuer can default', 'Tax on gains depends on current law'],
    tips: ['Do not choose on the highest recent return alone', 'Check the riskometer and the potential risk class', 'Compare them with deposits on an after-tax basis'],
    faqs: [
      { q: 'Are debt funds the same as fixed deposits?', a: 'No. Fixed deposits offer a set rate from the bank, whereas the value of a debt fund moves with its holdings. Returns are not fixed.' },
      { q: 'Can I keep my emergency money here?', a: 'Some people keep part of it in liquid funds, alongside a savings account for immediate needs. Check how quickly you can access it.' },
    ],
    relatedInvestments: ['mutual-funds', 'retirement-investing', 'goal-based-investing'],
    relatedInsurance: ['fire-insurance', 'shop-insurance'],
    tool: goalTool,
  },
  'nri-investing': {
    intro: 'Many NRIs want to keep investing in India, for family or for their own return. It is often possible through NRE or NRO accounts, but rules differ by fund house and by the country you live in.',
    suits: ['NRIs with family and goals in Punjab', 'People planning to return to India someday', 'Families building savings for parents or children in India'],
    howItWorks: [
      { title: 'Check your country', detail: 'Some fund houses limit investors living in the USA or Canada, so eligibility comes first.' },
      { title: 'Complete KYC', detail: 'You will need NRI KYC with your passport, overseas address proof and PAN.' },
      { title: 'Invest through your NRE or NRO account', detail: 'The account you use can affect whether your money can be sent back abroad.' },
      { title: 'Plan for tax in both countries', detail: 'Tax may be deducted in India on gains, and your country of residence may also tax them.' },
    ],
    attractions: ['Stay invested in India from abroad', 'Manage it remotely once it is set up', 'Monthly SIPs are possible through NRE or NRO accounts', 'A way to plan for your family in India'],
    watchOut: ['Not every fund house accepts investors from every country', 'Currency movements can change your overseas returns', 'Tax rules apply in India and possibly abroad', 'Update your status if you move or return to India'],
    tips: ['Confirm eligibility before you plan your investments', 'Ask a tax adviser about both countries', 'Tell us right away if your residency status changes'],
    faqs: [
      { q: 'Can I invest from the USA or Canada?', a: 'Some fund houses accept investors from these countries, often with extra conditions, and others do not. We will check the current position when you contact us.' },
      { q: 'Can I take my money back abroad?', a: 'It usually depends on the account you invested through and on current rules. NRE investments are generally easier to send abroad than NRO ones.' },
    ],
    relatedInvestments: ['sip', 'goal-based-investing', 'mutual-funds'],
    relatedInsurance: ['senior-citizen-health-insurance', 'home-insurance', 'international-travel-insurance'],
    tool: sipTool,
  },
  'portfolio-review': {
    intro: 'Many investors collect funds over the years without checking whether they still fit together. A review looks through what you own, so that you can see where you stand and what could be simpler.',
    suits: ['People holding many funds bought at different times', 'Anyone unsure whether they are on track for a goal', 'Families who have inherited or lost track of investments'],
    howItWorks: [
      { title: 'Share your statement', detail: 'A consolidated account statement (CAS) lists your mutual fund holdings in one place.' },
      { title: 'We go through it with you', detail: 'We look at the mix of funds, any overlap and how each one lines up with your goals.' },
      { title: 'You see your options', detail: 'We explain what you could keep, combine or change, along with any exit load or tax effect.' },
      { title: 'You decide', detail: 'Nothing changes unless you choose to act.' },
    ],
    attractions: ['A clear picture of everything you hold', 'Less clutter and overlap', 'Your goals, matched to your investments', 'No obligation to change anything'],
    watchOut: ['Switching funds can trigger tax and exit loads', 'Recent poor returns alone are not a reason to sell', 'A review reflects today’s information and is not a promise', 'Your own risk and goals should guide any change'],
    tips: ['Download your CAS before we talk', 'List your goals and when you need the money', 'Mention any investments held outside mutual funds'],
    faqs: [
      { q: 'Do I have to move my investments to you?', a: 'No. You can use the conversation to understand what you own, and decide what to do afterwards.' },
      { q: 'How do I get my consolidated account statement?', a: 'You can request one online from the registrars CAMS or KFintech, or from the depositories. We can guide you if you need help.' },
    ],
    relatedInvestments: ['mutual-funds', 'goal-based-investing', 'retirement-investing'],
    relatedInsurance: ['term-life-insurance', 'family-floater-health-insurance'],
    tool: goalTool,
  },
};
