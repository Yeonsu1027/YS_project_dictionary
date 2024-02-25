import { Model } from "sequelize";

export default class tbl_notice extends Model {
  static init(sequelize, DataTypes) {
  return super.init({
    n_num: {
      autoIncrement: true,
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true
    },
    n_author: {
      type: DataTypes.STRING(15),
      allowNull: false
    },
    n_title: {
      type: DataTypes.STRING(150),
      allowNull: false
    },
    n_content: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    n_image_name: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    n_image_origin_name: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    n_date: {
      type: DataTypes.STRING(10),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'tbl_notice',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "n_num" },
        ]
      },
    ]
  });
  }
}
