import Slider from "react-slick";
import Slide from "./Slide";
import { url } from "../../utils/url";

// You must import the slick carousel CSS files for the slider to work.
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

const HSlider = () => {
    // This array holds the data for each slide.
    const slidesData = [
        {
            img: "preview-case-1.png",
            title: "Aura Glow PCs",
            primaryColor: "#ff4081",
            secondaryColor: "#ff8bb2ff",
            description: "Another example description for the next slide. Customize your PC with vibrant LED lighting and high-performance components. Discover the perfect blend of style and power with our aura glow builds."
        },
        {
            img: "preview-case-2.png",
            title: "Minimalist Builds",
            primaryColor: "#fff",
            secondaryColor: "#575656ff",
            description: "A third example for a different slide. Sleek, clean, and powerful. Our minimalist builds focus on elegant design and top-tier performance without the flash, perfect for any workspace."
        },
        {   
            img: "preview-case-3.png",
            title: "Anime Themed Cases",
            primaryColor: "rgb(138, 72, 214)",
            secondaryColor: "rgb(98, 20, 214)",
            description: "Our new Anime Series cases capture the vibrant spirit of your favorite anime. Each case features crisp, detailed art, bringing iconic characters and scenes to life while providing robust protection for your phone."
        },
    ];

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        customPaging: function(i: number) {
            return (
                <a>
                    <img 
                        src={`${url}/preview-case-${i + 1}.png`} 
                        alt={`Slide thumbnail ${i + 1}`} 
                    />
                </a>
            );
        },
    };

    return (
        <Slider {...settings}>
            {slidesData.map((slide, index) => (
                <div key={index}>
                    <Slide 
                        img={slide.img} 
                        title={slide.title} 
                        primaryColor={slide.primaryColor}
                        secondaryColor={slide.secondaryColor}
                        description={slide.description}
                    />
                </div>
            ))}
        </Slider>
    );
}

export default HSlider;