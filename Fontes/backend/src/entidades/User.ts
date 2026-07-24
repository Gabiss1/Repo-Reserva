import { Entity, PrimaryGeneratedColumn, Column, OneToMany, CreateDateColumn } from 'typeorm';
import { Treatment } from './Treatment';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  name!: string;

  @Column({ unique: true })
  email!: string;

  @Column({ unique: true, nullable: true })
  cpf!: string;

  @Column({ select: false })
  password!: string;

  // Um usuário autônomo gerencia seus próprios tratamentos
  @OneToMany(() => Treatment, (treatment) => treatment.user)
  treatments!: Treatment[];

  @CreateDateColumn()
  createdAt!: Date;
}