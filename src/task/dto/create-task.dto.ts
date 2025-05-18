import {
	IsArray,
	IsEnum,
	IsInt,
	IsNotEmpty,
	IsOptional,
	IsPositive,
	IsString,
	IsUrl,
	IsUUID,
	Length,
	Matches,
} from 'class-validator';
import { StartWith } from '../decorators/start-with.decorator';

export enum TaskTag {
	WORK = 'work',
	STUDY = 'study',
	HOME = 'home',
}

export class CreateTaskDto {
	@IsString()
	@IsNotEmpty()
	@Length(2, 10)
	@StartWith('Task:')
	title: string;
	@IsString()
	@IsOptional()
	description: string;
	@IsInt()
	@IsPositive()
	@IsOptional()
	priority: number;
	@IsArray()
	@IsEnum(TaskTag, { each: true })
	@IsOptional()
	tags: TaskTag[];
	@Matches(/^[0-9A-Za-z]{6,}$/)
	password: string;
	@IsUrl()
	websiteUrl: string;
	@IsUUID('4')
	@IsOptional()
	userId: string;
}
