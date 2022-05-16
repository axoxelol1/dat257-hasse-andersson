import React from 'react';
import { Fade } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css'

const fadeImages = [
  {
  url: 'img/IMG_3063.jpg',
  caption: 'First Slide'
  },
  {
  url: 'img/IMG_3064.jpg',
  caption: 'Second Slide'
  },
  {
  url: 'img/IMG_3065.jpg',
  caption: 'Third Slide'
  },
  {
    url: 'img/IMG_3067.jpg',
    caption: 'Third Slide'
    },
];

export default function SlideShow() {

  return (
    
    <div className="slide-container object-cover h-screen">
      <Fade duration="50000" arrows={false} className="h-screen">
        {fadeImages.map((fadeImage, index) => (
          <div className="each-fade blur h-screen" key={index}>
            <div className="image-container blur h-screen">
              <img className="object-none h-screen w-screen" src={fadeImage.url} alt="background image" />
            </div>
            <h2>{fadeImage.caption}</h2>
          </div>
        ))}
      </Fade>
    </div>
  )
}