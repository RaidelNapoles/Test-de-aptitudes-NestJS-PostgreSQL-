import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { DoctorEntity } from './doctor.entity';

@Entity()
export class PatientEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  @ApiProperty()
  fullName: string;

  @ManyToMany(() => DoctorEntity, (doctor) => doctor.patients, {
    onUpdate: 'RESTRICT',
    onDelete: 'CASCADE',
  })
  doctors: DoctorEntity[];
}
