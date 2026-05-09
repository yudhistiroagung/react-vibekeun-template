import type { Todo } from '@/domain/todos/models';

import type { TodoDto, TodoEntity } from '../models';

export const todoEntityToDomain = (todoEntity: TodoEntity): Todo => ({
  id: todoEntity.id,
  userId: todoEntity.userId,
  name: todoEntity.name,
  status: todoEntity.status,
  description: todoEntity.description,
  createdAt: todoEntity.created_at,
  updatedAt: todoEntity.updated_at,
});

export const todoDtoToDomain = (todoDto: TodoDto): Todo => ({
  id: todoDto.id,
  userId: todoDto.userId,
  name: todoDto.name,
  status: todoDto.status,
  description: todoDto.description,
  createdAt: todoDto.created_at,
  updatedAt: todoDto.updated_at,
});

export const todoDomainToEntity = (todo: Todo): TodoEntity => ({
  id: todo.id,
  userId: todo.userId,
  name: todo.name,
  status: todo.status,
  description: todo.description,
  created_at: todo.createdAt,
  updated_at: todo.updatedAt,
});
