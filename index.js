const Koa=require('koa');
const app=new Koa();
const static=require('koa-static');
const router=require('koa-router')();
// 处理post请求传递的参数
const bodyparser=require('koa-bodyparser');
const path=require('path');
const query=require('./db/query')
// console.log(process.cwd(),'--------------process.cwd()');
// \Users\dell\Desktop\day9

// 拼接静态路径
let staticPath=path.join(process.cwd(),'public')
// 读取静态资源
app.use(static(staticPath))


// 静态资源和接口
app.use(bodyparser())
app.use(router.routes());
app.use(router.allowedMethods());

// 检查
router.get('/api/list',async ctx=>{
let data=await query('select * from userlist');
ctx.body=data;
})
// 增加
router.post('/api/add',async ctx=>{
    let {username,password,xh}=ctx.request.body;
    let time=new Date()
if(username&&password&&xh&&time){
    let data=await query('insert into userlist(username,password,xh,time) values(?,?)',[username,password,xh,time])
    ctx.body=data;
}else{
    ctx.body={
        code:2,
        msg:'参数缺失'
    }
}
})
// 删除
router.get('/api/del',async ctx=>{
   let {id}=ctx.query;
   if(id||id===0){
        try{
            await query('delete from userlist where id=?',[id])
            ctx.body={
                code:1,
                msg:'删除成功'
            }
        }catch(e){
            ctx.body={
                code:0,
                msg:e.error
            }
        }
   }else{
    ctx.body={
        code:2,
        msg:'参数缺失'
    }
   }
    })
// 改
    router.post('/api/edit',async ctx=>{
        let {id,username,password,xh,time}=ctx.request.body;
        if(username&&password&&xh&&time){
            await query('update userlist set username=?,password=?,xh=?,time=? where id=?',[username,password,xh,time,id])
            ctx.body={
                code:0,
                msg:'修改成功'
            };
        }else{
            ctx.body={
                code:2,
                msg:'参数缺失'
            }
        }
         })
     

    
// console.log(process.env.PORT);
// 终端更改端口号用到process.env.PORT
app.listen(process.env.PORT||8081,()=>{
    console.log('启动成功');
    
})