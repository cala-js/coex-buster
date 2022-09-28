
import TransactionRepository  from "../repository/transaction.repository";
import { ITransactionController } from "../helpers/interfaces/transaction.interface";
import { Request, Response } from "express";
import transactionRepository from "../repository/transaction.repository";
import { ParamsDictionary } from "express-serve-static-core";
import { ParsedQs } from "qs";

class TransactionController implements ITransactionController{
    async getOne(req:Request, res:Response):Promise<void>{
        const id = parseInt(req.params.id);
        const query = await transactionRepository.get(id);
        res.json(query);
    }
    async getAll(req: Request, res:Response): Promise<void> {
        const result = await transactionRepository.getAll();
        // res.json(result);
        result.forEach((element : any) => {
            element.create_date = new Date(element.create_date).toLocaleString();
        })
        res.render('layouts/history_order.ejs', {
            result : result
        })
    }
    async create(req: Request, res:Response): Promise<void> {
        const data = req.body;
        const query = await transactionRepository.create(data);
        res.json(true)
    }

    async update(req: Request, res:Response): Promise<void> {
        const data = req.body;
        const id = req.body.id;
        const query = await transactionRepository.update(id,data);
        res.json(query);
    }
    async delete(req: Request, res:Response): Promise<void> {
        const id = req.body.id;
        const query = await transactionRepository.deleted(id);
        res.json(query);
    }
}


export default new TransactionController();