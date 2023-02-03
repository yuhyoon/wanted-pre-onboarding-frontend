import styled from "styled-components";

const CreateInputs = styled.div`
  margin: 0;
  width: 80%;
  margin: 0 auto;

  display: flex;
  justify-content: space-between;

  input {
    display: block;
    width: 83%;
    font-size: 1rem;
    padding-left: 5px;
  }
  button {
    font-size: 1rem;
    width: 14%;
    padding: 0.3rem 0;
  }
`;

const CreateTodoBox = ({
  onChangeHandler,
  createTodo,
  todoInput,
}: CreateTodoBoxProps) => {
  return (
    <CreateInputs>
      <input
        name="todo"
        data-testid="new-todo-input"
        onChange={(e) => onChangeHandler(e, todoInput)}
      ></input>
      <button onClick={createTodo} data-testid="new-todo-add-button">
        추가
      </button>
    </CreateInputs>
  );
};
export default CreateTodoBox;
