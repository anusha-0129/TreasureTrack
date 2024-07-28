import mongoose from "mongoose";
const IncomeSchema = new mongoose.Schema({
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    title: {
      type: String,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    description: {
      type: String,
    },
  },  {timestamps: true});
  const Income = mongoose.model("Income", IncomeSchema);
  export default Income;