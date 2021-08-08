const bcrypt = require("bcryptjs");


async function testPWD() {

  const salt = await bcrypt.genSalt();

  const pwd = await bcrypt.hash("12345678", salt);

  console.log("pwd => ", pwd);

  //const isMatch = await bcrypt.compare("12345678", pwd);
  const isMatch = await bcrypt.compare("12345678", "$2a$10$87DamMxfPT8AsSP7GRMBO.sXJU3hzYIFP8MnoNtMXa41YIE1Mvxum");

  console.log("isMatch: ", isMatch);
}

testPWD();