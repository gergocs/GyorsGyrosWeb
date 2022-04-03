import {Ingredient} from "./ingredient";

export interface Food {
  name: string;
  ingredients: Ingredient[];
  price: number;
  image: string;
}
