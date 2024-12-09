import {
  Table,
  Model,
  Column,
  DataType,
  AllowNull,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';

@Table({ tableName: 'videos' })
export class Videos extends Model<Videos> {
  @AllowNull(false)
  @Column({
    type: DataType.STRING,
  })
  video: string;
}
