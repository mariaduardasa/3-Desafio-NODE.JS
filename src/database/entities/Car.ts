import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

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
}
