import { PersonRepository } from '../repositories/PersonRepository';
import personSchema from '../Schema/PersonSchema';
import { DataSource } from 'typeorm';


export class PersonService {
  private personRepository: PersonRepository;
  

  constructor( dataSource: DataSource ) {
    this.personRepository = new PersonRepository(dataSource);
  }

 
  async createPerson(data: any) {

    const person = personSchema.parse(data);

    const savedPerson = await this.personRepository.save({
      name: person.name,
      imgurl: person.imgurl,
      cpf: person.cpf,
      email: person.email,
      password: person.password,
      acessEnum: person.acessEnum,
      dataRegistro: person.dataRegistro,
    });

    return savedPerson;
  }

  async findPersonByEmail(email: string) {
    return await this.personRepository.findByEmail(email);
  }


  async findAllPersons() {
    const person = await this.personRepository.find()
    return person;
  }
}
 