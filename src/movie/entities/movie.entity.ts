import {
	Column,
	CreateDateColumn,
	UpdateDateColumn,
	Entity,
	PrimaryColumn,
	Generated,
} from 'typeorm';

@Entity({ name: 'movies' })
export class MovieEntity {
	@PrimaryColumn()
	@Generated('uuid')
	id: string;

	@Column()
	title: string;

	@Column({
		type: 'text',
		nullable: true,
	})
	description: string;

	@Column({
		type: 'int',
		unsigned: true,
	})
	releaseYear: number;

	@Column({ default: false })
	isPublic: boolean;

	@CreateDateColumn()
	createdAt: Date;

	@UpdateDateColumn()
	updatedAt: Date;
}
