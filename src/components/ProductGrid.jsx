import React from 'react';
import { CATEGORY_FILTERS, PRODUCTS, formatRub } from '../data/products';
import { HeartIcon } from './Icons';

function formatCountLabel(count) {
  const mod10 = count % 10;
  const mod100 = count % 100;
  if (mod10 === 1 && mod100 !== 11) return `${count} ПОЗИЦИЯ`;
  if (mod10 >= 2 && mod10 <= 4 && (mod100 < 12 || mod100 > 14)) return `${count} ПОЗИЦИИ`;
  return `${count} ПОЗИЦИЙ`;
}

export default function ProductGrid({
  activeCategory,
  onSelectCategory,
  wishlistIds,
  onToggleWishlist,
  onOpenProduct,
  onQuickAdd,
}) {
  const filtered =
    activeCategory === 'all'
      ? PRODUCTS
      : PRODUCTS.filter((p) => p.category === activeCategory);

  return (
    <section id="catalog" className="product-grid-section" aria-label="Каталог одежды">
      <div className="container">
        <div className="catalog-head-row">
          <div className="catalog-title-group">
            <h2>BEST OF GAZU</h2>
            <span className="catalog-count">{formatCountLabel(filtered.length)}</span>
          </div>

          <button
            type="button"
            className="btn-underline-link"
            onClick={() => onSelectCategory('all')}
          >
            СМОТРЕТЬ ВСЕ
          </button>
        </div>

        <div className="catalog-filters" role="tablist" aria-label="Фильтр по категориям">
          {CATEGORY_FILTERS.map((f) => {
            const count =
              f.id === 'all'
                ? PRODUCTS.length
                : PRODUCTS.filter((p) => p.category === f.id).length;
            return (
              <button
                key={f.id}
                type="button"
                role="tab"
                aria-selected={activeCategory === f.id}
                className={`filter-tab-btn ${activeCategory === f.id ? 'is-active' : ''}`}
                onClick={() => onSelectCategory(f.id)}
              >
                {f.label} ({count})
              </button>
            );
          })}
        </div>

        <div className="products-grid">
          {filtered.map((product) => {
            const liked = wishlistIds.includes(product.id);
            return (
              <article key={product.id} className="product-card">
                <div className="product-card__media">
                  <button
                    type="button"
                    className="product-card__img-trigger"
                    onClick={() => onOpenProduct(product)}
                    aria-label={`Открыть карточку: ${product.name}`}
                  >
                    <img src={product.image} alt={product.name} decoding="async" />
                  </button>

                  <span className="product-card__badge">{product.badge}</span>

                  <button
                    type="button"
                    className={`wishlist-circle-btn ${liked ? 'is-liked' : ''}`}
                    onClick={() => onToggleWishlist(product.id)}
                    aria-label={
                      liked
                        ? `Удалить ${product.name} из избранного`
                        : `Добавить ${product.name} в избранное`
                    }
                  >
                    <HeartIcon size={15} filled={liked} />
                  </button>

                  <div className="quick-add-bar" aria-label={`Быстрый выбор размера для ${product.name}`}>
                    <span className="quick-add-label">РАЗМЕР:</span>
                    <div className="quick-add-sizes">
                      {product.sizes.map((sz) => (
                        <button
                          key={sz}
                          type="button"
                          onClick={() => onQuickAdd(product, sz)}
                          title={`Добавить ${product.name} (${sz}) в корзину`}
                        >
                          {sz}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="product-card__meta">
                  <span className="product-card__cat">{product.categoryLabel}</span>
                  <button
                    type="button"
                    className="product-card__title"
                    onClick={() => onOpenProduct(product)}
                  >
                    {product.name}
                  </button>
                  <p className="product-card__color">{product.color}</p>
                  <div className="product-card__prices">
                    <strong>{formatRub(product.price)}</strong>
                    <span>{formatRub(product.oldPrice)}</span>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
