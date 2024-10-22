import { Cart } from "../entity/Cart";

export interface ICartRepository {
    save(cartData: Partial<Cart>): Promise<Cart>
    findAll(): Promise<Cart[]>
    getCart(cartId: number): Promise<Cart>
    findById(id: number): Promise<Cart>
    update(cart: Cart): Promise<Cart>
    delete(cart: Cart): Promise<void>
}