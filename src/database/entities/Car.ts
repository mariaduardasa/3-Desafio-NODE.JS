import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Reserve } from './Reserve';

@Entity('Cars')
export class Car {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    model: string;

    @Column()
    color: string;

    @Column('integer')
    year: number;

    @Column('integer')
    valuePerDay: number;

    @Column('json')
    acessories: {name: string}[]; 

    @Column('integer')
    numberOfPassengers: number

    @OneToMany(() => Reserve, reserve => reserve.car, { cascade: true })
    reserves: Reserve[];
}
