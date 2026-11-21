import{mkdirSync,readdirSync,readFileSync,writeFileSync}from'node:fs'
const{MAKEFUN_INPUT_DIR:I='/input',MAKEFUN_OUTPUT_DIR:O='/output'}=process.env
let w,n,W,F,G,B,P,V,A,C,S,J,T=0,E
function p(t){w=t.indexOf('\n');n=t.length;F=[-w-1,w+1,-1,1];W=Uint8Array.from(t,c=>c=='#'||c=='\n');G=[...t.matchAll(/[.*+]/g)].map(m=>m.index);B=[...t.matchAll(/[$*]/g)].map(m=>m.index);P=t.search(/[@+]/);A=new Int32Array(n);C=new Int32Array(n);S=new Int32Array(n);J=new Uint8Array(n)}
function R(f,o,a,k){let s=++T,y=[f],L=f;a[f]=s;if(k)S[f]=-1
for(let i=0;i<y.length;i++){let c=y[i];if(c<L)L=c
for(let j=0;j<4;j++){let u=c+F[j];if(!W[u]&&!o[u]&&a[u]!=s){a[u]=s;if(k)S[u]=c;y.push(u)}}}
return L}
function L(){V=new Uint8Array(n);let q=[...G];for(let g of G)V[g]=1
for(let i=0;i<q.length;i++)for(let j=0;j<4;j++){let d=F[j],y=q[i]-d;if(!W[y]&&!W[y-d]&&!V[y]){V[y]=1;q.push(y)}}}
function s(b,p){if(b.some(x=>!V[x]))return null;let Q=[[b,p,'']],D={}
for(let x of b)J[x]=1
D[b+','+R(p,J,A,1)]=1
for(let x of b)J[x]=0
for(let h=0;h<Q.length;h++){let[b,p,m]=Q[h]
for(let x of b)J[x]=1
R(p,J,A,1);let Y=T
for(let i=0;i<b.length;i++){let x=b[i]
for(let j=0;j<4;j++){let d=F[j],u=x+d
if(W[u]||J[u]||!V[u]||A[x-d]!=Y)continue
J[x]=0;J[u]=1
let q=b.slice();q[i]=u;q.sort((a,b)=>a-b)
let K=q+','+R(x,J,C,0)
J[u]=0;J[x]=1
if(D[K])continue
let v='';for(let c=x-d;c!=p;c=S[c])v='udlr'[F.indexOf(c-S[c])]+v
let N=m+v+'UDLR'[j]
if(q.every(y=>G.includes(y))){E=x;return N}
if(Q.length>25e4)return null
D[K]=1;Q.push([q,x,N])}}
for(let x of b)J[x]=0}
return null}
function z(){let o={},a=[]
for(let b of B){let k=((b%(w+1))/7|0)*2+((b/(w+1)|0)>8);(o[k]=o[k]||{B:[],G:[]}).B.push(b)}
for(let g of G){let k=((g%(w+1))/7|0)*2+((g/(w+1)|0)>8);(o[k]=o[k]||{B:[],G:[]}).G.push(g)}
a=Object.values(o)
if(a.some(e=>e.B.length-e.G.length))return'';let e=''
for(let r of a){J.fill(0);for(let u of a)if(u!=r)for(let b of u.d?u.G:u.B)J[b]=1;G=r.G;L();let m=s(r.B,P);if(m==null)return'';e+=m;P=E;r.d=1}
return e}
for(const d of readdirSync(I)){p(readFileSync(I+'/'+d+'/level.txt','utf8'));let a=z(),o=O+'/'+d;mkdirSync(o,{recursive:!0});writeFileSync(o+'/solution.txt',a+'\n')}
