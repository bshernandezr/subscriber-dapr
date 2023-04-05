import { DaprService } from './dapr.service';
import { Module } from '@nestjs/common';
import { DaprClient, DaprServer } from 'dapr-client';
import { TicketModule } from 'src/ticket/ticket.module';

@Module({
  imports: [TicketModule],
  controllers: [],
  providers: [
    DaprService,
    {
      provide: 'DaprServer',
      useValue: new DaprServer(),
    },
    {
      provide: 'DaprClient',
      useValue: new DaprClient(),
    },
  ],
  exports: ['DaprClient', 'DaprServer'],
})
export class DaprModule {}
