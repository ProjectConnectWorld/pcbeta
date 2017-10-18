var initialstate = {
  value: 3,
  noConn: 1,
  belowConn: 1,
  aboveConn: 1,
  noData: 1,
}

export default function(state = initialstate, action) {
  //console.log("SHIT");
  //console.log(action.payload);
  switch (action.type) {
    case "SLIDER_CHANGED":
      return action.payload;
  }
  return state;

}
