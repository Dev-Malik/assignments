## Counter without setInterval
function mySetInterval(){
    for(let i = 1;i<=10;i++){
        setTimeout(function (){
            console.log(i);
        },i*1000);
    }
}
mySetInterval();
Without using setInterval, try to code a counter in Javascript. There is a hint at the bottom of the file if you get stuck.








































































(Hint: setTimeout)