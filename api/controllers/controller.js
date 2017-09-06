var models = require('../models/model.js');
//var model = models.account;
module.exports = function (app) {
	//
	app.post('/api/product-list', function (req, res) {
		res.json(	{
				"Result": "OK",
				"Records": [
					{ "ID": 1, "Name": "Benjamin Button", "Total": 17, "RecordDate": "\/Date(1320259705710)\/" },
					{ "ID": 2, "Name": "Douglas Adams", "Total": 42, "RecordDate": "\/Date(1320259705710)\/" },
					{ "ID": 3, "Name": "Isaac Asimov", "Total": 26, "RecordDate": "\/Date(1320259705710)\/" },
					{ "ID": 4, "Name": "Thomas More", "Total": 65, "RecordDate": "\/Date(1320259705710)\/" }
				]
			});
	})
	// login
	app.post('/login/', function (req, res) {
		var data = {
			Username: req.body.Username,
			Password: req.body.Password
		};
		model.find(data, function (err, result) {
			if (err)
				throw err;
			else {
				if (result.length > 0)
					res.json(result);
				else res.json(-1);
			}
		});
	})
}
