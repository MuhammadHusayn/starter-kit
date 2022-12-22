import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity({ name: 'users' })
export class UserEntity extends BaseEntity {
    @PrimaryGeneratedColumn()
    userId: number;

    @Column({ type: 'varchar', unique: true, nullable: false })
    email: string;

    @Column({ type: 'varchar', nullable: false })
    password: string;

    @Column({ type: 'varchar', nullable: false })
    fullName: string;

    @Column({ type: 'datetime' })
    @CreateDateColumn()
    createdAt: Date;
}
