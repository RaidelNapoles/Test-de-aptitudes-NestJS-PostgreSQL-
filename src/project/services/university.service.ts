import { UniversityEntity } from './../entities/university.entity';
import { Injectable } from '@nestjs/common';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UniversityService extends TypeOrmCrudService<UniversityEntity> {
  constructor(
    @InjectRepository(UniversityEntity)
    repository: Repository<UniversityEntity>,
  ) {
    super(repository);
  }
}
