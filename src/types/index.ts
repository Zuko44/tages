export interface Product {
  id: string;
  name: string;
  code: string | null;
  price: Price;
  image: Image;
  material: number;
}

export interface Price {
  old_price: number | null;
  current_price: number;
}

export interface Image {
  url: string;
}

export interface Materials {
  id: string;
  name: string;
}
