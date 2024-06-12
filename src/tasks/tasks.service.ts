import { Injectable, NotFoundException } from '@nestjs/common';
import { Task } from './tasks.entity';
import { v4 as uuidv4 } from 'uuid';
import { CreateTaskDto } from './dto/create-task.dto';

@Injectable()
export class TasksService {
  private tasks: Task[] = [];

  getAllTasks(): Task[] {
    return this.tasks;
  }

  getTaskById(id: string): Task {
    const task = this.tasks.find(task => task.id === id);
    if (!task) {
      throw new NotFoundException(`Task with ID "${id}" not found`);
    }
    return task;
  }

  createTask(createTaskDto: CreateTaskDto): Task {
    const newTask: Task = {
      id: uuidv4(),
      ...createTaskDto,
      done: false
    };
    this.tasks.push(newTask);
    return newTask;
  }

  updateTask(id: string, updateTaskDto: Partial<Task>): Task {
    const task = this.getTaskById(id);
    if (!task) {
      throw new NotFoundException(`Task with ID "${id}" not found`);
    }
    Object.assign(task, updateTaskDto);
    return task;
  }

  deleteTask(id: string): void {
    const index = this.tasks.findIndex(task => task.id === id);
    if (index === -1) {
      throw new NotFoundException(`Task with ID "${id}" not found`);
    }
    this.tasks.splice(index, 1);
  }
}
