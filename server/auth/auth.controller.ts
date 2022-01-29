import { Controller, Get } from '@nestjs/common';
import { CarService } from './car.service';

@Controller('auth')
export class AuthController {
  constructor(private carService: CarService) {}

  @Get()
  test() {
    return this.carService.getCar('01FTGE9TS3G54MRFB2ME35GKFQ');
  }

  @Get('create')
  createCar() {
    return this.carService.createCar({
      make: 'a',
      model: 'c classe',
      description: 'a muj me gjet',
    });
  }

  @Get('all')
  getAll() {
    return this.carService.searchAllCars();
  }

  @Get('index')
  createIndex() {
    this.carService.createIndex();
    return { message: 'OK!' };
  }
}
