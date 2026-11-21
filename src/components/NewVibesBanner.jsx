import React from 'react';

export default function NewVibesBanner({ onExploreCollection }) {
  return (
    <section className="new-vibes-band" aria-label="Новая коллекция">
      <div className="container new-vibes-grid">
        <div className="new-vibes-copy">
          <span className="eyebrow-label">NEW SEASON</span>
          <h2>
            <span>NEW</span>
            <span>VIBES</span>
          </h2>
          <p>Открой актуальные силуэты, винтажную варку и графику этого сезона.</p>
          <button
            type="button"
            className="btn-solid-black"
            onClick={onExploreCollection}
          >
            СМОТРЕТЬ КОЛЛЕКЦИЮ
          </button>
        </div>

        <div className="new-vibes-visual">
          <img
            src="./images/banner-tee.png"
            alt="Футболка Akogareru Oversize из новой коллекции"
            className="new-vibes-img"
            draggable="false"
          />
        </div>
      </div>
    </section>
  );
}
