# Entidades do Banco de Dados - MedicApp (TypeORM + TypeScript)

Esta estrutura define as relações fundamentais para o sistema de gestão de tratamentos, suportando tanto pacientes individuais quanto instituições.

## 1. User (Usuário)
Representa tanto o paciente quanto o administrador de uma instituição.

```typescript
import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne, CreateDateColumn } from 'typeorm';
import { Treatment } from './Treatment';
import { Institution } from './Institution';

export enum UserRole {
  PATIENT = 'patient',
  ADMIN = 'admin',
}

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column({ select: false })
  password: string;

  @Column({ type: 'enum', enum: UserRole, default: UserRole.PATIENT })
  role: UserRole;

  @Column({ nullable: true })
  cpf: string;

  @ManyToOne(() => Institution, (institution) => institution.members, { nullable: true })
  institution: Institution;

  @OneToMany(() => Treatment, (treatment) => treatment.patient)
  treatments: Treatment[];

  @CreateDateColumn()
  createdAt: Date;
}
```

## 2. Institution (Instituição/Clínica)
Empresa que gerencia múltiplos pacientes.

```typescript
import { Entity, PrimaryGeneratedColumn, Column, OneToMany, CreateDateColumn } from 'typeorm';
import { User } from './User';

@Entity('institutions')
export class Institution {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ unique: true })
  cnpj: string;

  @OneToMany(() => User, (user) => user.institution)
  members: User[];

  @CreateDateColumn()
  createdAt: Date;
}
```

## 3. Medication (Medicamento)
Catálogo de remédios ou registro específico do tratamento.

```typescript
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Treatment } from './Treatment';

@Entity('medications')
export class Medication {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ nullable: true })
  dosageForm: string; // ex: Comprimido, Xarope

  @Column({ nullable: true })
  strength: string; // ex: 500mg

  @OneToMany(() => Treatment, (treatment) => treatment.medication)
  treatments: Treatment[];
}
```

## 4. Treatment (Tratamento)
A regra de negócio central: quem toma o quê, quando e por quanto tempo.

```typescript
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
  frequency: number; // ex: 4 (vezes ao dia)

  @Column()
  intervalHours: number; // ex: 6 (de 6 em 6 horas)

  @Column()
  durationDays: number; // ex: 21 (3 semanas)

  @Column({ type: 'timestamp' })
  startDate: Date;

  @Column({ default: true })
  isActive: boolean;

  @OneToMany(() => DoseHistory, (history) => history.treatment)
  history: DoseHistory[];

  @CreateDateColumn()
  createdAt: Date;
}
```

## 5. DoseHistory (Histórico de Doses)
Registro de adesão para relatórios.

```typescript
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
```
