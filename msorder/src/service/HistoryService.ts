import CartRepository from "../repositories/implementations/CartRepository";
import HistoryRepository from "../repositories/implementations/HistoryRepository";

class HistoryService {
    
    private cartRepository: CartRepository;
    private historyRepository: HistoryRepository;

    constructor() {
        this.cartRepository = new CartRepository();
        this.historyRepository = new HistoryRepository();
    }

    async createHistory(object: any) {       
        const getCart = await this.cartRepository.getCart(object.cart[0]);
        
        const history = await this.historyRepository.save({
            cart: getCart,
            creationDate: object.creationDate
        });
        return history;
    }
    
    async findAllHistories() {
        const history = await this.historyRepository.findAll();
        return history;
    }

    async findHistoryById(id: number) {
        const history = await this.historyRepository.findById(id);
        return history;
    }

    async updateHistory(id: number, object: any) {
        const searchHistory = await this.historyRepository.findById(id);

        if (searchHistory === undefined) {
            throw new Error("history not found");
        }

        const savedHistory = await this.historyRepository.update(searchHistory);
        return savedHistory;
    }

    async deleteHistory(id: number) {
        const searchHistory = await this.historyRepository.findById(id);
        await this.historyRepository.delete(searchHistory);
    }

}

export default HistoryService;