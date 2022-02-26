const express = require ('express')
const Task = require('../models/task')
const auth = require('../middleware/auth')
const router = new express.Router()

router.post('/tasks', auth,(req, res) => {

    const task_temp = new Task({
        ...req.body,
        owner: req.user._id
    })

    task_temp.save().then((result) =>{
        res.send(result)
    }).catch((err) =>{
        res.status(400).send(err)
    })
})

router.get('/tasks',auth, async (req,res) => {
    try{
        if(req.query.completed){
            if(req.query.completed === 'true'){
    
                const tasks = await Task.find({owner:req.user.id, completed:true})
                if(!tasks){
                    return res.status(404).send()
                }
                res.send(tasks)
            }else{
                const tasks = await Task.find({owner:req.user.id, completed:false})
                if(!tasks){
                    return res.status(404).send()
                }
                res.send(tasks)
            }
        }else{
            const tasks = await Task.find({owner:req.user.id})
                if(!tasks){
                    return res.status(404).send()
                }
                res.send(tasks)
        }
    }catch(e){
        res.status(500).send();
    }
    

})

router.get('/tasks/:id',auth, (req,res) => {
    const _id = req.params.id

    Task.findOne({_id,owner:req.user.id}).then((task) =>{
        if(!task){
            return res.status(404).send('Task Not Found')
        }
        res.send(task)
    }).catch((err) => {
        res.send(err)
    })
})

router.patch('/tasks/:id', auth, async (req,res)=>{

    const reqKeys = Object.keys(req.body)
    const allowed =['description','completed']
    const unknownKeys_array=[]
    const unknownKeys = reqKeys.forEach((eachKey) =>{
        if(!allowed.includes(eachKey)){
            unknownKeys_array.push(eachKey)
        }
    })

    if(unknownKeys_array.length!==0){
        return res.send({error : 'Invalid Keys'})
    }

    try{

        const task = await Task.findOne({_id:req.params.id,owner:req.user.id})
        
        if(!task){
            return res.status(404).send({error:'Task not found'})
        }

        reqKeys.forEach((eachkey) => {
            task[eachkey]=req.body[eachkey]
        })

        await task.save();
        //const task = await Task.findByIdAndUpdate(req.params.id, req.body, {new:true,runValidators:true})
        
        res.send(task)
    }catch(err){
        res.send(err)
    }
})

router.delete('/tasks/:id', auth,async (req,res) =>{
    try{
        const task = await Task.findOneAndDelete({_id:req.params.id,owner:req.user.id})
        if(!task){
            return res.status(404).send({error:'Task not found'})
        }
        res.send(task)
    }catch(err){
        res.status(500).send(err)
    }
})

module.exports=router