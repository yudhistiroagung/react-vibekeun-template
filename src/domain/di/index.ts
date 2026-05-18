import { container } from 'tsyringe';
import {
  BulkAddGoalsUsecase,
  ClearGoalsUsecase,
  CreateGoalUsecase,
  DeleteGoalUsecase,
  GetAllGoalsUsecase,
  GetGoalsByProfileIdUsecase,
  UpdateGoalUsecase,
} from '../goals/usecases';
import {
  BulkAddProfilesUsecase,
  ClearProfilesUsecase,
  CreateProfileUsecase,
  DeleteProfileUsecase,
  GetAllProfilesUsecase,
  GetProfileByIdUsecase,
  UpdateProfileUsecase,
} from '../profiles/usecases';
import { ExportDataUsecase, ImportDataUsecase } from '../sync/usecases';
import {
  BulkAddTasksUsecase,
  ClearTasksUsecase,
  CreateTaskUsecase,
  GetAllTasksUsecase,
  GetDashboardStats,
  GetTasksByProfileIdAndDateUsecase,
  UpdateTaskUsecase,
} from '../tasks/usecases';
import { GetTodosUsecase } from '../todos/usecases/use-get-todos';

export default {
  // Todos
  getTodosUsecase: container.resolve(GetTodosUsecase),

  // Tasks
  getAllTasksUsecase: container.resolve(GetAllTasksUsecase),
  getTasksByProfileIdAndDateUsecase: container.resolve(
    GetTasksByProfileIdAndDateUsecase,
  ),
  getDashboardStatsUsecase: container.resolve(GetDashboardStats),
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
