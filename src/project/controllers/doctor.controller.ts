import { DoctorService } from './../services/doctor.service';
import { DoctorEntity } from './../entities/doctor.entity';
import {
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Query,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Crud, CrudController } from '@nestjsx/crud';

@Crud({
  model: {
    type: DoctorEntity,
  },
  query: {
    join: {
      patients: { eager: true },
    },
  },
})
@ApiTags('doctors')
@Controller('doctors')
export class DoctorController implements CrudController<DoctorEntity> {
  constructor(public service: DoctorService) {}

  @Get('search')
  async search(@Query('searchWord') query: string) {
    return await this.service.search(query);
  }

  @Post(':doctorId/:patientId')
  async assignPatient(
    @Param('doctorId', ParseIntPipe) doctorId: number,
    @Param('patientId', ParseIntPipe) patientId: number,
  ) {
    return await this.service.assignPatient(doctorId, patientId);
  }
}
