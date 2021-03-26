import { Request, Response } from 'express';


import pool from '../database';

class OperationsController {

    public async list(req: Request, res: Response): Promise<void> {
        const operations = await pool.query('SELECT * FROM OPERATIONS');
        res.json(operations);
    }

    public async balance(req: Request, res: Response): Promise<void> {
        var total = 0.0;
        const operations = await pool.query('SELECT * FROM OPERATIONS');
        operations.forEach((ope : any) => {
            if(ope.TYPE_DESCRIPTION == 'Ingreso'){
                total += ope.AMOUNT;
            }else{
                //egreso
                total -= ope.AMOUNT;
            }
          });
        res.json(total);
    }

    public async getOne(req: Request, res: Response): Promise<any> {
        const { id } = req.params;
        const operations = await pool.query('SELECT * FROM OPERATIONS WHERE id = ?', [id]);
        console.log(operations.length);
        if (operations.length > 0) {
            return res.json(operations[0]);
        }
        res.status(404).json({ text: "The operation doesn't exits" });
    }

    public async create(req: Request, res: Response): Promise<void> {
        try {
            await pool.query("INSERT INTO OPERATIONS (CONCEPT, AMOUNT, TYPE_DESCRIPTION) VALUES(?, ?, ?)", [req.body.CONCEPT, req.body.AMOUNT, req.body.TYPE_DESCRIPTION]);
        } catch (error) {
            console.log(error);
        }
        res.json({ message: 'Operation Saved' });
    }

    public async update(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        const operation = await pool.query('SELECT * FROM OPERATIONS WHERE id = ?', [id]);
        if(operation == null){
            res.json({ message: "The operation not exist" });
        }
        try {
            await pool.query("UPDATE OPERATIONS set CONCEPT = ?, AMOUNT = ? WHERE id = ? ", [req.body.CONCEPT, req.body.AMOUNT, id]);
        } catch (error) {
            console.log(error);
        }
        res.json({ message: "The operation was Updated" });
    }

    public async delete(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        await pool.query('DELETE FROM OPERATIONS WHERE id = ?', [id]);
        res.json({ message: "The operation was deleted" });
    }
}

const operationsController = new OperationsController;
export default operationsController;
