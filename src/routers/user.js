const express = require ('express')
const User = require('../models/user')
const auth = require('../middleware/auth')
const router = new express.Router()
const multer =  require('multer')
const sharp = require('sharp')


router.post('/users', async (req, res)=>{

    const user_email_temp = await User.findOne({email:req.body.email})
    if(user_email_temp){
        return res.status(400).send('User already exists')
    }
    const user_temp = new User(req.body);
    try{
        await user_temp.save()
        const token = await user_temp.generateAuthToken()

        res.send({user_temp , token})
    }catch(e){
        res.status(400).send(e)
    }
})

const upload = multer({
    limits:{
        fileSize: 1000000
    },
    fileFilter(req, file , cb){
        // if(!file.originalname.endsWith('.jpg')||!file.originalname.endsWith('.jpeg')||!file.originalname.endsWith('.png')){
        //     return cb(new Error('Please upload a JPEG/JPG/PNG'))
        // }

        cb(undefined,true)
    }
})
router.post('/users/me/avatar', auth ,upload.single('avatar'), async (req,res) =>{
    
    const buffer = await sharp(req.file.buffer).resize({width:250, height:250}).png().toBuffer()
    req.user.avatar = buffer

    await req.user.save();
    res.status(200).send();
},(error,req,res,next)=>{
    res.status(400).send({error:error.message})
})


router.delete('/users/me/avatar', auth , async (req,res) =>{

    try{
        req.user.avatar=undefined;
        await req.user.save()
        res.send()
    }catch(e){
        res.status(500).send()   
    }
     
})

router.get('/users/me', auth, async (req, res) => {

    res.send(req.user)   
})

router.get('/users/:id/avatar'  , async(req, res) =>{
    try{
        const user = await User.findById(req.params.id)
        
        if(!user){
            throw new Error();
        }

        res.set('Content-Type', 'image/png')
       res.send(user.avatar)
    }catch(e){
        res.status(404).send()
    }
})

router.patch('/users/me', auth, async (req,res) =>{
    
    const updates = Object.keys(req.body)
    try{
        updates.forEach(update => {
            req.user[update] = req.body[update]
        });
        await req.user.save()
        
        res.send(req.user)
    }catch(err){
        res.status(500).send(err)
    }
})

router.delete('/users/me', auth ,async (req,res) =>{
    try{
        await req.user.remove();
        res.send(req.user)  
    }catch(err){
        res.status(500).send(err)
    }
})

router.post('/users/login', async (req, res) =>{

    try{
        const user = await User.findByCredentials(req.body.email, req.body.password)
        const token = await user.generateAuthToken()
        res.send({user,token})
    }catch(err){
        res.status(400).send({error:'Error in Logging in'})
    }
})

router.post('/users/logout',auth , async (req,res) =>{
    try{
        req.user.tokens = req.user.tokens.filter((token)=>{
            return token.token !== req.token
        })

        await req.user.save();
        res.send()
    }catch(e){
        res.status(500).send()
    }
})

router.post('/users/logoutAll', auth , async (req, res) =>{

    try{
        req.user.tokens=[]
        await req.user.save();

        res.send('Log out Successfull')
    }catch(e){
        res.status(500).send();
    }
})

module.exports=router

