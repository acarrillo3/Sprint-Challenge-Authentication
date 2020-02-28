const db = require('../database/dbConfig');

module.exports = {
   addUser
}

function addUser(user) {
   return db('users')
      .insert(user);
} 