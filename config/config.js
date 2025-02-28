require("dotenv").config();

const config = {
  PORT: process.env.PORT || 8000,
  DB_CONN: `mongodb://aihomes1_admin_db_user:pH6mJelBiE@160.25.226.5:27017/aihomes1_mian?authSource=admin`,
  // DB_CONN: `mongodb+srv://organicUser:roni9843@cluster0.tibcl.mongodb.net/elecEcommerce`,
  //DB_CONN: `mongodb+srv://roni9843:roni9843@cluster0.utd8f8o.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`,
  // DB_CONN: `mongodb+srv://roni9843:${process.env.DB_CONN}@cluster0.utd8f8o.mongodb.net/HasanShop`,
};

module.exports = config;
