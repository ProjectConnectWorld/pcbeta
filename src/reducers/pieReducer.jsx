var initialstate = {
  noConn: 0,
  belowConn: 0,
  aboveCnn: 0,
  noData: 0,
}

export default function(state = initialstate, action) {
  console.log(action.payload);
  switch (action.type) {
    case "SLIDER_CHANGED":
      return action.payload;
  }
  return state;

}
