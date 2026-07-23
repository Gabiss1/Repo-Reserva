import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, CreateDateColumn } from 'typeorm';
import { Institution } from './Institution';
import { Treatment } from './Treatment';

@Entity('patients')
export class Patient {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  name!: string;

  @Column({ unique: true, nullable: true })
  cpf!: string;

  // O paciente pertence obrigatoriamente a uma instituição
  @ManyToOne(() => Institution, (institution) => institution.patients)
  institution!: Institution;

  @OneToMany(() => Treatment, (treatment) => treatment.patient)
  treatments!: Treatment[];

  @CreateDateColumn()
  createdAt!: Date;
}