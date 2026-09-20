import { MongoClient } from 'mongodb';

const URI = "mongodb+srv://eva2_spring:12345@eva-u3-express.veulo94.mongodb.net/?appName=eva-u3-express";

const client = new MongoClient(URI);

export const DB_NAME = 'cine-db';
export async function connectDB() {
    try {
        await client.connect();
        console.log('Conexión exitosa con MongoDB Atlas');
        return client.db(DB_NAME);
    } catch (error) {
        console.error('Error al conectar con MongoDB Atlas:', error);
        throw error;
    }
}
export { client };