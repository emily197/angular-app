export interface Product {
  id?: string;
  name: string;
  barcode?: string;
  slug?: string;
  image: string;

  shortDescription?: string;
  longDescription?: string;

  categoryId: string;
  subcategoryId?: string;
  brand?: string;

  price: number;
  discountPrice?: number;
  cost?: number;
  stock: number;
  unit: 'unit' | 'kg' | 'liters' | 'box' | string;

  isActive: boolean ;
}
