import { v4 as uuidV4 } from 'uuid';
import { Column, CreateDateColumn, Entity, PrimaryColumn, UpdateDateColumn } from "typeorm";

@Entity('rentals')
class Rental {
  @PrimaryColumn()
  id?: string;

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