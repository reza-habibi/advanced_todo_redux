export type TNewTask = {
  task: string;
  priority: number;
  status: number;
  deadline: any;
  message?: string;
  id: number;
};

export type TTask = {
  task: string;
  priority: number;
  status: number;
  deadline: any;
  message?: string;
  id: number;
};

export type TModal = {
  onClick: () => void;
  myTask: any;
  setMyTask: any;
};

export type TSortedList = {
  priority: number;
  status: number;
  deadline: number;
};

export type TFilters={
  priority:number;
  status:number;
  deadline:number;
}
