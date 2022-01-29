import { Injectable, OnModuleInit } from '@nestjs/common';
import { Client, Repository } from 'redis-om';
import { from, map, Observable } from 'rxjs';

@Injectable()
export class ConnectionRedisService implements OnModuleInit {
  private client = new Client();

  onModuleInit() {
    this.connect().subscribe();
  }

  private connect(): Observable<Client> {
    if (!this.client.isOpen()) {
      return from(
        this.client.open(
          'redis://default:n16wbsY7a5VtWcQO2yWhzuX2I8TMhoIu@redis-18105.c257.us-east-1-3.ec2.cloud.redislabs.com:18105'
        )
      ).pipe(
        map(() => {
          return this.client;
        })
      );
    }
    return new Observable((observer) => {
      observer.next(this.client);
    });
  }

  getRepository(schema: any) {
    return new Repository(schema, this.client);
  }
}
