import { Sequelize } from "sequelize";

export const AttributeModel = (sequelize) => {
  const { DataTypes } = Sequelize;

  return sequelize.define("attributes", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    resume_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "resumes", 
        key: "id",
      },
      onDelete: "CASCADE", 
    },
    type: {
      type: DataTypes.STRING(50),
      allowNull: false,
      validate: {
        isIn: [["skill", "keyword"]],
      },
    },
    value: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
  });
};
