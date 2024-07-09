import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('usersCourses')
export class UserCourse {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  userId: number;
  @Column()
  courseId: number;
  @Column()
  registrationCanceled: boolean;
  @Column()
  registered: boolean;
}
