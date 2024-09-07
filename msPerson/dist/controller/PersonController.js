"use strict";
/* import {Request, Response } from 'express';
import { PersonService } from '../service/PersonService';
import { DataSource } from 'typeorm';
import { z } from 'zod';
import { error } from 'console';


export default class PersonController {
    private personService: PersonService;

    constructor(dataSource: DataSource) {
        this.personService = new PersonService(dataSource);
    }

    async createPerson(request: Request, response: Response): Promise<Response> {
        try{
            const createPerson = await this.personService.createPerson(request.body);
            return response.status(201).json(createPerson);
        }catch{
            if (error instanceof z.ZodError) {
                console.error(error.errors);
                throw new Error("Invalid data");
            }else{
                throw new Error("Internal server error")
            }
        }
    }
    
    async getPersonByEmail(request: Request, response: Response): Promise<Response> {
        try{
            const { email } = request.params;
            const person = await this.personService.getPersonByEmail(email);
            if (person) {
                return response.status(200).json(person);
            }
            return response.status(404).json({ message: 'Pessoa não encontrada' });
        }catch (error) {
            return response.status(500).json({ message: 'Erro ao buscar pessoa', error});
        }
    }

    async getAllAdmins(request: Request, response: Response): Promise<Response> {
        try {
            const admins = await this.personService.getAllAdmins();
            return response.status(200).json(admins);
        } catch (error) {
            return response.status(500).json({ message: 'Erro ao buscar administradores', error })
        }
    }

}
 */ 
