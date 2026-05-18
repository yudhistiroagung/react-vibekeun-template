import { inject, singleton } from 'tsyringe';

import type { BaseUsecase } from '@/cores/usecases/base-usecase';

import type { Todo } from '../models';
import { TodoRepository } from '../todo-repository';

type Input = void;
type Output = Todo[];

@singleton()
export class GetTodosUsecase implements BaseUsecase<Input, Output> {
    static readonly TOKEN = 'GetTodosUsecase';

    constructor(@inject(TodoRepository.TOKEN) private readonly todoRepository: TodoRepository) { }
    
    async run(): Promise<Todo[]> {
        return this.todoRepository.getTodos();
    }
}
