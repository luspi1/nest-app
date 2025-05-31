import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { MovieEntity } from './entities/movie.entity';
import { MovieDto } from './dto/movie.dto';
import { ActorEntity } from '../actor/entities/actor.entity';
import { MoviePosterEntity } from './entities/poster.entity';

@Injectable()
export class MovieService {
	constructor(
		@InjectRepository(MovieEntity) private readonly movieRepository: Repository<MovieEntity>,
		@InjectRepository(MoviePosterEntity)
		private readonly posterRepository: Repository<MoviePosterEntity>,
		@InjectRepository(ActorEntity) private readonly actorRepository: Repository<ActorEntity>,
	) {}

	async findAll(): Promise<MovieEntity[]> {
		return await this.movieRepository.find({
			order: {
				createdAt: 'desc',
			},
		});
	}

	async create(dto: MovieDto): Promise<MovieEntity> {
		const { actorIds, title, releaseYear, imageUrl } = dto;

		const actors = await this.actorRepository.find({
			where: {
				id: In(actorIds),
			},
		});

		if (!actors?.length) throw new NotFoundException('Один или несколько актеров не найдены');

		let poster: MoviePosterEntity | null = null;

		if (imageUrl) {
			poster = this.posterRepository.create({ url: imageUrl });
			await this.posterRepository.save(poster);
		}

		const movie = this.movieRepository.create({
			title,
			releaseYear,
			poster,
			actors,
		});
		return await this.movieRepository.save(movie);
	}

	async findById(id: string): Promise<MovieEntity> {
		const searchedMovie = await this.movieRepository.findOne({
			where: {
				id,
			},
			relations: ['actors'],
		});

		if (!searchedMovie) throw new NotFoundException('Фильм не найден');

		return searchedMovie;
	}

	async update(id: string, dto: MovieDto): Promise<boolean> {
		const movie = await this.findById(id);
		Object.assign(movie, dto);
		await this.movieRepository.save(movie);
		return true;
	}

	async delete(id: string): Promise<boolean> {
		const movie = await this.findById(id);
		await this.movieRepository.remove(movie);
		return true;
	}
}
