import React from 'react'
import Navbar from '../components/Navbar'
import Announcement from '../components/Announcement'
import Slider from '../components/Slider'
import Categories from '../components/Categories'
import Products from '../components/Products'
import Newsletter from '../components/Newsletter'
import Footer from '../components/Footer'
import Brands from '../components/Brands';
import Gallery from '../components/Gallery'
import CarouselItem from '../components/CarouselItem';
import Jumbtron from '../components/Jumbtron';
import Promo from '../components/Promo'
import NavCategory from '../components/NavCategory'
import FadeLoader from "react-spinners/FadeLoader";
import CatHeader from '../components/CatHeader'




const Home = () => {
    return (
        <div>

            <Announcement/> 
            
            <Navbar />

            <NavCategory />

            <Slider />

            <Promo />

            <Categories />

            <Gallery />

            <Newsletter />

            <Footer />
        </div>
    )
}

export default Home
