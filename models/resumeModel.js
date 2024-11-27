import { Sequelize } from "sequelize";

export const ResumeModel = (sequelize) => {
  const { DataTypes } = Sequelize;

  return sequelize.define("resumes", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "users", 
        key: "id", 
      },
    },
    file_path: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    upload_date: {
      type: DataTypes.DATE,
      defaultValue: Sequelize.NOW,
    },
    status: {
      type: DataTypes.STRING(50),
      defaultValue: "uploaded",
    },
  });
};
