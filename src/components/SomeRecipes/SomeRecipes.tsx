import React from 'react'
import './SomeRecipes.scss'
import { MdOutlineBookmarkAdd, MdOutlineBookmark } from "react-icons/md";
import { FaRegClock } from "react-icons/fa";
const SomeRecipes = () => {
    return (
        <div className='some-recipes'>
            <div className='filter-recipe-container'>
                <button className='filter-recipe-btn'>Kahvaltı</button>
                <button className='filter-recipe-btn'>Akşam Yemeği</button>
                <button className='filter-recipe-btn'>Tatlı</button>
                <button className='filter-recipe-btn'>Atıştırmalık</button>
            </div>
            <div className='recipes'>
                <div className='recipe'>
                    <img src="https://static.wixstatic.com/media/2da88b_65517974b8e445b4935e6e616ba54df0~mv2.jpg/v1/fit/w_500,h_500,q_90/file.jpg" alt="" className='recipe-img' />
                    <div>
                        <p className='recipe-title'>Sarma</p>
                        <div className='recipe-content'>
                            <p className='recipe-text'><FaRegClock style={{ marginRight: "5px" }} /> 40 dakika</p>
                            <p className='recipe-text'><MdOutlineBookmarkAdd /></p>
                            {/* <MdOutlineBookmark /> */}
                        </div>
                    </div>
                </div>
                <div className='recipe'>
                    <img src="https://www.yufbi.com.tr/image/cache/catalog/urunler/icli-kofte-v2-500x500.jpg" alt="" className='recipe-img' />
                    <div>
                        <p className='recipe-title'>İçli Köfte</p>
                        <div className='recipe-content'>
                            <p className='recipe-text'><FaRegClock style={{ marginRight: "5px" }} /> 40 dakika</p>
                            <p className='recipe-text'><MdOutlineBookmarkAdd /></p>
                            {/* <MdOutlineBookmark /> */}
                        </div>
                    </div>
                </div>
                <div className='recipe'>
                    <img src="https://i.pinimg.com/564x/fd/bf/32/fdbf32e1dd41428e3b5e99908578fe9f.jpg" alt="" className='recipe-img' />
                    <div>
                        <p className='recipe-title'>Mantı</p>
                        <div className='recipe-content'>
                            <p className='recipe-text'><FaRegClock style={{ marginRight: "5px" }} /> 40 dakika</p>
                            <p className='recipe-text'><MdOutlineBookmarkAdd /></p>
                            {/* <MdOutlineBookmark /> */}
                        </div>
                    </div>
                </div>
                <div className='recipe'>
                    <img src="https://www.karaca.com/blog/wp-content/uploads/2023/10/domates-soslu-makarna-2-500x500.webp" alt="" className='recipe-img' />
                    <div>
                        <p className='recipe-title'>Makarna</p>
                        <div className='recipe-content'>
                            <p className='recipe-text'><FaRegClock style={{ marginRight: "5px" }} /> 40 dakika</p>
                            <p className='recipe-text'><MdOutlineBookmarkAdd /></p>
                            {/* <MdOutlineBookmark /> */}
                        </div>
                    </div>
                </div>
                <div className='recipe'>
                    <img src="https://www.karaca.com/blog/wp-content/uploads/2024/02/patlicanyemegi1-500x500.webp" alt="" className='recipe-img' />
                    <div>
                        <p className='recipe-title'>Patlıcan Yemeği</p>
                        <div className='recipe-content'>
                            <p className='recipe-text'><FaRegClock style={{ marginRight: "5px" }} /> 40 dakika</p>
                            <p className='recipe-text'><MdOutlineBookmarkAdd /></p>
                            {/* <MdOutlineBookmark /> */}
                        </div>
                    </div>
                </div>
                <div className='recipe'>
                    <img src="https://www.yemekolay.com/wp-content/uploads/2023/08/menemen-13-500x500.webp" alt="" className='recipe-img' />
                    <div>
                        <p className='recipe-title'>Menemen</p>
                        <div className='recipe-content'>
                            <p className='recipe-text'><FaRegClock style={{ marginRight: "5px" }} /> 40 dakika</p>
                            <p className='recipe-text'><MdOutlineBookmarkAdd /></p>
                            {/* <MdOutlineBookmark /> */}
                        </div>
                    </div>
                </div>
                <div className='recipe'>
                    <img src="https://www.karaca.com/blog/wp-content/uploads/2024/02/mantarsote2-500x500.webp" alt="" className='recipe-img' />
                    <div>
                        <p className='recipe-title'>Mantar Sote</p>
                        <div className='recipe-content'>
                            <p className='recipe-text'><FaRegClock style={{ marginRight: "5px" }} /> 40 dakika</p>
                            <p className='recipe-text'><MdOutlineBookmarkAdd /></p>
                            {/* <MdOutlineBookmark /> */}
                        </div>
                    </div>
                </div>
                <div className='recipe'>
                    <img src="https://m.media-amazon.com/images/I/41qjo2tMWbL._AC_SY780_.jpg" alt="" className='recipe-img' />
                    <div>
                        <p className='recipe-title'>Ankara Tavası</p>
                        <div className='recipe-content'>
                            <p className='recipe-text'><FaRegClock style={{ marginRight: "5px" }} /> 40 dakika</p>
                            <p className='recipe-text'><MdOutlineBookmarkAdd /></p>
                            {/* <MdOutlineBookmark /> */}
                        </div>
                    </div>
                </div>
                <div className='recipe'>
                    <img src="https://i.nefisyemektarifleri.com/2018/05/25/firinda-tavuklu-patates-600x400.jpg" alt="" className='recipe-img' />
                    <div>
                        <p className='recipe-title'>Fırında Tavuklu Patates</p>
                        <div className='recipe-content'>
                            <p className='recipe-text'><FaRegClock style={{ marginRight: "5px" }} /> 40 dakika</p>
                            <p className='recipe-text'><MdOutlineBookmarkAdd /></p>
                            {/* <MdOutlineBookmark /> */}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SomeRecipes
