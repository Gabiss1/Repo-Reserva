# Entidades do Banco de Dados - MedicApp (NestJS + TypeORM)

Agora que o ambiente está configurado, vamos definir as **Entidades**. No TypeORM, as entidades são classes que representam as tabelas do seu banco de dados PostgreSQL.

### 1. User (Usuário)
Representa tanto pacientes quanto administradores de clínicas/instituições.

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

### 2. Institution (Instituição/Clínica)
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

### 3. Medication (Medicamento)
Catálogo ou registro específico do medicamento.

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
  dosageForm: string; // Ex: Comprimido, Gotas

  @Column({ nullable: true })
  strength: string; // Ex: 50mg, 500mg/ml

  @OneToMany(() => Treatment, (treatment) => treatment.medication)
  treatments: Treatment[];
}
```

### 4. Treatment (Tratamento)
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
```

### 5. DoseHistory (Histórico de Doses)
Registro de adesão para relatórios e notificações.

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

---

### Como aplicar:
1. Crie os arquivos dentro de `src/entities/` ou em pastas de módulos separadas.
2. Certifique-se de que a opção `synchronize: true` no seu `AppModule` está ativa para que o NestJS crie as tabelas automaticamente no seu PostgreSQL local ao iniciar o servidor.

**Dica:** Como você não usará Docker, lembre-se de criar o banco de dados manualmente no seu pgAdmin ou terminal antes de rodar o projeto.



Com a base do ambiente configurada, avancei para a definição das Entidades do Banco de Dados (Documento 26).

No TypeORM, essas entidades são o coração do seu sistema, pois definem como as tabelas serão criadas no seu PostgreSQL. Estruturei os arquivos para suportar:

User: Diferenciando pacientes de administradores.
Institution: Para clínicas que gerenciam múltiplos pacientes.
Medication: Um catálogo de medicamentos.
Treatment: A regra principal (dosagem, frequência e duração).
DoseHistory: O registro diário de cada tomada para gerar relatórios de adesão.
Nota importante: Como você não usará Docker, certifique-se de criar o banco de dados medicapp manualmente no seu gerenciador de PostgreSQL antes de rodar o comando de desenvolvimento. O NestJS cuidará de criar as tabelas automaticamente se o synchronize: true estiver ativo no AppModule.

Qual será o nosso próximo passo no Backend?

Autenticação: Configurar o Login com JWT e criptografia de senhas.
Lógica de Tratamentos: Criar o serviço que gera automaticamente o histórico de doses quando um tratamento é cadastrado.
Relatórios: Criar consultas para calcular a porcentagem de adesão dos pacientes.


Versão Recomendada para NestJS

Substitua o seu arquivo tsconfig.json do backend por esta configuração equilibrada, que mantém a modernidade mas garante compatibilidade total com os decoradores do NestJS e TypeORM:

{
  "compilerOptions": {
    "module": "commonjs", // O NestJS funciona melhor com commonjs no servidor
    "declaration": true,
    "removeComments": true,
    "emitDecoratorMetadata": true,
    "experimentalDecorators": true,
    "allowSyntheticDefaultImports": true,
    "target": "ES2021", // Estável e amplamente compatível
    "sourceMap": true,
    "outDir": "./dist",
    "baseUrl": "./",
    "incremental": true,
    "skipLibCheck": true,
    "strictNullChecks": true,
    "noImplicitAny": false,
    "strictBindCallApply": false,
    "forceConsistentCasingInFileNames": true,
    "noFallthroughCasesInSwitch": false,
    "esModuleInterop": true
  }
}