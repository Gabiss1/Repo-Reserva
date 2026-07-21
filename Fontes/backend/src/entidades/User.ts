import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne, CreateDateColumn } from 'typeorm';
import { Treatment } from './Treatment';
import { Institution } from './Institution';

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

  @Column({ select: false })
  password: string;

  @Column({ type: 'enum', enum: UserRole, default: UserRole.PATIENT })
  role: UserRole;

  @Column({ nullable: true })
  cpf: string;

  @ManyToOne(() => Institution, (institution) => institution.members, { nullable: true })
  institution: Institution;

  @OneToMany(() => Treatment, (treatment) => treatment.patient)
  treatments: Treatment[];

  @CreateDateColumn()
  createdAt: Date;
}