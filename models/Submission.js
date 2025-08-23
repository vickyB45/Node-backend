// models/Submission.js
import mongoose from "mongoose";

const submissionSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },  
  
  phone: {
    type: String,
    required: true,
    match: /^[0-9]{10}$/,
  },
  email: {
    type: String,
    trim: true,
  },
  date: {
    type: String,
  },
  numberOfPeaople:{
    type:Number,
    default:1
  },
  message:{
    type:String,
    default:"-"
  },
  submittedAt: {
    type: Date,
    default: Date.now,
  },
},{timestamps:true});

export default mongoose.model("Submission", submissionSchema);
