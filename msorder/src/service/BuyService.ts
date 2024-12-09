import BuyRepository from '../repositories/implementations/BuyCartRepository';

class BuyService {
    
    private buyRepository: BuyRepository;

    constructor() {
        this.buyRepository = new BuyRepository();
    }
    
    async createBuy(obj: any) {
        const buy = await this.buyRepository.save({
            buyCartId: obj.buyCartId,
            payment: obj.payment,
            status: obj.status,
            cart: obj.cart
        });

        return buy;
    }

    async findAllBuys() {
        const buys = await this.buyRepository.findAll();
        return buys;
    }

    async findBuyById(id: number) {
       const searchBuy = await this.buyRepository.findById(id);
       return searchBuy;
    }

    async updateBuy(id: number, obj: any) {
        const searchBuy = await this.buyRepository.findById(id);

        if (!searchBuy) {
            throw new Error(`Buy with ID ${id} not found`);
        }

        const { payment, status, cart } = obj;
        searchBuy.payment = payment;
        searchBuy.status = status;
        searchBuy.cart = cart;
        
        const savedBuy = await this.buyRepository.update(searchBuy);
        return savedBuy;
    }

    async deleteBuy(id: number) {
        const searchBuy = await this.buyRepository.findById(id);
        await this.buyRepository.delete(searchBuy);
    }

}


export default BuyService;