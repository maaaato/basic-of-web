const fs = require('fs');

fs.readFile(__dirname+'/data.txt','utf8',(err,data)=>{
    if(err){
        console.error(err);
        return;
    }
    console.log(data.toString('utf8'));
});
console.log('プログラムはファイル読み込みで止まらず、先に進みます');