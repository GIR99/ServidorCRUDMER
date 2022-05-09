const crypto =require('crypto').randomBytes(256).toString('hex');

module.exports={
	uri: "mongodb://root:admin@127.0.0.1:27017/food?authSource=admin",
	secret:crypto,
	db:"food"
}