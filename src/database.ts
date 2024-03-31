import * as mongodb from 'mongodb';
import { Employee } from './employee';

export const collections: {
    employees?: mongodb.Collection<Employee>;
} = {}

export async function connectToDatabase(uri: string) {
    try {
        const client = new mongodb.MongoClient(uri);
        await client.connect();
        const db = client.db('mean-stack-project');
       // await applySchemaValidation(db);
        const employeesConnection = db.collection<Employee>('employees');
        collections.employees = employeesConnection;
    } catch (error) {
        console.error('Error connecting to database:', error);
        throw error;
    }
}

// async function applySchemaValidation(db: mongodb.Db) {
//     try {
//         // Define your JSON schema for validation
//         const jsonSchema = {};

//         // Apply schema validation to the 'employees' collection
//         await db.command({ collMod: 'employees', validator: { $jsonSchema: jsonSchema } });
//     } catch (error) {
//         console.error('Error applying schema validation:', error);
//         throw error;
//     }
// }