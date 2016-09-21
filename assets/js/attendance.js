var labels = [];
var allData = [];
attendanceData.all.forEach(function (dojo) {
    labels.push(dojo.DojoID);
    allData.push(dojo.count);
});

var mentorData = [];
var found;
attendanceData.all.forEach(function (allDojo) {
    found = false;
    attendanceData.mentor.forEach(function (mentorDojo) {
        if (allDojo.DojoID === mentorDojo.DojoID) {
            mentorData.push(mentorDojo.count);
            found = true;
        }
    });
    if (found === false) {
        mentorData.push(0);
    }
});

var studentData = [];
var found;
attendanceData.all.forEach(function (allDojo) {
    found = false;
    attendanceData.student.forEach(function (studentDojo) {
        if (allDojo.DojoID === studentDojo.DojoID) {
            studentData.push(studentDojo.count);
            found = true;
        }
    });
    if (found === false) {
        studentData.push(0);
    }
});

var ctx = document.getElementById("attendanceChart").getContext("2d");

var DataSet = function (label, data, lineColour) {
    this.label = label;
    this.fill = false;
    this.lineTension = 0.1;
    this.backgroundColor = "rgba(" + lineColour + ",9)";
    this.borderColor = "rgba(255,255,255,1)";
    this.borderCapStyle = 'butt';
    this.borderDash = [];
    this.borderWidth = 2;
    this.borderDashOffset = 0.0;
    this.borderJoinStyle = 'miter';
    this.pointBorderColor = "rgba(" + lineColour + ",1)";
    this.pointBackgroundColor = "#fff";
    this.pointBorderWidth = 1;
    this.pointHoverRadius = 5;
    this.pointHoverBackgroundColor = "rgba(" + lineColour + ",1)";
    this.pointHoverBorderColor = "rgba(220,220,220,1)";
    this.pointHoverBorderWidth = 2;
    this.pointRadius = 1;
    this.pointHitRadius = 10;
    this.data = data;
    this.spanGaps = false;
};

var data = {
    labels: labels,
    datasets: [
        new DataSet("Students", studentData, "75,255,100"),
        new DataSet("Mentors", mentorData, "255,50,50")
    ]
};

var attendanceChart = new Chart(ctx, {
    type: 'bar',
    data: data,
    options: {
        scales: {
            xAxes: [{
                stacked: true
            }],
            yAxes: [{
                ticks: {
                    beginAtZero:true
                },
                stacked: true
            }]
        }
    }
});
