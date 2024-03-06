import { Optional } from 'sequelize';
import { Table, Model, Column, DataType } from "sequelize-typescript";

export interface MenuAttributes {
  id: number;
  parentId?: number;
  name?: string;
  created?: Date;
}

export type menuPk = "id";
export type menuId = MenuModel[menuPk];
export type menuOptionalAttributes = "id" | "parentId" | "name" | "created";
export type menuCreationAttributes = Optional<MenuAttributes, menuOptionalAttributes>;


@Table({
  timestamps: false,
  modelName: "menu",
  tableName: "menu",
})
export class MenuModel extends Model<MenuAttributes, menuCreationAttributes> implements MenuAttributes {

  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    comment: "主键"
  })
  id!: number;

  @Column({
    type: DataType.INTEGER,
    comment: "父级ID"
  })
  parentId?: number;

  @Column({
    type: DataType.STRING,
    comment: "菜单名称"
  })
  name?: string;

  @Column({
    type: DataType.DATE,
    comment: "创建时间"
  })
  created?: Date;

}
