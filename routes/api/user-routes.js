const router = require("express").Router();

// TODO add controllers methods here
const {
  getAllUsers,
  addUser,
  getUserById,
  updateUser,
  deleteUser,
  deleteUserThought,
  addUserFriend,
  deleteUserFriend,
} = require("../../controllers/user-controller");

// TODO add api routes here:
// /api/users
// GET
// POST
router.route("/").get(getAllUsers).post(addUser);

// /api/users/:userId
// GET  a single user by its _id and populated thought and friend data
// PUT  to update a user by its _id
// DELETE  to remove user by its _id
router.route("/:id").get(getUserById).put(updateUser).delete(deleteUser);

// FYI TODO BONUS: Remove a user's associated thoughts when deleted.

// /api/users/:userId/friends/friendsId
// POST  to add a new friend to a user's friend list
// DELETE  to remove a friend from a user's friend list
router
  .route("/:userId/friends/:friendId")
  .put(deleteUserThought)
  .put(deleteUserFriend)
  .put(addUserFriend);
