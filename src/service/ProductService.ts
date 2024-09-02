import { DataSource } from 'typeorm';
import productShema from '../schema/ProductShema';
import { CategoryRepository } from '../repositories/CategoryRepository';
import { ProductRepository } from '../repositories/ProductRepository';

class ProductService {
  private productRepository: ProductRepository;
  private categoryRepository: CategoryRepository;

  constructor(dataSource: DataSource) {
    this.productRepository = new ProductRepository(dataSource);
    this.categoryRepository = new CategoryRepository(dataSource);
  }

  async createProduct(object: any) {
    const product = productShema.parse(object);
    const category = await this.getCategory(product.category[0]);

    const savedProduct = await this.productRepository.save({
      name: product.name,
      price: product.price,
      quantity: product.quantity,
      imgUrl: product.image,
      category: category,
    });

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

  async updateProduct(id: number, object: any) {
    const product = await this.productRepository.findOne({ where: { id } });
    if (!product) {
      throw new Error('Product not found');
    }
    const updatedProduct = productShema.parse(object);
    const savedProduct = await this.productRepository.save({
      ...product,
      name: updatedProduct.name,
      price: updatedProduct.price,
      quantity: updatedProduct.quantity,
      imgUrl: updatedProduct.image,
      category: await this.getCategory(updatedProduct.category[0]),
    });
    return savedProduct;
  }

  async deleteProduct(id: number) {
    const product = await this.productRepository.findOne({ where: { id } });
    if (!product) {
      throw new Error('Product not found');
    }
    await this.productRepository.remove(product);
    return true;
  }

  private async getCategory(name: string) {
    const categories = await this.categoryRepository.findByName(name);

    if (!categories || categories.length === 0) {
      throw new Error('Category not found');
    }

    return categories[0];
  }
}

export default ProductService;
