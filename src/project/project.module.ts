import { PatientService } from './services/patient.service';
import { DoctorService } from './services/doctor.service';
import { PatientController } from './controllers/patient.controller';
import { DoctorController } from './controllers/doctor.controller';
import { PatientEntity } from './entities/patient.entity';
import { DoctorEntity } from './entities/doctor.entity';
import { StudentEntity } from './entities/student.entity';
import { UniversityEntity } from './entities/university.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StudentService } from './services/student.service';
import { UniversityService } from './services/university.service';
import { StudentController } from './controllers/student.controller';
import { UniversityController } from './controllers/university.controller';
import { Module } from '@nestjs/common';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      UniversityEntity,
      StudentEntity,
      DoctorEntity,
      PatientEntity,
    ]),
  ],
  controllers: [
    UniversityController,
    StudentController,
    DoctorController,
    PatientController,
  ],
  providers: [UniversityService, StudentService, DoctorService, PatientService],
})
export class ProjectModule {}
