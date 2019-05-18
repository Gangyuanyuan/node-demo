var http = require('http')
var fs = require('fs')
var url = require('url')
var port = process.env.PORT || 8888;

var server = http.createServer(function(request, response){
  var temp = url.parse(request.url, true)
  var path = temp.pathname
  var query = temp.query
  var method = request.method

  /******** 从这里开始看，上面不要看 ************/
  

  if(path === '/'){ // 如果用户请求的是 / 路径
    var string = fs.readFileSync('./index.html', 'utf8') // 读取
    var amount = fs.readFileSync('./db', 'utf8') // 100
    string = string.replace('&&&amount&&&', amount) // 替换内容
    response.setHeader('Content-Type', 'text/html; charset=utf-8')
    response.write(string)
    response.end()
  }else if(path === '/style.css'){
    var string = fs.readFileSync('./style.css', 'utf8')
    response.setHeader('Content-Type', 'text/css')
    response.write(string)
    response.end()
  }else if(path === '/main.js'){
    var string = fs.readFileSync('./main.js', 'utf8')
    response.setHeader('Content-Type', 'application/javascript')
    response.write(string)
    response.end()
  }else if(path === '/pay'){ // 用户付款
    var amount = fs.readFileSync('./db', 'utf8') // 100
    var newAmount = amount - 1 // 类型从 string 转为 number
      fs.writeFileSync('./db', newAmount) // 写入
      response.setHeader('Content-Type', 'application/javascript')
      response.statusCode = 200
      response.write(`
        alert("success")
        amount.innerText = amount.innerText - 1 // 局部刷新：在服务器的js里改内容，通过write传到浏览器
      `)
      response.end()
  }else{
    response.statusCode = 404
    response.setHeader('Content-Type', 'text/html; charset=utf-8')
    response.write('找不到对应的路径，你需要自行修改 server.js')
    response.end()
  }
  

  /******** 代码结束，下面不要看 ************/
})

server.listen(port)
console.log('监听 ' + port + ' 成功\n请在空中转体720度然后用电饭煲打开 http://localhost:' + port)


