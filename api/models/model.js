var mongoose = require('mongoose');
var Schema = mongoose.Schema;

/*var employeeSchema = new Schema({
	empl: String,
	emplRcd: String,
	name: String,
	childDepartment: String,
	officerCode: String,
	jobTitle: String,
	mail: String
}, { collection: 'employee' });



var employee = mongoose.model("employee", employeeSchema);
module.exports = employee;
*/
var accountSchema = new Schema({
	EmplID: Number,
	Username: String,
	Password: String
}, { collection: 'account' });
// var productSchema = new Schema({
// 	emplID: Number,
// 	poNumber:Number,
// 	type:String,
// 	Warehouse : String,
// 	customerInfo : String,
// 	product:{
// 		stt: Number,
// 		pnNumber : String,
// 		frequency :Number,
// 		unitPrice : String,
// 		price:String,
// 		NCCDN:String,
// 		CQ_CO:Boolean,
// 		note :String
// 	},
// 	files: {fileName:String}

// })
var Account = mongoose.model("employee", accountSchema);
// var oject = {
// 	account : account,
// 	product : product
// }
module.exports = Account;
