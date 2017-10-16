var initialstate = {
  load: false,
}

export default function(state = initialstate, action) {
  //console.log("SHIT");
  //console.log(action.payload);
  switch (action.type) {
    case "LOAD_SPINNER":
      return action.payload;
  }
  return state;

}
