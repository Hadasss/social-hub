const router = require("express").Router();

const {
  getAllUsers,
  addUser,
  getUserById,
  updateUser,
  deleteUser,
  addUserFriend,
  deleteUserFriend,
} = require("../../controllers/user-controller");

// /api/users
router.route("/").get(getAllUsers).post(addUser);

// /api/users/:id
router.route("/:id").get(getUserById).put(updateUser).delete(deleteUser);

// /api/users/:userId/friends/friendsId
router
  .route("/:userId/friends/:friendId")
  .put(addUserFriend)
  .delete(deleteUserFriend);

module.exports = router;
