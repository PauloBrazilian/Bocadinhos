import { IsString, IsOptional, IsNotEmpty, IsNumber, IsPositive, IsArray } from "class-validator";


export class ProductDTO {
    
    @IsOptional()
    @IsString()
    @IsNotEmpty()
    name?: string;

    @IsOptional()
    @IsString()
    @IsNotEmpty()
    imgUrl?: string;

    @IsOptional()
    @IsNumber()
    @IsPositive()
    quantity?: number;

    @IsOptional()
    @IsNumber()
    price?: number;

    @IsOptional()
    @IsArray()
    @IsString({ each: true })
    category?: string[];
}