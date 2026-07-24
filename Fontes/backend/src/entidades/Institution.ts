import { Entity, PrimaryGeneratedColumn, Column, OneToMany, CreateDateColumn } from 'typeorm';
import { Patient } from './Patient';

@Entity('institutions')
export class Institution {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  name!: string;

  @Column({ unique: true })
  cnpj!: string;

  // Uma instituição tem ligação APENAS com pacientes
  @OneToMany(() => Patient, (patient) => patient.institution)
  patients!: Patient[];

  @CreateDateColumn()
  createdAt!: Date;
}