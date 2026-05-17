import { inject, singleton } from 'tsyringe';

import type { BaseUsecase } from '@/cores/usecases/base-usecase';
import { TodoRepositoryImpl } from '@/data/todos/todo-repository-impl';

import type { Todo } from '../models';
import type { TodoRepository } from '../todo-repository';

type Input = undefined;
type Output = Todo[];

@singleton()
export class GetTodosUsecase implements BaseUsecase<Input, Output> {
    constructor(@inject(TodoRepositoryImpl.TOKEN) private readonly todoRespository: TodoRepository) { }
    
    async run(): Promise<Todo[]> {
        return this.todoRespository.getTodos();
    }
}
