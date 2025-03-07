import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database";
import User from "./User";

class Task extends Model {
  public id!: string;
  public title!: string;
  public description!: string;
  public status!: "pending" | "completed";
  public dueDate!: Date;
  public userId!: string;
}

Task.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    title: DataTypes.STRING,
    description: DataTypes.TEXT,
    status: DataTypes.ENUM("pending", "completed"),
    dueDate: DataTypes.DATE,
    userId: {
      type: DataTypes.UUID,
      references: {
        model: User,
        key: "id",
      },
    },
  },
  {
    sequelize,
    modelName: "Task",
    timestamps: true,
  }
);

Task.belongsTo(User, { foreignKey: "userId" });
User.hasMany(Task, { foreignKey: "userId" });

export default Task;
