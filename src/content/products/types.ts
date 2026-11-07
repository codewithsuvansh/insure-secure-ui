export interface ProductDetail {
  intro: string;
  whoNeeds: string[];
  covers: string[];
  excludes: string[];
  tips: string[];
  claimDocs: string[];
  faqs: { q: string; a: string }[];
  related: string[];
}
