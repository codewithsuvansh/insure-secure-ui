import type { ProductDetail } from './types';

export const motorHomeTravel: Record<string, ProductDetail> = {
  'car-insurance': {
    intro: 'Third-party cover is the legal minimum for driving in India. Comprehensive cover adds protection for your own car against accidents, theft, fire and natural disasters.',
    whoNeeds: ['Every car owner, by law for third-party cover', 'Owners of new cars or cars with a loan', 'Anyone who could not easily pay for major repairs'],
    covers: ['Injury, death or property damage to third parties', 'Own damage from accidents, fire and theft, on comprehensive plans', 'Floods, storms and other natural disasters', 'Add-ons such as zero depreciation and engine protection', 'Compulsory personal accident cover for the owner-driver'],
    excludes: ['Driving without a valid licence', 'Driving under the influence of alcohol or drugs', 'Normal wear, tear and mechanical breakdown', 'Damage to the engine from driving through water, unless an add-on covers it'],
    tips: ['Set the insured declared value close to your car’s market value', 'Move your no claim bonus when you change insurers', 'Renew before expiry to avoid a fresh vehicle inspection'],
    claimDocs: ['Registration certificate and driving licence', 'Policy copy', 'Completed claim form', 'FIR, for theft and major accidents', 'Repair estimate and final invoice'],
    faqs: [
      { q: 'What is the no claim bonus?', a: 'It is a discount on the own-damage premium for each claim-free year. It belongs to you, so it can move with you to a new insurer.' },
      { q: 'Is zero depreciation worth adding?', a: 'It is often useful for newer cars, since it reduces what you pay on replaced parts. Age limits and claim limits apply.' },
    ],
    related: ['two-wheeler-insurance', 'commercial-vehicle-insurance', 'personal-accident-insurance'],
  },
  'two-wheeler-insurance': {
    intro: 'Two-wheeler insurance covers your liability to others and, on comprehensive plans, damage to your own bike or scooter. Third-party cover is required by law.',
    whoNeeds: ['Every motorcycle and scooter owner', 'Daily riders on busy roads', 'Owners of new or high-value bikes'],
    covers: ['Injury, death or property damage to third parties', 'Own damage from accidents, fire and theft, on comprehensive plans', 'Natural disasters such as floods', 'Compulsory personal accident cover for the owner-rider', 'Add-ons such as zero depreciation'],
    excludes: ['Riding without a valid licence', 'Riding under the influence of alcohol or drugs', 'Wear, tear and mechanical breakdown', 'Damage during racing or illegal use'],
    tips: ['Do not let an old bike’s third-party cover lapse', 'Keep a soft copy of your policy on your phone', 'Check your no claim bonus at each renewal'],
    claimDocs: ['Registration certificate and driving licence', 'Policy copy', 'Completed claim form', 'FIR, for theft and major accidents', 'Repair invoice'],
    faqs: [
      { q: 'Is a long-term policy available?', a: 'Long-term options exist for some plans, which can reduce yearly renewal effort. We can check what is available for your vehicle.' },
      { q: 'My old bike is rarely used. Do I need cover?', a: 'If it is used on public roads, third-party cover is still required by law.' },
    ],
    related: ['car-insurance', 'personal-accident-insurance', 'commercial-vehicle-insurance'],
  },
  'commercial-vehicle-insurance': {
    intro: 'Commercial vehicle insurance covers goods carriers, taxis, buses and other vehicles used for business. A vehicle being off the road costs money, so the right cover and quick claim support matter.',
    whoNeeds: ['Transporters and fleet owners', 'Taxi, bus and school van operators', 'Businesses running delivery or goods vehicles'],
    covers: ['Third-party injury, death and property damage', 'Own damage from accidents, fire and theft, on package policies', 'Natural disasters', 'Personal accident cover for the owner-driver and, on request, paid drivers', 'Add-ons, depending on the vehicle type'],
    excludes: ['Using the vehicle outside its permit', 'Overloading beyond what is legally allowed, as per policy terms', 'Driving without a valid licence or under the influence', 'Wear, tear and mechanical breakdown'],
    tips: ['Declare the actual use of the vehicle, such as goods or passengers', 'Keep permits and fitness certificates up to date', 'Ask about a single renewal date for your whole fleet'],
    claimDocs: ['Registration certificate, permit and fitness certificate', 'Driver’s licence', 'Policy copy and claim form', 'FIR, for theft and major accidents', 'Load challan and repair estimate, where relevant'],
    faqs: [
      { q: 'Are the goods on my truck covered?', a: 'Not under a standard motor policy. Goods in transit need separate marine or transit cover.' },
      { q: 'Can I insure several vehicles together?', a: 'Fleet arrangements are often possible, depending on the insurer and the number of vehicles.' },
    ],
    related: ['marine-cargo-insurance', 'car-insurance', 'workmens-compensation-insurance'],
  },
  'home-insurance': {
    intro: 'Home insurance protects your building, your belongings, or both, from events such as fire, flood and burglary. It is often more affordable than people expect, compared with the cost of rebuilding.',
    whoNeeds: ['Home owners, with or without a loan', 'Tenants who want to protect their belongings', 'NRI families with property in Punjab'],
    covers: ['Building damage from fire, storms, floods and earthquakes', 'Contents such as furniture and appliances', 'Burglary and theft of insured contents', 'Jewellery and valuables, when declared', 'Alternative accommodation or lost rent, on plans that include it'],
    excludes: ['Normal wear and poor maintenance', 'Undeclared high-value items', 'Damage caused deliberately', 'Loss while the house is vacant beyond a set period, unless agreed with the insurer'],
    tips: ['Insure the cost to rebuild, not the market price of your property', 'Keep a list, photos and bills for valuable items', 'Tell the insurer if the home will stay empty for long periods'],
    claimDocs: ['Policy copy and claim form', 'FIR, for burglary or theft', 'Fire brigade report, in a fire claim', 'Photos of damage and repair estimates', 'Ownership proof and bills for damaged items'],
    faqs: [
      { q: 'My home loan already has insurance. Is that enough?', a: 'Often it covers the building for the lender’s benefit, and may not include your contents. Share your policy and we can check.' },
      { q: 'Can I insure a house while I live abroad?', a: 'Often yes, but unoccupied homes have specific conditions. Tell the insurer about the occupancy from the start.' },
    ],
    related: ['fire-insurance', 'senior-citizen-health-insurance', 'international-travel-insurance'],
  },
  'international-travel-insurance': {
    intro: 'Medical care abroad can be very expensive. Travel insurance covers emergencies, and can also help when trips, baggage or passports go wrong.',
    whoNeeds: ['Families visiting relatives abroad', 'Parents travelling to Canada, the UK, the USA or Australia', 'Business travellers and holiday makers'],
    covers: ['Emergency medical treatment and hospital stays abroad', 'Medical evacuation and return home', 'Trip delay or cancellation, as per the plan', 'Lost baggage and passport', 'Personal liability abroad'],
    excludes: ['Pre-existing conditions, except where a plan includes limited cover', 'Routine or planned treatment abroad', 'Travel against medical advice', 'Hazardous sports, unless they are added'],
    tips: ['Check your destination’s visa rules for required cover', 'Choose higher cover for countries with costly healthcare', 'Declare existing conditions before you travel'],
    claimDocs: ['Policy copy and passport', 'Medical reports and bills', 'Boarding passes and tickets', 'Property irregularity report, for baggage', 'Police report, for theft or loss'],
    faqs: [
      { q: 'Do Schengen visas require travel insurance?', a: 'Yes. Schengen visas generally need medical cover of at least €30,000, valid across the area. Always check current embassy requirements.' },
      { q: 'Can my parents with health conditions be covered?', a: 'Some plans offer limited cover for life-threatening emergencies from existing conditions. Terms vary, so share their history before you buy.' },
    ],
    related: ['student-travel-insurance', 'senior-citizen-health-insurance', 'home-insurance'],
  },
  'student-travel-insurance': {
    intro: 'Student travel plans provide longer-term cover for study overseas, often lasting a year or more. They can include benefits such as study interruption or sponsor protection.',
    whoNeeds: ['Students leaving for study abroad', 'Parents funding overseas education', 'Students whose university accepts an outside plan'],
    covers: ['Medical treatment and hospital stays abroad', 'Medical evacuation and return home', 'Sponsor protection, if the person funding your studies dies', 'Study interruption, as per the plan', 'Lost baggage, passport and personal liability'],
    excludes: ['Pre-existing conditions, unless they are included', 'Routine dental or vision care, unless they are included', 'Treatment that was planned before travel', 'Benefits below your university’s requirements, if you choose too low a plan'],
    tips: ['Get your university’s insurance requirements in writing', 'Check whether you can waive the university’s own plan', 'Renew before the policy ends if your course is extended'],
    claimDocs: ['Policy copy and passport', 'Student ID and enrolment proof', 'Medical reports and bills', 'Police or property reports, where relevant'],
    faqs: [
      { q: 'Will my university accept this plan?', a: 'That depends on the university’s rules. Share its requirements and we can look for a plan that meets them. The final decision lies with the university.' },
      { q: 'Can I buy it after I reach my destination?', a: 'Many plans must be purchased before departure, so arrange cover before you travel.' },
    ],
    related: ['international-travel-insurance', 'child-insurance-plan', 'senior-citizen-health-insurance'],
  },
};
