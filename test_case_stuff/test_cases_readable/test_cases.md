# 01.js

## Intent & Entity Flow - Noise & air conditioning

*the air conditioning unit at the building next door is so loud I can’t hear myself think*

Ok, it sounds like you want to file a noise complaint, specifically about 'air conditioning'. Is that right?

*that's right*

Ok, got it.

<pause 1000 milliseconds...>

Noise complaints about 'air conditioning' are handled by the Department of Environmental Protection. I'll need to confirm an exact location to pass this report on to the DEP.

<pause 1000 milliseconds...>

Could I get the exact address where the incident is occurring?

*123 mlk blvd*

I have the address as '123 Dr Martin Luther King Jr Blvd, New York, NY 10027, USA'. Is that right?

*yes it is*

Great. This report about 'noise', related to 'air conditioning', at '123 Dr Martin Luther King Jr Blvd, New York, NY 10027, USA', will be passed on to the Department of Environmental Protection.

<pause 1000 milliseconds...>

Would you like to file another issue report?

*no*

This report is complete. Thank you for filing your complaint with 311.



# 02.js

## Intent Flow - Noise - Address with Apartment Number (which we ignore)

*my neighbor is being very loud*

Ok, it sounds like you want to file a noise complaint, specifically about 'neighbor'. Is that right?

*correct*

Ok, got it.

<pause 1000 milliseconds...>

Noise complaints about 'neighbor' are handled by the New York Police Department. I'll need to confirm an exact location to pass this report on to the NYPD.

<pause 1000 milliseconds...>

Could I get the exact address where the incident is occurring?

*450 W 42nd St #141*

I have the address as '450 W 42nd St, New York, NY 10036, USA'. Is that right?

*yep*

Great. This report about 'noise', related to 'neighbor', at '450 W 42nd St, New York, NY 10036, USA', will be passed on to the New York Police Department.

<pause 1000 milliseconds...>

Would you like to file another issue report?

*no*

This report is complete. Thank you for filing your complaint with 311.



# 03.js

## Intent & Entity Flow - Street Condition & pavement_quality (entity surface form: 'potholes')

*W 24th has really bad potholes in front of Junoon*

Ok, it sounds like you want to report poor street conditions, specifically about 'pavement quality'. Is that right?

*yes*

Ok, got it.

<pause 1000 milliseconds...>

Reports about 'pavement quality' are handled by the Department of Transportation. I'll need to confirm an exact location to pass this report on to the DOT.

<pause 1000 milliseconds...>

Could I get the exact address where the incident is occurring?

*27 W 24th St*

I have the address as '27 W 24th St, New York, NY 10010, USA'. Is that right?

*sure is*

Great. This report about 'street conditions', related to 'pavement quality', at '27 W 24th St, New York, NY 10010, USA', will be passed on to the Department of Transportation.

<pause 1000 milliseconds...>

Would you like to file another issue report?

*no*

This report is complete. Thank you for filing your complaint with 311.



# 04.js

## Intent & Entity Flow - Damaged Tree & fallen_tree - Landmark: City Hall - Full Report

*there is a tree that fell down in front of city hall*

Ok, it sounds like you want to report about the condition of a tree, specifically about 'fallen tree'. Is that right?

*sure*

Ok, got it.

<pause 1000 milliseconds...>

Reports about 'fallen tree' are handled by the Department of Parks and Recreation. I'll need to confirm an exact location to pass this report on to the DPR.

<pause 1000 milliseconds...>

Sounds like the issue is located at 'City Hall'. That's at 'City Hall Park, New York, NY 10007, USA', right?

*sounds right*

Great. This report about 'tree damage', related to 'fallen tree', at 'City Hall Park, New York, NY 10007, USA', will be passed on to the Department of Parks and Recreation.

<pause 1000 milliseconds...>

Would you like to file another issue report?

*no*

This report is complete. Thank you for filing your complaint with 311.



# 05.js

## Intent Flow - Graffiti - Full initial report (no location prompt)

*want to report some ugly graffiti at 358 park ave*

Ok, it sounds like you want to report graffiti. Is that right?

*yes please*

Ok, got it. 

<pause 1000 milliseconds...>

Is the graffiti vandalism actively occurring?

*no, it's been there for a while*

Ok, got it.

<pause 1000 milliseconds...>

I'll need to confirm an exact location to pass this report on to the right agency.

