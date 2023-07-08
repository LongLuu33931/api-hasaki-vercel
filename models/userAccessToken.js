import mongoose, { Schema } from "mongoose";
const userAccessToken = mongoose.model(
  "user_access_token",
  new mongoose.Schema(
    {
      user_id: {
        type: mongoose.Types.ObjectId,
        required: true,
      },
      token: {
        type: String,
        required: true,
      },
    },
    { timestamps: { createdAt: "created_at" } }
  )
);

export default userAccessToken;
