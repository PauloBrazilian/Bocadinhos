import {Request, Response } from 'express';
import { PersonService } from '../service/personService';
import { DataSource } from 'typeorm';
import { z } from 'zod';



export default class PersonController {
    private personService: PersonService;

    constructor(dataSource: DataSource) {
        this.personService = new PersonService(dataSource);
    }

    async createPerson(request: Request, response: Response): Promise<Response> {
        try{
            const createPerson = await this.personService.createPerson(request.body);
            return response.status(201).json(createPerson);
        }catch ( error ){
            console.error(error)
            if (error instanceof z.ZodError) {
                console.error(error.errors);
                throw new Error("Invalid data");
            }else{
                throw new Error("Internal server error")
            }
        }
    }
    
    async findPersonByEmail(request: Request, response: Response): Promise<Response> {
        try{
            const person = await this.personService.findPersonByEmail(request.params.email);
            return response.status(200).json(person);
            
        }catch (error) {
            console.error(error);
            throw new Error("Internal server error");
        }
    }

    async findAllPersons(request: Request, response: Response): Promise<Response> {
        try {
            const admins = await this.personService.findAllPersons();
            return response.status(200).json(admins);
        } catch (error) {
            console.error(error);
            throw new Error("Internal server error");
        }
    }

}
