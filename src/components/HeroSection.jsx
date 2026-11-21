import React, { useState } from 'react';

export default function HeroSection({ onScrollToCatalog, onExploreLook }) {
  const [parallax, setParallax] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const nx = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
    const ny = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
    setParallax({
      x: Number((nx * 6).toFixed(1)),
      y: Number((ny * 4).toFixed(1)),
    });
  };

  return (
    <section
      id="top"
      className="hero-section"
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setParallax({ x: 0, y: 0 })}
    >
      <div className="container hero-canvas">
        {/* Top-Left Editorial Tagline */}
        <div className="hero-meta-top-left">
          <span>МОДА,</span>
          <span>КОТОРАЯ ДВИЖЕТСЯ</span>
          <span>ВМЕСТЕ С ТОБОЙ.</span>
          <i className="editorial-rule" aria-hidden="true" />
        </div>

        {/* Giant Edge-to-Edge Wordmark Behind Model */}
        <h1 className="hero-giant-wordmark" aria-label="GAZU">
          GAZU
        </h1>

        {/* Center Full-Body Outfit Cutout In Front of Wordmark */}
        <div
          className="hero-model-wrap"
          style={{
            transform: `translate3d(${parallax.x}px, ${parallax.y}px, 0)`,
          }}
        >
          <img
            src="./images/hero-look.png"
            alt="Образ GAZU: красная куртка Scuderia F1 и широкие графитовые брюки HLDE"
            className="hero-model-img"
            draggable="false"
          />
          <div className="hero-floor-shadow" aria-hidden="true" />
        </div>

        {/* Bottom-Left Primary Actions */}
        <div className="hero-cta-group">
          <button
            type="button"
            className="btn-solid-black"
            onClick={onScrollToCatalog}
          >
            В КАТАЛОГ
          </button>
          <button
            type="button"
            className="btn-underline-link"
            onClick={onExploreLook}
          >
            КУПИТЬ ЭТОТ ОБРАЗ
          </button>
        </div>

        {/* Bottom-Right Season Tag */}
        <div className="hero-meta-bottom-right">
          <span>НОВАЯ</span>
          <span>КОЛЛЕКЦИЯ</span>
          <span>2026</span>
          <i className="editorial-rule" aria-hidden="true" />
        </div>
      </div>
    </section>
  );
}
