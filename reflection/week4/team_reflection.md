# Hasse Andersson team reflection - Week 4 / Sprint 2

## Design decisions and product structure
The use of a noSQL database makes it easy to add more attributes to events, like adding descriptions or pricing.
The use of nextJS allows us to more quickly produce valuable features.
For technical documentation we have said that files should have at least a top level comment explaining the purpose of the file.
We need to figure out a proper way to enforce this, probably just by reviewing the pull requests in detail.

We aggregate the data semi-manually (due to legal reasons) but the events do not need to be typed in by hand, 
which makes it easier to keep the database up to date and provide value to our customer. The members of committees 
can thereby add events of facebook which will later appear on our site, which in turn adds value for the users of the website.

The use of eslint and automated build testing ensures that the code is tested with each push to the repository.
One can also locally run the code quality checks to proactively act on potential errors or quality violations.
Hasn’t really been used this sprint, this sprint has been more about setting it up.

The use of CSS (Cascading style sheets) makes the website look really nice and makes the customer happy.
We have chosen to use tailwind for css so that we can be more efficient and the code is more readable.
It also forces us to follow some standard measurements.


## Application of Scrum
We had a sprint kickoff meeting where we invited our stakeholder and planned & evaluated our product backlog and had a short scrum meeting. 
During that meeting we discussed how we’re planning to manage the project onwards, 
both from us as developers but also what is expected from the stakeholder. 
We established guidelines and routines to follow, such as how feedback is to be presented from the stakeholder 
and how we communicate the progress to the stakeholder.

We had a standup scrum meeting in the middle of the sprint led by our scrum master Casper. 
This is something we plan to continue with, since it contributed to better awareness of the progress that was being made and how we may continue. 
It also helped to identify challenges that lied ahead and how they were to be dealt with. 
Another thing that it contributed with was to connect those who were done with their user story of 
responsibility with new user stories, which enabled more efficient work. 

We need to get better at reviewing and creating pull requests. Another thing that is of concern is to be more consistent 
with acceptance criterias and developing standards for how and when to merge.

Branches worked well, although we need to clarify our workflow standards since some people create PRs before the user story is done, 
and develop within the PR. We have chosen to use PRs for when the story is done in the future.
