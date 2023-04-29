//express route file
const {Router} = require('express');
const router = Router();
const {getUsers, postUsers, deleteUsers, putUsers} = require('../controllers/users');
const {check} = require('express-validator');


router.get("/", getUsers);
router.post("/",[check('email', 'email is not valid')], postUsers);
router.put("/:_id", putUsers);
router.delete("/:_id", deleteUsers);



module.exports = router;