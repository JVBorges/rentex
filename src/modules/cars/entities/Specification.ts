import { Column, CreateDateColumn, Entity, PrimaryColumn } from 'typeorm';
import { v4 as uuidV4 } from 'uuid';

@Entity("specifications")
class Specification {
  @PrimaryColumn()
  id?: String;

  @Column()
  name: String;

  @Column()
  description: String;

  @CreateDateColumn()
  created_at: Date;

  constructor() {
    this.id = this.id ?? uuidV4();
  }
}

export { Specification }