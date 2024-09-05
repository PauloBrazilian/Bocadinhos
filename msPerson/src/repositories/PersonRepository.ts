import { Repository, DataSource } from 'typeorm';
import { Person } from '../entity/Person';

export class PersonRepository extends Repository<Person> {
    
    constructor(dataSource: DataSource) {
        super(Person, dataSource.createEntityManager());
    }

    public async findByName(name: string): Promise<Person[]> {
        return this.createQueryBuilder('person')
            .where('person.name = :name', { name })
            .getMany();
    }


    public async findByEmail(email: string): Promise<Person | undefined> {
        return this.createQueryBuilder('person')
            .where('person.email = :email', { email })
            .getOne();
    }


    public async findAdmins(): Promise<Person[]> {
        return this.createQueryBuilder('person')
            .where('person.isAdmin = :isAdmin', { isAdmin: true })
            .getMany();
    }

    public async findByRole(role: string): Promise<Person[]> {
        return this.createQueryBuilder('person')
            .leftJoinAndSelect('person.role', 'role')
            .where('role.name = :role', { role })
            .getMany();
    }
}
