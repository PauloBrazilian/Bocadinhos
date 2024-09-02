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
exports.Migration1725308851903 = void 0;
const typeorm_1 = require("typeorm");
class Migration1725308851903 {
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.createTable(new typeorm_1.Table({
                name: 'product',
                columns: [
                    {
                        name: 'id',
                        type: 'int',
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: 'increment',
                    },
                    {
                        name: 'name',
                        type: 'varchar',
                        length: '255',
                    },
                    {
                        name: 'imgUrl',
                        type: 'varchar',
                        length: '255',
                        isNullable: true,
                    },
                    {
                        name: 'quantity',
                        type: 'int',
                    },
                    {
                        name: 'price',
                        type: 'decimal',
                        precision: 10,
                        scale: 2,
                    },
                    {
                        name: 'categoryId',
                        type: 'int',
                        isNullable: true,
                    },
                ]
            }), true);
            yield queryRunner.createForeignKey('product', new typeorm_1.TableForeignKey({
                columnNames: ['categoryId'],
                referencedColumnNames: ['id'],
                referencedTableName: 'category',
                onDelete: 'SET NULL',
            }));
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.dropForeignKey('product', 'FK_product_category');
            yield queryRunner.dropTable('product');
        });
    }
}
exports.Migration1725308851903 = Migration1725308851903;
