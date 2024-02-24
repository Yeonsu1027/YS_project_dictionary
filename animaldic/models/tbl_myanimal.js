import { Model } from "sequelize";

export default class tbl_myanimal extends Model {
  static init(sequelize, DataTypes) {
    return super.init(
      {
        ma_user: {
          type: DataTypes.STRING(15),
          allowNull: false,
          primaryKey: true,
        },
        ma_animalname: {
          type: DataTypes.STRING(30),
          allowNull: true,
        },
        ma_age: {
          type: DataTypes.STRING(10),
          allowNull: true,
        },
        ma_image_name: {
          type: DataTypes.STRING(255),
          allowNull: true,
        },
        ma_image_origin_name: {
          type: DataTypes.STRING(255),
          allowNull: true,
        },
        ma_memo: {
          type: DataTypes.STRING(300),
          allowNull: true,
        },
      },
      {
        sequelize,
        tableName: "tbl_myanimal",
        timestamps: false,
        indexes: [
          {
            name: "PRIMARY",
            unique: true,
            using: "BTREE",
            fields: [{ name: "ma_user" }],
          },
        ],
      }
    );
  }
}
