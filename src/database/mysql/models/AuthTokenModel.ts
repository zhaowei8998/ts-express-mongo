import { Optional } from 'sequelize';
import { Table, Model, Column, DataType } from "sequelize-typescript";

export interface AuthTokenAttributes {
  id?: number;
  userId?: number;
  token?: string;
  status?: number;
  created?: Date;
}

export type authTokenPk = "id";
export type authTokenId = AuthTokenModel[authTokenPk];
export type authTokenOptionalAttributes = "id" | "userId" | "token" | "status" | "created";
export type authTokenCreationAttributes = Optional<AuthTokenAttributes, authTokenOptionalAttributes>;

@Table({
  timestamps: false,
  modelName: "auth_token",
  tableName: "auth_token",
})
export class AuthTokenModel extends Model<AuthTokenAttributes, authTokenCreationAttributes> implements AuthTokenAttributes {

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
    type: DataType.STRING,
    comment: "token"
  })
  token?: string;

  @Column({
    type: DataType.INTEGER,
    comment: "token状态，1：有效，2：失效"
  })
  status?: number;

  @Column({
    type: DataType.DATE,
    comment: "创建时间"
  })
  created?: Date;

}
