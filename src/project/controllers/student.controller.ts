import { Controller, Param, ParseIntPipe, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Crud, CrudController } from '@nestjsx/crud';
import { StudentEntity } from '../entities/student.entity';
import { StudentService } from '../services/student.service';

@Crud({
  model: {
    type: StudentEntity,
  },
  query: {
    join: {
      university: { eager: true },
    },
  },
})
@ApiTags('students')
@Controller('students')
export class StudentController implements CrudController<StudentEntity> {
  constructor(public service: StudentService) {}

  @Post(':studentId/:universityId')
  async assignUniversity(
    @Param('studentId', ParseIntPipe) studentId: number,
    @Param('universityId', ParseIntPipe) universityId: number,
  ) {
    return await this.service.assignUniversity(studentId, universityId);
  }
}
