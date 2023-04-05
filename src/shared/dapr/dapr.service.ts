import { Inject, Injectable, forwardRef } from '@nestjs/common';
import { DaprServer } from 'dapr-client';
import { TicketService } from 'src/ticket/services/ticket.service';

@Injectable()
export class DaprService {
  constructor(
    @Inject('DaprServer') private readonly daprServer: DaprServer,
    private readonly ticketService: TicketService,
  ) {}

  async start() {
    this.daprServer.pubsub.subscribe(
      'redis',
      'ticket-created',
      async (data) => {
        this.ticketService.checkTicket(data);
      },
    );

    this.daprServer.pubsub.subscribe(
      'redis',
      'ticket-checked',
      async (data) => {
        this.ticketService.processTicket(data);
      },
    );

    this.daprServer.pubsub.subscribe(
      'redis',
      'ticket-processed',
      async (data) => {
        this.ticketService.finishTicket(data);
      },
    );

    this.daprServer.pubsub.subscribe(
      'redis',
      'ticket-finished',
      async (data) => {
        console.log('Ticket gestionado exitosamente', data);
      },
    );
    await this.daprServer.start();
  }
}
