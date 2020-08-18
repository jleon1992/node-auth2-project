const router = require("express").Router();

const Users = require("./user-helpers");
const restricted = require("./restricted-mw");

router.get("/", restricted, (req, res) => {
  Users.find()
    .then(users => {
      res.status(200).json({ data: users, jwt: req.decodedToken});
    })
    .catch(err => res.send(err));
});

router.put('/:id', restricted, checkRole('admin'), (req, res) => {

})

function checkRole(role){
  return function(req, res, next){
    if(rec.decodedToken.role === role){
      next()
    } else [
      res.status(403).json({you: "cannot"})
    ]
  }
}

module.exports = router;
