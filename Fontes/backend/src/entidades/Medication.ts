import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Treatment } from './Treatment';

// 
@Entity('medications')
export class Medication {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ nullable: true })
  dosageForm: string; // Ex: Comprimido, Gotas

  @Column({ nullable: true })
  strength: string; // Ex: 50mg, 500mg/ml

  @OneToMany(() => Treatment, (treatment) => treatment.medication)
  treatments: Treatment[];
}