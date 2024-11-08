import { IProductsDto } from "../useCases/IProductsDto";
import axios from 'axios';

class ProductService{

    async findProductById(productId: number): Promise<IProductsDto> {
        try {
            const { status, data } = await axios.get(`http://localhost:8092/products/${productId}`);
            return data as IProductsDto;
        } catch (error: any) {
            console.error('Error fetching product:', error.message);
            if (error.response) {
                console.error('Response data:', error.response.data);
                console.error('Response status:', error.response.status);
            }
            throw new Error(`Failed to fetch product: ${error.message}`);
        }

    }

}

export default ProductService;