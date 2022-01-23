import { Expose } from "class-transformer";
import { Column, CreateDateColumn, Entity, PrimaryColumn } from "typeorm";
import { v4 as uuidV4 } from "uuid";

@Entity("users")
class User {
  @PrimaryColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column({ name: 'driver_license' })
  driverLicense: string;

  @Column({ name: 'is_admin' })
  isAdmin: boolean;

  @Column()
  avatar: string;
  
  @CreateDateColumn()
  @Column({ name: 'created_at' })
  createdAt: Date;
  
  constructor() {
    this.id = this.id ?? uuidV4();
  }

  @Expose({ name: "avatarUrl" })
  getAvatarUrl(): string {
    if (process.env.NODE_ENV === 'PRD') {
      return `${process.env.AWS_BUCKET_URL}/avatar/${this.avatar}`;
    }

    return `${process.env.APP_API_URL}/avatar/${this.avatar}`;
  }
}

export { User }