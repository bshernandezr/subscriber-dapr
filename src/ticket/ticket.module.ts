import { TicketService } from './services/ticket.service';
import { Module, forwardRef } from '@nestjs/common';
import { DaprModule } from 'src/shared/dapr/dapr.module';
import { PrismaModule } from 'src/shared/prisma/prisma.module';

@Module({
  imports: [forwardRef(() => DaprModule), PrismaModule],
  controllers: [],
  providers: [TicketService],
  exports: [TicketService],
})
export class TicketModule {}
