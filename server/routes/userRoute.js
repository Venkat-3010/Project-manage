const express = require('express');
const { loginUser, registerUser, updateUserProfile, addPerson, getPeople, getUser } = require('../controller/user');
const auth = require('../middleware/auth');
const router = express.Router();

router.post('/login', loginUser);
router.post('/register', registerUser);
router.put('/profile' , auth, updateUserProfile);
router.post('/add-person', auth, addPerson);
router.get('/people', auth, getPeople);
router.get('/users', auth, getUser);

module.exports = router;