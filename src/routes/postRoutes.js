const express = require('express');
const postModel = require('../models/postModels');
const postRoutes = express.Router();

postRoutes.get('/:id?', async (req, res) => {
    try {
        const id = req.params.id;
        const responseData = id !== undefined
            ? postModel.findById(id)
            : postModel.find();
        res.status(200).json(await responseData);
    } catch (error) {
        console.log('error', error);
        res.status(500).json({message: error})
    }
});

postRoutes.post('/', async (req, res) => {
    console.log('req body', req.body);
    const post = new postModel(req.body)
    try {
        const savedPost = await post.save()
        res.status(201).json(savedPost);

    } catch (error) {
        res.status(500).json({message: error.message});
    }
})

postRoutes.patch('/:id', async (req, res) => {
    const exists = await checkIfPostExists(req.params.id, res)
    if (!exists) {
        return
    }
    try {
        const dataToUpdate = req.body;
        const updatedPost = await postModel.findByIdAndUpdate(
            req.params.id,
            dataToUpdate,
            {new: true});
        res.status(200).json(updatedPost)
    } catch (error) {
        res.status(500).json({message: error.message})
    }
});

postRoutes.put('/:id', async (req, res) => {
    const exists = await checkIfPostExists(req.params.id, res)
    if (!exists) {
        return
    }
    try {
        const updatedPost = await postModel.findOneAndReplace(
            {_id: req.params.id},
            req.body,
            {new: true});
        res.status(200).json(updatedPost)
    } catch (error) {
        res.status(500).json({message: error.message})
    }
});

postRoutes.delete('/:id', async (req, res) => {
    const exists = await checkIfPostExists(req.params.id, res)
    if (!exists) {
        return
    }
    try {
        const post = await postModel.findByIdAndDelete({_id: req.params.id})
        res.json({message: `Post with title ${post.title} has been deleted`})
    } catch (error) {
        res.status(500).json({message: error.message})
    }
});

const checkIfPostExists = async (id, res) => {
    let exists = false;
    try {
        exists = await postModel.countDocuments({_id: id}) === 1
    } catch (error) {
    }
    if (!exists) {
        res.status(404).send();
    }
}

module.exports = postRoutes;
