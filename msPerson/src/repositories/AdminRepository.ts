import { Repository, DataSource } from 'typeorm';
import { Admin } from '../entity/Admin';

export class AdminRepository extends Repository<Admin> {
    
    constructor(dataSource: DataSource) {
        super(Admin, dataSource.createEntityManager());
    }

    public async findByAccessLevel(acess: number): Promise<Admin[]> {
        return this.createQueryBuilder('admin')
            .where('admin.access = :acess', { acess })
            .getMany();
    }
}
