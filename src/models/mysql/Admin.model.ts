import { Table, Model, Column, DataType } from "sequelize-typescript";

type AdminAttributes = {
    id: number,
    name: string,
    gender: string,
    phone: string,
    createdAt?: Date,
    updatedAt?: Date,
    deletedAt?: Date,
}
@Table({
    timestamps: false,
    tableName: "admin",
})
class AdminModel extends Model<AdminAttributes> {
    @Column({
        type: DataType.INTEGER,
        primaryKey: true,
        autoIncrement: true
    })
    id: number;

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
    createdAt?: Date;

    @Column({
        type: DataType.DATE,
        allowNull: true,
    })
    updatedAt?: Date;

    @Column({
        type: DataType.DATE,
        allowNull: true,
    })
    deletedAt?: Date;

}
export { AdminModel, AdminAttributes }