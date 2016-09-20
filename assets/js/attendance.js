var ctx = document.getElementById("attendanceChart").getContext("2d");

var DataSet = function (label, data, lineColour) {
    this.label = label;
    this.fill = false;
    this.lineTension = 0.1;
    this.backgroundColor = "rgba(" + lineColour + ",0.4)";
    this.borderColor = "rgba(" + lineColour + ",1)";
    this.borderCapStyle = 'butt';
    this.borderDash = [];
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
    labels: ["January", "February", "March", "April", "May", "June", "July"],
    datasets: [
        new DataSet("Mentors", [1,9,3,3,5,23,4], "255,50,50"),
        new DataSet("Students", [12,5,1,3,5,3,4], "75,255,100")
    ]
};

var attendanceChart = new Chart(ctx, {
    type: 'line',
    data: data,
    options: {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero:true
                }
            }]
        }
    }
});
