import React, { useEffect, useState } from 'react'
import { Comments } from '../../Types/Types';
import { FaTrash } from 'react-icons/fa';

const CommentsTable = () => {
    const [deleteModal,setDeleteModal] = useState<boolean>(false);
    const [comments, setComments] = useState<Comments[]>([]);
    const [commentId,setCommentId] = useState<number>();

    const getComments = async () => {
        try {
            const response = await fetch("http://localhost:8080/api/comment")
            const data: Comments[] = await response.json();
            setComments(data);
        } catch (error) {
            console.error("Yorumlar gelirken bir hata oluştu: ", error);

        }
    }
    const handleDeleteModal = (id: number) => {
        setCommentId(id);
        setDeleteModal(true);
    }
    const deleteComment = async () => {
        try {
            const response = await fetch(`http://localhost:8080/api/comment/${commentId}`, {
                method: "DELETE",
                headers: {
                    'Content-Type': 'application/json',
                }
            })        
        } catch (error) {
            console.error("tarif silinirken hata oluştu: ", error);

        }finally{
            setDeleteModal(false)
            getComments();
        }
    }
    useEffect(()=>{
        getComments();
    },[])
  return (
    <div>
      {deleteModal && (
            <div className='fixed w-screen h-screen bg-black bg-opacity-40 top-0 left-0 flex items-center justify-center z-50'>
                <div className='relative w-96 h-32 bg-white flex flex-col items-center rounded-xl'>
                    <p className='my-2 font-semibold text-lg text-center p-2 text-[#ee5e40]'>Yorumu Silme İşlemini Onaylıyor musunuz ?</p>
                    <div className='absolute bottom-3'>
                        <button className='w-20 py-1 px-2 mx-2 rounded-md text-[#ee5e40] border-[#ee5e40] border' onClick={deleteComment}>Evet</button>
                        <button className='w-20 py-1 px-2 mx-2 rounded-md text-white bg-[#ee5e40]' onClick={() => setDeleteModal(false)}>Hayır</button>
                    </div>
                </div>
            </div>
        )}
            <h3 className='text-center my-10 font-bold text-2xl text-[#ee5e40]'>Yorumlar</h3>
            <table className="table mt-16">
                <thead>
                    <tr style={{ color: "#ee5e40" }}>
                        <th>Yorum Sahibi</th>
                        <th>Yorum Resim</th>
                        <th>Yorum</th>
                        <th>Aksiyon</th>
                    </tr>
                </thead>
                <tbody>
                    {comments.map((comment) => (
                        <tr key={comment.id}>
                            <td>{comment.userName}</td>
                            <td><img src={comment.base64image} alt={comment.userName} className='w-32' /></td>
                            <td>{comment.comment}</td>
                            <td><button onClick={() => handleDeleteModal(comment.id)} className='text-[#ee5e40]' ><FaTrash /></button></td>
                        </tr>
                    ))}
                </tbody>
            </table>
    </div>
  )
}

export default CommentsTable
