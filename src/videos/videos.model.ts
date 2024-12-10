import {
  Table,
  Model,
  Column,
  DataType,
  AllowNull,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';

@Table({ tableName: 'files' })
export class File extends Model<File> {
  @AllowNull(false)
  @Column({
    type: DataType.STRING,
  })
  file: string;
}
