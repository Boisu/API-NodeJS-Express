// import {Sequelize} from "sequelize";
// import db from "../config/database.js";

// const { DataTypes } = Sequelize;

// const Word = db.define('words', {
//   text: {
//     type: DataTypes.STRING,
//     allowNull: false,
//   },
//   counter: {
//     type: DataTypes.INTEGER,
//     defaultValue: 0,
//     allowNull: true,
//   },},{
//     freezeTableName: true
//   }
// )

// export default Word;

module.exports = (sequelize, DataTypes) => {
  const Word = sequelize.define(
    'Word',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: true,
      },
      text: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      counter: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
        allowNull: true,
      },
    },
    {
      tableName: "words",
      timestamps: false,
      freezeTableName: true
    }
  );

  return Word;
};