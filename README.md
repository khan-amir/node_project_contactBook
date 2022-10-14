# Contact Address Book API.
#### This contact Address Book Api is type of database where user can store our data and access data which the help of some Api method like : `GET`, `POST`, `PUT`, `DELETE`. 

---

### There are some command to start this `API`.

### To start run the command
* `npm start`

### To start in developer mode run the command.
* `npm run devstart`

---

# Model Structure.

* In model structure here user can define the structure of data like : Username are `String` type password are `Number` type. 
* In Model Structure user can also define which of data are required and which data are unique and which data are not.
* In this Strucutre first make a `mongodb` database connection using `mongoose npm` `package` and make a Schema of that structure and then after you can simply post or make a data.

---

## JWT(JsonWebToken) Authorization
* JsonWebToken are used to authorization which create are unique token if user validate or add this token for Contact login and if there token is not found then it show error Invalid token. This token are used in getContact function, getPaginated function, addUser funtion, addUserBulk function, updateUser function and deleteUser function.

---
### This Contact Address Book Api is based on CURD operation namely like :
* GET Method.
* POST Method.
* PUT Method.
* DELETE Method.

#### GET Method : In GET Method are use twice , first we used to  make GET Method for getting all the contact using the email with valid JWT token using `/user/:email` end point and second GET Method are used for get all contact and return the paginated result with valid JWT token using `/users` end point this is for paginated section .

#### POST Method : POST Method are also used twice , first we used to post or make a contact user in database and add new contact to the database with valid JWT using `/addUser` end point token and second POST Method are used for add more than one user by providing in an array with valid JWT token using `addUser/bulk` end point.

#### POST Method are also used for signup the Contact if all the given data like username and password are fill correct then it should signup and if user can try another time with the username and password the it shows this usernae is alreadt exists using `/signup` end point.

#### POST Method are also used for signin the user contact ther are two paramerter username and passworrd if user fill correct username and password the user can successfully singin and if they enter wrong username then it shows Invalid username and if enter wrong password then it shows wrong credentials using `/signin` end point.

#### PUT Method : This Method are used for update the contact by using email with valid JWT token using `/user/:email` end point, if user want to update any contact address then they this PUT Method.

#### DELETE Method : This DELETE Method are used to delete the contact by using email with valid JWT token using `/user/:email` end point .

----

# API Used : 

#### GET Method Api. 
```
router.get('/user/:email', authenticateToken, getContact)
router.get('/users', authenticateToken, getPaginated)
```

#### POST Method Api.
```
router.post('/addUser', authenticateToken, addUser)
router.post('/addUser/bulk', authenticateToken, addBulkUser)
router.post('/signup', userSignUp)
router.post('/signin', userSignIn)
```

#### PUT Method Api.
```
router.put("/user/:email", authenticateToken, updateUser)
```

#### DELETE Method Api.
```
router.delete('/user/:email', authenticateToken, deleteUser)
```