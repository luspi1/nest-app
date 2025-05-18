import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MovieModule } from './movie/movie.module';

@Module({
	controllers: [AppController],
	providers: [AppService],
	imports: [MovieModule],
})
export class AppModule {}