<pause 1000 milliseconds...>

I have the address as '358 Park Ave, New York, NY 10022, USA'. Is that right?

*yes*

Great. This report about 'graffiti', at '358 Park Ave, New York, NY 10022, USA', will be transferred to a 311 agent, who will identify the correct agency to handle it.

<pause 1000 milliseconds...>

Would you like to file another issue report?

*no*

This report is complete. Thank you for filing your complaint with 311.



# 06.js

## Intent & Entity Flow - Graffiti - Misclassification (correct: Street Conditions, markings_quality - (entity surface form: 'lane line'))

*paint*

Ok, it sounds like you want to report poor street conditions, specifically about 'road markings quality'. Is that right?

*uh no*

Oops. Let's try this again. Please rephrase your issue report, and I'll do my best to understand.

*someboy spray painted graffiti*

Ok, it sounds like you want to report graffiti. Is that right?

*yes!*

Ok, got it. 

<pause 1000 milliseconds...>

Is the graffiti vandalism actively occurring?

*no*

Ok, got it.

<pause 1000 milliseconds...>

I'll need to confirm an exact location to pass this report on to the right agency.

<pause 1000 milliseconds...>

Could I get the exact address where the incident is occurring?

*in front of 2 moore st *

I have the address as '2 Moore St, New York, NY 10004, USA'. Is that right?

*yes it is*

Great. This report about 'graffiti', at '2 Moore St, New York, NY 10004, USA', will be transferred to a 311 agent, who will identify the correct agency to handle it.

<pause 1000 milliseconds...>

Would you like to file another issue report?

*no*

This report is complete. Thank you for filing your complaint with 311.



# 07.js

## Intent Flow - Damaged Tree - incorrect location extracted

*this tree is damaged*

Ok, it sounds like you want to report about the condition of a tree. Is that right?

*pretty much*

Ok, got it.

<pause 1000 milliseconds...>

I'll need to confirm an exact location to pass this report on to the right agency.

<pause 1000 milliseconds...>

Could I get the exact address where the incident is occurring?

*it's at 8 Laight street*

I have the address as '8 Laight St, New York, NY 10013, USA'. Is that right?

*no, sorry*

Oops. Let's try this again. Please rephrase your address and I'll try again.

*8 beach street*

I have the address as '8 Beach St, New York, NY 10013, USA'. Is that right?

*yup*

Great. This report about 'tree damage', at '8 Beach St, New York, NY 10013, USA', will be transferred to a 311 agent, who will identify the correct agency to handle it.

<pause 1000 milliseconds...>

Would you like to file another issue report?

*no*

This report is complete. Thank you for filing your complaint with 311.



# 08.js

## Intent & Entity Flow - Graffiti & removal - Location given as Intersection

*Can the graffiti on my apartment building be removed?*

Ok, it sounds like you want to report graffiti, specifically about 'graffiti removal'. Is that right?

*yeah*

Ok, got it.

<pause 1000 milliseconds...>

Reports about 'graffiti removal' are handled by the Department of Sanitation. I'll need to confirm an exact location to pass this report on to the DSNY.

<pause 1000 milliseconds...>

Could I get the exact address where the incident is occurring?

*the intersection of Broadway and exchange *

I have the address as 'Broadway & Exchange Pl, New York, NY 10005, USA'. Is that right?

*exactly*

Great. This report about 'graffiti', related to 'graffiti removal', at 'Broadway & Exchange Pl, New York, NY 10005, USA', will be passed on to the Department of Sanitation.

<pause 1000 milliseconds...>

Would you like to file another issue report?

*no*

This report is complete. Thank you for filing your complaint with 311.



# 09.js

## Intent & Entity Flow - Noise & animal('dog') - Indecipherable Location

*my neighbor's dog has been barking all day long*

Ok, it sounds like you want to file a noise complaint, specifically about 'animal'. Is that right?

*yes definitely*

Ok, got it.

<pause 1000 milliseconds...>

Noise complaints about 'animal' are handled by the Department of Environmental Protection. I'll need to confirm an exact location to pass this report on to the DEP.

<pause 1000 milliseconds...>

Could I get the exact address where the incident is occurring?

*oiaefsjasjfldsfsdawge*

Hmm. I didn’t quite get that. Please rephrase your address and I'll try again.

*2 moore st*

