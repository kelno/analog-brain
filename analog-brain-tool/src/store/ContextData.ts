export default abstract class ContextData<StateType> {
  protected abstract loadState(state: StateType): void;
  protected abstract saveState(): void;

  protected abstract setState: (state: StateType) => void;
}

