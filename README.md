Welcome to Dilbot for Slack
===================


This is a web service that interacts with Slack to pull Dilbert comics from the website of Scott Adams (http://www.dilbert.com).  
This is purely a fan site and all copyrights belong to Scott Adams.  
I am a huge an and if he asks me to take this down, I will oblige promptly (although regretfully)! 


----------


Stack
-------------

 - NodeJS

> **Plugins:**

> - Express
> - Cheerio
> - Request


Slack Command
----

```
/dilbot - Brings back today's Dilber comic 

/dilbot [term] - Searches Dilbert.com and brings back random comic. Fail images if nothing is found. 

/dilbot [YYYYMMDD] - Brings back comic for that day from Dilbert.com
```

Hosting 
----------------
You can host this for free on Heroku, but the free account goes to sleep after 30 minutes.  
This will cause your next request to timeout.
