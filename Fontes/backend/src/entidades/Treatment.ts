import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { User } from './User';
import { Patient } from './Patient';
import { Medication } from './Medication';
import { DoseHistory } from './DoseHistory';

@Entity('treatments')
export class Treatment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  // RELAÇÃO 1: Usuário autônomo (Opcional)
  @ManyToOne(() => User, (user) => user.treatments, { nullable: true })
  user: User;

  // RELAÇÃO 2: Paciente gerido por clínica (Opcional)
  @ManyToOne(() => Patient, (patient) => patient.treatments, { nullable: true })
  patient: Patient;

  @ManyToOne(() => Medication)
  medication: Medication;

  @Column()
  intervalHours: number;

  @Column()
  durationDays: number;

  @Column({ type: 'timestamp' })
  startDate: Date;

  @OneToMany(() => DoseHistory, (history) => history.treatment)
  history: DoseHistory[];
}