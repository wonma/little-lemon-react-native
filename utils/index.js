export const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };


//The input for the first name can’t be empty and should contain only string characters.
export const validateFirstName = (firstName) => {
    return /^[a-zA-Z]+$/.test(firstName);
}


export const validatePhoneNumber = (phoneNumber) => {
  // Regular expression for a US phone number
  var regex = /^\(?(\d{3})\)?[-.\s]?(\d{3})[-.\s]?(\d{4})$/;

  // Test the input against the regex
  return regex.test(phoneNumber);
}

// Example usage
// var userPhoneNumber = "555-123-4567";
// if (isValidUSPhoneNumber(userPhoneNumber)) {
//   console.log("Valid US phone number");
// } else {
//   console.log("Invalid US phone number");
// }