I have the address as '2 Moore St, New York, NY 10004, USA'. Is that right?

*yes*

Great. This report about 'noise', related to 'animal', at '2 Moore St, New York, NY 10004, USA', will be passed on to the Department of Environmental Protection.

<pause 1000 milliseconds...>

Would you like to file another issue report?

*no*

This report is complete. Thank you for filing your complaint with 311.



# 10.js

## Intent & Entity Flow - Street Condition & pavement_quality - Location is outside of bounds

*the road is all crumbly and it's very rough on my car*

Ok, it sounds like you want to report poor street conditions, specifically about 'pavement quality'. Is that right?

*yes*

Ok, got it.

<pause 1000 milliseconds...>

Reports about 'pavement quality' are handled by the Department of Transportation. I'll need to confirm an exact location to pass this report on to the DOT.

<pause 1000 milliseconds...>

Could I get the exact address where the incident is occurring?

*Bell Blvd and 173rd Avenue*

Sorry, I can only route issue reports whose incidents are located within Manhattan.Could I get the exact address where the incident is occurring?

*duke ellington and colombus *

I have the address as 'Columbus Ave & Duke Ellington Blvd, New York, NY 10025, USA'. Is that right?

*si*

Great. This report about 'street conditions', related to 'pavement quality', at 'Columbus Ave & Duke Ellington Blvd, New York, NY 10025, USA', will be passed on to the Department of Transportation.

<pause 1000 milliseconds...>

Would you like to file another issue report?

*no*

This report is complete. Thank you for filing your complaint with 311.



# 11.js

## Intent Flow - Noise - Issue is not Classifiable (Indecipherable or 'Out-of-purview') - Also location with 'Sub Address'

*an abandoned car outside*

Hmm, I wasn't able to categorize that issue report. Please rephrase your complaint, and I'll try again.

*noise from neighborhood kids sitting on a van*

Ok, it sounds like you want to file a noise complaint. Is that right?

*yes they are such hooligans*

Ok, got it.

<pause 1000 milliseconds...>

I'll need to confirm an exact location to pass this report on to the right agency.

<pause 1000 milliseconds...>

Could I get the exact address where the incident is occurring?

*450 w 42nd*

I have the address as '450 W 42nd St, New York, NY 10036, USA'. Is that right?

*yes*

Great. This report about 'noise', at '450 W 42nd St, New York, NY 10036, USA', will be transferred to a 311 agent, who will identify the correct agency to handle it.

<pause 1000 milliseconds...>

Would you like to file another issue report?

*no*

This report is complete. Thank you for filing your complaint with 311.



# 12.js

## testing C.T. Failure ctr & limit - user not giving an intent (3 Out-of-purview in a row) - generic resource

*hey*

Hi. This is NYC's 311 Conversational Agent. What is your 311 complaint?

*can you tell me a joke?*

Hmm, I wasn't able to categorize that issue report. Please rephrase your complaint, and I'll try again.

*what's your favorite color?*

Hmm, I wasn't able to categorize that issue report. Please rephrase your complaint, and I'll try again.

*what's your favorite movie?*

Hmm, this sounds like something an agent could help with. Please hold and you'll be connected with someone directly...

<pause 1000 milliseconds...>

You may learn more about the 311 system here: http://www1.nyc.gov/311/index.page



# 13.js

## combo intent confirmation and address description

*hey*

Hi. This is NYC's 311 Conversational Agent. What is your 311 complaint?

*there's a tree in my house*

Ok, it sounds like you want to report about the condition of a tree. Is that right?

*yeah it's at 51 astor place*

Ok, got it.

<pause 1000 milliseconds...>

I'll need to confirm an exact location to pass this report on to the right agency.

<pause 1000 milliseconds...>

I have the address as '51 Astor Pl, New York, NY 10003, USA'. Is that right?

*yes*

Great. This report about 'tree damage', at '51 Astor Pl, New York, NY 10003, USA', will be transferred to a 311 agent, who will identify the correct agency to handle it.

<pause 1000 milliseconds...>

Would you like to file another issue report?

*no*

This report is complete. Thank you for filing your complaint with 311.



# 14.js

## non-confirmation of complaint type, address provided

*there is a broken tree near the sidewalk*

Ok, it sounds like you want to report about the condition of a tree. Is that right?

*oh by the way I'm at 358 park...*

