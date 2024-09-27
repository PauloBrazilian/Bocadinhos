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


  public async findByEmail(email: string): Promise<Person | null> {
    return this.createQueryBuilder('person')
      .where('person.email = :email', { email })
      .getOne();
  }



}
