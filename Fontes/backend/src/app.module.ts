import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ScheduleModule } from '@nestjs/schedule';

// Controllers
import { TreatmentsController } from './controllers/treatmentsController';
import { ReportsController } from './controllers/reportsController';
import { UsersController } from './controllers/usersController';

// Services
import { TreatmentsService } from './services/treatmentsService';
import { UsersService } from './services/usersService';
import { NotificationsService } from './services/notificationsService';
import { ReportsService } from './services/reportsService';

// Entidades
import { User } from './entidades/User';
import { Treatment } from './entidades/Treatment';
import { Medication } from './entidades/Medication';
import { DoseHistory } from './entidades/DoseHistory';

// Gateway
import { NotificationsGateway } from './gateways/notifications';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      /* ... suas configs de banco ... */
      entities: [User, Treatment, Medication, DoseHistory],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([User, Treatment, Medication, DoseHistory]),
    ScheduleModule.forRoot()
  ],
  controllers: [TreatmentsController, UsersController, ReportsController],
  providers: [
    TreatmentsService, 
    UsersService,
    NotificationsService, 
    NotificationsGateway,
    ReportsService
  ],
})
export class AppModule {}