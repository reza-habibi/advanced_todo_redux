import { TTask } from "../../Types";

const initialState: TTask[] = [];

const TodoReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case "Add_Todo":
      state = [...state, action.payload];

      return state;

    case "Update_Todo":
      const updateState = state.map((contact) =>
        contact.id === action.payload.id ? action.payload : contact
      );
      state = updateState;
      return state;
    case "Remove_Todo":
      const filterState = state.filter(
        (contact) => contact.id !== action.payload && contact
      );

      state = filterState;
      return state;

    case "Sort_Down":
      return action.payload === "priority"
        ? state.slice(0).sort((a, b) => a.priority - b.priority)
        : action.payload === "status"
        ? state.slice(0).sort((a, b) => a.status - b.status)
        : state.slice(0).sort((a, b) => a.deadline.unix - b.deadline.unix);
    case "Sort_Up":
      return action.payload === "priority"
        ? state.slice(0).sort((a, b) => b.priority - a.priority)
        : action.payload === "status"
        ? state.slice(0).sort((a, b) => b.status - a.status)
        : state.slice(0).sort((a, b) => b.deadline.unix - a.deadline.unix);
    case "Not_Sort":
      return state.slice(0).sort((a, b) => a.id - b.id);
    default:
      return state;
  }
};

export default TodoReducer;
