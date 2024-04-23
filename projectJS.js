// Name: Jennifer Morrison
// Class: Web115.0004
// Date: April 16, 2024
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

    for (let row = 0; row < menuInputValues.length; row += 5) {
        let plannerRow = tBody.insertRow();
        let headerColCell = plannerRow.insertCell();
        headerColCell.innerHTML = weekdays[row / 5];

        for (let col = 0; col < 5; col++) {
            let plannerCell = plannerRow.insertCell();
            plannerCell.innerHTML = menuInputValues[row + col];
        }
    }

    let myMenuPage = `
<html><head><title>My Planned Menu</title>
<link rel="stylesheet" href="menu.css">

</head>
<body class="output">
<h1>Weekly Meal Plan for ${firstName.value} ${lastName.value}</h1>
${plannerTable.outerHTML}
<button type="button" id="btnPrint">Print Menu</button>
<button type="button" id="btnDownload">Download Menu</button>
</body></html>`

    // Open new window to display Menu Planner
    let menuWindow = window.open("", "plannedMenu", "width=1100,height=800,top=100,left=100");

    menuWindow.document.write(myMenuPage);

    const printButton = menuWindow.document.getElementById("btnPrint");

    // Add event listener to form print button to print page
    printButton.addEventListener("click", () => {
        window.print();
    });

}

// body {
// font-family: Arial;
// font-size: 16px;
// }
// 
// h1{
// font-size: 32px;
// }
// thead tr, tbody tr {
//     display: grid;
//     grid-template-columns: repeat(6, 1fr);
//     border-collapse: collapse;
// }
// table,
// th,
// td {
//     border: 1px solid;
// }
// th,
// td {
//     height: 2.2rem;
//     padding: 1rem;
// }
// tbody th {
//     text-align-last: left;
// }
// thead {
//     text-align: center;
// }
// </style>
// plannerTable.classList.add("output");