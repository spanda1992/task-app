// CRUD Operation for MongoDB

const mongodb = require('mongodb')
const mongoClient = mongodb.MongoClient

const connectionURL = 'mongodb://127.0.0.1:27017'
const databaseName = 'task-manager'

mongoClient.connect(connectionURL , { useNewUrlParser : true} , (error,client) => {
    if(error){
        return console.log('Unable to connect to database !!')
    }else{
        console.log('Connected successfully')

        const db = client.db(databaseName)
        
        // db.collection('users').insertOne({
        //     name: 'Sid',
        //     age : 30
        // } , (error , result) =>{
        //     if(error){
        //         return console.log('Unable to insert user')
        //     }

        //     console.log(result)
        // })

        // db.collection('users').insertMany([
        //     {
        //         name:'Vanu',
        //         age:31
        //     },
        //     {
        //         name :'Daya',
        //         age:21
        //     }
        // ], (error , result) =>{
        //     if(error){
        //         return console.log('Unable to insert records')
        //     }

        //     console.log(result)
        // })



        // db.collection('tasks').insertMany([
        //     {
        //         description :'task 1',
        //         completed : true
        //     },
        //     {
        //         description :'task 2',
        //         completed : false
        //     },
        //     {
        //         description :'task 3',
        //         completed : false
        //     }
        // ], (error , result) =>{

        //     if(error){
        //         return console.log('Error in inserting records')
        //     }

        //     console.log(result)
        // })

        // db.collection('users').findOne({ name : 'Sid' }, (error, user) => {
        //     if(error){
        //         return console.log('Unable to fetch record')
        //     }

        //     console.log(user)
        // })

        // db.collection('users').findOne({ _id : new mongodb.ObjectId("62121a781adc7cd3e8ea90e9") }, (error, user) => {
        //     if(error){
        //         return console.log('Unable to fetch record')
        //     }

        //     console.log(user)
        // })

        // db.collection('tasks').find({completed : false}).toArray((error , tasks) =>{
        //     if (error) {
        //         return console.log('Unable to fetch record')
        //     }

        //     console.log(tasks)
        // })

        // db.collection('tasks').find({completed : false}).count((error , count) =>{
        //     if (error) {
        //         return console.log('Unable to fetch record')
        //     }

        //     console.log(count)
        // })


        // db.collection('users').updateOne({

        //     _id : new mongodb.ObjectId("621218db39933737cb46bc92")
        // }, {

        //     $set: {
        //         name : 'Vishnu'
        //     },

        //     $inc:{
        //         age : 1
        //     }

        //     // $rename: {
        //     //     Age : 'age'
        //     // }
        // }).then((result) =>{
        //     console.log(result)
        //     console.log('Sid')
        // }).catch((error) =>{
        //     console.log(error)
        // })


        // db.collection('tasks').updateMany({

        //     completed :false
        // },{
        //     $set: {
        //         completed:true
        //     }
        // }).then((result) =>{
        //     console.log(result)
        // }).catch((error) =>{
        //     console.log(error)
        // })

        // db.collection('users').deleteMany({
        //     age : 30
        // }).then((res) => {
        //     console.log(res)
        // }).catch((err) => {
        //     console.log(err)
        // })

    } // connection successfull block
})