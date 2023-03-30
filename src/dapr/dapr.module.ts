import { DaprService } from './dapr.service';
import { Module } from '@nestjs/common';
import { DaprServer } from 'dapr-client';

@Module({
  imports: [],
  controllers: [],
  providers: [
    DaprService,
    {
      provide: 'DaprServer',
      useValue: new DaprServer(),
    },
  ],
  exports: ['DaprServer'],
})
export class DaprModule {}
