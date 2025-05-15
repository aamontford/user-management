const express = require("express");
const { verifyToken, isAdmin, isRegularUser } = require("../middleware/authMiddleware");
const { ProtectedRouteAccess } = require('./metrics'); 
const router = express.Router();

//For regular logged in user
router.get("/profile", verifyToken, isRegularUser, (req, res) => {
  ProtectedRouteAccess();

  res.json({
    message: "Welcome User",
    userId: req.user.userId,
    iat: req.user.iat,       
    exp: req.user.exp
  });
});

// Admins access only
router.get("/admin/data", verifyToken, isAdmin, (req, res) => {
  res.json({
    message: "Welcome Admin",
    adminId: req.user.userId, 
    iat: req.user.iat, 
    exp: req.user.exp
  });
});

module.exports = router;
