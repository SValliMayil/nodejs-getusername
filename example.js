const ht=require('http');
const fs=require('fs');


const ser=ht.createServer((req,res)=>
{
   const url=req.url;
   const me=req.method;
   if(url==='/')
   {
    res.setHeader('Content-type','text/html');
   res.write('<html>');
   res.write('<head><title>USER INFORMATION</title></head>');
   res.write('<body>');
   res.write('<form action="/mes" method="POST"> <input type="text" name="m" ><input type="submit" value="send"> </form>');
   res.write('</body>');
   res.write('</html>');
   return res.end();
   }
   if(url==='/mes' && me=='POST')
   {
    const body=[];
    req.on('data',(chunck)=>{
       
        body.push(chunck);
    })
    req.on('end',()=>{
        const parsedbody=Buffer.concat(body).toString();
        const messgae=parsedbody.split('=');
        fs.writeFileSync("hi.txt",messgae[1]);
        console.log(messgae[1]);
      
    });
    fs.writeFileSync('hello.txt','DUMMY');
     res.setHeader('Location','/');
    res.statusCode=302;
    return res.end();
   }
   res.setHeader('Content-type','text/html');
   res.write('<html>');
   res.write('<head><title>LOCL</title></head>');
   res.write('<body>');
   res.write('THANK YOU');
   res.write('</body>');
   res.write('</html>');
   res.end();
});
ser.listen(8000,()=>console.log("listening to port 8000"));