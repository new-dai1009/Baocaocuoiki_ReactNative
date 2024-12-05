import { DataSource, DataSourceOptions } from "typeorm"
import * as dotenv from 'dotenv'

dotenv.config();

export const databaseConfig:DataSourceOptions = {
    type:'mysql',
    host: process.env.DB_HOST,
    port:Number(process.env.DB_POST),
    username:process.env.DB_USER,
    password:process.env.DB_PASSWORD,
    database:process.env.DB_NAME,
}
const AppDataSource = new DataSource({
    ...databaseConfig,
    migrations:['src/database/migration/*.ts']
 })
 export default AppDataSource