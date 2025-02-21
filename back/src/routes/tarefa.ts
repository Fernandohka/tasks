import express, { Router } from 'express';
const router: Router = express.Router();
import taskController from '../controllers/taskController.ts'

router.post("", taskController.createTask);
router.get("", taskController.getTasks);
router.get("/:id", taskController.getTasksById);
router.put("/:id", taskController.updateTask);
router.delete("/:id", taskController.deleteTask);


export default router

