var express = require('express');
var router = express.Router();
var auth = require("../controllers/AuthController.js");



/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


// restrict index for logged in user only
router.get('/', auth.home);
/* route to register page*/
router.get('/register', auth.register);
// route for register action
router.post('/register', auth.doRegister);

// route to login page
router.get('/login', auth.login);

// route for login action
router.post('/login', auth.doLogin);
/*
//SHOW EMPLOYEE BY ID
// Get all employees
router.get('/', function (req, res) {
  employee.list(req, res);
});

// Get single employee by id
router.get('/show/:id', function (req, res) {
  employee.show(req, res);
});

//CREATE AN EMPLOYEE//
router.get('/create', function (req, res) {
  employee.create(req, res);
});
//SAVE AN EMPLOYEE//
router.post('/save', function (req, res) {
  employee.save(req, res);
});

//edit employee detail
// Edit employee
router.get('/edit/:id', function (req, res) {
  employee.edit(req, res);
});
// Edit update
router.post('/update/:id', function (req, res) {
  employee.update(req, res);
});
// Edit delete
router.post('/delete/:id', function (req, res, next) {
  employee.delete(req, res);
});

// route to test page
router.get('/test', auth.test);

//route for test action
router.post('/test', auth.doTest);
*/
// route for logout action
router.get('/logout', auth.logout);

module.exports = router;
