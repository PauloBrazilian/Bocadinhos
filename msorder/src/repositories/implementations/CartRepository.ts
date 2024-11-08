import { Repository } from 'typeorm';
import { AppDataSource } from '../../DataSource';
import { Cart } from '../../entity/Cart';
import { ICartRepository } from '../ICartRepository';

export default class CartRepository implements ICartRepository {
  private ormRepository: Repository<Cart>;

  constructor() {
    this.ormRepository = AppDataSource.getRepository(Cart);
  }

  async save(cartData: Partial<Cart>): Promise<Cart> {
    const cart = this.ormRepository.create(cartData);
    return await this.ormRepository.save(cart);
  }

  async findAll(): Promise<Cart[]> {
    return await this.ormRepository.find();
  }

  async getCart(cartId: number): Promise<Cart> {
    const cart = await this.ormRepository.findOne({ where: { cartId: cartId } });
    if (!cart) {
      throw new Error(`Cart with id ${cartId} not found`);
    }
    return cart;
  }

  async findById(cartId: number): Promise<Cart> {
    const cart = await this.ormRepository.findOne({ where: { cartId } });
    if (!cart) {
      throw new Error(`Cart with id ${cartId} not found`);
    }
    return cart;
  }

  async update(cart: Cart): Promise<Cart> {
    return await this.ormRepository.save(cart);
  }

  async delete(cart: Cart): Promise<void> {
    await this.ormRepository.remove(cart);
  }
  
}
