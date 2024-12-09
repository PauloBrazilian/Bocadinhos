import { BuyCart } from "../entity/BuyCart";

export interface IBuyCartRepository {
    save(buyCart: BuyCart): Promise<BuyCart>;
    findById(buyCartId: number): Promise<BuyCart>;
    findAll(): Promise<BuyCart[]>;
    update(buyCart: BuyCart): Promise<BuyCart>;
    delete(buyCart: BuyCart): Promise<void>;
}