I have the address as '358 Park Ave, New York, NY 10022, USA'. Is that right?

*yes*

Great. This report about 'tree damage', at '358 Park Ave, New York, NY 10022, USA', will be transferred to a 311 agent, who will identify the correct agency to handle it.

<pause 1000 milliseconds...>

Would you like to file another issue report?

*no*

This report is complete. Thank you for filing your complaint with 311.



# 15.js

## implicit negation (replacement value provided for address), regular street address replaced by reg st address

*this tree is damaged*

Ok, it sounds like you want to report about the condition of a tree. Is that right?

*pretty much*

Ok, got it.

<pause 1000 milliseconds...>

I'll need to confirm an exact location to pass this report on to the right agency.

<pause 1000 milliseconds...>

Could I get the exact address where the incident is occurring?

*8 beach street*

I have the address as '8 Beach St, New York, NY 10013, USA'. Is that right?

*51 astor place*

I have the address as '51 Astor Pl, New York, NY 10003, USA'. Is that right?

*that's right*

Great. This report about 'tree damage', at '51 Astor Pl, New York, NY 10003, USA', will be transferred to a 311 agent, who will identify the correct agency to handle it.

<pause 1000 milliseconds...>

Would you like to file another issue report?

*no*

This report is complete. Thank you for filing your complaint with 311.



# 16.js

## failure to parse address (try twice before breaking out)

*hi, there's a fallen tree outside my door*

Ok, it sounds like you want to report about the condition of a tree, specifically about 'fallen tree'. Is that right?

*yes*

Ok, got it.

<pause 1000 milliseconds...>

Reports about 'fallen tree' are handled by the Department of Parks and Recreation. I'll need to confirm an exact location to pass this report on to the DPR.

<pause 1000 milliseconds...>

Could I get the exact address where the incident is occurring?

*it's at one tree hill*

Hmm. I didn’t quite get that. Please rephrase your address and I'll try again.

*one tree hill*

Hmm, this sounds like something an agent could help with. Please hold and you'll be connected with someone directly...

<pause 1000 milliseconds...>

You may learn more about tree-related issues and NYC here: http://www1.nyc.gov/nyc-resources/categories/environment/trees/index.page



# 17.js

## Customized path for follow-up question - Intent: Noise & Entity: Alarm, route to NYPD

*hi, there's an alarm going off on my street*

Ok, it sounds like you want to file a noise complaint, specifically about 'alarm'. Is that right?

*yes*

Ok, got it. 

<pause 1000 milliseconds...>

Is the alarm currently going off?

*yes*

Ok, got it.

<pause 1000 milliseconds...>

Noise complaints about alarms that are actively going off are handled by the New York Police Department. I'll need to confirm an exact location to pass this report on to the NYPD.

<pause 1000 milliseconds...>

Could I get the exact address where the incident is occurring?

*100 broadway avenue*

I have the address as '100 Broadway, New York, NY 10005, USA'. Is that right?

*yep*

Great. This report about 'noise', related to 'alarm', at '100 Broadway, New York, NY 10005, USA', will be passed on to the New York Police Department.

<pause 1000 milliseconds...>

Would you like to file another issue report?

*no*

This report is complete. Thank you for filing your complaint with 311.



# 18.js

## Indecipherable input - issue is not classifiable

*jsdfadjsflkafa342134*

Hmm, I wasn't able to categorize that issue report. Please rephrase your complaint, and I'll try again.

*noise from neighborhood kids yelling*

Ok, it sounds like you want to file a noise complaint. Is that right?

*yes*

Ok, got it.

<pause 1000 milliseconds...>

I'll need to confirm an exact location to pass this report on to the right agency.

<pause 1000 milliseconds...>

Could I get the exact address where the incident is occurring?

*27 w 36th st*

I have the address as '27 W 36th St, New York, NY 10018, USA'. Is that right?

*yes*

Great. This report about 'noise', at '27 W 36th St, New York, NY 10018, USA', will be transferred to a 311 agent, who will identify the correct agency to handle it.

<pause 1000 milliseconds...>

Would you like to file another issue report?

*no*

This report is complete. Thank you for filing your complaint with 311.



# 19.js

## Intent Flow Graffiti Full initial report, in-progress graffiti route to 911

*want to report some ugly graffiti at 358 park ave*

Ok, it sounds like you want to report graffiti. Is that right?

