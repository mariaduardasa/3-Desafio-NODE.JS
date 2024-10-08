import {Column,Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn,} from 'typeorm';
import { Car } from './Car';
import { User } from './User';

@Entity('Reserves')
export class Reserve {
    @PrimaryGeneratedColumn()
    id: number;

    @Column('date')
    startDate: Date;

    @Column('date')
    endDate: Date;

    @Column('decimal')
    finalValue: number;

    @ManyToOne(() => Car, car => car.reserves, {
        onDelete: 'CASCADE',
    })
    @JoinColumn({name: 'carId'})
    car: Car;

    @ManyToOne(() => User, user => user.reserves, {
        onDelete: 'CASCADE',
    })
    @JoinColumn({name: 'userId'})
    user: User;


}
