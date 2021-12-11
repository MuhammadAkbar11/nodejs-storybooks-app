const mongoose = require("mongoose");

const StorySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    body: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      default: "public",
      enum: ["public", "private"],
      // required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "UserModel",
    },
  },
  {
    timestamps: true,
  }
);

const StoryModel = mongoose.model("StoryModel", StorySchema, "stories");

module.exports = StoryModel;