*yes please*

Ok, got it. 

<pause 1000 milliseconds...>

Is the graffiti vandalism actively occurring?

*yes, it's a hoodlum teenager*

Ok, got it.

<pause 1000 milliseconds...>

Reports about 'active, in-progress graffiti vandalism' are handled by 911. I'll need to confirm an exact location to pass this report on to 911.

<pause 1000 milliseconds...>

I have the address as '358 Park Ave, New York, NY 10022, USA'. Is that right?

*yes*

Great. This report about 'graffiti', related to 'active, in-progress graffiti vandalism', at '358 Park Ave, New York, NY 10022, USA', will be passed on to 911.

<pause 1000 milliseconds...>

Would you like to file another issue report?

*no*

This report is complete. Thank you for filing your complaint with 311.



# 20.js

## Intent Flow - Noise/Street Condition - additional report given 

*my neighbor is being very loud*

Ok, it sounds like you want to file a noise complaint, specifically about 'neighbor'. Is that right?

*correct*

Ok, got it.

<pause 1000 milliseconds...>

Noise complaints about 'neighbor' are handled by the New York Police Department. I'll need to confirm an exact location to pass this report on to the NYPD.

<pause 1000 milliseconds...>

Could I get the exact address where the incident is occurring?

*450 W 42nd St*

I have the address as '450 W 42nd St, New York, NY 10036, USA'. Is that right?

*yep*

Great. This report about 'noise', related to 'neighbor', at '450 W 42nd St, New York, NY 10036, USA', will be passed on to the New York Police Department.

<pause 1000 milliseconds...>

Would you like to file another issue report?

*yes*

Ok. Please tell me some details of the additional issue you'd like to report.

*the road in front of my apartment is in bad shape*

Ok, it sounds like you want to report poor street conditions. Is that right?

*correct*

Ok, got it.

<pause 1000 milliseconds...>

I'll need to confirm an exact location to pass this report on to the right agency.

<pause 1000 milliseconds...>

Could I get the exact address where the incident is occurring?

*27 W 24th St*

I have the address as '27 W 24th St, New York, NY 10010, USA'. Is that right?

*yep*

Great. This report about 'street conditions', at '27 W 24th St, New York, NY 10010, USA', will be transferred to a 311 agent, who will identify the correct agency to handle it.

<pause 1000 milliseconds...>

Would you like to file another issue report?

*nope that's it*

This report is complete. Thank you for filing your complaint with 311.



# 21.js

## Negative word AND (regular, street) address given as response to address confirmation question

*potholes at 27 w 36th st*

Ok, it sounds like you want to report poor street conditions, specifically about 'pavement quality'. Is that right?

*yes*

Ok, got it.

<pause 1000 milliseconds...>

Reports about 'pavement quality' are handled by the Department of Transportation. I'll need to confirm an exact location to pass this report on to the DOT.

<pause 1000 milliseconds...>

I have the address as '27 W 36th St, New York, NY 10018, USA'. Is that right?

*no it's 51 astor pl*

I have the address as '51 Astor Pl, New York, NY 10003, USA'. Is that right?

*yes*

Great. This report about 'street conditions', related to 'pavement quality', at '51 Astor Pl, New York, NY 10003, USA', will be passed on to the Department of Transportation.

<pause 1000 milliseconds...>

Would you like to file another issue report?

*no*

This report is complete. Thank you for filing your complaint with 311.



# 22.js

## Negative word AND (landmark) address given as response to landmark address confirmation question

*potholes at city hall*

Ok, it sounds like you want to report poor street conditions, specifically about 'pavement quality'. Is that right?

*yes*

Ok, got it.

<pause 1000 milliseconds...>

Reports about 'pavement quality' are handled by the Department of Transportation. I'll need to confirm an exact location to pass this report on to the DOT.

<pause 1000 milliseconds...>

Sounds like the issue is located at 'City Hall'. That's at 'City Hall Park, New York, NY 10007, USA', right?

*no it's the empire state building*

Sounds like the issue is located at 'Empire State Building'. That's at '350 5th Ave, New York, NY 10118, USA', right?

*yes*

Great. This report about 'street conditions', related to 'pavement quality', at '350 5th Ave, New York, NY 10118, USA', will be passed on to the Department of Transportation.

<pause 1000 milliseconds...>

Would you like to file another issue report?

