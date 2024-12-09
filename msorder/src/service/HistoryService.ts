import BuyCartRepository from "../repositories/implementations/BuyCartRepository";
import HistoryRepository from "../repositories/implementations/HistoryRepository";

class HistoryService {
    
    private buyCartRepository: BuyCartRepository;
    private historyRepository: HistoryRepository;

    constructor() {
        this.buyCartRepository = new BuyCartRepository();
        this.historyRepository = new HistoryRepository();
    }

    async createHistory(object: any) {       
        const getBuyCart = await this.buyCartRepository.getBuyCart(object.cart[0]);
        
        const history = await this.historyRepository.save({
            buyCart: getBuyCart,
            creationDate: object.creationDate,
            status: object.status
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