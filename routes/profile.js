const express = require("express");
const { verifyToken, isAdmin } = require("../middleware/authMiddleware");
const { ProtectedRouteAccess } = require('./metrics'); 

const router = express.Router();

// /profile route for logged-in user
router.get("/profile", verifyToken, (req, res) => {
  ProtectedRouteAccess();

  const role = req.user.role;

//for admin access only 
  if (role === 'admin') {
    return res.json({
      message: "Welcome Admin",
      adminId: req.user.userId,
      iat: req.user.iat,       
      exp: req.user.exp       
    });
  } else {
    return res.json({ 
      message: "Welcome User",
      userId: req.user.userId,
      iat: req.user.iat,       
      exp: req.user.exp
     });
  }
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
