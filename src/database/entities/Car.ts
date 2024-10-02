import {Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Car {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    model: string;

    @Column()
    color: string;

    @Column()
    year: string;

    @Column('integer')
    valuePerDay: number;

    @Column('text')
    acessories: string;

    @Column()
    numberOfPassengers: number;

    getAccessories(): {name: string}[] {
        return JSON.parse(this.acessories);
    }

    setAccessories(acessories: {name: string}[]): void {
        this.acessories = JSON.stringify(acessories)
    }
}
