const path = require('path');
const express = require('express');

const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast')


const app = express();
const port = process.env.PORT || 3000

// Define paths for Express config
const directoryPath =  path.join(__dirname, '../public');

const viewsPath= path.join(__dirname,'../templates/views');

const partialsPath = path.join(__dirname,'../templates/partials');


// Setup handlebars engine and views location.
app.set('views',viewsPath);
app.set('view engine','hbs');
hbs.registerPartials(partialsPath);
// Setup static directory to serve
app.use(express.static(directoryPath));


app.get('/',(req,res) => {
    res.render('index',{
        title:'Weather Application',
        name: 'Oladele Omoarukhe'

    }); 
});

app.get('/about',(req,res) =>{
    res.render('about',{
        title:'About me',
        name:'Oladele Omoarukhe'
    });
})

app.get('/help',(req,res)=>{
    res.render('help',{
        title:'help',
        name: 'Oladele Omoarukhe',
        message:'This page is designed to cater to all your burning questions'
    })
});




app.get('/weather', (req, res) => {

    if(!req.query.address){
        return res.send({
            error:'you must provide an address'
        })
    }

    geocode(req.query.address,(error,{latitude,longitude,location} = {})=>{
        if(error){
            return res.send({error})
        }

        forecast(latitude,longitude,(error,forecastData)=>{
            if(error){
                return res.send({error})
            }
            res.send({
                forecast:forecastData,
                location,
                address:req.query.address
            })
        })
    });
  
})

app.get('/help/*',(req,res) =>{
    res.render('error.hbs',{
        title:'404 help',
        name:'Oladele Omoarukhe',
        errorMessage: 'help article not found' 
     })
})



// handler designed to cater for errors.
app.get('*',(req,res) =>{
    res.render('error.hbs',{
       title:'404',
       name:'Oladele Omoarukhe',
       errorMessage: 'Page not found' 
    })
})
app.listen(port, () => {
    console.log("Server is up on port 3000");
});