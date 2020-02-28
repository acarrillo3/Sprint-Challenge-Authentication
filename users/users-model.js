const db = require('../database/dbConfig');

module.exports = {
   addUser,
   findBy
}

function addUser(user) {
   return db('users')
      .insert(user);
} 

function findBy(username) {
    return db('users').where("username", username);
}