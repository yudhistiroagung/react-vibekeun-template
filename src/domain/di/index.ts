import { container } from 'tsyringe';

import { GetTodosUsecase } from '../todos/usecases/use-get-todos';

export default {
  getTodosUsecase: container.resolve(GetTodosUsecase),
};
