var request = require('request');
var argv = require('optimist')
.usage('Usage: $0 -u [url] -j [job name] -a [action] -w [delay] -p [priority] -n [attempts] -d -i [id] ')
.demand(['u','j'])
.default('a','POST')
.default('w',0)
.default('p','high')
.default('n',1)
.boolean('d')
.default('d',false)
.argv;

var data = "";
var uri = argv.u;

if(['POST','DELETE'].indexOf(argv.a) < 0) {
	console.log('Invalid action');
	process.exit(1);
}

if(argv.a == 'DELETE' && !argv.i) {
	console.log('Must specify job id to delete');
	process.exit(1);
}

var doJobRequest = function() {
	var dataJSON = {};
	
	if(data != "") {
		try {
			JSON.parse(data);
		} catch(err) {
			console.log('Data cannot be parsed as json:', err);
			process.exit(1);
		}
	}
	
	if(argv.a == 'POST') {
		var options = {
		  uri: uri,
		  method: 'POST',
		  json: {
			type: argv.j,
			data: dataJSON,
			options: {
				attempts: argv.n,
				priority: argv.p,
				delay: argv.w
			}
		  }
		};
		
		request.post(options,function (error, response, body) {
			if (!error && response.statusCode == 200) {
				console.log(response && response.statusCode, body);
				process.exit(0);
			} else {
				console.log(response && response.statusCode, error);
				process.exit(1);
			}
		});
	} else if(argv.a == 'DELETE') {
		request.del(uri,function(err, response) {
			if (!error && response.statusCode == 200) {
				console.log(response && response.statusCode);
				process.exit(0);
			} else {
				console.log(response && response.statusCode, error);
				process.exit(1);
			}
		});
	}
};

if(argv.d && argv.a == 'POST') {

	process.stdin.on('readable', function() {
	  var chunk = process.stdin.read();
	  if (chunk !== null) {
		data += chunk;
	  }
	});

	process.stdin.on('end', function() {
		doJobRequest();
	});
} else {
	doJobRequest();
}