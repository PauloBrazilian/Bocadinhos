import { Category } from "../useCases/ICategoryDto";

export interface IProductsDto {    
    id: number;    
    name: string;    
    imgUrl?: string;    
    quantity: number;    
    price: number;    
    category?: Category;
}