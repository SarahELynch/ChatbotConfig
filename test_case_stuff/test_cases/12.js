
const responses = require('properties-reader')('./wcs_config/raw/strings/responses');


module.exports = {
  active: true,
  description: "testing C.T. Failure ctr & limit - user not giving an intent (3 Out-of-purview in a row) - generic resource",
  test: [
    {
      input: "hey",
      output: responses.get("greeting")
    },
    {
      input: "can you tell me a joke?",
      output: responses.get("retry_unclassifiable")
    },
    {
      input: "what's your favorite color?",
      output: responses.get("retry_unclassifiable")
    },
    {
      input: "what's your favorite movie?",
      output: responses.get("call-human")
      + responses.get("resource-generic")
    }
  ]
};
