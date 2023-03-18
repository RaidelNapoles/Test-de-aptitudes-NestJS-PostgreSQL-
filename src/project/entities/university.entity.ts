import { StudentEntity } from './student.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class UniversityEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  @ApiProperty()
  name: string;

  @OneToMany(() => StudentEntity, (student) => student.university, {
    onUpdate: 'RESTRICT',
    onDelete: 'CASCADE',
  })
  students: StudentEntity[];
}
