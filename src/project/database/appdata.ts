import { PatientEntity } from './../entities/patient.entity';
import { DoctorEntity } from './../entities/doctor.entity';
import { DataSource } from 'typeorm';
import { StudentEntity } from '../entities/student.entity';
import { UniversityEntity } from '../entities/university.entity';

export const PostgresDataSource = async (): Promise<DataSource> => {
  return await new DataSource({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: 'example',
    database: 'sample_db',
    entities: [UniversityEntity, StudentEntity, DoctorEntity, PatientEntity],
  }).initialize();
};
