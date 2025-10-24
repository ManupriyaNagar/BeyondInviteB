import { DataTypes } from "sequelize";
import sequelize from "./../app.js";

const Invitation = sequelize.define("Invitation", {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  name: { type: DataTypes.STRING, allowNull: false },
  category: { type: DataTypes.STRING, allowNull: false }, // wedding, baby-shower, corporate, e-invitation, etc.
  image: { type: DataTypes.STRING, allowNull: true },
  price: { type: DataTypes.FLOAT, allowNull: false },
  orders: { type: DataTypes.INTEGER, defaultValue: 0 },
  status: { type: DataTypes.STRING, defaultValue: "active" }, // active, draft, inactive
  rating: { type: DataTypes.FLOAT, defaultValue: 0.0 }
}, {
  tableName: "invitations",
  timestamps: true
});

export default Invitation;
