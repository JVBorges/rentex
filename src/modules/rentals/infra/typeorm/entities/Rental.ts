import { v4 as uuidV4 } from 'uuid';
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryColumn, UpdateDateColumn } from "typeorm";
import { Car } from '../../../../cars/infra/typeorm/entities/Car';

@Entity('rentals')
class Rental {
  @PrimaryColumn()
  id?: string;

  @ManyToOne(() => Car)
  @JoinColumn({ name: 'car_id' })
  car: string;
  
  @Column({ name: 'car_id' })
  carId: string;

  @Column({ name: 'user_id' })
  userId: string;

  @Column()
  total: number;

  @Column({ name: 'start_date' })
  startDate: Date;

  @Column({ name: 'end_date' })
  endDate: Date;

  @Column({ name: 'deadline_date' })
  deadlineDate: Date;

  @CreateDateColumn()
  @Column({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn()
  @Column({ name: 'updated_at' })
  updatedAt: Date;

  constructor() {
    this.id = this.id ?? uuidV4();
  }
}

export { Rental }