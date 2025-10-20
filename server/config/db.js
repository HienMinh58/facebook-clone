import mongoose from 'mongoose'
import dotenv from "dotenv"
import { Sequelize } from "sequelize";
dotenv.config()
export const connect_mg = async () => {
    try{
        const mongoConn = await mongoose.connect(process.env.MONGO_URI) 
        console.log(`MongoDB connected: ${mongoConn.connection.host}`);
    } catch (error){
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
}

export const sequelize = new Sequelize({
    username: process.env.PG_USER,
    host: process.env.PG_HOST,
    database: process.env.PG_DB,
    password: process.env.PG_PASSWORD,
    port: process.env.PG_PORT,
    dialect: "postgres",
    logging: false,
});

export const connect_pg = async () => {
    try {
        await sequelize.authenticate();
        console.log(`PostgreSQL connected `);
        await sequelize.sync({ force: false });
        console.log(`Database synchronized successfully`)
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}