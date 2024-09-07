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
exports.Migration1725676688895 = void 0;
const typeorm_1 = require("typeorm");
class Migration1725676688895 {
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.createTable(new typeorm_1.Table({
                name: "person",
                columns: [
                    {
                        name: "id",
                        type: "int",
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: "increment",
                    },
                    {
                        name: "name",
                        type: "varchar",
                        length: "255",
                    },
                    {
                        name: "imgurl",
                        type: "varchar",
                        length: "255",
                    },
                    {
                        name: "cpf",
                        type: "varchar",
                        length: "11",
                    },
                    {
                        name: "email",
                        type: "varchar",
                        length: "100",
                        isUnique: true,
                    },
                    {
                        name: "password",
                        type: "varchar",
                        length: "255",
                    },
                    {
                        name: "accesEnum",
                        type: "enum",
                        enum: ["ADMIN", "USER"], // Certifique-se de que `acessEnum` tem esses valores, ou ajuste conforme sua enumeração
                    },
                    {
                        name: "dataRegistro",
                        type: "timestamp",
                        default: "CURRENT_TIMESTAMP",
                    },
                ],
            }), true);
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.dropTable("person");
        });
    }
}
exports.Migration1725676688895 = Migration1725676688895;
