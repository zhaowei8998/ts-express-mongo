import { Table, Model, Column, DataType } from "sequelize-typescript";
import { AdminInterface } from '../interface/AdminInterface'
@Table({
    timestamps: true,
    modelName: "admin",
    tableName: "admin",
})
class AdminModel extends Model<AdminInterface> {
    @Column({
        type: DataType.INTEGER,
        primaryKey: true,
        autoIncrement: true
    })
    id!: number;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    name!: string;

    @Column({
        type: DataType.TINYINT,
        allowNull: false,
    })
    gender!: string;

    @Column({
        type: DataType.STRING,
        allowNull: true,
    })
    phone!: string;

    @Column({
        type: DataType.DATE,
        allowNull: true,
    })
    createdAt!: Date;

    @Column({
        type: DataType.DATE,
        allowNull: true,
    })
    updatedAt!: Date;

    @Column({
        type: DataType.DATE,
        allowNull: true,
    })
    deletedAt!: Date;
    @Column({
        type: DataType.TINYINT,
        allowNull: true,
        defaultValue:1,
    })
    status!: number;
}
export { AdminModel }
