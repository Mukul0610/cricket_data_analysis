import { Schema, model, models } from "mongoose";

const teamSchema=new Schema({

  team: {
    type: String
  },
  player_name : {
    type: String
  }
});

const Team = models?.Team || model("Team", teamSchema);

export default Team;