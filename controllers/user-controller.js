const { User, Thought } = require("../models");

const userController = {
  // GET all users
  getAllUsers(req, res) {
    User.find({})
      .populate("friends thoughts")
      .select("-__v")
      .then((dbUserData) => res.json(dbUserData))
      .catch((err) => res.json(err));
  },

  // POST to users
  addUser({ body }, res) {
    User.create(body)
      .then((dbUserData) => res.json(dbUserData))
      .catch((err) => res.json(err));
  },

  // GET single user by _id
  getUserById({ params }, res) {
    User.findOne({ _id: params.id })
      .populate({
        path: "thoughts friends",
        select: "-__v",
      })
      .select("-__v")
      .then((dbUserData) => {
        if (!dbUserData) {
          res.status(404).json({ message: "No user was found with this id" });
          return;
        }
        res.json(dbUserData);
      })
      .catch((err) => res.json(err));
  },

  // PUT user by _id
  updateUser({ params, body }, res) {
    User.findOneAndUpdate({ _id: params.id }, body, {
      new: true,
      runValidators: true,
    })
      .then((dbUserData) => {
        if (!dbUserData) {
          res.status(404).json({ message: "No user was found with this id" });
          return;
        }
        res.json(dbUserData);
      })
      .catch((err) => res.json(err));
  },

  // DELETE user by _id
  // TODO BONUS: Remove a user's associated thoughts when deleted.
  deleteUser({ params }, res) {
    User.findOneAndDelete(
      { _id: params.id }
      // { $pullAll: { thoughts: params.thoughtId} },
      // { new: true }
      // OR: {$set: {thoughts: []}}
    )
      .then((dbUserData) => {
        if (!dbUserData) {
          res.status(404).json({ message: "No user was found with this id" });
          return;
        }
        console.log(dbUserData);
        res.json(dbUserData);
      })
      .catch((err) => res.json(err));
  },

  // POST new friend to user's friend list
  addUserFriend({ params }, res) {
    User.findOneAndUpdate(
      { _id: params.userId },
      { $addToSet: { friends: params.friendId } },
      { new: true }
    )
      .then((dbUserData) => {
        if (!dbUserData) {
          res.status(404).json({ message: "No user was found with this id" });
          return;
        }
        res.json(dbUserData);
      })
      .catch((err) => res.json(err));
  },

  // DELETE friend from user's friend list
  deleteUserFriend({ params }, res) {
    User.findOneAndUpdate(
      { _id: params.userId },
      { $pull: { friends: params.friendId } },
      { new: true }
    )
      .then((dbUserData) => {
        if (!dbUserData) {
          res.status(404).json({ message: "No user was found with this id" });
          return;
        }
        res.json(dbUserData);
      })
      .catch((err) => res.json(err));
  },
};

module.exports = userController;
