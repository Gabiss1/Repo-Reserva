import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Treatment } from './Treatment';

export enum UserRole {
  PATIENT = 'patient',
  ADMIN = 'admin',
}

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column({ unique: true, nullable: true })
  cpf: string;

  @OneToMany(() => Treatment, (treatment) => treatment.user)
  treatments: Treatment[];
}