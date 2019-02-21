let dummybase = [];


d3.csv("data/dummyData.csv").then(function (data) {

    for (let i = 0; i < data.length; i++) {
        dummybase.push(data[i]);
    } 
    console.log(dummybase);
    
});



$("#tableMenu a").click(function(e){
    e.preventDefault(); // cancel the link behaviour
    var selText = $(this).text();
    $("#tableButton").text(selText);
    console.log(selText);
    $('table#myTable tr#addition').remove();
    if(selText === "Ballard"){
        $('#myTable tr:last').after('<tr id="addition"><th>Restock Computers</th></tr><tr id="addition"><th>Finish Catalog</th></tr><tr id="addition"><th>Set up NAT</th></tr><tr id="addition"><th>Train new Employees</th></tr>');
    }
    if(selText === "Garfield"){
        $('#myTable tr:last').after('<tr id="addition"><th>Reboot Network</th></tr><tr id="addition"><th>Remove old data</th></tr id="addition"><tr id="addition"><th>Write Scripts</th></tr>');
    }
    if(selText === "Franklin"){
        $('#myTable tr:last').after('<tr id="addition"><th>Fix Laptops</th></tr><tr id="addition"><th>Provide new data</th></tr>');
    }
    if(selText === "Lincoln"){
        $('#myTable tr:last').after('<tr id="addition"><th>Open new servers</th></tr>');
    }
});