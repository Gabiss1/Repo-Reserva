import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne, CreateDateColumn } from 'typeorm';
import { Treatment } from './Treatment';
import { Category } from './Category';
import { PharmaceuticalForm } from 'src/dashboard/dto/enum/PharmaceuticalForm';

@Entity('medications')
export class Medication {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  name!: string;

  @Column({ nullable: true })
  dosage!: string; // Ex: Comprimido, Xarope, Gotas

  @Column({ nullable: true })
  pharmaceuticalForm!: PharmaceuticalForm; // Ex: 500mg, 10mg/ml

  @ManyToOne(() => Category, (category) => category.medications, { nullable: true })
  category!: Category;

  @OneToMany(() => Treatment, (treatment) => treatment.medication)
  treatments!: Treatment[];
}