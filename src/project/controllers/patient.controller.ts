import { PatientEntity } from './../entities/patient.entity';
import { Controller, Get, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Crud, CrudController } from '@nestjsx/crud';
import { PatientService } from '../services/patient.service';

@Crud({
  model: {
    type: PatientEntity,
  },
  query: {
    join: {
      doctors: { eager: true },
    },
  },
})
@ApiTags('patients')
@Controller('patients')
export class PatientController implements CrudController<PatientEntity> {
  constructor(public service: PatientService) {}

  @Get('search')
  async search(@Query('searchWord') query: string) {
    return await this.service.search(query);
  }
}
