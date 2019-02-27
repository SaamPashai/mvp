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
        $('#myTable tr:last').after(`<tr id="addition"><th><input type="checkbox" name="t1" value="ball" id="b1"> ${dummybase[0].Task1}</th></tr><tr id="addition"><th><input type="checkbox" name="t1" value="ball" id="b2"> ${dummybase[0].Task2}</th></tr><tr id="addition"><th><input type="checkbox" name="t1" value="ball"> ${dummybase[0].Task3}</th></tr><tr id="addition"><th><input type="checkbox" name="t1" value="ball" id="b3"> ${dummybase[0].Task4}</th></tr>`);
    }
    if(selText === "Garfield"){
        $('#myTable tr:last').after(`<tr id="addition"><th><input type="checkbox" name="t1" value="ball"> ${dummybase[1].Task1}</th></tr><tr id="addition"><th><input type="checkbox" name="t1" value="ball"> ${dummybase[1].Task2}</th></tr id="addition"><tr id="addition"><th><input type="checkbox" name="t1" value="ball"> ${dummybase[1].Task3}</th></tr>`);
    }
    if(selText === "Franklin"){
        $('#myTable tr:last').after(`<tr id="addition"><th><input type="checkbox" name="t1" value="ball"> ${dummybase[2].Task1}</th></tr><tr id="addition"><th><input type="checkbox" name="t1" value="ball"> ${dummybase[2].Task2}</th></tr>`);
    }
    if(selText === "Lincoln"){
        $('#myTable tr:last').after(`<tr id="addition"><th><input type="checkbox" name="t1" value="ball"> ${dummybase[3].Task1}</th></tr>`);
    }
});