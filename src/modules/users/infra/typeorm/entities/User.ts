import bcrypt from 'bcryptjs';
import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm';

export enum UserRole {
  ADMIN = 'admin',
  NORMAL = 'normal'
}

@Entity('user')
export class User {
  @PrimaryGeneratedColumn('uuid')
  user_id: string;

  @Column()
  name: string;

  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.NORMAL
  })
  user_type: UserRole;

  @Column({ nullable: true, type: 'varchar' })
  phone: string;

  @Column({ length: 14, nullable: true, type: 'varchar' })
  cpf: string;

  @Column()
  email: string;

  @Column({ select: false })
  password: string;

  @BeforeInsert()
  @BeforeUpdate()
  hashPassword?() {
    this.password = bcrypt.hashSync(this.password, 8);
  }

  @Column({ default: true })
  is_active: boolean;

  @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  updated_at: Date;

  @DeleteDateColumn({ type: 'timestamptz' })
  deleted_at: Date | null;
}
