import { DataSource, Repository } from 'typeorm';
import { Category } from '../entity/Category';

export class CategoryRepository extends Repository<Category> {
  constructor(dataSource: DataSource) {
    super(Category, dataSource.createEntityManager());
  }

  public async findByName(name: string): Promise<Category[]> {
    return this.createQueryBuilder('category')
      .where('category.categoryName = :name', { name })
      .getMany();
  }
}
