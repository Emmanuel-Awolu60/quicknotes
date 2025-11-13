// backend/test.js
const { connectDB } = require("./config/db");
const { createUser, findUserByEmail } = require("./models/userModel");

const test = async () => {
  await connectDB();
  const user = await createUser(
    "Emmanuel",
    "emmanuel@test.com",
    "hashedpassword123"
  );
  console.log(user);

  const found = await findUserByEmail("emmanuel@test.com");
  console.log(found);
};

test();
