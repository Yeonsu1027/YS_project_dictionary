import { Model } from "sequelize";

export default class tbl_notice extends Model {
  static init(sequelize, DataTypes) {
    return super.init(
      {
        n_num: {
          type: DataTypes.STRING(100),
          allowNull: true,
        },
        n_contents: {
          type: DataTypes.STRING(200),
          allowNull: true,
        },
        n_director: {
          type: DataTypes.STRING(20),
          allowNull: false,
          primaryKey: true,
        },
      },
      {
        sequelize,
        tableName: "tbl_notice",
        timestamps: false,
        indexes: [
          {
            name: "PRIMARY",
            unique: true,
            using: "BTREE",
            fields: [{ name: "n_director" }],
          },
        ],
      }
    );
  }
}
