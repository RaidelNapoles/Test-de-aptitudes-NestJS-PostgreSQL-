import { PatientEntity } from './patient.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class DoctorEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  @ApiProperty()
  fullName: string;

  @Column({ nullable: false })
  @ApiProperty()
  specialty: string;

  @ManyToMany(() => PatientEntity, (patient) => patient.doctors, {
    onUpdate: 'RESTRICT',
    onDelete: 'CASCADE',
  })
  @JoinTable()
  patients: PatientEntity[];
}
