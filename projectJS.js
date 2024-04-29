// Name: Jennifer Morrison
// Class: Web115.0004
// Date: April 29, 2024
// File Name: script.js

// Declare variables for page
const menuForm = document.getElementById("menuForm");
const subButton = document.getElementById("btnSubmit");
const resetButton = document.getElementById("btnReset");

// Add event listener to form submit button
menuForm.addEventListener("submit", createPlannerWindow);

// Add event listener to form reset button to clear form
resetButton.addEventListener("click", () => {
    menuForm.reset();
});

// Define createPlannerWindow function
function createPlannerWindow(e) {
    //Prevent form from submitting
    e.preventDefault();
    //Create variables
    const firstName = document.getElementById("firstName");
    const lastName = document.getElementById("lastName");
    const email = document.getElementById("email");
    const goal = document.getElementById("goal");

    let weekdays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    let menuInputs = document.getElementsByClassName("menuItem");

    //Create an array to store input values
    let menuInputValues = [];

    // Iterate over the input elements and collect their values
    for (let i = 0; i < menuInputs.length; i++) {
        menuInputValues.push(menuInputs[i].value)
    }

    // Create table to display menu inputs
    let plannerTable = document.createElement("table");

    // Create head section of table
    let tHead = plannerTable.createTHead();
    tHead.innerHTML = "<tr><th></th><th>Breakfast</th><th>Snack</th><th>Lunch</th><th>Snack</th><th>Dinner</th></tr>"
    // Create table body section
    let tBody = plannerTable.createTBody();

    // For loop will iterate over weekdays array and menuInputValues array to build table rows and cells from user input 

    for (let row = 0; row < menuInputValues.length; row += 5) {
        let plannerRow = tBody.insertRow();
        let headerColCell = plannerRow.insertCell();
        headerColCell.innerHTML = weekdays[row / 5];

        for (let col = 0; col < 5; col++) {
            let plannerCell = plannerRow.insertCell();
            plannerCell.innerHTML = menuInputValues[row + col];
        }
    }

    //Create myMenuPage variable to build content for new window
    let myMenuPage = `
    <html>
    <head>
    <title>My Planned Menu</title>
    <link rel="stylesheet" href="menu.css">
    </head>
    <body class="output">
    <h1>Weekly Meal Plan for ${firstName.value} ${lastName.value}</h1>
    <h3>Goal for this week: ${goal.value}</h3>
    ${plannerTable.outerHTML}
    <button type="button" id="btnPrint">Print Menu</button>
    <a id="dlink"></a>
    <button type="button" id="btnDownload">Download Menu</button>
    </body></html>`

    // Open new window to display Menu Planner
    let menuWindow = window.open("", "plannedMenu", "width=1150,height=800,top=100,left=100");

    // Write myMenuPage content to new window
    menuWindow.document.write(myMenuPage);

    // Declare variables for new window for print and download functionality
    const printButton = menuWindow.document.getElementById("btnPrint");
    const downloadButton = menuWindow.document.getElementById("btnDownload");


    // Add event listener to form print button to print page
    printButton.addEventListener("click", () => {
        menuWindow.print();
    });

    // Add event listener to download button to download file
    downloadButton.addEventListener("click", () => {
        const dlContent = menuWindow.document.body.outerHTML;

        // Add styles to download content - I tried many different ways
        // with inline styles vs. linking to menu.css stylesheet - 
        //this is the only way I could get the formatting to work
        let styledDlContent = `
        <html>
        <head>
        <title>My Planned Menu</title>
        <style>
        table {
        border-collapse: collapse;
        max-width: 90%;
        margin-bottom: 1em;
        }

        table,
        th,
        td {
        border: 1px solid;
        }

        th,
        td {
        padding: 1rem;
        }

        tr {
        display: grid;
        grid-template-columns: repeat(6, 175px);
        overflow-wrap: break-word;
        }

        button {
        display: none;
        }
        </style>
        </head>
        <body class="output">
        ${dlContent}
        </body>
        </html>
        `
        const dLink = menuWindow.document.getElementById("dlink");
        // Add properties to anchor tag for download
        dLink.download = "myMenu.html";
        dLink.href = 'data:text/html,' + encodeURI(styledDlContent);
        dLink.click();
    });


}