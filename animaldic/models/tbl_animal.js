import {Model} from 'sequelize';
export default class tbl_animal extends Model {
  static init(sequelize, DataTypes) {
  return super.init({
    a_name: {
      type: DataTypes.STRING(20),
      allowNull: false,
      primaryKey: true
    },
    a_condition: {
      type: DataTypes.STRING(300),
      allowNull: false
    },
    a_food: {
      type: DataTypes.STRING(300),
      allowNull: false
    },
    a_habit: {
      type: DataTypes.STRING(300),
      allowNull: false
    },
    a_caution: {
      type: DataTypes.STRING(300),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'tbl_animal',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "a_name" },
        ]
      },
    ]
  });
  }
}
