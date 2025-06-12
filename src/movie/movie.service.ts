import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Movie } from '@prisma/client';
import { MovieDto } from './dto/movie.dto';

@Injectable()
export class MovieService {
	constructor(private readonly prismaService: PrismaService) {}

	async findAll(): Promise<Movie[]> {
		return this.prismaService.movie.findMany({
			where: {
				isAvailable: false,
			},
			orderBy: {
				createdAt: 'desc',
			},
		});
	}

	async create(dto: MovieDto): Promise<Movie> {
		const { actorIds, title, releaseYear, imageUrl } = dto;

		const actors = await this.prismaService.actor.findMany({
			where: {
				id: {
					in: actorIds,
				},
			},
		});

		if (!actors?.length) throw new NotFoundException('Один или несколько актеров не найдены');

		const movie = await this.prismaService.movie.create({
			data: {
				title,
				releaseYear,
				poster: imageUrl
					? {
							create: {
								url: imageUrl,
							},
						}
					: undefined,
				actors: {
					connect: actors.map((actor) => ({
						id: actor.id,
					})),
				},
			},
		});

		return movie;
	}

	async findById(id: string): Promise<Movie> {
		const searchedMovie = await this.prismaService.movie.findUnique({
			where: {
				id,
			},
			include: {
				actors: true,
				poster: true,
				reviews: true,
			},
		});

		if (!searchedMovie) throw new NotFoundException('Фильм не найден');

		return searchedMovie;
	}

	async update(id: string, dto: MovieDto): Promise<boolean> {
		const movie = await this.findById(id);
		Object.assign(movie, dto);
		const actors = await this.prismaService.actor.findMany({
			where: {
				id: {
					in: dto.actorIds,
				},
			},
		});

		if (!actors?.length) throw new NotFoundException('Один или несколько актеров не найдены');
		await this.prismaService.movie.update({
			where: {
				id: movie.id,
			},
			data: {
				title: dto.title,
				releaseYear: dto.releaseYear,
				poster: dto.imageUrl
					? {
							create: {
								url: dto.imageUrl,
							},
						}
					: undefined,
				actors: {
					connect: actors.map((actor) => ({
						id: actor.id,
					})),
				},
			},
		});
		return true;
	}

	async delete(id: string): Promise<boolean> {
		await this.findById(id);
		await this.prismaService.movie.delete({
			where: {
				id,
			},
		});
		return true;
	}
}
