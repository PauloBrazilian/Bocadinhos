import { Repository, DataSource } from 'typeorm';
import { Admin } from '../entity/Admin';

export class AdminRepository extends Repository<Admin> {

  constructor(dataSource: DataSource) {
    super(Admin, dataSource.createEntityManager());
  }

  // Buscar todos os admins
  public async findAllAdmins(): Promise<Admin[]> {
    return this.createQueryBuilder('admin')
      .leftJoinAndSelect('admin.person', 'person')
      .getMany();
  }

  // Buscar admins por nível de acesso
  public async findByAccess(level: number): Promise<Admin[]> {
    return this.createQueryBuilder('admin')
      .where('admin.access = :level', { level })
      .getMany();
  }
}
