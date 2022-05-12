d3.csv("https://takachiyo.github.io/InfoVis2022/W08/resource.csv", function(error, data){
    // エラー処理
    if(error != null){
      return;
    }  
    // 通常処理（dataを使用してグラフを描画）
    console.log(data);

  });