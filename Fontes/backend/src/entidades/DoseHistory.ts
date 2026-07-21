import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn } from 'typeorm';
import { Treatment } from './Treatment';

@Entity('dose_history')
export class DoseHistory {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Treatment, (treatment) => treatment.history)
  treatment: Treatment;

  @Column({ type: 'timestamp' })
  scheduledTime: Date;

  @Column({ type: 'timestamp', nullable: true })
  takenAt: Date;

  @Column({ default: false })
  isTaken: boolean;

  @CreateDateColumn()
  createdAt: Date;
}