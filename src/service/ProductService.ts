import { DataSource, In } from 'typeorm';
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
    const category = await this.getCategory(object.category[0]);

    const savedProduct = await this.productRepository.save({
      name: object.name,
      price: object.price,
      quantity: object.quantity,
      imgUrl: object.image,
      category: category,
    });

    return savedProduct;
  }

  async findAllProducts(query: any) {
    try {    
      const ids = query.ids ? String(query.ids).split(',').map(Number): null;

      let products;

      if (ids && ids.length > 0) {
        products = await this.productRepository.find({
          where: { id: In(ids) },
        });
      } else {        
        products = await this.productRepository.find();
      }

      return products;
    } catch (error: any) {
      throw new Error(error.message);
    }

  }

  async findProductById(id: number) {
    return await this.productRepository.findOne({ where: { id } });
  }

  async updateProduct(id: number, object: any) {
    const product = await this.productRepository.findOne({ where: { id } });
    if (!product) {
      throw new Error('Product not found');
    }
    const savedProduct = await this.productRepository.save({
      ...product,
      name: object.name,
      price: object.price,
      quantity: object.quantity,
      imgUrl: object.image,
      category: await this.getCategory(object.category[0]),
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
