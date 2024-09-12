import { PersonRepository } from '../repositories/PersonRepository';
import { Person } from '../entity/Person';
import personSchema from '../Schema/PersonSchema';
import { DataSource } from 'typeorm';


export class PersonService {
  private personRepository: PersonRepository;
  

  constructor( dataSource: DataSource ) {
    this.personRepository = new PersonRepository(dataSource);
  }

 
  async createPerson(data: any) {

    const person = personSchema.parse(data);
    const savedPerson = await this.personRepository.save(person);

    return savedPerson;
  }

  async getPersonByEmail(email: string): Promise<Person | undefined> {
    return this.personRepository.findByEmail(email);
  }


  async getAllAdmins(): Promise<Admin[]> {
    return this.adminRepository.findAllAdmins();
  }
}
 