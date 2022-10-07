const Tree = require("../models/Tree");
const mongoose = require("mongoose");

//get all trees

//get a single tree

//delete a tree

//update a tree

//id in this case refers to the tree id

module.exports = {
  getTrees: async (req, res) => {
    const trees = await Tree.find().sort({ createdAt: -1 });

    res.status(200).json(trees);
  },

  getTree: async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ error: "Not a valid ID" });
    }

    const tree = await Tree.findById(id);

    if (!tree) {
      return res.status(404).json({ error: "Could not find tree" });
    }

    res.status(200).json(tree);
  },

  createTree: async (req, res) => {
    const { title, treeAge, treeDate } = req.body;

    try {
      const tree = await Tree.create({ title, treeAge, treeDate });
      console.log("Tree has been created!");
      res.status(200).json(tree);
    } catch (error) {
      console.log(error);
      res.status(400).json({ error: error.message });
    }
  },

  deleteTree: async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ error: "Not a valid ID" });
    }

    const tree = await Tree.findOneAndDelete({_id: id})

    if (!tree) {
      return res.status(404).json({ error: "Could not find tree" });
    }

    res.status(200).json(tree)
  },

  updateTree: async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: "Not a valid ID"})
    }

    const tree = await Tree.findOneAndUpdate({_id: id}, {
        ...req.body
    })

    if (!tree) {
        return res.status(404).json({ error: "Could not find tree" });
    }

    res.status(200).json(tree)
  }
};
