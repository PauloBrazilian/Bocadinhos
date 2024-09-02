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

    async findProductById(id: number) {
        const product = await this.productRepository.findOne({ where: { id } });
        return product;
    }

    async findAllProducts() {
        const products = await this.productRepository.find();
        return products;
    }

    async updateProduct(id: number, object:any) {
        const product = await this.productRepository.findOne({ where: { id } });
        if (!product) {
            throw new Error('Product not found');
        }
        const updatedProduct = productShema.parse(object);
        const savedProduct = await this.productRepository.save({
            ...product,
            category: updatedProduct.category,
            name: updatedProduct.name,
            price: updatedProduct.price,
            quantity: updatedProduct.quantity,
            imgUrl: updatedProduct.image
        });
        return savedProduct;
    }

    async deleteProduct(id:number) {
        const product = await this.productRepository.findOne({ where: { id } });
        if (!product) {
            throw new Error('Product not found');
        }
        await this.productRepository.remove(product);
        return true;
    }

    
}

export default ProductService;