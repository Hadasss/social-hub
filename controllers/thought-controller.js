const { Thought, User } = require("../models");

const thoughtController = {
  // /api/thoughts
  // GET all thoughts
  getAllThoughts(req, res) {
    Thought.find({})
      .select("-__v")
      .then((dbThoughtsData) => res.json(dbThoughtsData))
      .catch((err) => res.json(err));
  },

  // GET single thought by _id
  getThought({ params }, res) {
    Thought.findOne({ _id: params.thoughtId })
      .then((dbThoughtsData) => {
        if (!dbThoughtsData) {
          res
            .status(404)
            .json({ message: "No thought was found with this id" });
          return;
        }
        res.json(dbThoughtsData);
      })
      .catch((err) => res.json(err));
  },

  // POST thought
  addThought({ body }, res) {
    Thought.create(body)
      .then(({ _id }) => {
        console.log(body);
        return User.findOneAndUpdate(
          { _id: body.userId },
          { $push: { thoughts: _id } },
          { new: true }
        );
      })
      .then((dbThoughtsData) => {
        if (!dbThoughtsData) {
          res.status(404).json({ message: "No user was found with this id" });
          return;
        }
        res.json(dbThoughtsData);
      })
      .catch((err) => res.json(err));
  },

  // /api/thoughts/:thoughtId
  // PUT thought by _id
  updateThought({ params, body }, res) {
    Thought.findOneAndUpdate({ _id: params.thoughtId }, body, { new: true })
      .then((dbThoughtsData) => {
        if (!dbThoughtsData) {
          res
            .status(404)
            .json({ message: "No thought was found with this id" });
          return;
        }
        res.json(dbThoughtsData);
      })
      .catch((err) => res.json(err));
  },

  // DELETEthought by _id
  deleteThought({ params }, res) {
    Thought.findOneAndDelete({ _id: params.thoughtId })
      .then((dbThoughtsData) => {
        if (!dbThoughtsData) {
          res
            .status(404)
            .json({ message: "No thought was found with this id" });
          return;
        }
        res.json(dbThoughtsData);
      })
      .catch((err) => res.json(err));
  },

  // /api/thoughts/:thoughtId/reactions
  // POST reaction stored in a single thought's reactions array field
  addReaction({ params, body }, res) {
    Thought.findOneAndUpdate(
      { _id: params.thoughtId },
      { $push: { reactions: body } },
      { new: true, runValidators: true }
    )
      .then((dbThoughtsData) => {
        if (!dbThoughtsData) {
          res
            .status(404)
            .json({ message: "No thought was found with this id" });
          return;
        }
        res.json(dbThoughtsData);
      })
      .catch((err) => res.json(err));
  },

  // DELETE (pull) reaction by reaction's reactionId value
  deleteReaction({ params }, res) {
    Thought.findOneAndUpdate(
      { _id: params.thoughtId },
      { $pull: { reactions: { reactionId: params.reactionId } } },
      { new: true }
    )
      .then((dbThoughtsData) => res.json(dbThoughtsData))
      .catch((err) => res.json(err));
  },
};

module.exports = thoughtController;
