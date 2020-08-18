const db = require('../data/db-config')

module.exports = {
    add,
    findBy,
    findById,
    find
}

function add(user){
    return db('users').insert(user).then(ids => {
        console.log(ids)
        return findById(ids[0])
    })
}

function findById(id){
    return db('users').where({id}).first
}

function findBy(filter) {
    return db("users").where(filter).orderBy("id");
  }

  function find() {
    return db("users").select("id", "username").orderBy("id");
  }