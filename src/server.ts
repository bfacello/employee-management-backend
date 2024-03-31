import * as dotenv from 'dotenv';
import cors from 'cors';
import express from 'express';
import { connectToDatabase } from './database';
import { employeeRouter } from './employee.routes';

dotenv.config();
const {ATLAS_URI} = process.env;
if(!ATLAS_URI){
    console.error('No ATLAS_URI has been declared')
    process.exit(1);
}

connectToDatabase(ATLAS_URI)
    .then(() => {
        const app = express();
        app.use(cors());
        app.use('/employees', employeeRouter)
        app.listen(3000, () => {
            console.log('Server running at http://localhost:3000');
        });
    })
    .catch((error) => {
        console.error('Error connecting to database:', error);
    });