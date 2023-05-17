import React,{ useState , useEffect , useContext } from 'react';
import { auth } from '../firebase';
import { useHistory } from 'react-router-dom';
import {ChatEngine } from "react-chat-engine";
import axios from "axios"
//components
import Navbar from './Navbar';
//styles
import styles from "./Chats.module.css";
//context
import { AuthContext } from '../context/AuthContextProvider';

const Chats = () => {
    const user = useContext(AuthContext);
    const [loading,setLoading] = useState(true);
    const history = useHistory();
    const logoutHandeler = async ()=>{
        await auth.signOut();
        history.push("/");
    }

    useEffect(()=>{
        if(!user){
            history.push("/");
            return;
        }

        axios.get("https://api.chatengine.io/users/me",{
            headers:{
                
                "project-id":"be3c26d9-3114-48b4-b823-265429ae4b7a",
                "user-name":user.email,
                "user-secret":user.uid,
            }
        })
            .then(()=>{
                setLoading(false);
            })
            .catch(()=>{
                let formdata = new FormData();
                formdata.append("email",user.email);
                formdata.append("username",user.email);
                formdata.append("secret",user.uid);
                getFile(user.photoURL)
                    .then(avatar =>{
                        formdata.append("avatar",avatar,avatar.name);
                        axios.post("https://api.chatengine.io/users/" , formdata ,{
                            headers:{
                                "private-key":"ba5f3d0c-1575-4cb8-a8a4-1562f5d9e598"
                            }
                        })
                        .   then(() => setLoading(false))
                            .catch(error => console.log(error))
                    })
            })


    },[user,history])

    const getFile =async (url) => {
        const response = await fetch(url);
        const data =await response.blob();
        return new File([data],"userPhoto.jpg",{type:"image/jpeg"});
    }

    if (!user || loading) return "Loading..."

    return (
        <div className={styles.container}>
            <Navbar logoutHandeler={logoutHandeler} />
            <ChatEngine
                height="calc(100%-50px)"
                projectID="be3c26d9-3114-48b4-b823-265429ae4b7a"
                userName={user.email}
                userSecret={user.uid}
            />  
        </div>
    );
};

export default Chats;