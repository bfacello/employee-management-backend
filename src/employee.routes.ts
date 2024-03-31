import * as express from 'express';
import * as mongodb from 'mongodb';
import { collections } from './database';

const employeeRouter = express.Router();
employeeRouter.use(express.json());

employeeRouter.get('/', async (req, res) => {
    try {
        const employees = await collections.employees.find({}).toArray();
        res.status(200).send(employees);
    } catch (error) {
        res.status(500).send('Error fetching employees: ' + error.message);
    }
});

employeeRouter.get('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const query = { _id: new mongodb.ObjectId(id) };
        const employee = await collections.employees.findOne(query);

        if (employee) {
            res.status(200).send(employee);
        } else {
            res.status(404).send('Employee not found');
        }
    } catch (error) {
        res.status(500).send('Error fetching employee: ' + error.message);
    }
});

employeeRouter.put('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const employee = req.body;
        const query = { _id: new mongodb.ObjectId(id) };
        const result = await collections.employees.updateOne(query, { $set: employee });

        if (result.matchedCount) {
            res.status(200).send('Employee updated');
        } else {
            res.status(404).send('Employee not found');
        }
    } catch (error) {
        res.status(500).send('Error updating employee: ' + error.message);
    }
});

employeeRouter.delete('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const query = { _id: new mongodb.ObjectId(id) };
        const result = await collections.employees.deleteOne(query);

        if (result.deletedCount) {
            res.status(200).send('Employee deleted');
        } else {
            res.status(404).send('Employee not found');
        }
    } catch (error) {
        res.status(500).send('Error deleting employee: ' + error.message);
    }
});

employeeRouter.post('/', async (req, res) => {
    try {
        const employee = req.body;
        const result = await collections.employees.insertOne(employee);
        
        if (result.acknowledged) {
            res.status(201).send(`Employee created with ID: ${result.insertedId}`);
        } else {
            res.status(500).send('Failed to create employee');
        }
    } catch (error) {
        res.status(400).send('Error creating employee: ' + error.message);
    }
});

export { employeeRouter };
