## File cleaner
Read a file, remove all the extra spaces and write it back to the same file.

For example, if the file input was
```
hello     world    my    name   is       raman
```

After the program runs, the output should be

```
hello world my name is raman
```

var fs = require("fs");
var data = fs.readFileSync("input.txt", "utf8",function(err,data){
    console.log(data);
});
function removeWhitespace(s){
    return s.trim();
}
const finalDat = removeWhitespace(data);
fs.writeFile("input.txt",finalDat,"utf8",function(err,data){
    if(err){
        console.log(err);
    }
    else{
        console.log("data updated);
    }
})
