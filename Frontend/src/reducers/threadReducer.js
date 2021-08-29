const threadReducer = (state = [], action) => {
  switch (action.type) {
    case "NEW_THREAD":
      return [
        {
          id: action.payload[0],
          color: action.payload[1],
          name: action.payload[2],
        },
        ...state,
      ];
    case "EDIT_THREAD":
      return state.map((thread) => {
        if (thread.id == action.payload.id) {
          return action.payload;
        } else {
          return thread;
        }
      });
    case "IMPORT_THREADS":
      return (state = action.payload);
    default:
      return state;
  }
};

export default threadReducer;
