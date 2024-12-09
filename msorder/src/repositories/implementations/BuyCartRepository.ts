import { Repository } from "typeorm/repository/Repository";
import { BuyCart } from "../../entity/BuyCart";
import { AppDataSource } from "../../DataSource";
import { IBuyCartRepository } from "../IBuyCartRepository";

export default class BuyCartRepository implements IBuyCartRepository {
   
    private ormRepository: Repository<BuyCart>;

    constructor() {
        this.ormRepository = AppDataSource.getRepository(BuyCart);
    }

    async save(buyCart: BuyCart): Promise<BuyCart> {
        const newBuyCart = this.ormRepository.create(buyCart);
        await this.ormRepository.save(newBuyCart);
        return newBuyCart;
    }

    async getBuyCart(buyCartId: number): Promise<BuyCart> {
        const buyCart = await this.ormRepository.findOneBy({ buyCartId: buyCartId });
        if (!buyCart) {
            throw new Error("BuyCart not found");
        }
        return buyCart;
    }

    async findAll(): Promise<BuyCart[]>{
        const buycart = await this.ormRepository.find();
        return buycart;
    }

    async findById(buyCartId: number): Promise<BuyCart> {
        const buyCart = await this.ormRepository.findOneBy({ buyCartId: buyCartId });
        if (!buyCart) {
            throw new Error("BuyCart not found");
        }
        return buyCart;
    }

    async update(buyCart: BuyCart): Promise<BuyCart> {
        await this.ormRepository.save(buyCart);
        return buyCart;
    }

    async delete(buyCart: BuyCart): Promise<void> {
        await this.ormRepository.delete(buyCart);
    }
    
} 