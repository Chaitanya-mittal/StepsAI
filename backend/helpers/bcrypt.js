const bcrypt = require("bcrypt");
async function getHashedPassword(password) {
  try {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    return hash;
  } catch (err) {
    console.error("Error hashing password:");
    throw new Error(err);
  }
}

async function checkPassword({ password, passwordHash }) {
  try {
    const match = await bcrypt.compare(password, passwordHash);
    return match;
  } catch (err) {
    console.error("Error comparing password:");
    throw new Error(err);
  }
}

module.exports = { getHashedPassword, checkPassword };
