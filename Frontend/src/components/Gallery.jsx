import React from 'react';
import { imageUrl } from '../assets/dirt_mound.jpg';

const images = ['dirt_mound.jpg'];

export default function Gallery() {
  return (
    <section id="gallery" className="gallery">
      {images.map((img, i) => (
        <img key={i} src={imageUrl(img)} alt={`Gallery ${i}`} />
      ))}
    </section>
  );
}