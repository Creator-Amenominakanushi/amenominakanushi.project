"use client";

//? STYLESHEET | Global/Root
import "@/styles/scss/globals.scss";

// ? REACT Built-in
import React, { useEffect } from "react";
//? NEXT Built-in
import Link from "next/link";

export default function App(): React.JSX.Element {

  //? useEffect() Hook - Runs after component mounts.
  useEffect(() => {
    //* Selects the DOM element with the class 'interactive'.
    const interBubble = document.querySelector(".interactive");
    //* Initializing the current X coordinate to 0.
    let curX = 0;
    //* Initializing the current Y coordinate to 0.
    let curY = 0;
    //* Initializing the target X coordinate to 0.
    let tgX = 0;
    //* Initializing the target Y coordinate to 0.
    let tgY = 0;
    
    //? Function: smoothly move interactive bubble towards the target coordinates.
    function move() {
      //* Update current X by moving fraction of distance towards target X.
      curX += (tgX - curX) / 20;
      //* Update current Y by moving fraction of distance towards target Y.
      curY += (tgY - curY) / 20;
      //* Check if the interactive element is found.
      if (interBubble) {
        // @ts-expect-error - CSS Transform
        //* Apply a CSS transform to move the element.
        interBubble.style.transform = `translate(${Math.round(curX)}px, ${Math.round(curY)}px)`;
      }
      //* Request the next animation frame & call move function again.
      requestAnimationFrame(() => {
        move();
      });
    }

    //* Add an event listener to the window object to listen for mouse movements.
    window.addEventListener("mousemove", (event) => {
      //* Update the target X coordinate to the current mouse X position.
      tgX = event.clientX;
      //* Update the target Y coordinate to the current mouse Y position. 
      tgY = event.clientY;
    });

    //* Start the move function when the component mounts.
    move();
  }, []); //? Empty dependency array means this effect runs once, when component mounts.

  return (
    <main>
      <div className="landing-text__container">
        <h1 className="display-5 mb-4 tracking-in-expand">#AMENOMINAKANUSHI</h1>
        <Link className="btn btn-theme" href="/blogs">Read More</Link>
      </div>
      {/* Container with a gradient background */}
      <div className="gradient-background__container">
        {/* SVG element for filter effects */}
        <svg xmlns="http://www.w3.org/2000/svg">
        {/* Definitions for reusable elements within the SVG */}
          <defs>
            {/* Filter with id 'goo' */}
            <filter id="goo">
              {/* Apply a Gaussian blur to the source graphic */}
              <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />
              <feColorMatrix
                in="blur"
                mode="matrix"
                values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -8"
                result="goo"
              /> {/* Apply a color matrix to create a 'gooey' effect */}
              {/* Blend the original graphic with the goo effect */}
              <feBlend in="SourceGraphic" in2="goo" />
            </filter>
          </defs>
        </svg>
        {/* Placeholder divs, for graphicS elements */}
        <div>
          <div className="g1"></div>
          <div className="g2"></div>
          <div className="g3"></div>
          <div className="g4"></div>
          <div className="g5"></div>
          {/* Interactive div that will follow the mouse movements */}
          <div className="interactive"></div>
        </div>
      </div>
    </main>
  );
}
