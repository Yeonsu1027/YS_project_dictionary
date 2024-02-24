import { Model } from "sequelize";

export default class tbl_bbd extends Model {
  static init(sequelize, DataTypes) {
    return super.init(
      {
        num: {
          type: DataTypes.BIGINT,
          allowNull: false,
          primaryKey: true,
        },
        author: {
          type: DataTypes.STRING(15),
          allowNull: false,
        },
        title: {
          type: DataTypes.STRING(150),
          allowNull: false,
        },
        content: {
          type: DataTypes.TEXT,
          allowNull: false,
        },
        image_name: {
          type: DataTypes.STRING(255),
          allowNull: true,
        },
        image_origin_name: {
          type: DataTypes.STRING(255),
          allowNull: true,
        },
        date: {
          type: DataTypes.STRING(10),
          allowNull: false,
        },
      },
      {
        sequelize,
        tableName: "tbl_bbd",
        timestamps: false,
        indexes: [
          {
            name: "PRIMARY",
            unique: true,
            using: "BTREE",
            fields: [{ name: "num" }],
          },
        ],
      }
    );
  }
}
