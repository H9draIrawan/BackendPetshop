import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  nama: String,
  username : String,
  email: String,
  password: String,
  profile: String,
  alamat : String,
  kota : String,
  no_hp : String,
  status : Boolean,
});

const User = mongoose.model("User", userSchema, "users");
module.exports = User;