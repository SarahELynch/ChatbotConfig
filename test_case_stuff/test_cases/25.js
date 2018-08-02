
const responses = require('properties-reader')('./wcs_config/raw/strings/responses');
const entities = require('properties-reader')('./wcs_config/raw/strings/entity_phrases');
const intent_phrases = require('properties-reader')('./wcs_config/raw/strings/intent_phrases');
const landmarks = require('properties-reader')('./wcs_config/raw/strings/landmark_phrases');

const landmark_address1 = 'City Hall Park, New York, NY 10007, USA';
const landmark_address2 = '350 5th Ave, New York, NY 10118, USA';

module.exports = {
  active: true,
  description: "implicit negation (replacement value provided for address), landmark address replaced by landmark address",
  test: [
    {
      input: "this tree is damaged",
      output: responses.get("confirm-damaged-tree")
    },
    {
      input: "pretty much",
      output: responses.get("reference-agency-generic")
      +
      responses.get("get-address")
    },
    {
      input: "city hall",
      output: responses.get("confirm-address-landmark")
      .replace('<? context.landmark_friendly ?>', landmarks.get('city_hall'))
        .replace('<? context.landmark_address ?>', landmark_address1)
    },
    {
      input: "empire state building",
      output: responses.get("confirm-address-landmark")
      .replace('<? context.landmark_friendly ?>', landmarks.get('empire_state_building'))
        .replace('<? context.landmark_address ?>', landmark_address2)
    },
    {
      input: "that's right",
      output: responses.get("end-no-entity")
      .replace('<? context.c_address ?>', landmark_address2)
      .replace('<? context.c_ct_friendly ?>', intent_phrases.get('report-damaged-tree'))
      + responses.get("get-addtl-report")
  },
  {
    input: "no",
    output: responses.get("end-thanks")
  }
  ]
};
