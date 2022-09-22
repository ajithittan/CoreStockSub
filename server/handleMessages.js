const URLConfig = require("../config/messageprocess.config");
const urlconf = new URLConfig()

const processMessage = async (channel,subMessage) =>{

    try{
        let url = getUrl(channel)
        const fetch = require("node-fetch"); 
        console.log("URL is ",url,subMessage,JSON.stringify(subMessage))
        await fetch(url, {method:'post', body:subMessage, headers: { 'Content-Type': 'application/json' }})
    }catch(err){
        console.log("Error in processMessage function",err)
    }
}

const getUrl = (channel) => urlconf[channel]

module.exports = {processMessage}