// models/User.ts
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  emailVerified: {
    type: Boolean,
    default: false,
  },
  image: {
    type: String,
  },
  // These must match exactly what you put in auth.ts
  planId: {
    type: String,
    default: "free",
  },
  creditBalance: {
    type: Number,
    default: 10,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  }
}, {
  collection: "user" 
});


const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;