import { PatientEntity } from './../entities/patient.entity';
import { DoctorEntity } from './../entities/doctor.entity';
import { Injectable } from '@nestjs/common';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, Repository } from 'typeorm';
import { PostgresDataSource } from '../database/appdata';

@Injectable()
export class DoctorService extends TypeOrmCrudService<DoctorEntity> {
  constructor(
    @InjectRepository(DoctorEntity)
    repository: Repository<DoctorEntity>,
  ) {
    super(repository);
  }

  async search(word: string) {
    const doctors = await this.find({
      relations: { patients: true },
      where: [
        { fullName: ILike(`%${word}%`) },
        { specialty: ILike(`%${word}%`) },
        { patients: { fullName: ILike(`%${word}%`) } },
      ],
    });
    return doctors;
  }

  async assignPatient(doctorId: number, patientId: number) {
    const doctor = await this.findOne({
      where: { id: doctorId },
      relations: ['patients'],
    });
    const dataSource = await PostgresDataSource();
    const patient = await dataSource
      .getRepository(PatientEntity)
      .findOne({ where: { id: patientId } });

    if (doctor && patient) {
      if (doctor.patients) {
        doctor.patients.push(patient);
      } else {
        doctor.patients = [patient];
      }
      return await dataSource.getRepository(DoctorEntity).save(doctor);
    } else {
      this.throwBadRequestException(`Couldn't find doctor or patient`);
    }
  }
}
