import { Entity, PrimaryGeneratedColumn, Column, OneToMany, CreateDateColumn } from 'typeorm';
import { User } from './User';
import { Patient } from './Patient';

@Entity('institutions')
export class Institution {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ unique: true })
  cnpj: string;

  // Uma instituição tem vários pacientes
  @OneToMany(() => Patient, (patient) => patient.institution)
  patients: Patient[];

  // Admin da instituição (Usuário com papel de admin)
  @OneToMany(() => User, (user) => user.managedInstitution)
  admins: User[];
}