const LoadSpinner = (loadVal) => {

  // When a country is clicked, the spinner loads
  console.log("IN SPINNER");

  return {
    type: "LOAD_SPINNER",
    payload: {
      load: loadVal,
    }

  }

}

export default LoadSpinner;
