let dummybase = [];


d3.csv("data/dummyData.csv").then(function (data) {

    for (let i = 0; i < data.length; i++) {
        dummybase.push(data[i]);
    } 
    console.log(dummybase);
    
});