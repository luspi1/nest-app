import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MovieEntity } from './entities/movie.entity';
import { MovieDto } from './dto/movie.dto';

@Injectable()
export class MovieService {
	constructor(
		@InjectRepository(MovieEntity) private readonly movieRepository: Repository<MovieEntity>,
	) {}

	async findAll(): Promise<MovieEntity[]> {
		return await this.movieRepository.find({
			order: {
				createdAt: 'desc',
			},
		});
	}

	async create(dto: MovieDto): Promise<MovieEntity> {
		const movie = this.movieRepository.create(dto);
		return await this.movieRepository.save(movie);
	}

	async findById(id: string): Promise<MovieEntity> {
		const searchedMovie = await this.movieRepository.findOne({
			where: {
				id,
			},
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
