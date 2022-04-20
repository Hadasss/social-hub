const { Schema, model, Types } = require("mongoose");
const date = require("../utils/dateFormat");

const ReactionSchema = new Schema(
  {
    reactionId: {
      type: Schema.Types.ObjectId,
      default: () => new Types.ObjectId(),
    },
    reactionBody: {
      type: String,
      required: "You must say something...",
      max: 280,
    },
    username: {
      type: String,
      required: "You must identify yourself",
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: (createdAtDate) => date(createdAtDate),
    },
  },
  {
    toJSON: {
      getters: true,
    },
  }
);

const ThoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: "You must think something...",
      min: 1,
      max: 280,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: (createdAtDate) => date(createdAtDate),
    },
    username: {
      type: String,
      required: "You must identify yourself",
    },
    reactions: [ReactionSchema],
  },
  {
    toJSON: {
      virtuals: true,
      getters: true,
      id: false,
    },
  }
);

ThoughtSchema.virtual("reactionCount").get(function () {
  return this.reactions.length;
});

const Thought = model("Thought", ThoughtSchema);

module.exports = Thought;
