import { UniversityEntity } from './../entities/university.entity';
import { Controller } from '@nestjs/common';
import { Crud, CrudController } from '@nestjsx/crud';
import { UniversityService } from '../services/university.service';
import { ApiTags } from '@nestjs/swagger';

@Crud({
  model: {
    type: UniversityEntity,
  },
})
@ApiTags('universities')
@Controller('universities')
export class UniversityController implements CrudController<UniversityEntity> {
  constructor(public service: UniversityService) {}
}
