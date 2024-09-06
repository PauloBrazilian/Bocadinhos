import { PersonRepository } from '../repositories/PersonRepository';
import { AdminRepository } from '../repositories/AdminRepository';
import { Person } from '../entity/Person';
import { Admin } from '../entity/Admin';

export class PersonService {
  private personRepository: PersonRepository;
  private adminRepository: AdminRepository;

  constructor( personRepository: PersonRepository, adminRepository: AdminRepository ) {
    this.personRepository = personRepository;
    this.adminRepository = adminRepository;
  }

 
  async createPerson(data: any): Promise<Person> {
    const person = this.personRepository.create(data);
    const savedPerson = await this.personRepository.save(person);

    if (savedPerson.isAdmin) {
      const admin = this.adminRepository.create({
        person: savedPerson,
        access: data.access || 1,  
      });
      await this.adminRepository.save(admin);
    }

    return savedPerson;
  }

  async getPersonByEmail(email: string): Promise<Person | undefined> {
    return this.personRepository.findByEmail(email);
  }


  async getAllAdmins(): Promise<Admin[]> {
    return this.adminRepository.findAllAdmins();
  }
}
