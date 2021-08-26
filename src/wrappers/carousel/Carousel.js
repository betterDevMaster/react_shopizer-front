import React, { useState } from "react";
import { Carousel } from "react-bootstrap";
import bg1 from "../../assets/images/bg_1.jpg";
import bg2 from "../../assets/images/bg_2.png";
import bg3 from "../../assets/images/bg_3.jpg";
import bg4 from "../../assets/images/bg_4.png";
import bg5 from "../../assets/images/bg_5.jpg";
import bg6 from "../../assets/images/bg_6.png";
import bg7 from "../../assets/images/bg_7.png";
import bg8 from "../../assets/images/bg_8.png";

const ControlledCarousel = () => {
    const [index, setIndex] = useState(0);

    const handleSelect = (selectedIndex, e) => {
        setIndex(selectedIndex);
    };

    return (
        <Carousel fade pause="hover" activeIndex={index} onSelect={handleSelect}>
            <Carousel.Item>
                <img className="d-block w-100 bg-no-repeat" src={bg1} alt="1st slide" />
                {/* <Carousel.Caption>
                    <h3>TU SUPERMERCADO SALUDABLE SIN SALIR DE CASA</h3>
                    <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                </Carousel.Caption> */}
            </Carousel.Item>
            <Carousel.Item>
                <img className="d-block w-100 bg-no-repeat" src={bg2} alt="2nd slide" />
            </Carousel.Item>
            <Carousel.Item>
                <img className="d-block w-100 bg-no-repeat" src={bg3} alt="3rd slide" />
            </Carousel.Item>
            <Carousel.Item>
                <img className="d-block w-100 bg-no-repeat" src={bg4} alt="4th slide" />
            </Carousel.Item>
            <Carousel.Item>
                <img className="d-block w-100 bg-no-repeat" src={bg5} alt="5th slide" />
            </Carousel.Item>
            <Carousel.Item>
                <img className="d-block w-100 bg-no-repeat" src={bg6} alt="6th slide" />
            </Carousel.Item>
            <Carousel.Item>
                <img className="d-block w-100 bg-no-repeat" src={bg7} alt="7th slide" />
            </Carousel.Item>
            <Carousel.Item>
                <img className="d-block w-100 bg-no-repeat" src={bg8} alt="8th slide" />
            </Carousel.Item>
        </Carousel>
    );
};

export default ControlledCarousel;
