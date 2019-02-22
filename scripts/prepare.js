// prepare raw data

/*jslint browser: true*/
/*global require,console*/

function countData(db) {
	'use strict';

	var count = 0;

	db.createKeyStream()
		.on('data', function () {
			++count;
		})
		.on('end', function () {
			console.log('number of entries: ', count);
		});
}

function getSample(db) {
	'use strict';

	var done = false;

	db.createValueStream()
		.on('data', function (data) {
			if (!done) {
				console.log('');
				console.log('first dataset:');
				console.log(data);
				done = true;
			}
		});
}

function logData(data) {
	'use strict';

	var targetTime = new Date('2019-02-15T10:00:00.000+01:00');

//	console.log(data);
//	console.log(data.when);
//	console.log(data.delay);
	return false;
}

function parse(path) {
	'use strict';

	console.log('load database...');

	var level = require('level'),
		db = level(path + 'vbb-delays.ldb', {valueEncoding: 'json'});

	console.log('analyse database...');

	countData(db);
	getSample(db);

	db.createValueStream()
		.on('data', logData);
}

parse('source-data/');
