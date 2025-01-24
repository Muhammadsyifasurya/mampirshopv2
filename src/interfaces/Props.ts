export interface ProductData {
  title: string;
  price: number;
  description: string;
  categoryId: number | null;
  images: string[];
}

export interface Product {
  id: number;
  title: string;
  images: string[];
  price: number;
  description: string;
  categoryId: number | null;
}
