var io = require('socket.io').listen(30030);
var Converter = require('csvtojson').Converter;
var fs = require('fs');

var csvConverter = new Converter();

csvConverter.on('end_parsed', function(jsonObj){
     io.sockets.on('connection', function(socket){
         console.log('Connected.., sending initial data...');
         socket.send(jsonObj[0]);
         var i = 0;
         setInterval(function(){
             console.log('Sending update data to client to update pie ... ');
                if(++i < jsonObj.length){
                    console.log(jsonObj[i]);
                    //console.log('Server got message: ', message);
                    socket.emit('pageview', jsonObj[i]);
                }else{
                    i = 0;
                    console.log(jsonObj[i]);
                    //console.log('Server got message: ', message);
                    socket.emit('pageview', jsonObj[i]);
                }

        }, 10000);
     });
    console.log('Server starts on ' + (new Date()));
});

fs.createReadStream('c:/Users/liuzhen/WebstormProjects/mysever/public/data/hbmcc.inst1.combined.short.csv').pipe(csvConverter);


