const { getContact, getPaginated, addUser, addBulkUser, updateUser, deleteUser, userSignUp, userSignIn } = require("../controllers/contactController");
const { authenticateToken } = require("../utils/verifytoken");
const router = require("express").Router();

// Sign UP to the user to access the contact
router.post('/signup', userSignUp)

// Sign in to the user then access the contact
router.post('/signin', userSignIn)

// get contact using the email with valid JWT token
router.get('/user/:email', authenticateToken, getContact)

// get all contact and return the paginated result with valid JWT token
router.get('/users', authenticateToken, getPaginated)

// add new contact to the database with valid JWT token
router.post('/addUser', authenticateToken, addUser)

// add more than one user by providing in an array with valid JWT token
router.post('/addUser/bulk', authenticateToken, addBulkUser)

// update the contact by using email with valid JWT token
router.put("/user/:email", authenticateToken, updateUser);

// delete the contact by using email with valid JWT token
router.delete('/user/:email', authenticateToken, deleteUser)


module.exports = router