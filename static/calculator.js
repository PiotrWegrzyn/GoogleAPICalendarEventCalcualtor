// Client ID and API key from the Developer Console
var CLIENT_ID = '646505179537-av3n9r1qlkflahqtuf6p85vm9jnfj20q.apps.googleusercontent.com';
var API_KEY = 'AIzaSyAhBy8yRgJbXG3QAYG9u3O38mOIQvU5_4o';

// Array of API discovery doc URLs for APIs used by the quickstart
var DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"];

// Authorization scopes required by the API; multiple scopes can be
// included, separated by spaces.
var SCOPES = "https://www.googleapis.com/auth/calendar.readonly";

var authorizeButton = document.getElementById('authorize_button');
var signoutButton = document.getElementById('signout_button');
/**
 *  On load, called to load the auth2 library and API client library.
 */

function handleClientLoad() {
    gapi.load('client:auth2', initClient);
}
$(document).ready(function (){

        $("#start_datepicker").datepicker({
            autoclose: true,
            todayHighlight: true
        }).datepicker('update', new Date());
        $("#end_datepicker").datepicker({
            autoclose: true,
            todayHighlight: true
        }).datepicker('update', new Date());
});
/**
 *  Initializes the API client library and sets up sign-in state
 *  listeners.
 */
function initClient() {
    gapi.client.init({
        apiKey: API_KEY,
        clientId: CLIENT_ID,
        discoveryDocs: DISCOVERY_DOCS,
        scope: SCOPES
    }).then(function () {
        // Listen for sign-in state changes.
        gapi.auth2.getAuthInstance().isSignedIn.listen(updateSigninStatus);

        // Handle the initial sign-in state.
        updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get());
        authorizeButton.onclick = handleAuthClick;
        signoutButton.onclick = handleSignoutClick;
    }, function (error) {
        appendPre(JSON.stringify(error, null, 2));
    });
}

/**
 *  Called when the signed in status changes, to update the UI
 *  appropriately. After a sign-in, the API is called.
 */
function updateSigninStatus(isSignedIn) {
    if (isSignedIn) {
        authorizeButton.style.display = 'none';
        signoutButton.style.display = 'block';
        setToUserCalendars();
    } else {
        authorizeButton.style.display = 'block';
        signoutButton.style.display = 'none';
        updateCalendarSelect([]);
        clear_table("#event_table");
    }
}

/**
 *  Sign in the user upon button click.
 */
function handleAuthClick(event) {
    gapi.auth2.getAuthInstance().signIn();
}

/**
 *  Sign out the user upon button click.
 */
function handleSignoutClick(event) {
    gapi.auth2.getAuthInstance().signOut();
    clear_table("#event_table")
}

/**
 * Append a pre element to the body containing the given message
 * as its text node. Used to display the results of the API call.
 *
 * @param {string} message Text to be placed in pre element.
 */
function appendPre(message) {
    var pre = document.getElementById('content');
    var textContent = document.createTextNode(message + '\n');
    pre.appendChild(textContent);
}

/**
 * Print the summary and start datetime/date of the next ten events in
 * the authorized user's calendar. If no events are found an
 * appropriate message is printed.
 */
function addToTableRow(content, row) {
    let cell = document.createElement('td');
    cell.appendChild(document.createTextNode(content));
    row.appendChild(cell)
}

function addTableRow(table, content_array, row_class = null) {
    let row = document.createElement('tr');
    if (row_class) {
        row.classList.add(row_class);
    }
    for (var i = 0; i < content_array.length; i++) {
        addToTableRow(content_array[i], row);
    }
    table.appendChild(row);
};

function appendLeadingZeroes(n) {
    if (n < 9) {
        return "0" + n;
    }
    return n
}
function formatDate(date) {
    return date.getFullYear()
        + "-" + appendLeadingZeroes((date.getMonth() + 1))
        + "-" + appendLeadingZeroes(date.getDate())
        + " " + appendLeadingZeroes(date.getHours())
        + ":" + appendLeadingZeroes(date.getMinutes())
        + ":" + appendLeadingZeroes(date.getSeconds());
}
function getHours(miliseconds) {
    return Math.floor(miliseconds / 1000 / 60 / 60);
}
function setToUserCalendars() {
    gapi.client.calendar.calendarList.list()
        .then(function (response) {
            updateCalendarSelect(response.result.items);
        });
}

function updateCalendarSelect(calendars, input_selector="#calendar_id"){
    select_input= $(input_selector)
    select_input.find('option').remove();
    for (var i = 0; i < calendars.length; i++) {
        select_input.append($("<option></option>")
            .attr("value", calendars[i].id)
            .text(calendars[i].summary));
    }
    select_input.selectpicker('refresh');

}

function containsPhrase(event, phrase){
    return event.summary.toLowerCase().search(phrase.toLowerCase()) > 0 || phrase === ""
}
function notWholeDay(event){
    return event.start.dateTime && event.end.dateTime
}

function addEventToTable(event,table){

        var start_date = new Date(event.start.dateTime);
        var end_date = new Date(event.end.dateTime);
        let miliseconds_delta = end_date - start_date
        var time_delta = new Date(miliseconds_delta)

        let content_array = []

        if (notWholeDay(event)) {
            let event_time_text = getHours(miliseconds_delta) + ":" + appendLeadingZeroes(time_delta.getMinutes()) + " h"
            content_array = [event.summary, formatDate(start_date), formatDate(end_date), event_time_text]
        }
        else {
            content_array = [event.summary, "Whole day", "Whole day", "Not added to TOTAL"]
        }
        addTableRow(table, content_array);
}

function clear_table(selector){
    $(selector).find('tr').not("tr:first").remove();
}

function listUpcomingEvents() {
    clear_table("#event_table");
    let user_start_date = document.getElementById("start_date").value;
    let user_end_date = document.getElementById("end_date").value;
    let user_search_phrase = document.getElementById("search_phrase").value;
    let user_calendar_id = $('#calendar_id').find("option:selected").val()
    if (user_start_date == '') {
        user_start_date = new Date();
    }
    if (user_end_date == '') {
        user_end_date = new Date();
    }
    if (gapi.auth2.getAuthInstance().isSignedIn.get()){

        gapi.client.calendar.events.list({
            'calendarId': user_calendar_id,
            'timeMin': (new Date(user_start_date)).toISOString(),
            'timeMax': (new Date(user_end_date)).toISOString(),
            'showDeleted': false,
            'singleEvents': true,
            'maxResults': 100,
            'orderBy': 'startTime'
        }).then(function (response) {

            var events = response.result.items;

            if (events.length > 0) {
                let table = document.getElementById("event_table")

                var ms_sum = 0;

                for (i = 0; i < events.length; i++) {

                    var event = events[i];
                    if (containsPhrase(event, user_search_phrase)) {
                        if(notWholeDay(event)){
                            ms_sum += new Date(event.end.dateTime) - new Date(event.start.dateTime)
                        }
                        addEventToTable(event,table);
                    }
                }
                let minutes = new Date(ms_sum).getMinutes();
                let total_text = getHours(ms_sum) + ":" + appendLeadingZeroes(minutes) + " h";
                let content_array = ["TOTAL:", " ", " ", total_text]
                addTableRow(table, content_array, "bg-warning");

            } else {
                let table = document.getElementById("event_table")
                let content_array = ['NO EVENTS FOUND: ', " ", " ", " "]
                addTableRow(table, content_array, "bg-danger");
            }
        });
    }
    else{
        gapi.auth2.getAuthInstance().signIn();
    }
}
