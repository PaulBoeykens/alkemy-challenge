import express, { Router } from 'express';

import operationsController from '../controllers/operationsController';

class OperationRoutes {

    router: Router = Router();

    constructor() {
        this.config();
    }

    config() {
        this.router.get('/operations/', operationsController.list);
        this.router.get('/operations/:id', operationsController.getOne);
        this.router.post('/operations/', operationsController.create);
        this.router.put('/operations/:id', operationsController.update);
        this.router.delete('/operations/:id', operationsController.delete);
        this.router.get('/operations/balance', operationsController.balance);
    }

}

export default new OperationRoutes().router;

