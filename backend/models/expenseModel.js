import mongoose from "mongoose";
const ExpenseSchema = new mongoose.Schema({
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
  const Expense = mongoose.model("Expense", ExpenseSchema);
  export default Expense;