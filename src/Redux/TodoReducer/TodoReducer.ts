import { TTask } from "../../Types";

const initialState:TTask[]=[

]

const TodoReducer = (state = initialState, action:any) => {
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
      const filterState = state.filter((contact) => contact.id !== action.payload && contact)
      
      state=filterState
      return state;
    default:
      return state;
  }
};

export default TodoReducer