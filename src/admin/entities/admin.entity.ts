import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';


@Entity('admin')
export class Admin {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', length: 255 })
    name: string;

    @Column()
    tel: string;

    @Column()
    password: string;

    @Column({ nullable: true })
    token?: string;

    @CreateDateColumn()
    createdAt: Date;

    @CreateDateColumn()
    updatedAt: Date;

    // @BeforeInsert()
    // async hashPassword() {
    //     if (this.password) {
    //         console.log(1);
    //         this.password = await bcrypt.hash(this.password, 10);
    //     }
    // }
}