import type { ProductDetail } from './types';

export const farm: Record<string, ProductDetail> = {
  'tractor-insurance': {
    intro: 'Tractors need valid motor insurance, like any other vehicle used on public roads. Comprehensive cover can also protect a machine that your livelihood depends on.',
    whoNeeds: ['Farmers with tractors and trailers', 'Custom hiring and contract operators', 'Anyone with a tractor under a loan'],
    covers: ['Third-party injury, death and property damage', 'Own damage from accidents, fire and theft, on package policies', 'Natural disasters', 'Trailer cover, when declared', 'Personal accident cover for the owner-driver'],
    excludes: ['Using the tractor for purposes not declared', 'Driving without a valid licence', 'Wear, tear and mechanical breakdown', 'An undeclared trailer'],
    tips: ['Say whether it is for farm use or hire work', 'Add your trailer to the policy', 'Renew before expiry, especially if there is a loan'],
    claimDocs: ['Registration certificate and licence', 'Policy copy and claim form', 'FIR, for theft and major accidents', 'Repair estimate and invoice'],
    faqs: [
      { q: 'Does a tractor used only on my farm need insurance?', a: 'If it may go on a public road, third-party cover is legally required. It is advisable to keep it insured in any case.' },
      { q: 'Is my trailer included automatically?', a: 'Not usually. Declare it so that the policy clearly includes it.' },
    ],
    related: ['crop-insurance', 'livestock-insurance', 'commercial-vehicle-insurance'],
  },
  'livestock-insurance': {
    intro: 'Livestock insurance protects the value of dairy cattle and other animals against death from disease or accident. Losing an animal can mean losing a family’s regular income.',
    whoNeeds: ['Dairy farmers and families with milch animals', 'Farmers who took loans to buy cattle', 'Commercial dairy operators'],
    covers: ['Death due to accident or disease', 'Death from natural disasters, as per the policy', 'Surgical operations and strikes, on some plans', 'Permanent total disability, when added'],
    excludes: ['Theft or sale of the insured animal', 'Death from a lack of care or deliberate harm', 'Animals without proper identification, such as ear tags', 'A waiting period after you buy the policy'],
    tips: ['Keep the ear tag on the animal and photograph it', 'Keep vaccination and vet records', 'Inform the insurer immediately when an animal dies'],
    claimDocs: ['Policy copy and claim form', 'Ear tag and animal photos', 'Veterinary treatment and post-mortem reports', 'Death certificate from a vet', 'Bank details'],
    faqs: [
      { q: 'What if the ear tag is lost?', a: 'Tell the insurer immediately and follow its process for retagging. A missing tag can create a serious claim problem.' },
      { q: 'Are government-supported schemes available?', a: 'Support schemes vary by state and year, so we will check what currently applies to you.' },
    ],
    related: ['crop-insurance', 'tractor-insurance', 'personal-accident-insurance'],
  },
  'crop-insurance': {
    intro: 'Crop insurance helps farmers recover after losses from weather and other listed risks. Options depend on the state, crop and season, so availability needs to be checked first.',
    whoNeeds: ['Farmers who want protection against weather losses', 'Growers of high-value crops', 'Farmers taking crop loans'],
    covers: ['Yield loss from listed perils', 'Weather-index payouts, on index-based products', 'Localised events such as hailstorm, as per the scheme', 'Post-harvest losses, on some plans'],
    excludes: ['Losses from poor farming practice', 'Crops or areas not notified under the plan', 'Risks that are not listed', 'Late enrolment after the cut-off date'],
    tips: ['Check crop and area eligibility before the season', 'Keep land and sowing records in order', 'Report any local damage within the time allowed'],
    claimDocs: ['Land records and sowing proof', 'Policy or enrolment receipt', 'Bank details', 'Loss intimation and photos, where required'],
    faqs: [
      { q: 'Is crop insurance available in Punjab?', a: 'Availability changes with government schemes and insurer offerings. Contact us with your crop and location, and we will check what you can buy this season.' },
      { q: 'How are claims assessed?', a: 'Some products use area yield data or weather readings instead of assessing each field. The policy states which method applies.' },
    ],
    related: ['tractor-insurance', 'livestock-insurance', 'personal-accident-insurance'],
  },
};
