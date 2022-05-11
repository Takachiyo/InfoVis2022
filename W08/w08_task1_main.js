d3.csv("https://takachiyo.github.io/InfoVis2022/W04/csv_pop_estimate_2045.csv",function(error, data){
    for(var i=0; i<data.length; i++){    // データを配列に全て格納
        list.push(data[i].value);
    }    
    console.log(list);
    })
    .catch( error => {
        console.log( error );
    });

