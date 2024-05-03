import React, { useEffect, useState } from 'react'
import { UserType } from '../../Types/Types';
import AdminSideBar from '../../components/AdminSidebar/AdminSideBar';
import CommentsTable from '../../components/CommentsTable/CommentsTable';

const AdminComments = () => {
    const [userId, setUserId] = useState<number>();
    const [loggedInUser, setLoggedInUser] = useState<UserType>();


    const admin = loggedInUser?.role.name === "admin";
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
    if (admin) {
        return (
            <div className="admin">
                <AdminSideBar />
                <div className="admin-content">
                    <CommentsTable />
                </div>
            </div>
        )
    } else {
        return (
            <div className='authority'>
                <p className='authority-text'>404 Not Found Error !</p>
            </div>
        )
    }
}

export default AdminComments
