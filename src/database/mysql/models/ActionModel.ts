
import { Optional } from 'sequelize';
import { Table, Model, Column, DataType } from "sequelize-typescript";
export interface ActionAttributes {
  id: number;
  menuId?: number;
  operate?: string;
  isRestrict?: number;
  created?: Date;
}



export type actionPk = "id";
export type actionId = ActionModel[actionPk];
export type actionOptionalAttributes = "id" | "menuId" | "operate" | "isRestrict" | "created";
export type actionCreationAttributes = Optional<ActionAttributes, actionOptionalAttributes>;

@Table({
  timestamps: false,
  modelName: "action",
  tableName: "action",
})
export class ActionModel extends Model<ActionAttributes, actionCreationAttributes> implements ActionAttributes {

  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    comment: "主键"
  })
  id!: number;

  @Column({
    type: DataType.INTEGER,
    comment: "菜单Id"
  })
  menuId?: number;

  @Column({
    type: DataType.STRING,
    comment: "操作名称"
  })
  operate?: string;

  @Column({
    type: DataType.INTEGER,
    comment: "创建角色时是否是受限制的"
  })
  isRestrict?: number;

  @Column({
    type: DataType.DATE,
    comment: "创建时间"
  })
  created?: Date;
}
