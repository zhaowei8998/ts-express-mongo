const { DataTypes, Model, Optional } = require('sequelize');
import { sequelize } from '../../config/sequelize'

type UserAttributes = {
    id: number,
    name: string,
    age: number,
    // other attributes...
};
// type UserCreationAttributes = Optional<UserAttributes, 'id'>;
//, UserCreationAttributes
// 有效
export class User extends Model<UserAttributes> {
    declare id: number; // 您可以使用 `declare` 关键字添加键入信息, 而无需添加实际的公共类字段.
}

User.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING
    },
    age: DataTypes.INTEGER,
}, {
    sequelize,
    // 不要忘记启用时间戳！
    timestamps: true,

    // 不想要 createdAt
    createdAt: true,

    // 想要 updatedAt 但是希望名称叫做 updateTimestamp
    updatedAt: 'true'
});
User.sync({ alter: true })
