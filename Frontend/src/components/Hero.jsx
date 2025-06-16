import React from 'react';
import { fetchSections } from '../../api';
import { imageUrl } from '../assets/dirt_mound.jpg';
export default function Hero() {
  const [content, setContent] = React.useState(null);
  React.useEffect(() => { fetchSections().then(sections => {
      const hero = sections.find(s => s.section === 'hero');
      setContent(hero.html);
    });
  }, []);

  return (
    <section id="hero" className="hero" style={{ backgroundImage: `url(${imageUrl('dirt_mound.jpg')})` }}>
      <div dangerouslySetInnerHTML={{ __html: content }} />
    </section>
  );
}