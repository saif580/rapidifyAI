import { sequelize } from "../database/db.js"


export const attachDbToRequest = (req, res, next) => {
    // console.log(sequelize,"yaha");
    req.db = sequelize; 
    next(); 
  };