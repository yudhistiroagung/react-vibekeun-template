export interface BaseUsecase<Input, Output> {
  run: (input: Input) => Promise<Output>;
}
