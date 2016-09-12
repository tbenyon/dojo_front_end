const google = require('googleapis');
const googleAuth = require("./googleAuth.js");

googleAuth.authorise();

exports.listCalendarEvents = function() {
    return new Promise(function (resolve, reject) {
        googleAuth.authorise().then(function (auth) {
            var calendar = google.calendar('v3');
            calendar.events.list({
                auth: auth,
                calendarId: 'primary',
                timeMin: (new Date()).toISOString(),
                maxResults: 6,
                singleEvents: true,
                orderBy: 'startTime'
            }, function (err, response) {
                if (err) {
                    console.error("Failed when getting Google Calendar Events");
                    reject(err);
                } else {
                    var events = response.items;
                    if (events.length == 0) {
                        resolve([]);
                    } else {
                        resolve(events);
                    }
                }
            });
        });
    });
};
