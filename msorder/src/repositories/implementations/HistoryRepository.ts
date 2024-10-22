import { Repository } from "typeorm";
import { AppDataSource } from "../../DataSource";
import { History } from "../../entity/History";
import { IHistoryRepository } from "../IHistoryRepository";

export default class HistoryRepository implements IHistoryRepository{
    
    private ormRepository: Repository<History>;

    constructor() {
        this.ormRepository = AppDataSource.getRepository(History);
    }

    async save(historyData: Partial<History>): Promise<History> {
        const history = this.ormRepository.create(historyData);
        return await this.ormRepository.save(history);
    }

    async findAll(): Promise<History[]> {
        return await this.ormRepository.find();
    }

    async findById(id: number): Promise<History> {
        const history = await this.ormRepository.findOne({ where: { id } });
        if (!history) {
            throw new Error(`Cart with id ${id} not found`);
        }
        return history;
    }

    async update(history: History): Promise<History> {
        return await this.ormRepository.save(history); 
    }

    async delete(history: History): Promise<void> {
        await this.ormRepository.remove(history);
    }
    
}