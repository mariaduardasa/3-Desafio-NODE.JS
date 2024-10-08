import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Reserve } from './Reserve';

@Entity('Users')
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column({unique: true})
    cpf: string;

    @Column('date')
    birth: Date;

    @Column()
    cep: string;

    @Column({unique: true})
    email: string;

    @Column()
    password: string;

    @OneToMany(() => Reserve, reserve => reserve.user, { cascade: true })
    reserves: Reserve[];
}
