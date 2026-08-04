import { Module } from '@nestjs/common';
import { NotificationsGateway } from 'src/gateways/notifications';
import { NotificationsService } from 'src/services/notificationsService';
import { DoseHistoryModule } from './DoseHistoryModule';

@Module({
  imports: [
    DoseHistoryModule,
  ],
  providers: [
    NotificationsGateway,
    NotificationsService,
  ],
  exports: [
    NotificationsGateway,
    NotificationsService,
  ],
})
export class NotificationModule {}