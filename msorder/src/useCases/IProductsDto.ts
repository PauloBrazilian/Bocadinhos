import { Category } from "../useCases/ICategoryDto";

export interface IProductDto {    
    id: number;    
    name: string;    
    imgUrl?: string;    
    quantity: number;    
    price: number;    
    category?: Category;
}