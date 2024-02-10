

// initialize the counter and the array
var numbernames=0;
var names = new Array();

function SortNames() {
    // Get the name from the text field
    thename=document.theform.newname.value;
    thename= thename.toUpperCase();
    // Add the name to the array
    names[numbernames]= thename;
    // Increment the counter
    numbernames++;
    // Sort the array
    names.sort();
    // Add the numbers to it
    var sortedWNums = names.map(function(name, index) {
        return (index + 1) + ". " + name;
    });
    
    document.theform.sorted.value=sortedWNums.join("\n");
    document.getElementById("newname").value = "";
}

document.getElementById("newname").addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        SortNames();
        event.preventDefault();
    }
});
