import { useEffect, useState } from 'react'
import  axios  from '@/libs/axios'
import Echo from 'laravel-echo'
import Pusher from 'pusher-js'
declare global {
    interface Window {
      Pusher: typeof Pusher
    }
  }
  


const useEcho = () => {
    const [echoInstance, setEchoInstance] = useState<Echo<any>>() // 👈 Thêm kiểu dữ liệu rõ ràng

    useEffect(() => {

        if (typeof window === 'undefined') return // Chỉ chạy trên client
        
        window.Pusher = Pusher // Gán Pusher vào window để sử dụng trong Echo
        Pusher.logToConsole = false 
        const echo = new Echo({
            broadcaster: 'reverb',
            key: process.env.NEXT_PUBLIC_REVERB_APP_KEY,
            authorizer: (channel : any) => {
                return {
                    authorize: (socketId : any, callback : any) => {
                        axios
                            .post('/api/broadcasting/auth', {
                                socket_id: socketId,
                                channel_name: channel.name,
                            })
                            .then(response => {
                                callback(false, response.data)
                            })
                            .catch(error => {
                                callback(true, error)
                            })
                    },
                }
            },
            wsHost: process.env.NEXT_PUBLIC_REVERB_HOST,
            wsPort: Number(process.env.NEXT_PUBLIC_REVERB_PORT),
            wssPort: Number(process.env.NEXT_PUBLIC_REVERB_PORT),
            forceTLS:
                (process.env.NEXT_PUBLIC_REVERB_SCHEME ?? 'https') === 'https',
            enabledTransports: ['ws', 'wss'],
        })
        setEchoInstance(echo)
    }, [])

    return echoInstance
}

export default useEcho
