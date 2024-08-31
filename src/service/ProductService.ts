import { Repository, DataSource } from 'typeorm';
import { Product } from '../entity/Product';
import productShema from '../Schema/ProductShema';

class ProductService {
    private productRepository: Repository<Product>;

    constructor(dataSource: DataSource) {
        this.productRepository = dataSource.getRepository(Product);
    }

    async createProduct( object:any ) {        
        const product = productShema.parse(object);
        const savedProduct = await this.productRepository.save({category:product.category, name:product.name, price:product.price, quantity:product.quantity, imgUrl:product.image});             
        return savedProduct;
    }

    async findProducts( object:any ) {
        const products = await this.productRepository.find(object);                        
        return products;
    }

    async findProductById(id: number) {
        const product = await this.productRepository.findOne({ where: { id } });
        if (!product) {
            console.error(`Product with ID ${id} not found.`);
            throw new Error('Product not found'); 
        }
        return product;
    }

    async updateProduct(id: number, object: any) {
        const validatedData = productShema.parse(object);

        const productExist = await this.productRepository.findOne({ where: { id } });
        if (!productExist) {
            throw new Error('Product not found');
        }
    
        const updatedProduct = this.productRepository.merge(productExist, validatedData);
        await this.productRepository.save(updatedProduct);
        return updatedProduct;
    }

    async deleteProduct(id: number) {
        const productExist = await this.productRepository.findOne({ where: { id } });

        if (!productExist) {
            throw new Error('Product not found');
        }

        await this.productRepository.remove(productExist);
    }
}

export default ProductService;