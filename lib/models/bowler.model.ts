import { Schema, model, models } from "mongoose";

const bowlerSchema=new Schema({
match_id: {
    type: Number
  },
  bowler: {
    type: String
  },
  total_runs: {
    type: Number
  },
  
non_extra_balls: {
    type: Number
  },
  bowler_wicket: {
    type: Number
  },
  venue : {
    type: String
  },
  date : {
    type: Date
  }
});

const Bowler = models?.Bowler || model("Bowler", bowlerSchema);

export default Bowler;