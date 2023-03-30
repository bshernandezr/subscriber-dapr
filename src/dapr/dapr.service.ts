/*
https://docs.nestjs.com/providers#services
*/

import { Inject, Injectable } from '@nestjs/common';
import { DaprServer } from 'dapr-client';

@Injectable()
export class DaprService {
  constructor(@Inject('DaprServer') private readonly daprServer: DaprServer) {}

  async start() {
    this.daprServer.pubsub.subscribe('redis', 'channel', async (data) =>
      console.log('Subscribe event received: ' + JSON.stringify(data)),
    );
    await this.daprServer.start();
  }
}
