import express from "express";
import Blog from "../models/Blog.js";
import { upload } from "../middleware/upload.js";

const router = express.Router();

/* CREATE BLOG */
router.post("/", upload.single("image"), async (req, res) => {
  try {
    const { category, title, subtitle, content, date } = req.body;

    const newBlog = new Blog({
      category,
      title,
      subtitle,
      content,
      date,
      image: req.file.filename,
    });

    await newBlog.save();
    res.status(201).json({ message: "Blog created successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/* GET ALL BLOGS */
router.get("/", async (req, res) => {
  try {
    const { category, search } = req.query;

    let filter = {};

    if (category) filter.category = category;
    if (search) {
      filter.title = { $regex: search, $options: "i" };
    }

    const blogs = await Blog.find(filter).sort({ createdAt: -1 });
    res.json(blogs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/* GET SINGLE BLOG */
router.get("/:id", async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    res.json(blog);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.put("/:id", upload.single("image"), async (req, res) => {
  try {
    const updateData = {
      category: req.body.category,
      title: req.body.title,
      subtitle: req.body.subtitle,
      content: req.body.content,
      date: req.body.date,
    };

    if (req.file) {
      updateData.image = req.file.filename;
    }

    const updatedBlog = await Blog.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    );

    res.json(updatedBlog);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


router.delete("/:id", async (req, res) => {
  await Blog.findByIdAndDelete(req.params.id);
  res.json({ message: "Blog deleted" });
});



export default router;
