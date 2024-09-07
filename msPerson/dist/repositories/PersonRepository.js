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
exports.PersonRepository = void 0;
const typeorm_1 = require("typeorm");
const Person_1 = require("../entity/Person");
class PersonRepository extends typeorm_1.Repository {
    constructor(dataSource) {
        super(Person_1.Person, dataSource.createEntityManager());
    }
    // Buscar pessoa pelo nome
    findByName(name) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.createQueryBuilder('person')
                .where('person.name = :name', { name })
                .getMany();
        });
    }
    // Buscar pessoa pelo email
    findByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.createQueryBuilder('person')
                .where('person.email = :email', { email })
                .getOne();
        });
    }
}
exports.PersonRepository = PersonRepository;
