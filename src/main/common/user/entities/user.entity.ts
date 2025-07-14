import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('sys_user') // 标记为实体
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  email: string;
}