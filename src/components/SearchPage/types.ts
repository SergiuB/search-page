export interface ITourItemAPI {
  id: number;
  tour_name: string;
  length: number;
  description: string;
  price: number;
  saving: number;
  currency: string;
  destinations: string[];
  age_from: number;
  age_to: number;
  rating: number;
  tour_operator: string;
  country: string;
  tour_image: string;
  map_image: string;
}
