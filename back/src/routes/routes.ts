import { Express } from 'express';
import express from 'express'
import tarefa from './tarefa.ts';
import auth from '../../src/routes/auth.ts'

export default function (app: Express) {
app
    .use(express.json())
    .use('/tasks', tarefa)
    .use('/auth', auth)
}