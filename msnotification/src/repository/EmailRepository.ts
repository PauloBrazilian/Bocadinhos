import { DataSource, Repository } from "typeorm";
import { Email } from "../entity/Email";

export class EmailRepository extends Repository<Email> {
    
    constructor(dataSource: DataSource) {
        super(Email, dataSource.createEntityManager());
    }

}