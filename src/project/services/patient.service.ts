import { PatientEntity } from './../entities/patient.entity';
import { Injectable } from '@nestjs/common';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, Repository } from 'typeorm';

@Injectable()
export class PatientService extends TypeOrmCrudService<PatientEntity> {
  constructor(
    @InjectRepository(PatientEntity)
    repository: Repository<PatientEntity>,
  ) {
    super(repository);
  }

  async search(word: string) {
    const doctors = await this.find({
      relations: { doctors: true },
      where: [
        { fullName: ILike(`%${word}%`) },
        { doctors: { fullName: ILike(`%${word}%`) } },
        { doctors: { specialty: ILike(`%${word}%`) } },
      ],
    });
    return doctors;
  }
}
