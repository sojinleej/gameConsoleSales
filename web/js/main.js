/*
 *  AUTHOR: Sojin Lee
 *  FILE NAME: main.js
 *  CREATED: Dec 16 2017
 *  UPDATED: Dec 16 2017
 *  DESCRIPTION: This is a main javascript file for the Assignment2 
 */
// define global variable - creating an object
var go = {};

document.addEventListener("DOMContentLoaded", main);

//============================================================= main entry point
function main()
{
    Logger.open(); // automatically expand the log
    log("HTML is loaded.");

    // when it is first loaded, the radioHardware is checked as the default
    go.radioHardware = document.getElementById("radioHardware");
    requestJson(go.radioHardware.value)

    // register click event for radios - radioHardware first time that is defined 
    go.radioHardware.addEventListener("click", function ()
    {
        // sending to AJAX
        requestJson(go.radioHardware.value) // == this.value
    });
    go.radioSoftware = document.getElementById("radioSoftware");
    go.radioSoftware.addEventListener("click", function ()
    {
        requestJson(go.radioSoftware.value) // == this.value
    });
    go.radioGameTitles = document.getElementById("radioGameTitles");
    go.radioGameTitles.addEventListener("click", function ()
    {
        requestJson(go.radioGameTitles.value) // == this.value
    });
}

// this function requests the Json string and update the table and the chart
function requestJson(category)
{
    log("radio clicked " + category);
    // 1. create XMLHttpRequest object
    var xhr = new XMLHttpRequest();

    // 2. initialize XHR - POST - (method, url, [async])
    xhr.open("GET", "ConsoleSales?category=" + category);
    // 3. send request
    xhr.send();

    // 4. receive json async when it is completed
    // equivalent to xhr.addEventListener("load", function(){};)
    xhr.onload = function ()
    {
        // got the JSON string - parse JSON
        if (xhr.status == 200)
        {
            // 1. parse JSON String - return array of objects
            var consoles = JSON.parse(xhr.response);
            // 2. update table
            updateTable(consoles, category);
            // 3. update chart
            updateChart(consoles, category);
        } else
        {
            log("[ERROR] Failed to request JSON");
        }
    };
}

// function for updating the table
function updateTable(consoles, category)
{
    log("updateTable called: " + category);

    // change table heading - valueHeading
    var valueHeading = document.getElementById("valueHeading");

    if (category === "hardwareSales")
        valueHeading.textContent = "Hardware (millions)";
    else if (category === "softwareSales")
        valueHeading.textContent = "Software (millions)";
    else if (category === "gameTitles")
        valueHeading.textContent = "Game Titles";

    // update 2nd column (value)
    var tbody = document.getElementById("tableConsole").tBodies[0];

    // iterate all rows
    for (var i = 0; i < tbody.rows.length; ++ i)
    {
        var row = tbody.rows[i]; // current row
        var cellName = row.cells[0]; // first column - to find the value
        var cellValue = row.cells[1]; // second column

        // find console obj by its name
        var console = findConsoleByName(consoles, cellName.textContent);
        log();
        if (console) // instead of using != null
        {
            // update its value
            cellValue.textContent = console.value;
        }
    }
}

// search an obj using key and return it - array, name of console
function findConsoleByName(consoles, name)
{
    // new way more like for each loop
    for (var i = 0, console; console = consoles[i]; ++ i)
    {
        if (name === console.name) // found from the Json
            return console;
    }
    return null; // not found
}

// function for updating the chart
function updateChart(consoles, category)
{
    // set chart label
    //var chartLabel1 = "6th Generation";
    //var chartLabel2 = "7th Generation";
    //var chartLabel3 = "8th Generation";
    var chartType = "";
    var colors = [];
    if (category == "hardwareSales")
    {
        chartType = "pie";
        colors = [
            "#c91730",
            "#ff7700",
            "#f0e7d8",
            "#0086a6"
        ];
    } else if (category == "softwareSales")
    {
        chartType = "doughnut";
        colors = [
            "#e4572e",
            "#17bebe",
            "#233d4d",
            "#ffc914"
        ];
    } else if (category == "gameTitles")
    {
        chartType = "polarArea";
        colors = [
            "rgba(255, 99, 132, 0.7)",
            "rgba(153, 102, 255, 0.7)",
            "rgba(54, 162, 235, 0.7)",
            "rgba(192, 192, 192, 0.3)"
        ];
    }

    go.table = document.getElementById("tableConsole");

    // build chart data
    var names1 = [];
    var values1 = [];
    var names2 = [];
    var values2 = [];
    var names3 = [];
    var values3 = [];
    var tbody = go.table.tBodies[0];
    for (var i = 0; i < tbody.rows.length; ++ i)
    {
        var row = tbody.rows[i];
        var name = row.cells[0].textContent;
        var console = findConsoleByName(consoles, name);
        if (console)
        {
            if ((i - 1) % 3 == 0)
            {
                names1.push(name);
                values1.push(console.value);
            } else if ((i - 1) % 3 == 1)
            {
                names2.push(name);
                values2.push(console.value);
            } else if ((i - 1) % 3 == 2)
            {
                names3.push(name);
                values3.push(console.value);
            }
        }
    }

    // define default chart data
    var config1 =
            {
                type: chartType,
                data:
                        {
                            labels: names1,
                            datasets:
                                    [{
                                            borderWidth: 1,
                                            data: values1,
                                            backgroundColor: colors,
                                        }]
                        }
            };

    var config2 =
            {
                type: chartType,
                data:
                        {
                            labels: names2,
                            datasets:
                                    [{
                                            borderWidth: 1,
                                            data: values2,
                                            backgroundColor: colors,
                                        }]
                        }
            };

    var config3 =
            {
                type: chartType,
                data:
                        {
                            labels: names3,
                            datasets:
                                    [{
                                            borderWidth: 1,
                                            data: values3,
                                            backgroundColor: colors,
                                        }]
                        }
            };

    go.canvas1 = document.getElementById("canvasConsole1");
    go.canvas2 = document.getElementById("canvasConsole2");
    go.canvas3 = document.getElementById("canvasConsole3");

    // remove the previous chart before creating new one
    if (go.chart1)
        go.chart1.destroy();
    if (go.chart2)
        go.chart2.destroy();
    if (go.chart3)
        go.chart3.destroy();

    // create new chart
    var context1 = go.canvas1.getContext("2d");
    go.chart1 = new Chart(context1, config1);

    var context2 = go.canvas2.getContext("2d");
    go.chart2 = new Chart(context2, config2);

    var context3 = go.canvas3.getContext("2d");
    go.chart3 = new Chart(context3, config3);
}