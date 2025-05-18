import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Injectable()
export class TaskService {
	private tasks = [
		{
			id: 1,
			title: 'learn nest 1111',
			isCompleted: false,
		},
		{
			id: 2,
			title: 'build api 2222',
			isCompleted: true,
		},
		{
			id: 3,
			title: 'some task 3333',
			isCompleted: true,
		},
		{
			id: 4,
			title: 'some task 444',
			isCompleted: false,
		},
		{
			id: 5,
			title: 'some task 555',
			isCompleted: false,
		},
	];

	findAll() {
		return this.tasks;
	}

	findById(id: string) {
		const task = this.tasks.find((el) => id === String(el.id));
		if (!task) {
			throw new NotFoundException('Task not found');
		}
		return task;
	}

	create({ title, description, priority, tags, password, websiteUrl, userId }: CreateTaskDto) {
		const newTask = {
			id: this.tasks.length + 1,
			title,
			description,
			priority,
			tags,
			password,
			websiteUrl,
			userId,
			isCompleted: false,
		};
		this.tasks.push(newTask);
		return this.tasks;
	}

	update(id: string, dto: UpdateTaskDto) {
		const { isCompleted, title } = dto;

		const task = this.findById(id);
		task.title = title;
		task.isCompleted = isCompleted;
		return task;
	}

	patchTask(id: string, dto: Partial<UpdateTaskDto>) {
		const task = this.findById(id);

		Object.assign(task, dto);
		return task;
	}

	delete(id: string) {
		const task = this.findById(id);
		this.tasks = this.tasks.filter((taskEl) => task.id !== taskEl.id);
		return task;
	}
}
