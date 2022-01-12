import { v4 as uuidV4 } from 'uuid';
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { Category } from './Category';

@Entity("cars")
class Car {
  @PrimaryColumn()
  id?: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column({ name: 'daily_rate'})
  dailyRate: number;

  @Column()
  available: boolean = true;

  @Column({ name: 'license_plate'})
  licensePlate: string;

  @Column({ name: 'fine_amount'})
  fineAmount: number;

  @Column() 
  brand: string;

  @Column({ name: 'category_id'})
  categoryId: string;

  @ManyToOne(() => Category)
  @JoinColumn({ name: 'category_id' })
  category: Category;

  @CreateDateColumn()
  @Column({ name: 'created_at' })
  createdAt: Date;

  constructor() {
    this.id = this.id ?? uuidV4();
  }
}

export { Car }