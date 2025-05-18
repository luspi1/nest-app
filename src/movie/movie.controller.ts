import { Body, Controller, Get, Post, Query, Headers, Req, Res, Param } from '@nestjs/common';
import type { Response, Request } from 'express';

@Controller({
	path: 'movie',
})
export class MovieController {
	@Get()
	findAll(@Query() genre: any) {
		return `Жанр ${JSON.stringify(genre)}`;
	}

	@Get(':id')
	findById(@Param() param: string) {
		return param;
	}

	@Post()
	create(@Body() body: { title: string; genre: string }) {
		return `Фильм в жанре ${body.genre ?? 'нет жанра'} и с названием "${body.title}" добавлен`;
	}

	@Get('headers')
	getHeaders(@Headers() header: Headers) {
		return header;
	}

	@Get('details')
	getRequestDetails(@Req() request: Request) {
		return {
			method: request.method,
		};
	}

	@Get('response-details')
	getResponseDetails(@Res() res: Response) {
		res.status(666).json({ message: 'dddd' });
	}
}
