



var fs = require('fs');
var url = require('url') ;
var http=require('http');

http.globalAgent.maxSockets = Infinity;


var i=0;





var mapdata=[];



function addGraph(periode,amplitude,rotation,startX,startY){

	if(rotation==false)rotation=Math.random()*31415;

	mapdata.push([periode,amplitude,rotation,startX,startY]);

}


addGraph(5,4,40,1,1);


function getZ(x,y){

	var z=0;

	
	var i=0;
	while(mapdata[i]){


		
		var periode=mapdata[i][0];
		var amplitude=mapdata[i][1];
		var rotation=mapdata[i][2];
		var startX=mapdata[i][3];
		var startY=mapdata[i][4];

		z+=
		 Math.sin((x+startX)*3.14/periode)*amplitude*Math.cos(rotation/180*3.14)
		//+Math.sin((y+startY)*3.14/periode)*amplitude*Math.sin(rotation/180*3.14)
		;

		i++;
	}

	return(z);
		
}

/*function getMap(startX,startY,zoom){

	var map=[];

	for(var y=startY;y<=startY+zoom;y++){
	
		map[startY-zoom]=[];

		for(var x=startX;x<=startX+zoom;x++){

			map[startY-zoom][startX-zoom]=getZ(x,y);

		}
	}
	return(map);

}*/


function renderMap(startX,startY,zoom){

	var html='<table cellpadding="0" cellspacing="0">';


	for(var y=startY;y<=startY+zoom;y++){

		//console.log(y);	

		html+='<tr>';
		for(var x=startX;x<=startX+zoom;x++){

			//console.log(x+','+y);
			var z=getZ(x,y);
			//z=Math.round(z);

			//html+='<td>'+z+'</td>';

			if(z>0)
				html+='<td width="4" height="4" bgcolor="000000"></td>';
			else
				html+='<td width="4" height="4" bgcolor="3366ff"></td>';

		}
		html+='</tr>';
	}


	
	html+='</table>';
	//console.log(html);	

	return(html);
}

//console.log(renderMap(1,1,5));


var server=http.createServer(function(req,res){

	i++;

 	res.writeHead(200);
	res.writeHead({'Content-Type': 'text/html'});


	var q = url.parse(req.url,true).query;
	console.log(q);


	if(!q.zoom)q.zoom=5;

	
	res.end(renderMap(parseInt(q.x),parseInt(q.y),parseInt(q.zoom)));

    res.end('Ahoj tohle je '+i+'. navsteva!<br>' + req.url);
	console.log('muhaha from '+req.connection.remoteAddress);


	



});

server.on('listening',function(){
    console.log('ok, server is running');
});

server.listen(80);


