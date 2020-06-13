// from data.js
var tableData = data;
var dateVal = d3.select("#datetime");
var filter_btn = d3.select("#filter-btn");
var func_test = d3.select("#filter-btn-two");
var date_target = '1/2/2010';

// Empty lists to process date dropdown values
var allDates = [];
var scrubDates = [];

// Push all date values to allDates list
tableData.forEach((ufo) => {allDates.push(ufo.datetime)})

// Push only unique values to scrubDates
allDates.forEach((date) => {
    if (scrubDates.includes(date)){console.log("Date exists, rejecting")}
    else {scrubDates.push(date);}
})

// Console check for debugging, commented out of production version
//console.log(scrubDates)

// Create dropdown option for each unique date
scrubDates.forEach((date) => {dateVal.append("option").text(date);})


// Filter function to run on dropdown value change
function tableMake(){

    //Log function start
    console.log("Function called: tableMake ")

    //Remove previous table data
    d3.selectAll(".tr-del").remove()

    // Set and log target date from dropdown
    var dateTarget = dateVal.property("value");
    console.log("Recorded date value: "+dateTarget)

    // Filter data by dropdown date value
    var filtered_data = tableData.filter(i => {
        return i.datetime === dateTarget;
        // Console check for debugging, commented out of production version
        //console.log("Filtered data: "+filtered_data)
    });

    // Create table row for each record with matching date
    filtered_data.forEach((ufo) => {
        var theTable = d3.select("#ufo-table");

        // Add class for removal function
        var theRow = theTable.append("tr").classed("tr-del",true)

            // Append ufo data to newly created row
            theRow.append("td").text(ufo.datetime.toUpperCase())
            theRow.append("td").text(ufo.city)
            theRow.append("td").text(ufo.state.toUpperCase())
            theRow.append("td").text(ufo.country.toUpperCase())
            theRow.append("td").text(ufo.shape)
            theRow.append("td").text(ufo.durationMinutes)
            theRow.append("td").text(ufo.comments)
        })
};

// Event listener for date dropdown
dateVal.on("change",tableMake)