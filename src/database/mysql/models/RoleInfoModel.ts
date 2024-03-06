import { Optional } from 'sequelize';
import { Table, Model, Column, DataType } from "sequelize-typescript";

export interface RoleInfoAttributes {
  id: number;
  name?: string;
  description?: string;
  status?: number;
  actionIds?: string;
  created?: Date;
}

export type roleInfoPk = "id";
export type roleInfoId = RoleInfoModel[roleInfoPk];
export type roleInfoOptionalAttributes = "id" | "name" | "description" | "status" | "actionIds" | "created";
export type roleInfoCreationAttributes = Optional<RoleInfoAttributes, roleInfoOptionalAttributes>;


@Table({
  timestamps: false,
  modelName: "role_info",
  tableName: "role_info",
})
export class RoleInfoModel extends Model<RoleInfoAttributes, roleInfoCreationAttributes> implements RoleInfoAttributes {

  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    comment: "主键"
  })
  id!: number;

  @Column({
    type: DataType.STRING,
    comment: "角色名称"
  })
  name?: string;

  @Column({
    type: DataType.STRING,
    comment: "描述"
  })
  description?: string;

  @Column({
    type: DataType.INTEGER,
    comment: "状态，1：启用，2：禁用，3：删除"
  })
  status?: number;

  @Column({
    type: DataType.STRING,
    comment: "权限Id"
  })
  actionIds?: string;

  @Column({
    type: DataType.DATE,
    comment: "创建时间"
  })
  created?: Date;

}
