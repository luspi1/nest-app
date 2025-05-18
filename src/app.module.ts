import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MovieModule } from './movie/movie.module';
import { TaskModule } from './task/task.module';

@Module({
	controllers: [AppController],
	providers: [AppService],
	imports: [MovieModule, TaskModule],
})
export class AppModule {}
