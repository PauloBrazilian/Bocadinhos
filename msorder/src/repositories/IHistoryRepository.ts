import { History } from "../entity/History";

export interface IHistoryRepository {
    save(historyData: Partial<History>): Promise<History>
    findAll(): Promise<History[]>
    findById(id: number): Promise<History>
    update(history: History): Promise<History>
    delete(history: History): Promise<void>
}