import mongoose, { mongo } from 'mongoose';
import Post from '../models/Post.js';

export const getAllPosts = async (req, res) => {
    try {
        const post = await Post.find({}).sort({ createdAt: -1 });
        res.status(200).json(post);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

export const getPost = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).json({ error: 'post doesnt exist' });

    try {
        const post = await Post.findById(id);
        if (!post) return res.status(404).json({ error: 'post doesnt exist' })
        res.status(200).json(post);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

export const createPost = async (req, res) => {
    const { date, title, content } = req.body;

    try {
        const post = await Post.create({ date, title, content })
        res.status(200).json(post);
    } catch (err) {
        res.status(400).json({ error: err.message })
    }
};

export const deletePost = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).json({ error: 'post doesnt exist' });

    try {
        const post = await Post.findById(id);
        if (!post) return res.status(404).json({ error: 'post doesnt exist' })
        const deletedPost = await Post.findByIdAndDelete({ _id: id })
        res.status(200).json(deletedPost);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

export const updatePost = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).json({ error: 'post doesnt exist' });

    try {
        const post = await Post.findById(id);
        if (!post) return res.status(404).json({ error: 'post doesnt exist' })
        const updatedPost = await Post.findByIdAndUpdate({ _id: id }, { ...req.body })
        res.status(200).json(updatedPost);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};