*no*

This report is complete. Thank you for filing your complaint with 311.



# 23.js

## Unusable/unsupported input given as response to (regular, street) address confirmation question

*potholes at 27 w 36th st*

Ok, it sounds like you want to report poor street conditions, specifically about 'pavement quality'. Is that right?

*yes*

Ok, got it.

<pause 1000 milliseconds...>

Reports about 'pavement quality' are handled by the Department of Transportation. I'll need to confirm an exact location to pass this report on to the DOT.

<pause 1000 milliseconds...>

I have the address as '27 W 36th St, New York, NY 10018, USA'. Is that right?

*mary had a little lamb whose fleece was white as snow*

I have the address as '27 W 36th St, New York, NY 10018, USA'. Is that right?

*yes*

Great. This report about 'street conditions', related to 'pavement quality', at '27 W 36th St, New York, NY 10018, USA', will be passed on to the Department of Transportation.

<pause 1000 milliseconds...>

Would you like to file another issue report?

*no*

This report is complete. Thank you for filing your complaint with 311.



# 24.js

## Unusable/unsupported input given as response to (regular, street) address confirmation question

*potholes at city hall*

Ok, it sounds like you want to report poor street conditions, specifically about 'pavement quality'. Is that right?

*yes*

Ok, got it.

<pause 1000 milliseconds...>

Reports about 'pavement quality' are handled by the Department of Transportation. I'll need to confirm an exact location to pass this report on to the DOT.

<pause 1000 milliseconds...>

Sounds like the issue is located at 'City Hall'. That's at 'City Hall Park, New York, NY 10007, USA', right?

*mary had a little lamb whose fleece was white as snow*

Sounds like the issue is located at 'City Hall'. That's at 'City Hall Park, New York, NY 10007, USA', right?

*yes*

Great. This report about 'street conditions', related to 'pavement quality', at 'City Hall Park, New York, NY 10007, USA', will be passed on to the Department of Transportation.

<pause 1000 milliseconds...>

Would you like to file another issue report?

*no*

This report is complete. Thank you for filing your complaint with 311.



# 25.js

## implicit negation (replacement value provided for address), landmark address replaced by landmark address

*this tree is damaged*

Ok, it sounds like you want to report about the condition of a tree. Is that right?

*pretty much*

Ok, got it.

<pause 1000 milliseconds...>

I'll need to confirm an exact location to pass this report on to the right agency.

<pause 1000 milliseconds...>

Could I get the exact address where the incident is occurring?

*city hall*

Sounds like the issue is located at 'City Hall'. That's at 'City Hall Park, New York, NY 10007, USA', right?

*empire state building*

Sounds like the issue is located at 'Empire State Building'. That's at '350 5th Ave, New York, NY 10118, USA', right?

*that's right*

Great. This report about 'tree damage', at '350 5th Ave, New York, NY 10118, USA', will be transferred to a 311 agent, who will identify the correct agency to handle it.

<pause 1000 milliseconds...>

Would you like to file another issue report?

*no*

This report is complete. Thank you for filing your complaint with 311.



# 26.js

## implicit negation (replacement value provided for address), landmark address replaced by regular, street address

*this tree is damaged*

Ok, it sounds like you want to report about the condition of a tree. Is that right?

*pretty much*

Ok, got it.

<pause 1000 milliseconds...>

I'll need to confirm an exact location to pass this report on to the right agency.

<pause 1000 milliseconds...>

Could I get the exact address where the incident is occurring?

*city hall*

Sounds like the issue is located at 'City Hall'. That's at 'City Hall Park, New York, NY 10007, USA', right?

*51 astor place*

I have the address as '51 Astor Pl, New York, NY 10003, USA'. Is that right?

*that's right*

Great. This report about 'tree damage', at '51 Astor Pl, New York, NY 10003, USA', will be transferred to a 311 agent, who will identify the correct agency to handle it.

<pause 1000 milliseconds...>

Would you like to file another issue report?

*no*

This report is complete. Thank you for filing your complaint with 311.



# 27.js

## combo input (aff + issue report) to addtl report question

*could this graffiti on my office building be removed?*

Ok, it sounds like you want to report graffiti, specifically about 'graffiti removal'. Is that right?

*yes*

Ok, got it.

<pause 1000 milliseconds...>

