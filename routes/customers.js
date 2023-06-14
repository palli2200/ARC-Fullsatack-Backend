const express = require('express');
const router = express.Router();

const customerModel = require('../models/customers.models');

/* GET all customers. */
router.get('/list', function(req, res, next) {
  customerModel.find()
  .then(listsavedCustomer => {
    let totalRecords = listsavedCustomer.length;
    res.send({ status: 200, recordsCount:totalRecords, customerDetails: listsavedCustomer });
  })
  .catch(err => {
    res.send({ status: 500, message: 'customer not found' });
  });
});

/* GET all customers. */
router.get('/view', function(req, res, next) {
  let userId = req.query.userId;
  customerModel.findById(userId)
  .then(customer => {
    if (customer) {
      res.send({ status: 200, customerDetails: customer });
    } else {
      res.send({ status: 404, message: 'Customer not found' });
    }
  })
  .catch(err => {
    res.send({ status: 500, message: 'Error retrieving customer' });
  });
});

/* create new customer. */
router.post('/add', function(req, res, next) {


// let firstName = req.body.firstName;
// let lastName = req.body.lastName;
// let emailAddress = req.body.emailAddress;
// let phoneNumber = req.body.phoneNumber;
// let dob = req.body.lastNadobme;
// let department = req.body.department;

let { firstName, lastName, emailAddress, phoneNumber, dob, department } = req.body;

  

  let customerObj = new customerModel({
    firstName: firstName,
    lastName: lastName,
    emailAddress: emailAddress,
    phoneNumber: phoneNumber,
    dob: dob,
    department: department
  });

  customerObj.save()
  .then(savedCustomer => {
    res.send({ status: 200, message: 'User added successfully', customerDetails: savedCustomer });
  })
  .catch(err => {
    res.send({ status: 500, message: 'Unable to add customer' });
  });
});

/* update existing customer. */
router.put('/update', function(req, res, next) {

  let userId = req.query.userId;

  let { firstName, lastName, emailAddress, phoneNumber, dob, department } = req.body;

  let customerObj = {
    firstName: firstName,
    lastName: lastName,
    emailAddress: emailAddress, 
    phoneNumber: phoneNumber,
    dob: dob,
    department: department
  };

  customerModel.findByIdAndUpdate(userId, customerObj)
    .then(updatedCustomer => {
      if (updatedCustomer) {
        res.send({ status: 200, message: 'User updated successfully', customerDetails: updatedCustomer });
      } else {
        res.send({ status: 404, message: 'Customer not found' });
      }
    })
    .catch(err => {
      res.send({ status: 500, message: 'Unable to update customer' });
    });
});


/* delete customer. */
router.delete('/delete', function(req, res, next) {
  let userId = req.query.userId;

  customerModel.findByIdAndDelete(userId)
  .then(deletedCustomer => {
    if (deletedCustomer) {
      res.send({ status: 200, message: 'User deleted successfully', customerDetails: deletedCustomer });
    } else {
      res.send({ status: 404, message: 'Customer not found' });
    }
  })
  .catch(err => {
    res.send({ status: 500, message: 'Unable to delete customer' });
  });
});

/* delete multiple customers. */
router.delete('/delete-multiple', function(req, res, next) {
  let firstName = req.query.firstName;

  customerModel.deleteMany({ firstName: firstName })
    .then(result => {
      if (result.deletedCount > 0) {
        res.send({ status: 200, message: 'Customers deleted successfully' });
      } else {
        res.send({ status: 404, message: 'Customers not found' });
      }
    })
    .catch(err => {
      res.send({ status: 500, message: 'Unable to delete customers' });
    });
});



/* search customer. */
router.get('/search', function(req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;
