const LoadSpinner = (loadVal) => {
  //console.log("ACTION");

  console.log("IN SPINNER");

  return {
    type: "LOAD_SPINNER",
    payload: {
      load: loadVal,
    }

  }

}

export default LoadSpinner;
