const mysql=require('mysql');
let connection=mysql.createConnection({
    user:'root',
    host:'localhost',
    password:'root',
    port:'3306',
    database:'day9-1705d'
})

connection.connect((error)=>{
    if(error){
        console.log('失败');
    }else{
        console.log('成功');
    }
})
module.exports=connection;