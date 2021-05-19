async function async1(){
  console.log("async1 start"); 
  await async2();
  console.log("async1 end");
}
setTimeout(()=> {
  console.log("timeout");
},0)
setTimeout(()=>{console.log("timeout3")},3);
async function async2(){
  setTimeout(()=>{console.log("async2 timeout")}, 9);
}
console.log("start");
async1();
new Promise((resolve, reject)=>{
  console.log("promise start");
  resolve();
  console.log("promise end");
}).then(()=>{
  console.log("promise then");
})
console.log("end");

// start
// async1 start
// promise start
// promise end
// end
// async1 end
// promise then
// timeout 
// timeout3
// async2 timeout