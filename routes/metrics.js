const express = require('express');
const router = express.Router();

// Initialize metrics
let totalRegisteredUsers = 0;
let totalLoginAttempts = { success: 0, fail: 0 };
let protectedRouteAccesses = 0;


// Route to get metrics
router.get('/metrics', (req, res) => {
  res.status(200).json({ 
    TotalRegisteredUsers: totalRegisteredUsers,
    TotalLoginAttempts: totalLoginAttempts,
    ProtectedRouteAccesses: protectedRouteAccesses
  });
});

const numberOfRegisteredUsers = () => {
  totalRegisteredUsers++;
};

const numberOfLoginAttempts = (status) => {
  if (status === 'success') {
    totalLoginAttempts.success++;
  } else {
    totalLoginAttempts.fail++;
  }
};

const ProtectedRouteAccess = () => {
  protectedRouteAccesses++;
};

module.exports = { router, numberOfRegisteredUsers, numberOfLoginAttempts, ProtectedRouteAccess };
