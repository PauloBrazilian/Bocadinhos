import { Product } from '../../entity/Product';
import { Category } from '../../entity/Category';

describe('Product Entity', () => {
  it('should create a product with all fields', () => {
    const category = new Category();
    category.id = 1;
    category.categoryName = 'Electronics';

    const product = new Product();
    product.id = 1;
    product.name = 'Laptop';
    product.imgUrl = 'http://example.com/laptop.png';
    product.quantity = 10;
    product.price = 999.99;
    product.category = category;

    expect(product).toBeInstanceOf(Product);
    expect(product.id).toBe(1);
    expect(product.name).toBe('Laptop');
    expect(product.imgUrl).toBe('http://example.com/laptop.png');
    expect(product.quantity).toBe(10);
    expect(product.price).toBe(999.99);
    expect(product.category).toBe(category);
  });

  it('should create a product without optional fields', () => {
    const product = new Product();
    product.id = 2;
    product.name = 'Mouse';
    product.quantity = 50;
    product.price = 19.99;

    expect(product).toBeInstanceOf(Product);
    expect(product.id).toBe(2);
    expect(product.name).toBe('Mouse');
    expect(product.imgUrl).toBeUndefined();
    expect(product.quantity).toBe(50);
    expect(product.price).toBe(19.99);
    expect(product.category).toBeUndefined();
  });
});
