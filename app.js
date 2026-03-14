const http = require('http');
const fs = require('fs');
const port = 3000;

const serve = http.createServer((req, res) => {
  res.writeHead(200, {'Content-Type': 'text/html'});
  fs.readFile("index.html", function(error,data){
    if(error){
        res.writeHead(404);
        res.write("Error file not found");
    }
    else{
        res.write(data);
    }
    res.end();
  });
});

serve.listen(port,function(error){
  if(error){
    console.error("Something went wrong",error);
  }
  else{
    console.log("Server running at http://localhost:" + port);
  }
});