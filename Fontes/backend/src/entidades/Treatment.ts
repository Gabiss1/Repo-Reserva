import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, CreateDateColumn } from 'typeorm';
import { User } from './User';
import { Medication } from './Medication';
import { DoseHistory } from './DoseHistory';

@Entity('treatments')
export class Treatment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User, (user) => user.treatments)
  patient: User;

  @ManyToOne(() => Medication, (medication) => medication.treatments)
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