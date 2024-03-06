import { Optional } from 'sequelize';
import { Table, Model, Column, DataType } from "sequelize-typescript";

export interface AdminRoleAttributes {
  id: number;
  userId?: number;
  roleId?: number;
  created?: Date;
}

export type adminRolePk = "id";
export type adminRoleId = AdminRoleModel[adminRolePk];
export type adminRoleOptionalAttributes = "id" | "userId" | "roleId" | "created";
export type adminRoleCreationAttributes = Optional<AdminRoleAttributes, adminRoleOptionalAttributes>;

@Table({
  timestamps: false,
  modelName: "admin_role",
  tableName: "admin_role",
})
export class AdminRoleModel extends Model<AdminRoleAttributes, adminRoleCreationAttributes> implements AdminRoleAttributes {

  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    comment: "主键"
  })
  id!: number;

  @Column({
    type: DataType.INTEGER,
    comment: "用户Id"
  })
  userId?: number;

  @Column({
    type: DataType.INTEGER,
    comment: "角色Id"
  })
  roleId?: number;

  @Column({
    type: DataType.DATE,
    comment: "创建时间"
  })
  created?: Date;

}
