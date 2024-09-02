import { Repository, DataSource } from 'typeorm';
import { Product } from '../entity/Product';

export class ProductRepository extends Repository<Product> {
    
    constructor(dataSource: DataSource) {
        super(Product, dataSource.createEntityManager());
    }

    public async findByName(name: string): Promise<Product[]> {
        return this.createQueryBuilder('product')
            .where('product.name = :name', { name })
            .getMany();
    }

    public async findByCategory(category: string): Promise<Product[]> {
        return this.createQueryBuilder('product')
            .leftJoinAndSelect('product.category', 'category')
            .where('category.name = :category', { category })
            .getMany();
    }
    
}