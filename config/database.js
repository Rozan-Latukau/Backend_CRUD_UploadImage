import {Sequelize} from "sequelize";

const db = new Sequelize('liga_db','root','zanstudio',{
    host: '127.0.0.1',
    dialect: "mysql"
});

export default db;