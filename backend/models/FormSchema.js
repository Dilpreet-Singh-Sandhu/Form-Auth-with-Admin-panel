import mongoose, {Schema} from "mongoose";

const formSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "title is required"],
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    userId:{
      type: Schema.Types.ObjectId,
      ref: "users",
      default:"Anonymous User",
    }
  },
  { timestamps: true }
);

export const Form = mongoose.model("Form", formSchema);


