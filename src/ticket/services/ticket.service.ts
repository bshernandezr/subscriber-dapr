import { Inject, Injectable } from '@nestjs/common';
import { DaprClient } from 'dapr-client';
import { PrismaService } from 'src/shared/prisma/services/prisma.service';
import { Prisma } from '@prisma/client';
import { TicketDto } from '../dtos/ticket.dto';
import { TicketStatus } from '../enums/ticket-status.enum';

@Injectable()
export class TicketService {
  constructor(
    @Inject('DaprClient') private readonly daprClient: DaprClient,
    private readonly prismaService: PrismaService,
  ) {}

  async checkTicket(ticketDto: TicketDto) {
    console.log('Checking ticket', ticketDto, new Date().toISOString());
    await this.delay(5000);
    const data: Prisma.TicketUncheckedUpdateInput = {
      ticketstatus: TicketStatus.checked,
    };
    const ticket = await this.prismaService.ticket.update({
      data,
      where: { ticket_id: ticketDto.ticket_id },
    });

    this.updateTicketHistory(ticket);
    await this.daprClient.pubsub.publish('redis', 'ticket-checked', {
      ...ticket,
      ticket_id: ticket.ticket_id,
    });
  }

  async processTicket(ticketDto: TicketDto) {
    console.log('Processing ticket', ticketDto, new Date().toISOString());
    await this.delay(3000);
    const data: Prisma.TicketUncheckedUpdateInput = {
      ticketstatus: TicketStatus.processed,
    };
    const ticket = await this.prismaService.ticket.update({
      data,
      where: { ticket_id: ticketDto.ticket_id },
    });

    this.updateTicketHistory(ticket);
    await this.daprClient.pubsub.publish('redis', 'ticket-processed', {
      ...ticket,
      ticket_id: ticket.ticket_id,
    });
  }

  async finishTicket(ticketDto: TicketDto) {
    console.log('Finishing ticket', ticketDto, new Date().toISOString());
    await this.delay(2000);
    const data: Prisma.TicketUncheckedUpdateInput = {
      ticketstatus: TicketStatus.finished,
    };
    const ticket = await this.prismaService.ticket.update({
      data,
      where: { ticket_id: ticketDto.ticket_id },
    });

    this.updateTicketHistory(ticket);
    await this.daprClient.pubsub.publish('redis', 'ticket-finished', {
      ...ticket,
      ticket_id: ticket.ticket_id,
    });
  }

  async updateTicketHistory(ticket: Prisma.TicketUncheckedCreateInput) {
    const data: Prisma.Ticket_HistoryUncheckedCreateInput = {
      ticketid: ticket.ticket_id,
      tickettype: ticket.tickettype,
      ticketstatus: ticket.ticketstatus,
    };
    await this.prismaService.ticket_History.create({ data });
  }

  private async delay(ms: number) {
    await new Promise<void>((resolve) => setTimeout(() => resolve(), ms)).then(
      () => console.log('Processed'),
    );
  }
}
