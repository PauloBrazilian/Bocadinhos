import { BuyCart } from "../entity/BuyCart";

export interface IBuyCartRepository {
    create(buyCart: BuyCart): Promise<BuyCart>;
    findById(buyCartId: number): Promise<BuyCart>;
    update(buyCart: BuyCart): Promise<BuyCart>;
    delete(buyCartId: number): Promise<void>;
}