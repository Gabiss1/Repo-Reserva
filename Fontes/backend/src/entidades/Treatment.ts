import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { User } from './User';
import { Patient } from './Patient';
import { Medication } from './Medication';
import { DoseHistory } from './DoseHistory';

@Entity('treatments')
export class Treatment {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  // Pode pertencer a um Usuário Autônomo
  @ManyToOne(() => User, (user) => user.treatments, { nullable: true })
  user?: User;

  // OU a um Paciente de Instituição
  @ManyToOne(() => Patient, (patient) => patient.treatments, { nullable: true })
  patient?: Patient;

  @ManyToOne(() => Medication)
  medication!: Medication;

  @Column()
  intervalHours!: number;

  @Column()
  durationDays!: number;

  @Column({ type: 'timestamp' })
  startDate!: Date;

  @OneToMany(() => DoseHistory, (history) => history.treatment)
  history!: DoseHistory[];
}