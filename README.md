A quick project for myself to automate work hour calculation. Uses Google Calendar API and Google OAuth to fetch all events from your calendar. between given dates. Events are fetched by: start date, end date, search phrase and calendar ID.

1. RUN A WEB SERVER

To run you need any kind of a web server. Node.js or apache or whatever floats your boat. I used python for that matter. To start python web server in the projects directory run:
for python 3.x:
`python -m http.server 8000`
for python 2.x:
`python -m SimpleHTTPServer 8000`

2. ADD YOUR API KEY AND CLIENT_ID TO credentials.json FILE:

the credentials should look something like this:
{
    "CLIENT_ID": "12345678910-asdf1234asfd12341asdf1234.apps.googleusercontent.com",
    "API_KEY": "AIf43hg2WfjFh2gf4F213hgD4hg3fj231fj4_3f"
}


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
