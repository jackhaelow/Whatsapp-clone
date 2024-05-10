import { useEffect } from "react";
import { useChatContext } from "stream-chat-react";

export default function PushMessageListener(){
    const {client,setActiveChannel}=useChatContext();


    useEffect(()=>{
        const messageListener = async(event:MessageEvent)=>{
          console.log('Recieved message from server worker',event.data)

          const channelId = event.data.channelId 
          if(channelId){
            const channels = await client.queryChannels({id:channelId});
             if(channels.length > 0) {
                setActiveChannel(channels[0])
            }else{
                console.log('PushMessageListener:A channel with this Id was not found')
            }

          }
        }
        navigator.serviceWorker.addEventListener('message',messageListener)
        return ()=> navigator.serviceWorker.removeEventListener('message',messageListener) 
    },[client,setActiveChannel])
    return null
}