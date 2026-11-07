import type { ProductDetail } from './types';

export const health: Record<string, ProductDetail> = {
  'individual-health-insurance': {
    intro: 'An individual health plan gives one person their own cover amount for hospital treatment. Nobody else’s claim can reduce it, and it stays with you when you change jobs.',
    whoNeeds: ['Single adults and self-employed people', 'Anyone whose only cover comes from an employer', 'Family members with higher medical risk who need their own cover'],
    covers: ['Hospital room, doctor and nursing charges', 'Surgery, medicines and diagnostic tests during a stay', 'Pre and post-hospitalisation costs, for the days stated in the policy', 'Day-care procedures that do not need an overnight stay', 'Ambulance charges, up to the policy limit'],
    excludes: ['Waiting periods for pre-existing and some named conditions', 'Cosmetic treatment that is not medically necessary', 'Self-inflicted injury and substance abuse', 'Routine outpatient costs, unless the plan adds them'],
    tips: ['Check room rent limits, since they can reduce your whole claim', 'Tell the insurer about every existing condition when you apply', 'Look at the hospitals near you that are on the insurer’s cashless network'],
    claimDocs: ['Policy copy and health card', 'Hospital discharge summary', 'Final bill with payment receipts', 'Doctor’s prescriptions and test reports', 'Photo ID and bank details'],
    faqs: [
      { q: 'I already have cover at work. Do I need this?', a: 'Employer cover usually ends when you leave the job. A personal plan keeps your protection and your waiting period credit in your own hands.' },
      { q: 'How much cover should I choose?', a: 'It depends on your city, age and hospital preference. Our health cover guide gives you a starting range to discuss.' },
    ],
    related: ['family-floater-health-insurance', 'super-top-up-health-insurance', 'critical-illness-insurance'],
  },
  'family-floater-health-insurance': {
    intro: 'A family floater covers you, your spouse and children under one policy. The whole family shares a single cover amount, which any member can use during the policy year.',
    whoNeeds: ['Young families with children', 'Couples planning a family, once maternity terms have been checked', 'Households that prefer one renewal date and one policy'],
    covers: ['Hospital stays for any insured family member', 'Surgery, medicines, tests and doctor’s fees', 'Pre and post-hospitalisation costs', 'Day-care procedures', 'Maternity and newborn cover, on plans that include it after a waiting period'],
    excludes: ['Waiting periods for pre-existing conditions', 'Maternity costs during the waiting period, or on plans without this benefit', 'Non-medical items, as defined in the policy', 'Treatment outside the policy terms'],
    tips: ['Keep parents on a separate plan, because older members can raise the whole family’s premium', 'Choose enough cover for two hospital stays in one year', 'Check when children must move to their own policy'],
    claimDocs: ['Policy copy and health card of the patient', 'Discharge summary', 'Final bill and receipts', 'Prescriptions and test reports', 'Bank details of the policyholder'],
    faqs: [
      { q: 'What happens if one person uses all the cover?', a: 'The remaining members have nothing left that year unless the plan includes a restore benefit. A restore benefit can refill the cover, subject to its terms.' },
      { q: 'Can I add a newborn or a new spouse?', a: 'Most plans allow additions at set times, and some cover newborns from birth. Your plan’s wording decides the timing and any extra premium.' },
    ],
    related: ['individual-health-insurance', 'senior-citizen-health-insurance', 'super-top-up-health-insurance'],
  },
  'senior-citizen-health-insurance': {
    intro: 'Senior citizen plans are built for people over 60, when hospital visits tend to become more frequent. Terms differ widely, so the details matter more here than the headline cover.',
    whoNeeds: ['Parents over 60 without their own cover', 'Retired employees who have lost company cover', 'NRI children arranging cover for parents in Punjab'],
    covers: ['Hospital stays, surgery and medicines', 'Pre and post-hospitalisation costs', 'Treatment of existing conditions after the waiting period', 'Day-care procedures', 'Health check-ups, on plans that include them'],
    excludes: ['Waiting periods for pre-existing conditions', 'Co-payment, where you pay a set share of each claim', 'Sub-limits on specific treatments such as cataract surgery', 'Undisclosed medical history, which can lead to a rejected claim'],
    tips: ['Compare the co-payment and sub-limits alongside the premium', 'Share complete medical records honestly when you apply', 'Apply early, since some insurers ask for a medical test or may decline cover'],
    claimDocs: ['Policy copy and health card', 'Discharge summary', 'Final bill and receipts', 'Past medical records for the condition', 'ID proof and bank details'],
    faqs: [
      { q: 'Can my parents get cover if they already have diabetes or blood pressure?', a: 'Often yes, though it depends on the insurer’s medical review. There is usually a waiting period before that condition is covered.' },
      { q: 'Is there an upper age limit?', a: 'Entry ages vary by insurer and plan. Tell us your parents’ ages and health history and we will check what is available.' },
    ],
    related: ['family-floater-health-insurance', 'super-top-up-health-insurance', 'critical-illness-insurance'],
  },
  'critical-illness-insurance': {
    intro: 'A critical illness policy pays a fixed lump sum when a listed serious illness is diagnosed. You can use the money for anything, including treatment, loan payments or lost income.',
    whoNeeds: ['The main earner in a family', 'People with long-term financial commitments', 'Anyone with a family history of serious illness, subject to medical review'],
    covers: ['A lump sum on diagnosis of a listed illness', 'Cancer, heart attack, stroke and kidney failure on most plans', 'Major organ transplants', 'Other conditions named in the policy'],
    excludes: ['Illnesses not named in the policy', 'A waiting period after buying, often 90 days', 'A survival period after diagnosis, often 15 to 30 days', 'Pre-existing conditions, as set out in the wording'],
    tips: ['Read the medical definition of each illness, not just its name', 'Treat it as an addition to health insurance and not a replacement', 'Choose an amount that could cover a year or more of income'],
    claimDocs: ['Policy copy', 'Specialist’s diagnosis report', 'Test and investigation reports', 'Completed claim form', 'ID proof and bank details'],
    faqs: [
      { q: 'How is this different from health insurance?', a: 'Health insurance repays hospital bills. Critical illness cover pays a fixed sum on diagnosis, whatever the actual bills are.' },
      { q: 'Does the policy continue after a claim?', a: 'Many plans end once the lump sum is paid. Some multi-claim plans continue, so check before you buy.' },
    ],
    related: ['individual-health-insurance', 'personal-accident-insurance', 'term-life-insurance'],
  },
  'personal-accident-insurance': {
    intro: 'Personal accident cover pays out if an accident causes death or disability. It can be a useful, affordable addition for anyone who depends on being able to work.',
    whoNeeds: ['People who travel daily or ride two-wheelers', 'Workers in physically demanding jobs', 'Self-employed people with no sick pay'],
    covers: ['Accidental death benefit', 'Permanent total disability', 'Permanent partial disability, based on a table in the policy', 'Temporary total disability income, on plans that include it'],
    excludes: ['Illness and natural death', 'Injuries under the influence of alcohol or drugs', 'Self-inflicted injury', 'Hazardous activities, unless they are declared and covered'],
    tips: ['Declare your exact occupation, since premiums and cover depend on it', 'Check the disability table to see how each injury pays', 'See if the plan adds a benefit for children’s education or loan repayment'],
    claimDocs: ['Completed claim form', 'Police report or FIR, where applicable', 'Medical and disability certificates', 'Post-mortem report and death certificate, in a fatal claim', 'Bank details'],
    faqs: [
      { q: 'Does it pay hospital bills?', a: 'Not usually, unless the plan adds accidental medical expenses. Keep separate health insurance for hospital treatment.' },
      { q: 'Does my motor policy already include this?', a: 'Motor policies carry a compulsory cover for the owner-driver, but only while driving. A separate plan covers accidents anywhere.' },
    ],
    related: ['term-life-insurance', 'individual-health-insurance', 'two-wheeler-insurance'],
  },
  'super-top-up-health-insurance': {
    intro: 'A super top-up adds a large layer of cover above a set deductible. It can raise your total protection, often for less than increasing your base health plan.',
    whoNeeds: ['Families whose base plan may not cover a major illness', 'Employees who want more cover than their company offers', 'People who want higher cover on a tighter budget'],
    covers: ['Hospital costs above the deductible for the policy year', 'Multiple smaller claims that add up past the deductible', 'Surgery, medicines and tests during hospital stays', 'Pre and post-hospitalisation costs, as per the plan'],
    excludes: ['Costs below the deductible', 'Waiting periods for pre-existing conditions', 'Standard health policy exclusions', 'Treatment that is outside the policy terms'],
    tips: ['Match the deductible to your base plan’s cover', 'Choose a super top-up over a regular top-up, which counts each claim separately', 'Check whether your base plan and the super top-up can settle one claim together'],
    claimDocs: ['Base policy claim settlement letter', 'Attested bills and discharge summary', 'Prescriptions and test reports', 'Completed claim form', 'Bank details'],
    faqs: [
      { q: 'Do I need a base health plan as well?', a: 'It is not always required, but you would have to pay costs below the deductible yourself. Most people pair the two.' },
      { q: 'What is a deductible?', a: 'It is the amount of yearly hospital cost you or your base plan pay before the super top-up starts paying.' },
    ],
    related: ['family-floater-health-insurance', 'individual-health-insurance', 'senior-citizen-health-insurance'],
  },
};
