A quick project for myself to automate work hour calculation. Uses Google Calendar API and Google OAuth to fetch all events from your calendar. between given dates. Events are fetched by: start date, end date, search phrase and calendar ID.

1. To run on your own server you need to:
    1. Download this repo
    2. Install packages via `pip install requiremesnts.txt`
    3. Run server with `python manage.py runserver`. If something doesn't work check here:
    https://docs.djangoproject.com/en/2.2/intro/tutorial01/#the-development-server
    4. Last thing you need to do is add your own Google Calendar API credentials to the top of calculator.js file.
    The rest of this file cointains more info how to do it. 
    
2. ADD YOUR API KEY AND CLIENT_ID

    "CLIENT_ID": "12345678910-asdf1234asfd12341asdf1234.apps.googleusercontent.com",
    "API_KEY": "AIf43hg2WfjFh2gf4F213hgD4hg3fj231fj4_3f"

3. HOW TO GENERATE GOOGLE API CREDENTIALS:

In order to connect to Google APi you need to generate your own Client ID and API key. Here is how to do it:

https://developers.google.com/calendar/quickstart/js

When you generate the credenatials paste them in the index.html file.

TroubleShooting:
-idpiframe_initialization_failed: Not a valid origin for the client
You did not specify the url that you're using now while creating credentials.

-403 permission denied
You probably did not activate the API. Go the link below and active it:
https://console.developers.google.com/apis/api/calendar-json.googleapis.com


4. HOW TO GET CALENDAR ID:

Go to:
https://calendar.google.com/calendar

On the left side-bar you should see a list of calendars you're subscribed to.
When you hover your mouse over it a button with 3 dots appears. Click on it and choose Settings.

Scroll down a bit and you should see a section called "Calendar Integration" and the first field called Calendar id is what we're looking for. Copy and paste that and you should see events from that calendar.

5. HOW TO DEPLOY TO AWS:

That's a lot of work. First you need to create you're account ofcourse. Then you need to download and setup the AWS EB CLI from here:
https://docs.aws.amazon.com/elasticbeanstalk/latest/dg/eb-cli3-install.html

When you're done follow these instructions:
https://docs.aws.amazon.com/elasticbeanstalk/latest/dg/create-deploy-python-django.html#python-django-prereq
