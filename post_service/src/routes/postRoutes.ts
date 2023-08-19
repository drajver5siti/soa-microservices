import express, { Request, Response } from "express";
import Post from "../models/Post.js";

const router = express.Router();

router.get("/:id", async (req: Request, res: Response) => {

})

router.get("/",async (req: Request, res: Response) => {
    const posts = await Post.findAll({ order: [['createdAt', 'DESC']] });
    return res.json({ data: posts });
})

router.post("/",async (req: Request, res: Response) => {
    const data = req.body;

    try {
        const post = await Post.create(data)
        return res.json(post);
    } catch(err) {
        return res.status(400).json({ message: "Invalid data provided"});
    }
})

router.delete("/:id", async (req: Request, res: Response) => {
    try {
        const post = await Post.findByPk(req.params.id);
        post?.destroy();
        return res.json({});
    } catch(err) {
        return res.status(400).json({ message: "Post not found!"});
    }
})

export default router;