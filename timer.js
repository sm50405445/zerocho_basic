// const timeout = setTimeout(()=>{
//     console.log('1.5초후 실행')
// },1500)

// const interval = setInterval(()=>{
//     console.log('1초마다 실행')
// },1000)

// const timeout2 = setTimeout(()=>{
//     console.log('실행되지 않습니다')
// },3000)

// setTimeout(()=>{
//     clearTimeout(timeout2)
//     clearInterval(interval)
// },2500)
function parse(str) {
    var y = str.substr(0, 4);
    var m = str.substr(4, 2);
    var d = str.substr(6, 2);
    return new Date(y,m-1,d);
}
const date = parse('20191118')

console.log(date)