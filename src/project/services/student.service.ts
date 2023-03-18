import { PostgresDataSource } from './../database/appdata';
import { UniversityEntity } from './../entities/university.entity';
import { Injectable } from '@nestjs/common';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOneOptions, Repository } from 'typeorm';
import { StudentEntity } from '../entities/student.entity';
import { CrudRequest, Override } from '@nestjsx/crud';

@Injectable()
export class StudentService extends TypeOrmCrudService<StudentEntity> {
  constructor(
    @InjectRepository(StudentEntity)
    repository: Repository<StudentEntity>,
  ) {
    super(repository);
  }

  async assignUniversity(studentId: number, universityId: number) {
    const student = await this.findOne({ where: { id: studentId } });
    const dataSource = await PostgresDataSource();
    const university = await dataSource
      .getRepository(UniversityEntity)
      .findOne({ where: { id: universityId } });

    if (student && university) {
      student.university = university;
      return await dataSource.getRepository(StudentEntity).save(student);
    } else {
      this.throwBadRequestException(`Couldn't find university or student`);
    }
  }
}
