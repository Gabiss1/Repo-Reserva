# Exemplos de Rotas (CRUD) - MedicApp (NestJS + TypeORM)

Esta documentação apresenta a estrutura de Controllers e Services para as entidades principais, seguindo as melhores práticas de Clean Architecture e NestJS.

## 1. Módulo de Usuários (Users)
Gerencia o cadastro de pacientes e administradores.

### Controller (`users.controller.ts`)
```typescript
import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.usersService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id', ParseUUIDPipe) id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.usersService.remove(id);
  }
}
```

---

## 2. Módulo de Medicamentos (Medications)
Catálogo de remédios disponíveis no sistema.

### Controller (`medications.controller.ts`)
```typescript
import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe } from '@nestjs/common';
import { MedicationsService } from './medications.service';

@Controller('medications')
export class MedicationsController {
  constructor(private readonly medicationsService: MedicationsService) {}

  @Post()
  create(@Body() createMedicationDto: any) {
    return this.medicationsService.create(createMedicationDto);
  }

  @Get()
  findAll() {
    return this.medicationsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.medicationsService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id', ParseUUIDPipe) id: string, @Body() updateMedicationDto: any) {
    return this.medicationsService.update(id, updateMedicationDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.medicationsService.remove(id);
  }
}
```

---

## 3. Módulo de Tratamentos (Treatments)
A regra de negócio central, vinculando pacientes a medicamentos e horários.

### Service Logic (`treatments.service.ts`)
Este exemplo foca na lógica de criação, que deve gerar automaticamente o histórico de doses inicial.

```typescript
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Treatment } from './entities/treatment.entity';
import { DoseHistory } from './entities/dose-history.entity';

@Injectable()
export class TreatmentsService {
  constructor(
    @InjectRepository(Treatment)
    private treatmentRepository: Repository<Treatment>,
    @InjectRepository(DoseHistory)
    private doseHistoryRepository: Repository<DoseHistory>,
  ) {}

  async create(createTreatmentDto: any): Promise<Treatment> {
    const treatment = this.treatmentRepository.create(createTreatmentDto);
    const savedTreatment = await this.treatmentRepository.save(treatment);

    // Lógica para gerar as primeiras doses baseada na frequência
    await this.generateInitialDoses(savedTreatment);

    return savedTreatment;
  }

  private async generateInitialDoses(treatment: Treatment) {
    const doses = [];
    let currentTime = new Date(treatment.startDate);

    // Exemplo: Gerar doses para as primeiras 24h
    for (let i = 0; i < treatment.frequency; i++) {
      const dose = this.doseHistoryRepository.create({
        treatment: treatment,
        scheduledTime: new Date(currentTime),
        isTaken: false,
      });
      doses.push(dose);
      currentTime.setHours(currentTime.getHours() + treatment.intervalHours);
    }

    await this.doseHistoryRepository.save(doses);
  }

  async findAllByPatient(patientId: string) {
    return this.treatmentRepository.find({
      where: { patient: { id: patientId }, isActive: true },
      relations: ['medication', 'history'],
    });
  }
}
```

## 4. Resumo das Rotas (Endpoints)

| Método | Endpoint | Descrição |
| :--- | :--- | :--- |
| **POST** | `/users` | Criar novo usuário (Paciente ou Admin) |
| **GET** | `/users/:id` | Detalhes do perfil do usuário |
| **POST** | `/medications` | Cadastrar novo medicamento no catálogo |
| **GET** | `/medications` | Listar todos os medicamentos |
| **POST** | `/treatments` | Iniciar novo tratamento para um paciente |
| **GET** | `/treatments/patient/:id` | Listar tratamentos ativos de um paciente |
| **PATCH** | `/dose-history/:id` | Marcar dose como tomada (Check-in) |
