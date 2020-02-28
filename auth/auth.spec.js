const Users = require("../users/users-model");
const db = require("../database/dbConfig");

describe("users model", function() {
  beforeEach(async () => {
    await db("users").truncate();
  });

  describe("addUser() method", function() {
    it("should add the user to the db", async function() {
      // call insert, passing it a hobbit object
      await Users.addUser({ username: "fred", password: "test" });
      await Users.addUser({ username: "jon", password: "test2" });

      // check the db directly to see if hobbit got inserted
      const hobbits = await db("users");
      expect(hobbits).toHaveLength(2);
    });
  });
});
