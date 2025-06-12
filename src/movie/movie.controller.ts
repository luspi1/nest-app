import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { MovieService } from './movie.service';
import { MovieDto } from './dto/movie.dto';

@Controller({
	path: 'movies',
})
export class MovieController {
	constructor(private readonly movieService: MovieService) {}

	@Get()
	findAll() {
		return this.movieService.findAll();
	}

	@Post()
	create(@Body() dto: MovieDto) {
		return this.movieService.create(dto);
	}

	@Get(':id')
	findById(@Param('id') id: string) {
		return this.movieService.findById(id);
	}
	@Put(':id')
	update(@Param('id') id: string, @Body() dto: MovieDto) {
		return this.movieService.update(id, dto);
	}

	@Delete(':id')
	delete(@Param('id') id: string) {
		return this.movieService.delete(id);
	}
}
