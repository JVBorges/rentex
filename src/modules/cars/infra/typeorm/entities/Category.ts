import { v4 as uuidV4 } from 'uuid';
import { Column, CreateDateColumn, Entity, PrimaryColumn } from 'typeorm';

@Entity("categories")
class Category {
  @PrimaryColumn()
  id?: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @CreateDateColumn()
  @Column({ name: 'created_at' })
  createdAt: Date;

  constructor() {
    this.id = this.id ?? uuidV4();
  }
}

export { Category }