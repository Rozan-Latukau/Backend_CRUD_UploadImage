import { Sequelize } from "sequelize";
import db from "../config/database.js";

const {DataTypes} = Sequelize;

const Liga = db.define('liga', {
    name:DataTypes.STRING,
    Image:DataTypes.STRING,
    leagues:DataTypes.STRING,
    url:DataTypes.STRING
},{
    freezeTableName:true
});

export default Liga;

(async()=>{
    await db.sync();
})();