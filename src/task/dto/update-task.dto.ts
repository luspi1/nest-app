import { IsBoolean, IsNotEmpty, IsString, Length } from 'class-validator';

export class UpdateTaskDto {
	@IsString({ message: 'Название задачи должно быть строкой!' })
	@IsNotEmpty({ message: 'Название не должно быть пустым!' })
	@Length(2, 10, { message: 'Название должно быть от 2 до 40 символов!' })
	title: string;
	@IsBoolean({ message: 'Статус должен быть булевым выражением!' })
	isCompleted: boolean;
}
