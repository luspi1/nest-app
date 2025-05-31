import {
	Column,
	CreateDateColumn,
	UpdateDateColumn,
	Entity,
	JoinColumn,
	ManyToOne,
	PrimaryGeneratedColumn,
} from 'typeorm';
import { MovieEntity } from '../../movie/entities/movie.entity';

@Entity({ name: 'review' })
export class ReviewEntity {
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@Column({
		type: 'text',
	})
	text: string;

	@Column({
		type: 'decimal',
		precision: 3,
		scale: 1,
		default: 0.0,
	})
	rating: number;

	@Column({
		name: 'movie_id',
		type: 'uuid',
	})
	movieId: string;

	@ManyToOne(() => MovieEntity, (movie) => movie.reviews, { onDelete: 'CASCADE' })
	@JoinColumn({
		name: 'movie_id',
	})
	movie: MovieEntity;

	@CreateDateColumn({ name: 'created_at' })
	createdAt: Date;

	@UpdateDateColumn({ name: 'updated_at' })
	updatedAt: Date;
}
