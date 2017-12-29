var mongoose = require("mongoose");
var passport = require("passport");
var User = require("../models/User");

var userController = {};

// Restrict access to root page
userController.home = function (req, res) {
    res.render('index', { user: req.user });
};

// Go to registration page
userController.register = function (req, res) {
    res.render('register');
};

// Post registration
userController.doRegister = function (req, res) {
    User.register(new User({ username: req.body.username, name: req.body.name }), req.body.password, function (err, user) {
        if (err) {
        return res.render('register', { user: user });
        }
        passport.authenticate('local')(req, res, function () {
            res.redirect('/login');
        });
    });
};

// Go to login page
userController.login = function (req, res) {
    res.render('login');
};

// Post login
userController.doLogin = function (req, res) {
    passport.authenticate('local')(req, res, function () {
        res.render("../views/reference");
    });
};
/*
//EMPLOYEE CODE
// Show list of employees
userController.list = function (req, res) {
    Employee.find({}).exec(function (err, employees) {
        if (err) {
            console.log("Error:", err);
        }
        else {
            res.render("../views/employees/index", { employees: employees });
        }
    });
};
//// Show employee by id
userController.show = function (req, res) {
    Employee.findOne({ _id: req.params.id }).exec(function (err, employee) {
        if (err) {
            console.log("Error:", err);
        }
        else {
            res.render("../views/employees/show", { employee: employee });
        }
    });
};


// Create new employee
userController.create = function (req, res) {
    res.render("../views/employees/create");
};

// Save new employee
userController.save = function (req, res) {
var employee = new Employee(req.body);
employee.save(function (err) {
if (err){
            console.log(err);
            res.render("../views/employees/create");
        } 
        else {
            console.log("Successfully created an employee.");
            res.redirect("/employees/show/" + employee._id);
        }
    });
};


// Edit an employee
userController.edit = function (req, res) {
    Employee.findOne({ _id: req.params.id }).exec(function (err, employee) {
        if (err) {
            console.log("Error:", err);
        }
        else {
            res.render("../views/employees/edit", { employee: employee });
        }
    });
};
// Update an employee
userController.update = function (req, res) {
    Employee.findByIdAndUpdate(req.params.id, { $set: { name: req.body.name, address: req.body.address, position: req.body.position, salary: req.body.salary } }, { new: true }, function (err, employee) {
        if (err) {
            console.log(err);
            res.render("../views/employees/edit", { employee: req.body });
        }
        res.redirect("/employees/show/" + employee._id);
    });
};
//// Delete an employee
userController.delete = function (req, res) {
    Employee.remove({ _id: req.params.id }, function (err) {
        if (err) {
            console.log(err);
        }
        else {
            console.log("Employee deleted!");
            res.redirect("/employees");
        }
    });
};

/// test function ///
/* new test*/
/*
// Go to test page
userController.test = function (req, res) {
    res.render('test');
};

// executing wts in test
userController.doTest = function (req, res) {
    User.test(new User({ username: req.body.username, name: req.body.name }),
        req.body.password, function (err, user) {
            if (err) {
                return res.render('register', { user: user });
            }

            passport.authenticate('local')(req, res, function () {
                res.redirect('/');
            });
        });
};

*/

// logout
userController.logout = function (req, res) {
    req.logout();
    res.redirect('/');
};

module.exports = userController;