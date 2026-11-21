import React from 'react';
import { ArrowRightIcon } from './Icons';

const STRIP_ITEMS = [
  {
    id: 'graphic',
    title: 'ГРАФИКА',
    subtitle: 'Плотный оверсайз с выразительными принтами.',
    cta: 'СМОТРЕТЬ ГРАФИКУ',
    image: './images/prod-akogareru.jpg',
    alt: 'Футболка Akogareru Oversize',
  },
  {
    id: 'outerwear',
    title: 'АРХИВ И ВЕРХ',
    subtitle: 'Культовый мотоспорт и фактурный низ.',
    cta: 'СМОТРЕТЬ ВЕРХ',
    image: './images/prod-ferrari-jacket.jpg',
    alt: 'Куртка Scuderia F1 Racing Bomber',
  },
  {
    id: 'jersey',
    title: 'БАЗА И ДЖЕРСИ',
    subtitle: 'Чистые линии на каждый день.',
    cta: 'СМОТРЕТЬ ДЖЕРСИ',
    image: './images/prod-choize.jpg',
    alt: 'Джерси CHOIZE 69 Oversize',
  },
];

export default function CategoryStrip({ onSelectCategory }) {
  return (
    <section className="category-strip-band" aria-label="Категории коллекции">
      <div className="container category-strip-grid">
        {STRIP_ITEMS.map((item) => (
          <div key={item.id} className="category-strip-item">
            <button
              type="button"
              className="category-thumb-btn"
              onClick={() => onSelectCategory(item.id)}
              aria-label={item.title}
            >
              <img src={item.image} alt={item.alt} />
            </button>

            <div className="category-strip-copy">
              <h3>{item.title}</h3>
              <p>{item.subtitle}</p>
              <button
                type="button"
                className="category-arrow-link"
                onClick={() => onSelectCategory(item.id)}
              >
                <span>{item.cta}</span>
                <ArrowRightIcon size={13} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
