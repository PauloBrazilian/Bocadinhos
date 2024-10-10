"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const personService_1 = require("../service/personService");
const zod_1 = require("zod");
class PersonController {
    constructor(dataSource) {
        this.personService = new personService_1.PersonService(dataSource);
    }
    createPerson(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const createPerson = yield this.personService.createPerson(request.body);
                return response.status(201).json(createPerson);
            }
            catch (error) {
                console.error(error);
                if (error instanceof zod_1.z.ZodError) {
                    console.error(error.errors);
                    throw new Error("Invalid data");
                }
                else {
                    throw new Error("Internal server error");
                }
            }
        });
    }
    findPersonByEmail(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const person = yield this.personService.findPersonByEmail(request.params.email);
                return response.status(200).json(person);
            }
            catch (error) {
                console.error(error);
                throw new Error("Internal server error");
            }
        });
    }
    findAllPersons(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const admins = yield this.personService.findAllPersons();
                return response.status(200).json(admins);
            }
            catch (error) {
                console.error(error);
                throw new Error("Internal server error");
            }
        });
    }
}
exports.default = PersonController;
