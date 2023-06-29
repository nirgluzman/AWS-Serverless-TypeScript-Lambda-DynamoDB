// All of the to-do list items saved in TodosTable will be in that form
export default interface Todo {
  todoId: string;
  title: string;
  description: string;
  status: boolean;
  createdAt: string;
}
