const literal = '안녕 하세요 반갑 습니다'

const litArr = literal.split(' ')

let result = ''

for(let i = 2 ; i<litArr.length ; i++){
    result += litArr[i]+' '
}

console.log(result)