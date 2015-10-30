# koala-shoes
:koala:     Follow your issues     
:feet:      Step by   
:feet:      Step...

Unfortunately due to unforseen circumstances, the koalabears' services are offline this week. See below

_"Courage doesn't always roar. Sometimes courage is the little voice at the end of the day that says I'll try again tomorrow...(or after the weekend)"_

## What is koala-shoes?

koala-shoes is an issues notification board that bundles together the issues that you've raised on other repo's. It highlights new comments that have been made on your issues and allows you to comment further or to close them if you are satisfied that they have been resolved.

## Why do you need it?

koala-shoes keeps you up to date with the repo issues that you've raised on other projects. Remembering all of the issues you have raised can be difficult and so koala-shoes enables you to continue to give feedback on every project you have engaged with which in turn will help to further develop that project :+1:

![img](https://cloud.githubusercontent.com/assets/11833296/10790056/0a31f1c2-7d79-11e5-8c4b-35aa1d9fb3ce.jpg)

## How?

Koalabears will be using the following technologies:
- Redis to store issues data
- sockets to display any issue updates
- Github API
- OAuth2 to authenticate the Github user
- JSON web tokens to store session info

The project will be deployed to Heroku

## Steps
- [x] set up basic server  
- [x] set up Github authentication
- [x] set up JWT (JSON web tokens)
- [x] create requests to get issues data from Github API  
- [x] set up database to store usernames and access tokens
- [ ] set up database to store and retrieve issues data  
- [ ] set up infrastructure to check what data is new  
- [x] build front-end with features e.g. toggling to show/close issues  
- [ ] deploy to Heroku
