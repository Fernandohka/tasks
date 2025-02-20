import express, { Request, Response, Router } from 'express';
const router: Router = express.Router();
import Tarefa from '../models/tarefa.ts';

export default router

.post('', async (req: Request, res: Response) => {
    const { title, description } = req.body;
    
    try {
        const tarefa = new Tarefa({ title, description, completed: false, createdAt: Date.now(), updatedAt: Date.now() });
        await tarefa.save();
        res.status(201).json(tarefa);
    } catch (error) {
        res.status(400).json({ message: 'Erro ao criar tarefa', error });
    }
})

.get('', async (req: Request, res: Response) => {
    console.log("get 1")
    try {
        const tarefas = await Tarefa.find();
        res.status(200).json(tarefas);
    } catch (error) {
        res.status(400).json({ message: 'Erro ao buscar tarefas', error });
    }
})

.get('/:id', async (req: Request, res: Response) => {
    console.log("get")
    const { id } = req.params;
    console.log(id)
    
    try {
        const tarefa = await Tarefa.findById(id);
        console.log(tarefa)
        res.status(200).json(tarefa);
    } catch (error) {
        res.status(400).json({ message: 'Erro ao buscar tarefas', error });
    }
})

.put('/:id', async (req: Request, res: Response) => {
    const { id } = req.params;
    const { title, description, completed } = req.body;
    
    try {
        const tarefa = await Tarefa.findByIdAndUpdate(id, { title, description, completed, updatedAt: Date.now() }, { new: true });
        if (!tarefa) {
            res.status(404).json({ message: 'Tarefa não encontrada' });
        }
        res.status(200).json(tarefa);
    } catch (error) {
        res.status(400).json({ message: 'Erro ao atualizar tarefas', error });
    }
})

.delete('/:id', async (req: Request, res: Response) => {
    const { id } = req.params;
    
    try {
        const tarefa = await Tarefa.findByIdAndDelete(id);
        if (!tarefa) {
            res.status(404).json({ message: 'Tarefa não encontrada' });
        }
        res.status(200).json({ message: 'Tarefa deletada com sucesso' });
    } catch (error) {
        res.status(400).json({ message: 'Erro ao deletar tarefa', error });
    }
})

