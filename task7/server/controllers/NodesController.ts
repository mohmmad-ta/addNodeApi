// @ts-ignore
import express, { Application, Request, Response, NextFunction } from 'express';
import {Get, Patch, Post, Delete, Controller, Res, Req} from '@decorators/express';
import Node from '../models/nodesModels'
import {Equal} from "typeorm";

@Controller('/nodes')
class NotesController {
    @Get('/')
    async getAllNotes(@Res() res: Response, @Req() req: Request) {
        try {
            let node = await Node.find();
            return res.status(200).json(node)
        } catch (err) {
            return res.status(400).json(err)
        }
    }

    @Post('/')
    async createNewNote(@Res() res: Response, @Req() req: Request) {
        try {
            let newNote = new Node();
            newNote.title = req.body.title;
            newNote.text = req.body.text;
            const createdOte = await newNote.save();
            return res.status(201).json(createdOte)
        } catch (err) {
            return res.status(400).json(err)
        }
    }

    @Get('/:id')
    async getOneOne(@Res() res: Response, @Req() req: Request) {
        try {
            const Id = Number(req.params.id);
            let node = await Node.findOneBy({id: Equal(Id)});
            if (node === null) {
                return res.status(404);
            }
            return res.status(200).json(node)
        } catch (err) {
            return res.status(400).json(err)
        }
    }

    @Patch('/:id')
    async updateNote(@Res() res: Response, @Req() req: Request) {
        try {
            const Id = Number(req.params.id);
            let node = await Node.findOneBy({id: Equal(Id)})
            if (node === null) {
                return res.status(404);
            }
            node.title = req.body.title;
            node.text = req.body.text;
            const createdOte = await node.save();
            return res.status(203).json(createdOte)
        } catch (err) {
            return res.status(400).json(err)
        }
    }

    @Delete('/:id')
    async deleteNote(@Res() res: Response, @Req() req: Request) {
        try {
            const Id = Number(req.params.id);
            let node = await Node.findOne({
                where: {
                    id: Equal(Id)
                }
            });
            if (node == null) return res.status(404);

            await node.remove();
            return res.status(200).json(node)
        } catch (err) {
            return res.status(400).json(err)
        }
    }
}
export default NotesController ;