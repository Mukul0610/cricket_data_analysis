// import Team from "../models/teams.model";
// import { connectToDatabase } from "../mongoose";


// export async function createDeal(team:string,venue:string ) {
//     try {
//       await connectToDatabase();
  
//       const players = await Team.find({ "team": team }).toArray();
  
//       return JSON.parse(JSON.stringify(newDeal));
//     } catch (error) {
      
//       console.log(error);
//     }
//   }