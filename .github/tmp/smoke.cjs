const {chromium}=require('playwright');const http=require('http'),fs=require('fs'),path=require('path');
const T={'.html':'text/html','.js':'text/javascript','.css':'text/css','.glb':'model/gltf-binary','.png':'image/png','.jpg':'image/jpeg','.svg':'image/svg+xml','.woff':'font/woff'};
const srv=http.createServer((q,s)=>{let p=path.join('dist',q.url.split('?')[0]);if(fs.existsSync(p)&&fs.statSync(p).isDirectory())p=path.join(p,'index.html');let c=200;if(!fs.existsSync(p)){p='dist/404.html';c=404}s.writeHead(c,{'content-type':T[path.extname(p)]||'application/octet-stream'});fs.createReadStream(p).pipe(s)}).listen(8125);
(async()=>{const b=await chromium.launch();
for(const u of ['/','/media/','/nope']){const p=await b.newPage({viewport:{width:1280,height:800}});const e=[];p.on('console',m=>{if(m.type()==='error'&&!/404/.test(m.text()))e.push(m.text().slice(0,300))});p.on('pageerror',x=>e.push(x.message.slice(0,300)));await p.goto('http://localhost:8125'+u);await p.waitForSelector('[data-ready=true]',{timeout:20000}).catch(()=>e.push('3d not ready'));
console.log(u,'title:',await p.title(),'errors:',e);if(e.length)global.bad=1;console.log(' classes:',await p.evaluate(()=>document.querySelector('h1 span:last-child')?.className));
await p.close();const c=await b.newContext({javaScriptEnabled:false});const q=await c.newPage();await q.goto('http://localhost:8125'+u);console.log(' no-JS h1:',await q.locator('h1').innerText().catch(()=>'NONE'),'| sections:',await q.locator('section').count());await c.close()}
await b.close();srv.close();process.exit(global.bad?1:0)})();
