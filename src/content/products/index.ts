import { business } from './business';
import { farm } from './farm';
import { health } from './health';
import { life } from './life';
import { motorHomeTravel } from './motor-home-travel';
import type { ProductDetail } from './types';

export const productDetails: Record<string, ProductDetail> = {
  ...health,
  ...life,
  ...motorHomeTravel,
  ...business,
  ...farm,
};

export type { ProductDetail };