Reports about 'graffiti removal' are handled by the Department of Sanitation. I'll need to confirm an exact location to pass this report on to the DSNY.

<pause 1000 milliseconds...>

Could I get the exact address where the incident is occurring?

*51 astor pl*

I have the address as '51 Astor Pl, New York, NY 10003, USA'. Is that right?

*that's right*

Great. This report about 'graffiti', related to 'graffiti removal', at '51 Astor Pl, New York, NY 10003, USA', will be passed on to the Department of Sanitation.

<pause 1000 milliseconds...>

Would you like to file another issue report?

*yeah there's a dead tree at 27 w 36th st*

Ok, it sounds like you want to report about the condition of a tree, specifically about 'dead or dying tree'. Is that right?

*yeah that's right*

Ok, got it.

<pause 1000 milliseconds...>

Reports about 'dead or dying tree' are handled by the Department of Parks and Recreation. I'll need to confirm an exact location to pass this report on to the DPR.

<pause 1000 milliseconds...>

I have the address as '27 W 36th St, New York, NY 10018, USA'. Is that right?

*indeed*

Great. This report about 'tree damage', related to 'dead or dying tree', at '27 W 36th St, New York, NY 10018, USA', will be passed on to the Department of Parks and Recreation.

<pause 1000 milliseconds...>

Would you like to file another issue report?

*nope not right now*

This report is complete. Thank you for filing your complaint with 311.



# 28.js

## C.T. Failure limit test - Implicit negation of complaint type

*big potholes in the pavement*

Ok, it sounds like you want to report poor street conditions, specifically about 'pavement quality'. Is that right?

*there is a broken tree near the sidewalk*

Ok, it sounds like you want to report about the condition of a tree. Is that right?

*screaming going on from next door neighbor*

Ok, it sounds like you want to file a noise complaint, specifically about 'neighbor'. Is that right?

*please remove this graffiti from this building*

Ok, it sounds like you want to report graffiti, specifically about 'graffiti removal'. Is that right?

*lane lines on the road are very faded*

Hmm, this sounds like something an agent could help with. Please hold and you'll be connected with someone directly...

<pause 1000 milliseconds...>

You may learn more about the 311 system here: http://www1.nyc.gov/311/index.page



# 29.js

## C.T. Failure limit test - Rejected complaint type

*big potholes in the pavement*

Ok, it sounds like you want to report poor street conditions, specifically about 'pavement quality'. Is that right?

*no*

Oops. Let's try this again. Please rephrase your issue report, and I'll do my best to understand.

*there is a broken tree near the sidewalk*

Ok, it sounds like you want to report about the condition of a tree. Is that right?

*incorrect*

Oops. Let's try this again. Please rephrase your issue report, and I'll do my best to understand.

*screaming going on from next door neighbor*

Ok, it sounds like you want to file a noise complaint, specifically about 'neighbor'. Is that right?

*nope*

Hmm, this sounds like something an agent could help with. Please hold and you'll be connected with someone directly...

<pause 1000 milliseconds...>

You may learn more about the 311 system here: http://www1.nyc.gov/311/index.page



# 30.js

## Address Failure limit test - Implicit negation of street address

*extremely loud construction noise at 27 W 24th st*

Ok, it sounds like you want to file a noise complaint, specifically about 'construction work'. Is that right?

*yeah that's right*

Ok, got it.

<pause 1000 milliseconds...>

Noise complaints about 'construction work' are handled by the Department of Environmental Protection. I'll need to confirm an exact location to pass this report on to the DEP.

<pause 1000 milliseconds...>

I have the address as '27 W 24th St, New York, NY 10010, USA'. Is that right?

*51 astor place*

I have the address as '51 Astor Pl, New York, NY 10003, USA'. Is that right?

*2 moore*

I have the address as '2 Moore St, New York, NY 10004, USA'. Is that right?

*70 Broadway Ave*

Hmm, this sounds like something an agent could help with. Please hold and you'll be connected with someone directly...

<pause 1000 milliseconds...>

You may learn more about noise and NYC here: http://www1.nyc.gov/nyc-resources/faq/324/how-can-i-learn-more-about-noise-and-nyc



# 31.js

## Address Failure limit test - Rejected street address

*extremely loud construction noise at 27 W 24th st*

Ok, it sounds like you want to file a noise complaint, specifically about 'construction work'. Is that right?

*yeah that's right*

