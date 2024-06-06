export enum StatusTodo {
    NotDone,
    Done
}

export interface Todo {
    id: string;
    title: string
    status: StatusTodo
}