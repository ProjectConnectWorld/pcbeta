var initialstate = {
  load: false,
}

export default function(state = initialstate, action) {
  switch (action.type) {
    case "LOAD_SPINNER":
      return action.payload;
  }
  return state;

}
