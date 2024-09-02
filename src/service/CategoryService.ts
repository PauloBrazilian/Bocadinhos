import { DataSource } from 'typeorm';
import { CategoryRepository } from '../repositories/CategoryRepository';
import categoryShema from '../schema/CategoryShema';
import { ProductRepository } from '../repositories/ProductRepository';

class CategoryService {
    private productRepository: ProductRepository;
    private categoryRepository: CategoryRepository;
  
    constructor(dataSource: DataSource) {
      this.productRepository = new ProductRepository(dataSource);
      this.categoryRepository = new CategoryRepository(dataSource);
    }

  async createCategory(object: any) {
    const category = categoryShema.parse(object);
    const savedCategory = await this.categoryRepository.save({
        categoryName: category.name
    });
    return savedCategory;
  }

  async findAllCategories() {
    const categories = await this.categoryRepository.find();
    return categories;
  }

  async findAllProductsByCategories(name: string) {
    const products = await this.productRepository.findByCategory(name);
    return products;
  }

}

export default CategoryService;
