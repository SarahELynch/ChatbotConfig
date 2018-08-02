 const responses = require('properties-reader')('./wcs_config/raw/strings/responses');
 const intent_phrases = require('properties-reader')('./wcs_config/raw/strings/intent_phrases');
 const entities = require('properties-reader')('./wcs_config/raw/strings/entity_phrases');

 const geo_code_address1 = '450 W 42nd St, New York, NY 10036, USA';
 const geo_code_address2 = '27 W 24th St, New York, NY 10010, USA';

 module.exports = {
   active: true,
   description: "Intent Flow - Noise/Street Condition - additional report given ",
   test: [
     {
       input: "my neighbor is being very loud",
       output: responses.get("confirm-noise-entity")
         .replace('<? context.entity_friendly ?>', entities.get('neighbor'))
     },
     {
       input: "correct",
       output: responses.get("reference-nypd")
        .replace('<? context.c_entity_friendly ?>', entities.get('neighbor'))
       +
       responses.get("get-address")
     },
     {
       input: "450 W 42nd St",
       output: responses.get("confirm-address")
         .replace('<? context.address ?>', geo_code_address1)
     },
     {
       input: "yep",
       output: responses.get("end-nypd")
       .replace('<? context.c_entity_friendly ?>', entities.get('neighbor'))
       .replace('<? context.c_address ?>', geo_code_address1)
       .replace('<? context.c_ct_friendly ?>', intent_phrases.get('report-noise'))
       + responses.get("get-addtl-report")
     },
     {
     input: "yes",
     output: responses.get("get-issue-report")
   },

  {
     input: "the road in front of my apartment is in bad shape",
     output: responses.get("confirm-street-condition")
       .replace('<? context.ct_friendly ?>', intent_phrases.get('street-condition'))
   },
   {
     input: "correct",
     output: responses.get("reference-agency-generic")
     +
     responses.get("get-address")
   },
   {
     input: "27 W 24th St",
     output: responses.get("confirm-address")
       .replace('<? context.address ?>', geo_code_address2)
   },
   {
     input: "yep",
     output: responses.get("end-no-entity")
     .replace('<? context.c_address ?>', geo_code_address2)
     .replace('<? context.c_ct_friendly ?>', intent_phrases.get('report-street-condition'))
     + responses.get("get-addtl-report")
   },
   {
   input: "nope that's it",
   output: responses.get("end-thanks")
  }
   ]
 };
