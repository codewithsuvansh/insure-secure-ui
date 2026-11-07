export interface Guide {
  slug: string;
  title: string;
  summary: string;
  readMinutes: number;
  related: string[];
  relatedInvestments?: string[];
  sections: { heading?: string; paragraphs?: string[]; bullets?: string[] }[];
}

export const guides: Guide[] = [
  {
    slug: 'how-much-term-insurance-do-i-need',
    title: 'How much term insurance do you really need?',
    summary: 'A simple method based on your expenses, loans and goals, not on guesswork.',
    readMinutes: 4,
    related: ['term-life-insurance', 'critical-illness-insurance'],
    sections: [
      { paragraphs: ['Many people pick a round number for life cover, or simply accept what they are offered. A better answer comes from asking one question: what would your family need if your income stopped tomorrow?'] },
      { heading: 'Start with the rule of thumb', paragraphs: ['A common starting point is 10 to 15 times your yearly income. It is quick, and it tells you roughly where you stand. However, it ignores your loans, your children’s ages and your savings.'] },
      { heading: 'Then work it out properly', bullets: ['Multiply your family’s yearly expenses by the number of years they would need support.', 'Add every outstanding loan, including your home and car loans.', 'Add future goals, such as education or a child’s wedding.', 'Subtract your existing life cover and any savings your family could use.'], paragraphs: ['What is left is the gap that a new term plan needs to fill. Our calculator does this for you and shows how each part adds up.'] },
      { heading: 'Choose the right term', paragraphs: ['Your cover should last until your children are independent and your major loans are repaid. For many people, that means cover until around retirement age.'] },
      { heading: 'Be truthful on the application', paragraphs: ['Term plans depend on accurate information. Always declare your health conditions, smoking and income honestly, because undisclosed facts can lead to problems at claim time, which is exactly when your family can least afford them.'] },
    ],
  },
  {
    slug: 'family-floater-or-individual-health-insurance',
    title: 'Family floater or individual health plans: how to choose',
    summary: 'When one shared policy makes sense, and when each person needs their own.',
    readMinutes: 4,
    related: ['family-floater-health-insurance', 'individual-health-insurance', 'super-top-up-health-insurance'],
    sections: [
      { paragraphs: ['A family floater shares one cover amount across your family. Individual plans give each person a separate cover amount. Neither is right for everyone, so it comes down to your family’s ages and health.'] },
      { heading: 'When a floater works well', bullets: ['You are a young couple or a family with small children.', 'No one has a serious health condition.', 'You prefer a single policy and one renewal date.'] },
      { heading: 'When individual plans can be better', bullets: ['One family member has a higher medical risk.', 'There is a large age gap between members.', 'You do not want one big claim to reduce cover for everyone else.'] },
      { heading: 'Why parents usually need their own plan', paragraphs: ['Adding older parents to a family floater can raise the cost for everyone, since the premium is often linked to the eldest member. Their higher chance of a claim can also use up the shared cover. A separate senior citizen plan keeps those risks apart.'] },
      { heading: 'Do not stop at the cover amount', paragraphs: ['Look at room rent limits, co-payment, restore benefits, waiting periods and the hospitals near you. These details have a big effect on what you actually receive during a claim. A super top-up can then add more cover at a modest cost.'] },
    ],
  },
  {
    slug: 'health-insurance-for-parents-over-60',
    title: 'Buying health insurance for parents over 60',
    summary: 'What to check, what to declare, and how NRI children can arrange cover from abroad.',
    readMinutes: 5,
    related: ['senior-citizen-health-insurance', 'critical-illness-insurance'],
    sections: [
      { paragraphs: ['Buying cover for parents is one of the most common requests from families in Punjab, especially when children live overseas. It is possible in many cases, but it needs more care than a policy for a healthy 30-year-old.'] },
      { heading: 'What to check first', bullets: ['Waiting periods for existing conditions such as diabetes or blood pressure.', 'Co-payment, where your parents pay part of each claim.', 'Sub-limits on common procedures such as cataract or joint surgery.', 'Hospitals near your parents that are on the insurer’s network.'] },
      { heading: 'Declare everything', paragraphs: ['Share all medical history, including old reports and current medicines. Some insurers may request a medical test, charge more or decline cover. This can feel frustrating, but declaring everything upfront avoids a much bigger problem during a claim.'] },
      { heading: 'If you live abroad', paragraphs: ['NRI children often pay for and manage their parents’ policy. Rules on who can be the proposer and how premiums may be paid vary by insurer, so we confirm this at the start. It also helps to name someone in India who can support your parents during a hospital stay.'] },
      { heading: 'Plan the hospital journey in advance', paragraphs: ['Keep a copy of the policy and health card with your parents, and make sure a local contact knows what to do. A short conversation before an emergency can save a lot of stress later.'] },
    ],
  },
  {
    slug: 'comprehensive-or-third-party-car-insurance',
    title: 'Comprehensive or third-party car insurance?',
    summary: 'What the law requires, what each policy pays for, and which add-ons are worth a look.',
    readMinutes: 3,
    related: ['car-insurance', 'two-wheeler-insurance'],
    sections: [
      { paragraphs: ['Third-party cover is the legal minimum for driving on public roads in India. It pays for injury, death or property damage you cause to others. It does not pay to fix your own car.'] },
      { heading: 'What comprehensive adds', paragraphs: ['Comprehensive cover includes third-party protection and adds own-damage cover for accidents, theft, fire, floods and similar events. For most newer cars, and any car with a loan, it is worth considering.'] },
      { heading: 'Add-ons to consider', bullets: ['Zero depreciation reduces what you pay for replaced parts.', 'Engine protection can help after flood or water damage.', 'Roadside assistance helps when your car breaks down.', 'Return to invoice can help if a new car is stolen or written off.'] },
      { heading: 'Two details that save money', bullets: ['Your no claim bonus rewards claim-free years, and it moves with you if you change insurer.', 'Renewing on time helps you avoid a fresh inspection and can protect your bonus.'] },
    ],
  },
  {
    slug: 'travel-insurance-before-flying-abroad',
    title: 'Travel insurance to sort out before you fly abroad',
    summary: 'A checklist for family visits, study trips and parents travelling to see relatives.',
    readMinutes: 4,
    related: ['international-travel-insurance', 'student-travel-insurance'],
    sections: [
      { paragraphs: ['A single hospital visit abroad can cost more than the whole trip. Travel insurance is a small part of your budget, but it can matter more than almost anything else you buy before leaving.'] },
      { heading: 'Check the visa requirement', paragraphs: ['Some countries set minimum cover as a visa condition. For example, Schengen visas generally need at least €30,000 of medical cover. Other destinations and visa types have their own rules, so check the official source for your specific visa.'] },
      { heading: 'Choose cover that suits the country', paragraphs: ['Medical costs differ a lot between destinations. Countries such as the USA and Canada usually call for higher cover than a short trip elsewhere.'] },
      { heading: 'Parents visiting family overseas', bullets: ['Share their medical conditions before you buy.', 'Check what the plan pays if an existing condition causes an emergency.', 'Make sure the policy lasts for the whole stay, with room for changes.'] },
      { heading: 'Students', paragraphs: ['Universities often have strict rules on insurance. Get the requirements in writing before you buy, and check whether you can waive the university’s own plan.'] },
      { heading: 'Keep this with you', bullets: ['Digital and printed policy copies.', 'The assistance phone number.', 'A list of your medicines and their generic names.'] },
    ],
  },
  {
    slug: 'insurance-checklist-for-jalandhar-manufacturers',
    title: 'An insurance checklist for Jalandhar manufacturers and exporters',
    summary: 'The main risks for sports goods, hand tool and other units, and the covers that address them.',
    readMinutes: 5,
    related: ['factory-insurance', 'marine-cargo-insurance', 'liability-insurance'],
    sections: [
      { paragraphs: ['Jalandhar is known for sports goods, hand tools and other manufacturing. A fire, a damaged shipment or an unpaid invoice can affect years of work, so it is worth checking your cover against the risks you actually face.'] },
      { heading: 'Your premises and stock', bullets: ['Fire cover with the right allied perils, on accurate values.', 'Burglary cover for stock and equipment.', 'Machinery breakdown for your critical equipment.', 'Loss of profits, to support the business while you rebuild.'] },
      { heading: 'Your goods on the move', bullets: ['Marine cargo cover for local and export shipments.', 'An open policy if you ship regularly.', 'A check of your Incoterms, to see who carries the risk at each stage.'] },
      { heading: 'Getting paid', paragraphs: ['Trade credit insurance can protect you when buyers fail to pay, within approved credit limits. This can matter most when you are entering a new overseas market.'] },
      { heading: 'Claims from others', paragraphs: ['Overseas buyers may ask you for product liability cover, sometimes with a named territory or jurisdiction. Sort out these requirements before you sign a contract.'] },
      { heading: 'Your people', bullets: ['Workmen’s compensation for injuries at work.', 'Group health cover as a benefit that helps retain staff.', 'Group life for your team’s families.'] },
      { heading: 'Do a yearly review', paragraphs: ['Stock levels, machinery and markets change. Reviewing your values and sections each year helps you avoid paying for what you no longer need, and being underinsured for what you have added.'] },
    ],
  },
  {
    slug: 'sip-or-lump-sum',
    title: 'SIP or lump sum: which suits you?',
    summary: 'How each approach works, and how to choose based on your income and your nerves.',
    readMinutes: 3,
    related: [],
    relatedInvestments: ['sip', 'mutual-funds'],
    sections: [
      { paragraphs: ['A SIP invests a fixed amount every month. A lump sum invests everything at once. Neither wins in every market, so the more useful question is which one fits your money and your temperament.'] },
      { heading: 'When a SIP makes sense', bullets: ['You earn a regular income and invest from it.', 'You worry about investing just before a market fall.', 'You want the habit to run on its own.'] },
      { heading: 'When a lump sum can make sense', bullets: ['You have received a bonus, sale proceeds or maturity amount.', 'Your goal is long term, and you can tolerate market falls.', 'Leaving the money idle has a real cost.'] },
      { heading: 'A middle path', paragraphs: ['A systematic transfer plan (STP) keeps a lump sum in a debt or liquid fund and moves it into an equity fund in instalments. It spreads your entry over several months, though it does not remove market risk.'] },
      { heading: 'What matters more', paragraphs: ['How long you stay invested and how much you invest usually matter more than the exact day you start. Choose an approach you can stick with when markets get uncomfortable.'] },
    ],
  },
  {
    slug: 'insurance-and-investing-the-right-order',
    title: 'Insurance first, then investing: getting the order right',
    summary: 'Why protection comes before growth, and why mixing the two can leave gaps.',
    readMinutes: 4,
    related: ['term-life-insurance', 'family-floater-health-insurance'],
    relatedInvestments: ['sip', 'goal-based-investing'],
    sections: [
      { paragraphs: ['Investing feels exciting, and insurance rarely does. But one hospital bill can undo years of careful saving. Getting the order right protects everything you build afterwards.'] },
      { heading: 'A simple order', bullets: ['Build an emergency fund for several months of expenses.', 'Buy health insurance for yourself and your family.', 'Buy term insurance if anyone depends on your income.', 'Then invest for your goals, using SIPs or lump sums.'] },
      { heading: 'Why this order works', paragraphs: ['Without a reserve or insurance, an emergency can force you to sell investments at a bad time. With them in place, your investments can stay untouched and keep working towards your goals.'] },
      { heading: 'Plans that combine both', paragraphs: ['Some life plans combine cover and investment. They can suit some people, but they often provide less life cover for the same money than a term plan does. Ask how much cover you actually get, and compare it with a term plan plus separate investments.'] },
      { heading: 'Review them together', paragraphs: ['Your insurance and investments should reflect the same goals. A new child, home loan or business changes both, which is why it helps to look at them at the same time.'] },
    ],
  },
  {
    slug: 'direct-or-regular-mutual-funds',
    title: 'Direct or regular mutual funds: what is the difference?',
    summary: 'An honest look at the two plan types, and what you pay for with each.',
    readMinutes: 3,
    related: [],
    relatedInvestments: ['mutual-funds', 'portfolio-review'],
    sections: [
      { paragraphs: ['Every mutual fund scheme generally comes in two versions, called direct and regular. They invest in the same portfolio. The difference lies in how you buy, and what is included in the costs.'] },
      { heading: 'Direct plans', paragraphs: ['You invest directly with the fund house or through a platform that offers direct plans. There is no distributor commission, so the expense ratio is lower. You do the research, paperwork and tracking yourself.'] },
      { heading: 'Regular plans', paragraphs: ['You invest through a distributor, who is paid a commission by the fund house. This makes the expense ratio higher than the direct plan. In return, you have someone to help with paperwork, questions and staying on course.'] },
      { heading: 'Which one should you choose?', bullets: ['Direct can suit you if you are comfortable choosing and tracking funds alone.', 'Regular can suit you if you value help and would otherwise delay or make rushed decisions.', 'Either way, ask what you are paying and what you get for it.'] },
      { heading: 'Our approach', paragraphs: ['We believe that you should know how your distributor is paid. Ask us about the commission on any scheme we discuss, and we will explain it.'] },
    ],
  },
];

export const findGuide = (slug: string) => guides.find((g) => g.slug === slug);
