const request = require('request');

const geocode = (address,callback)=>{
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1Ijoib2xhZGVsZSIsImEiOiJjanlvaHNxZTExMWZ1M2NydDhkaGJ0cXVmIn0.R8gfn3KwTuRihH-MqoYf9A'
    request({
        url,json:true
    },(error,{body}) =>{
        if(error){
            callback('Unable to connect to Location',undefined)
        }else if (body.features.length === 0){
            callback('Unable to find the location,try another search')
        } else {
            callback(undefined,{
                latitude :body.features[0].center[1],
                longitude : body.features[0].center[1],
                location:body.features[0].place_name
            })
        }
    })
}


module.exports = geocode;