//Servidor Express
const express = require('express');
const app = express();
const port = 49000;
//DOTENV Funcionallidades para trabajo de variables de entorno
require("dotenv").config();
//CORS
const cors = require('cors');
//Para conectarse con la BD
const mongoose =require('mongoose');
const config =require('./config/config');
//script para realizar el agarre de datos de las clases instanciad anterior mente
mongoose.Promise=global.Promise;
mongoose.connect(config.uri, (err) =>{
	if(err)
	{
		console.log("Imposible conectar a la bd "+ err)	
	}else{
		console.log("Conectado a la base db"+config.bd)
		console.log("EXITOSOOO")
	}

});
app.use(cors());
//Para trabajar con datos con formato JSON
app.use(express.json());

/*app.get('/',(req,res) =>{
	res.send("HOLA MUNDO!!!");
})*/
//Modelo de Datos(Friends)
const FriendModel =require('./models/Friends');

//Para poder el serviodor en modo escucha
app.listen(process.env.PORT || port,() => {
	console.log("Conectado Correctamente...");

});

//App Routes
//Recibir datos del frontend almacenarlos en el modelo de datos y guardar en la bd (method post)

app.post('/addFriend', async (req,res) =>{
	const name =req.body.name;
	const age=req.body.age;
	const description=req.body.description;
	const friend = new FriendModel({name:name,age:age,description:description});
	try
	{
	 	await friend.save();
	 	res.send(friend);
	}
	catch(err)
	{
		console.log(err);
	}
});

////////////vamos en update pagina 26

//Actualizar datos,recibidos del frontend(method put)
app.put('/update',async (req,res) => {
	const newAge = req.body.newAge;
	const newDescription = req.body.newDescription;
	const id=req.body.id;
	try
	{
		await FriendModel.findById(id,(error,friendToUpdate) =>{
			friendToUpdate.age=Number(newAge);
			friendToUpdate.description=newDescription;
			friendToUpdate.save();
		});
	}catch(err)
	{
		console.log(err);
	}
	res.send("Registro Actualizado!! =D")
});
//Enviar datos al fronted haciendo una consulta al modelo de datos (method get)
app.get('/read',async(req,res)=>{
	FriendModel.find({},(err,result)=>{
		if (err) 
		{
			res.send(err);
		}
		else
		{
			res.send(result);
		}
	});
});

//Borrar datos, se le encia el id como parametro (method delete )

app.delete('/delete/:id', async(req,res)=>{
	const id=req.params.id;
	await FriendModel.findByIdAndRemove(id).exec();
	res.send("Registro Borrado!! =(");
});
app.get('/',(req,res)=> {
	res.send("Hola FrontEnd. soy Express Server y estoy listo para tus peticiones...!");

});