Ok, got it.

<pause 1000 milliseconds...>

Noise complaints about 'construction work' are handled by the Department of Environmental Protection. I'll need to confirm an exact location to pass this report on to the DEP.

<pause 1000 milliseconds...>

I have the address as '27 W 24th St, New York, NY 10010, USA'. Is that right?

*no*

Oops. Let's try this again. Please rephrase your address and I'll try again.

*51 astor place*

I have the address as '51 Astor Pl, New York, NY 10003, USA'. Is that right?

*no*

Hmm, this sounds like something an agent could help with. Please hold and you'll be connected with someone directly...

<pause 1000 milliseconds...>

You may learn more about noise and NYC here: http://www1.nyc.gov/nyc-resources/faq/324/how-can-i-learn-more-about-noise-and-nyc



# 32.js

## Address Failure limit test - Implicit negation of landmark address

*extremely loud construction noise at city hall*

Ok, it sounds like you want to file a noise complaint, specifically about 'construction work'. Is that right?

*yeah that's right*

Ok, got it.

<pause 1000 milliseconds...>

Noise complaints about 'construction work' are handled by the Department of Environmental Protection. I'll need to confirm an exact location to pass this report on to the DEP.

<pause 1000 milliseconds...>

Sounds like the issue is located at 'City Hall'. That's at 'City Hall Park, New York, NY 10007, USA', right?

*empire state building*

Sounds like the issue is located at 'Empire State Building'. That's at '350 5th Ave, New York, NY 10118, USA', right?

*woolworth building*

Sounds like the issue is located at 'Woolworth Building'. That's at '233 Broadway, New York, NY 10007, USA', right?

*plaza hotel*

Hmm, this sounds like something an agent could help with. Please hold and you'll be connected with someone directly...

<pause 1000 milliseconds...>

You may learn more about noise and NYC here: http://www1.nyc.gov/nyc-resources/faq/324/how-can-i-learn-more-about-noise-and-nyc



# 33.js

## Address Failure limit test - Rejected landmark address

*extremely loud construction noise at city hall*

Ok, it sounds like you want to file a noise complaint, specifically about 'construction work'. Is that right?

*yeah that's right*

Ok, got it.

<pause 1000 milliseconds...>

Noise complaints about 'construction work' are handled by the Department of Environmental Protection. I'll need to confirm an exact location to pass this report on to the DEP.

<pause 1000 milliseconds...>

Sounds like the issue is located at 'City Hall'. That's at 'City Hall Park, New York, NY 10007, USA', right?

*no*

Oops. Let's try this again. Please rephrase your address and I'll try again.

*empire state building*

Sounds like the issue is located at 'Empire State Building'. That's at '350 5th Ave, New York, NY 10118, USA', right?

*no*

Hmm, this sounds like something an agent could help with. Please hold and you'll be connected with someone directly...

<pause 1000 milliseconds...>

You may learn more about noise and NYC here: http://www1.nyc.gov/nyc-resources/faq/324/how-can-i-learn-more-about-noise-and-nyc



# 34.js

## C.T. Failure limit test - Implicit negation of complaint type THREE times, confirm last address

*big potholes in the pavement*

Ok, it sounds like you want to report poor street conditions, specifically about 'pavement quality'. Is that right?

*there is a broken tree near the sidewalk*

Ok, it sounds like you want to report about the condition of a tree. Is that right?

*screaming going on from next door neighbor*

Ok, it sounds like you want to file a noise complaint, specifically about 'neighbor'. Is that right?

*please remove this graffiti*

Ok, it sounds like you want to report graffiti, specifically about 'graffiti removal'. Is that right?

*yes that's right*

Ok, got it.

<pause 1000 milliseconds...>

Reports about 'graffiti removal' are handled by the Department of Sanitation. I'll need to confirm an exact location to pass this report on to the DSNY.

<pause 1000 milliseconds...>

Could I get the exact address where the incident is occurring?

*51 astor pl*

I have the address as '51 Astor Pl, New York, NY 10003, USA'. Is that right?

*yep that's right*

Great. This report about 'graffiti', related to 'graffiti removal', at '51 Astor Pl, New York, NY 10003, USA', will be passed on to the Department of Sanitation.

<pause 1000 milliseconds...>

Would you like to file another issue report?

*no*

This report is complete. Thank you for filing your complaint with 311.



