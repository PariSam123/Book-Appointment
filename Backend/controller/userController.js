const User = require("../models/userModel");

exports.getUsers = (req, res, next) => {
  User.findAll()
      .then((result) => {
        res.json(result);
      })
      .catch((err) => {
        return err;
      });
};
  
exports.postUser = (req, res, next) => {
    const name = req.body.name;
    const email = req.body.email;
    User.create({
      name: name,
      email: email,
    })
      .then(() => {
        res.send("Success");
      })
      .catch((err) => err);
};
  
exports.getEditUser = (req, res, next) => {
    const userId = req.params.userId;
    User.findByPk(userId).then((user) => res.json(user));
};
  
exports.postEditUser = (req, res, next) => {
    const id = req.params.userId;
    const name = req.body.name;
    const email = req.body.email;
    User.findByPk(id)
      .then((user) => {
        (user.name = name), (user.email = email);
        return user.save();
      })
      .then(() => res.send("Edited successfuly"))
      .catch((err) => res.send(err));
};
  
exports.getDeleteUser = (req, res, next) => {
    const userId = req.params.userId;
    User.findByPk(userId)
      .then((user) => {
        return user.destroy();
      })
      .then(() => res.send("Deleted successfuly"))
      .catch((err) => res.send(err));
};