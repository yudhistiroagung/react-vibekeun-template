import { container } from 'tsyringe';

import { GetTodosUsecase } from '../todos/usecases/use-get-todos';
import { GetAllTasksUsecase, GetTasksByProfileIdAndDateUsecase, CreateTaskUsecase, UpdateTaskUsecase, BulkAddTasksUsecase, ClearTasksUsecase } from '../tasks/usecases';
import { GetAllProfilesUsecase, GetProfileByIdUsecase, CreateProfileUsecase, UpdateProfileUsecase, DeleteProfileUsecase, BulkAddProfilesUsecase, ClearProfilesUsecase } from '../profiles/usecases';
import { GetAllGoalsUsecase, GetGoalsByProfileIdUsecase, CreateGoalUsecase, UpdateGoalUsecase, DeleteGoalUsecase, BulkAddGoalsUsecase, ClearGoalsUsecase } from '../goals/usecases';
import { ExportDataUsecase, ImportDataUsecase } from '../sync/usecases';

export default {
  // Todos
  getTodosUsecase: container.resolve(GetTodosUsecase),

  // Tasks
  getAllTasksUsecase: container.resolve(GetAllTasksUsecase),
  getTasksByProfileIdAndDateUsecase: container.resolve(GetTasksByProfileIdAndDateUsecase),
  createTaskUsecase: container.resolve(CreateTaskUsecase),
  updateTaskUsecase: container.resolve(UpdateTaskUsecase),
  bulkAddTasksUsecase: container.resolve(BulkAddTasksUsecase),
  clearTasksUsecase: container.resolve(ClearTasksUsecase),

  // Profiles
  getAllProfilesUsecase: container.resolve(GetAllProfilesUsecase),
  getProfileByIdUsecase: container.resolve(GetProfileByIdUsecase),
  createProfileUsecase: container.resolve(CreateProfileUsecase),
  updateProfileUsecase: container.resolve(UpdateProfileUsecase),
  deleteProfileUsecase: container.resolve(DeleteProfileUsecase),
  bulkAddProfilesUsecase: container.resolve(BulkAddProfilesUsecase),
  clearProfilesUsecase: container.resolve(ClearProfilesUsecase),

  // Goals
  getAllGoalsUsecase: container.resolve(GetAllGoalsUsecase),
  getGoalsByProfileIdUsecase: container.resolve(GetGoalsByProfileIdUsecase),
  createGoalUsecase: container.resolve(CreateGoalUsecase),
  updateGoalUsecase: container.resolve(UpdateGoalUsecase),
  deleteGoalUsecase: container.resolve(DeleteGoalUsecase),
  bulkAddGoalsUsecase: container.resolve(BulkAddGoalsUsecase),
  clearGoalsUsecase: container.resolve(ClearGoalsUsecase),

  // Sync
  exportDataUsecase: container.resolve(ExportDataUsecase),
  importDataUsecase: container.resolve(ImportDataUsecase),
};
