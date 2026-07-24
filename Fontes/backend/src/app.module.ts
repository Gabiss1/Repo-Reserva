import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ScheduleModule } from '@nestjs/schedule';

// Controllers
import { TreatmentsController } from './controllers/treatmentsController';
import { ReportsController } from './controllers/reportsController';
import { UsersController } from './controllers/usersController';
import { CategoriesController } from './controllers/categoriesController';
import { MedicationsController } from './controllers/medicationController';
import { InstitutionsController } from './controllers/instituitionController';
import { PatientsController } from './controllers/patientsController';

// Services
import { TreatmentsService } from './services/treatmentsService';
import { UsersService } from './services/usersService';
import { NotificationsService } from './services/notificationsService';
import { ReportsService } from './services/reportsService';
import { CategoriesService } from './services/categoriesService';
import { MedicationsService } from './services/medicationService';
import { InstitutionsService } from './services/instituitionService';
import { PatientsService } from './services/patientsService';

// Entidades
import { User } from './entidades/User';
import { Treatment } from './entidades/Treatment';
import { Medication } from './entidades/Medication';
import { DoseHistory } from './entidades/DoseHistory';
import { Category } from './entidades/Category';
import { Patient } from './entidades/Patient';
import { Institution } from './entidades/Institution';

// Gateway
import { NotificationsGateway } from './gateways/notifications';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root', 
      password: '713406Gab#18042006',    
      database: 'medicapp',
      entities: [
        User, 
        Patient, 
        Institution, 
        Treatment, 
        Medication, 
        DoseHistory, 
        Category
      ],
      synchronize: true, 
      logging: true,    
    }),
    TypeOrmModule.forFeature([User, Treatment, Medication, DoseHistory, Category, Patient, Institution]),
    ScheduleModule.forRoot()
  ],

  controllers: [
    TreatmentsController,
    UsersController, 
    ReportsController, 
    CategoriesController,
    TreatmentsController,
    MedicationsController,
    InstitutionsController,
    PatientsController
  ],

  providers: [
    TreatmentsService, 
    UsersService,
    NotificationsService, 
    NotificationsGateway,
    ReportsService,
    CategoriesService,
    MedicationsService,
    InstitutionsService,
    PatientsService
  ],
})
export class AppModule {}