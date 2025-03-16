import { Schema, model, models } from "mongoose";

const batsmanSchema=new Schema({
match_id: {
    type: Number
  },
  batsman_name: {
    type: String
  },
  batsman_runs: {
    type: Number
  },
  total_balls: {
    type: Number
  },
  venue : {
    type: String
  },
  date : {
    type: Date
  }
});

const Batsman = models?.Batsman || model("Batsman", batsmanSchema);

export default Batsman;