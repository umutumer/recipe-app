
import { useEffect, useState } from 'react';
import './AccountInfo.scss'
import { UserType } from '../../Types/Types';
import { FaEdit, FaPlusCircle } from "react-icons/fa";
import { MdCancel } from "react-icons/md";



const AccountInfo = () => {
    const [userId, setUserId] = useState<number>();
    const [loggedInUser, setLoggedInUser] = useState<UserType>();
    const [modalVisibility, setModalVisibility] = useState<boolean>(false);
    const [username, setUsername] = useState<string | undefined>(loggedInUser?.username);
    const [mail, setMail] = useState<string | undefined>(loggedInUser?.email);
    const [password, setPassword] = useState<string | undefined>(loggedInUser?.password);
    const [base64Image, setBase64Image] = useState<string | undefined>(loggedInUser?.base64image);
    console.log(userId);


    const getUserById = async () => {
        try {
            const response = await fetch(`http://localhost:8080/api/users/${userId}`)
            if (response.ok) {
                const data = await response.json();
                setLoggedInUser(data)
            }
        } catch (error) {
            console.error(error);

        }
    }

    const changeModalVisibility = (username:string | undefined,email:string | undefined,password:string | undefined) => {
        setUsername(username)
        setMail(email)
        setPassword(password)
        setModalVisibility(true)
    }
    const cancelBtn = () =>{
        setUsername("")
        setMail("")
        setPassword("")
        setModalVisibility(false)
    }
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (files && files.length > 0) {
            const file = files[0];
            const reader = new FileReader();
            reader.onloadend = () => {
                const image = reader.result as string;
                setBase64Image(image);
            };
            reader.readAsDataURL(file);
        }
    };


    const updateUser = async (e: React.SyntheticEvent<EventTarget>) =>{
        e.preventDefault();
        try {
            const formData = {
                id:userId,
                email: mail,
                username: username,
                password: password,
                base64image: base64Image
            }
                const response = await fetch(`http://localhost:8080/api/users/update/${userId}`, {
                    method: "PUT",
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(formData)
                })
                if (response.ok) {
                    const data = await response.json();
                    console.log(data);
                }
            } catch (error) {
            console.error("Kullancı Güncelleme hatası:", error);
            }finally{
                getUserById();
                setModalVisibility(false);
            }
    }

    useEffect(() => {
        const storedData = localStorage.getItem('userId');
        if (storedData && typeof storedData === 'string') {
            const parsedUserId = parseInt(storedData, 10);
            if (!isNaN(parsedUserId)) {
                setUserId(parsedUserId);
            }
        }
        getUserById();
    }, [userId]);
    return (
        <div className='account-info'>
            <div className='account-image'>
                <img src={loggedInUser?.base64image} alt="" />
            </div>
            <div>
                <p> <span style={{ color: "#ee5e40" }}> Kullanıcı Adı : </span>{loggedInUser?.username}</p>
                <p> <span style={{ color: "#ee5e40" }}>E-posta :</span> {loggedInUser?.email}</p>
                <p> <span style={{ color: "#ee5e40" }}>Hesap Yetkisi :</span> {loggedInUser?.role.name}</p>
            </div>
            <button className='edit-btn' onClick={() => changeModalVisibility(loggedInUser?.username,loggedInUser?.email,loggedInUser?.password)}><FaEdit /></button>
            {modalVisibility && (
                <form className='account-information-edit' onSubmit={updateUser}>
                    <input type="text" value={username} onChange={(e) => setUsername(e.target.value)}/>
                    <input type="text" value={mail} onChange={(e) => setMail(e.target.value)} />
                    <input type="text" value={password} onChange={(e) => setPassword(e.target.value)} />
                    <input type="file" className="file-input file-input-ghost bg-[#d3d3d3] my-3 w-[450px] h-[50px]" onChange={(e) => handleFileChange(e)} />
                    <input type="submit" value={"Değişiklikleri Kaydet"} id="account-edit-btn" style={{color:"#fff"}}/>
                    <button className='edit-btn' onClick={() => cancelBtn()}><MdCancel /></button>
                </form>
            )}
        </div>
    )
}

export default AccountInfo