export interface ClaimType {
  id: string;
  label: string;
  /** Used in the WhatsApp message: "I need help with a ___ claim." */
  noun: string;
  first: string;
  steps: { title: string; detail: string }[];
  documents: string[];
}

export const claimTypes: ClaimType[] = [
  {
    id: 'health',
    label: 'Health',
    noun: 'health insurance',
    first: 'For a planned admission, ask about cashless approval before the hospital stay. In an emergency, tell the insurer or its administrator as soon as you can.',
    steps: [
      { title: 'Tell the insurer', detail: 'Notify the insurer or its third-party administrator within the time set out in your policy.' },
      { title: 'Choose cashless or reimbursement', detail: 'At a network hospital, the hospital desk can request cashless approval. Otherwise, you pay first and claim it back.' },
      { title: 'Keep every paper', detail: 'Collect original bills, reports, prescriptions and the discharge summary before you leave.' },
      { title: 'Submit and follow up', detail: 'Send your claim within the policy’s deadline, and reply quickly to any questions from the insurer.' },
    ],
    documents: ['Policy copy or health card', 'Completed claim form', 'Discharge summary', 'Final hospital bill and receipts', 'Prescriptions and test reports', 'Photo ID and cancelled cheque'],
  },
  {
    id: 'motor',
    label: 'Motor',
    noun: 'motor insurance',
    first: 'Make sure that everyone is safe, then photograph the scene. Tell the insurer before you get the vehicle repaired.',
    steps: [
      { title: 'Report the incident', detail: 'Tell the insurer as soon as possible. For theft, third-party injury or major damage, file a police report too.' },
      { title: 'Arrange a survey', detail: 'The insurer may send a surveyor to inspect the damage, so wait for approval before starting repairs.' },
      { title: 'Choose your garage', detail: 'A network garage may allow cashless repair. At other garages, you usually pay first and claim it back.' },
      { title: 'Submit the final papers', detail: 'Share the invoices and any further documents so that the claim can be closed.' },
    ],
    documents: ['Policy copy', 'Registration certificate', 'Driving licence', 'Completed claim form', 'FIR, if applicable', 'Repair estimate and final invoice'],
  },
  {
    id: 'life',
    label: 'Life',
    noun: 'life insurance',
    first: 'We are sorry for your loss. There is no need to rush on the first day. When you are ready, the nominee can inform the insurer and we can guide you through the paperwork.',
    steps: [
      { title: 'Inform the insurer', detail: 'The nominee or family member shares the policy number and the date and cause of death.' },
      { title: 'Gather the documents', detail: 'The insurer lists what it needs based on the policy and the circumstances.' },
      { title: 'Submit the claim', detail: 'The nominee sends the signed form with all the documents and bank details.' },
      { title: 'Respond to questions', detail: 'The insurer may request further records. We help you understand and respond to these requests.' },
    ],
    documents: ['Death certificate', 'Policy document', 'Completed claim form', 'Nominee’s ID and bank details', 'Medical records, where relevant', 'FIR and post-mortem report, for an accidental death'],
  },
  {
    id: 'home',
    label: 'Home and property',
    noun: 'home or property insurance',
    first: 'Make the place safe and prevent further damage. Photograph everything, and keep damaged items until the insurer’s surveyor has seen them.',
    steps: [
      { title: 'Report it at once', detail: 'Tell the insurer. For burglary or theft contact the police, and for a fire keep the fire brigade report.' },
      { title: 'Protect the evidence', detail: 'Keep damaged goods and take photographs and videos before anything is cleared.' },
      { title: 'Work with the surveyor', detail: 'Share ownership papers, bills and repair estimates when the surveyor requests them.' },
      { title: 'Submit the claim', detail: 'Complete the claim form and share the final invoices or estimates.' },
    ],
    documents: ['Policy copy', 'Completed claim form', 'FIR or fire brigade report', 'Photos and videos of the damage', 'Bills and proof of ownership', 'Repair estimate'],
  },
  {
    id: 'travel',
    label: 'Travel',
    noun: 'travel insurance',
    first: 'In a medical emergency, get treatment first. Then call the assistance number on your policy, which is available for help while you are overseas.',
    steps: [
      { title: 'Call the assistance team', detail: 'Use the number on your policy, and ask about direct payment to the hospital where possible.' },
      { title: 'Report any loss', detail: 'For baggage, get a report from the airline. For theft or a lost passport, contact the local police.' },
      { title: 'Keep your documents', detail: 'Save your medical reports, bills, boarding passes and any airline letters.' },
      { title: 'Submit after you return', detail: 'Send the claim within the policy’s deadline. We can help you organise the paperwork.' },
    ],
    documents: ['Policy copy and passport', 'Completed claim form', 'Medical reports and bills', 'Tickets and boarding passes', 'Airline or police report', 'Bank details'],
  },
  {
    id: 'business',
    label: 'Business and cargo',
    noun: 'business insurance',
    first: 'Protect people and property first, then notify the insurer immediately. For cargo, note any damage on the delivery receipt and hold the goods for inspection.',
    steps: [
      { title: 'Notify immediately', detail: 'Tell the insurer in writing, and inform the police, fire brigade or carrier if relevant.' },
      { title: 'Limit the loss', detail: 'Take reasonable steps to prevent more damage, and preserve the evidence.' },
      { title: 'Work with the surveyor', detail: 'Share your stock records, invoices and financial details on request.' },
      { title: 'Submit your statement', detail: 'Provide a claim statement that shows how you calculated the loss.' },
    ],
    documents: ['Policy copy', 'Completed claim form', 'FIR or fire brigade report', 'Stock records and invoices', 'Shipping documents, for cargo', 'Survey and repair estimates'],
  },
];
