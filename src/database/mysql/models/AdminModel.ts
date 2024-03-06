import { DataTypes, Optional } from 'sequelize';
import { Table, Model, Column, DataType } from "sequelize-typescript";

export interface AdminAttributes {
  id: number;
  name?: string;
  pwd?: string;
  position?: string;
  status?: number;
  created?: Date;
}

export type adminPk = "id";
export type adminId = AdminModel[adminPk];
export type adminOptionalAttributes = "id" | "name" | "pwd" | "position" | "status" | "created";
export type adminCreationAttributes = Optional<AdminAttributes, adminOptionalAttributes>;
@Table({
  timestamps: false,
  modelName: "admin",
  tableName: "admin",
})
export class AdminModel extends Model<AdminAttributes, adminCreationAttributes> implements AdminAttributes {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    comment: "主键"
  })
  id!: number;

  @Column({
    type: DataType.STRING,
    comment: "名称"
  })
  name?: string;

  @Column({
    type: DataType.STRING,
    comment: "密码"
  })
  pwd?: string;


  @Column({
    type: DataType.STRING,
    comment: "职位"
  })
  position?: string;

  @Column({
    type: DataType.INTEGER,
    defaultValue: 1,
    comment: "状态，1：启用，2：禁用"
  })
  status?: number;

  @Column({
    type: DataType.DATE,
    defaultValue: DataTypes.NOW,
    comment: "创建时间"
  })
  created?: Date;
}
