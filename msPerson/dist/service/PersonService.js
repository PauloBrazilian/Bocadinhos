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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PersonService = void 0;
const PersonRepository_1 = require("../repositories/PersonRepository");
const PersonSchema_1 = __importDefault(require("../Schema/PersonSchema"));
class PersonService {
    constructor(dataSource) {
        this.personRepository = new PersonRepository_1.PersonRepository(dataSource);
    }
    createPerson(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const person = PersonSchema_1.default.parse(data);
            const savedPerson = yield this.personRepository.save({
                name: person.name,
                imgurl: person.imgurl,
                cpf: person.cpf,
                email: person.email,
                password: person.password,
                acessEnum: person.acessEnum,
                dataRegistro: person.dataRegistro,
            });
            return savedPerson;
        });
    }
    findPersonByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.personRepository.findByEmail(email);
        });
    }
    findAllPersons() {
        return __awaiter(this, void 0, void 0, function* () {
            const person = yield this.personRepository.find();
            return person;
        });
    }
}
exports.PersonService = PersonService;
