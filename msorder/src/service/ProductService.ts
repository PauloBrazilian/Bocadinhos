import { IProductDto } from "../useCases/IProductsDto";
import axios from 'axios';

class ProductService{

    async findProductsByIds(productIds: number[]): Promise<IProductDto[]> {
        if (!productIds || !Array.isArray(productIds) || productIds.length === 0) {
            throw new Error("Invalid or missing 'productIds'. Expected a non-empty array.");
        }

        try {
            const { status, data } = await axios.get(`http://localhost:8092/products`, {
                params: { ids: productIds.join(',') },
            });
            return data as IProductDto[];
        } catch (error: any) {
            console.error('Error fetching filtered products:', error.message);
            if (error.response) {
                console.error('Response data:', error.response.data);
                console.error('Response status:', error.response.status);
            }
            throw new Error(`Failed to fetch filtered products: ${error.message}`);
        }
    }

}

export default ProductService;