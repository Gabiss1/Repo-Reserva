import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne, CreateDateColumn } from 'typeorm';
import { Institution } from './Institution';
import { Treatment } from './Treatment';

@Entity('patients')
export class Patient {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ unique: true, nullable: true })
  cpf: string;

  // O paciente pertence a uma instituição
  @ManyToOne(() => Institution, (institution) => institution.patients)
  institution: Institution;

  // Os tratamentos do paciente são criados e geridos pela instituição
  @OneToMany(() => Treatment, (treatment) => treatment.patient)
  treatments: Treatment[];
}