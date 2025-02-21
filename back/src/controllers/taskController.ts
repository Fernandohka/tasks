import { Request, Response } from 'express';
import Tarefa from '../models/tarefa.ts';

class UserController {

    static async getTasks(req: Request, res: Response) {
        try {
            const tarefas = await Tarefa.find();
            res.status(200).json(tarefas);
        } catch (error) {
            console.log(error)
            res.status(400).json({ message: 'Erro ao buscar tarefas', error });
        }
   
    }
   
    static createTask(req: Request, res: Response) {
        const { title, description } = req.body;

        try {
            const tarefa = new Tarefa({ title, description, completed: false, createdAt: Date.now(), updatedAt: Date.now() });
            tarefa.save();
            res.status(201).json(tarefa);
        } catch (error) {
            res.status(400).json({ message: 'Erro ao criar tarefa', error });
        }
    }

    static async getTasksById(req: Request, res: Response) {
        const { id } = req.params;
        console.log(id)
        
        try {
            const tarefa = await Tarefa.findById(id);
            console.log(tarefa)
            res.status(200).json(tarefa);
        } catch (error) {
            res.status(400).json({ message: 'Erro ao buscar tarefas', error });
        }
    }

    static async updateTask(req: Request, res: Response) {
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
    }

    static async deleteTask(req: Request, res: Response) {
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
    }
}

export default UserController;