const express = require('express');
const router = express.Router();
const Task = require('../models/task');

router.get('', async (req, res) => {
    const tasks = await Task.find();
    res.json(tasks)
});

router.post('', async (req, res) => {
    const { title, description } = req.body;

    try {
        await Task.create({
            title,
            description
        })
    } catch (e) {
        console.error(e);
    }
});

router.delete('/:id', async (req, res) => {
    const task = await Task.findById(req.params.id);

    if (!task) {
        return res.json('Tâche introuvable');
    }

    try {
        await Task.deleteOne(task);
        console.log("Tâche supprimée !")
    } catch (e) {
        console.error(e);
    }
});

router.get('/:id', async (req, res) => {
    const task = await Task.findById(req.params.id);

    if (!task) {
        return res.json('Tâche introuvable');
    }

    return res.json(task);
});

router.put('/:id', async (req, res) => {
    const task = await Task.findById(req.params.id);

    if (!task) {
        return res.json('Tâche introuvable');
    }

    let title = req.body.title;
    let description = req.body.description;

    if (!title && !description) {
        return res.json('Veuillez modifier au moins un des deux champs');
    }

    title = (title) ? title : task.title;
    description = (description) ? description : task.description;

    try {
        await Task.updateOne(task, {
            title,
            description
        });

        return res.json("Tâche modifiée")
    } catch (e) {
        console.error(e)
    }


})

module.exports = router;