import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, CreateDateColumn } from 'typeorm';
import { User } from './User';
import { Medication } from './Medication';
import { DoseHistory } from './DoseHistory';
import { Patient } from './Patient';

@Entity('treatments')
export class Treatment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  // Opcional: Se for um usuário gerindo o próprio remédio
  @ManyToOne(() => User, (user) => user.treatments, { nullable: true })
  user: User;

  // Opcional: Se for um paciente sendo gerido por uma clínica
  @ManyToOne(() => Patient, (patient) => patient.treatments, { nullable: true })
  patient: Patient;

  @ManyToOne(() => Medication)
  medication: Medication;

  @Column()
  frequency: number; // Ex: 3 (vezes ao dia)

  @Column()
  intervalHours: number; // Ex: 8 (de 8 em 8 horas)

  @Column()
  durationDays: number; // Duração total do tratamento

  @Column({ type: 'timestamp' })
  startDate: Date;

  @Column({ default: true })
  isActive: boolean;

  @OneToMany(() => DoseHistory, (history) => history.treatment)
  history: DoseHistory[];

  @CreateDateColumn()
  createdAt: Date;
}