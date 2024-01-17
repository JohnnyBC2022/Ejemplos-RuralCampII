import "./Slider.css";
import { useState, useEffect, useRef } from "react";

const videos = [
  { id: "HQIiYqOVTWo" },
  { id: "NDsjuhAMDjI" },
  { id: "-f5PwE_Q8Fs" },
  { id: "svLSGZkTzC0" },
];

export const Slider = () => {
  const [position, setPosition] = useState(0);
  const currentContainer = useRef(null);

  const handleNext = () => {
    const nextIndex = position + 1 < videos.length ? position + 1 : position;
    setPosition(nextIndex);
  };
  
  const handlePrev = () => {
    const prevIndex = position - 1 >= 0 ? position - 1 : position;
    setPosition(prevIndex);
  };

  useEffect(() => {
    const currentVideo = videos[position];

    if (currentContainer.current) {
      currentContainer.current.innerHTML = `<iframe
    width="100%"
    height="685"
    src="https://www.youtube.com/embed/${currentVideo.id}"
    frameBorder="0"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowFullScreen
  ></iframe>`;
    }
  }, [position]);

  return (
    <section id="slider">
      <div id="controls">
        <button id="prev" onClick={handlePrev}>
          <span className="material-icons">&#xe5e0;</span>
        </button>

        <button id="next" onClick={handleNext}>
          <span className="material-icons">&#xe5e1;</span>
        </button>
      </div>
      <div id="current" ref={currentContainer}></div>
    </section>
  );
};
