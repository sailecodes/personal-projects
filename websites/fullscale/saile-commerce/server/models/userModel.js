import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  firstName: {
    type: String,
    required: [true, "Please provide a first name."],
  },
  lastName: {
    type: String,
    required: [true, "Please provide a last name."],
  },
  email: {
    type: String,
    required: [true, "Please provide a valid email."],
  },
  password: {
    type: String,
    required: [true, "Please provide a valid password."],
  },
  role: {
    type: String,
    enum: ["admin", "user"],
    default: "user",
  },
});

export default mongoose.model("User", userSchema);
