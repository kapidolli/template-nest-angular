import { Injectable } from '@nestjs/common';
import { Entity, Schema } from 'redis-om';
import { ConnectionRedisService } from '../../shared/connection-redis.service';

class Car extends Entity {}
let schema = new Schema(
  Car,
  {
    make: { type: 'string' },
    model: { type: 'string' },
    image: { type: 'string' },
    description: { type: 'string', textSearch: true },
  },
  {
    dataStructure: 'JSON',
  }
);

@Injectable()
export class CarService {
  constructor(private connection: ConnectionRedisService) {}

  createCar(data: any) {
    const repository = this.connection.getRepository(schema);
    const car = repository.createEntity(data);
    return repository.save(car);
  }

  getCar(id: any) {
    const repository = this.connection.getRepository(schema);
    return repository.fetch(id);
  }

  createIndex() {
    const repository = this.connection.getRepository(schema);
    repository.createIndex();
  }

  searchCars(q: any) {
    const repository = this.connection.getRepository(schema);

    return repository
      .search()
      .where('make')
      .eq(q)
      .or('model')
      .eq(q)
      .or('description')
      .matches(q)
      .return.all();
  }

  searchAllCars() {
    const repository = this.connection.getRepository(schema);

    return repository.search().return.page(10, 10);
  }
}
