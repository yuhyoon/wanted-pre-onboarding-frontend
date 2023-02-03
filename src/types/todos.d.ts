interface onChangehandlerType {
  todo: string;
}

interface TodoInfo {
  id: number;
  todo: string;
  isCompleted: boolean;
  userId: number;
}

interface CreateTodoBoxProps {
  onChangeHandler: (
    e: React.ChangeEvent<HTMLInputElement>,
    input: onChangehandlerType
  ) => void;
  createTodo: () => void;
  todoInput: onChangehandlerType;
}
