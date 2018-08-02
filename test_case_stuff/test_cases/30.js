
const responses = require('properties-reader')('./wcs_config/raw/strings/responses');
const intent_phrases = require('properties-reader')('./wcs_config/raw/strings/intent_phrases');
const entities = require('properties-reader')('./wcs_config/raw/strings/entity_phrases');

const geo_code_address1 = '27 W 24th St, New York, NY 10010, USA';
const geo_code_address2 = '51 Astor Pl, New York, NY 10003, USA';
//const geo_code_address3 = '8 Beach St, New York, NY 10013, USA';
const geo_code_address3 = '2 Moore St, New York, NY 10004, USA';

module.exports = {
  active: true,
  description: "Address Failure limit test - Implicit negation of street address",
  test: [
    {
      input: "extremely loud construction noise at 27 W 24th st",
      output: responses.get("confirm-noise-entity")
        .replace('<? context.entity_friendly ?>', entities.get('construction'))
    },
    {
      input: "yeah that's right",
      output: responses.get("reference-dep")
        .replace('<? context.c_entity_friendly ?>', entities.get('construction'))
        +
        responses.get("confirm-address")
          .replace('<? context.address ?>', geo_code_address1)
    },
    {
      input: "51 astor place",
      output: responses.get("confirm-address")
          .replace('<? context.address ?>', geo_code_address2)
    },
    {
      input: "2 moore",
      output: responses.get("confirm-address")
          .replace('<? context.address ?>', geo_code_address3)
    },
    {
      input: "70 Broadway Ave",
      output: responses.get("call-human")
      + responses.get("resource-noise")
    }
  ]
};
