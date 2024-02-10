import React, { useEffect, useState, useRef } from 'react';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import Cards from '../../components/Cards';
import {} from "react-icons/fa6"
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa';

// Defing next and prev Arrow in special cards section

const simpleNextArrow = (props) =>{
    const {className,style,onclick} = props;
    return(
      <div className={className} style={{...style,display:"block",background:"red"}} onclick={onclick}>
          NEXT
      </div>
    )
};

const simplePrevArrow = (props) =>{
  const {className,style,onclick} = props;
  return(
    <div className={className} style={{...style,display:"block",background:"green"}} onclick={onclick}>
        Prev
    </div>
  )
};

// const slider = useRef(null);

const SpecialDishes = () => {
  const [recipes, setRecipes] = useState([]);
  const slider = useRef(null);


  useEffect(() => {
    fetch("/menu.json")
      .then(res => res.json())
      .then(data => {
        const specials = data.filter(item => item.category === "popular");
        setRecipes(specials);
      });
  }, []);

  // Slider settings
  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    initialSlide: 0,
    responsive: [
      
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 1
        }
      },
      {
        breakpoint: 800,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 1
        }
      }
    ],
    // Adding next and prev arrow
    nextArrow:<simpleNextArrow/>,
    prevArrow:<simplePrevArrow/>
  };
  return (
    <div className='section-container my-20 relative
    '>
      <div className='text-left'>
        <p className='subtitle'>Special Dishes</p>
        <h2 className='title md:w-[520px]'>Standout Dishes From Our Menu</h2>
      </div>

    {/* Arrow Btn */}
      <div className='md:absolute right-3 top-9 mb-10 md:mr-24'>
            <button onClick={()=>slider?.current?.slickPrev()} className='btn p-2 rounded-full ml-5'>
              <FaAngleLeft className='w-8 h-8 p-1'/>
            </button>
            <button onClick={()=>slider?.current?.slickNext()} className='btn p-2 rounded-full ml-5 bg-green'>
              <FaAngleRight className='w-8 h-8 p-1'/>
            </button>
      </div>

      {/* Slider */}
      <Slider ref={slider} {...settings} className='mt-6 overflow-hidden space-x-5'>
        {recipes.map((item, i) => (
          <Cards key={i} item={item} />
        ))}
      </Slider>
    </div>
  );
};

export default SpecialDishes;