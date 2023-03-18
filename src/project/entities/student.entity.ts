import { UniversityEntity } from './university.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class StudentEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  @ApiProperty()
  name: string;

  @Column({ nullable: false })
  @ApiProperty()
  age: number;

  @Column({ nullable: false })
  @ApiProperty()
  majorName: string;

  @ManyToOne(() => UniversityEntity, (university) => university.students, {
    onUpdate: 'RESTRICT',
    onDelete: 'CASCADE',
  })
  university: UniversityEntity;
}
