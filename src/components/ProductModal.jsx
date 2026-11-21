import React, { useState } from 'react';
import { PRODUCTS, SIZE_MEASUREMENTS, formatRub } from '../data/products';
import { CloseIcon, HeartIcon } from './Icons';

export default function ProductModal({
  product,
  isWishlisted,
  onClose,
  onAddToCart,
  onToggleWishlist,
  onSelectProduct,
}) {
  const [size, setSize] = useState('L');
  const [showMeasurements, setShowMeasurements] = useState(false);

  if (!product) return null;

  const pairProduct = product.pairWithId
    ? PRODUCTS.find((p) => p.id === product.pairWithId)
    : null;

  return (
    <div className="modal-backdrop" onClick={onClose} role="presentation">
      <div
        className="product-modal"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label={product.name}
      >
        <button
          type="button"
          className="modal-close-square"
          onClick={onClose}
          aria-label="Закрыть карточку товара"
        >
          <CloseIcon size={17} />
        </button>

        <div className="product-modal__grid">
          <div className="product-modal__visual">
            <img src={product.image} alt={product.name} />
          </div>

          <div className="product-modal__body">
            <span className="product-card__cat">{product.categoryLabel}</span>
            <h2 className="product-modal__title">{product.name}</h2>
            <p className="product-modal__color">{product.color}</p>

            <div className="product-modal__prices">
              <strong>{formatRub(product.price)}</strong>
              <span>{formatRub(product.oldPrice)}</span>
            </div>

            <p className="product-modal__desc">{product.description}</p>

            <div className="product-specs-list">
              <div>
                <span>МАТЕРИАЛ</span>
                <strong>{product.material}</strong>
              </div>
              <div>
                <span>ПОСАДКА</span>
                <strong>{product.fit}</strong>
              </div>
            </div>

            <div className="modal-size-section">
              <div className="modal-size-top">
                <span>ВЫБЕРИТЕ РАЗМЕР</span>
                <button
                  type="button"
                  className="btn-underline-link"
                  onClick={() => setShowMeasurements((v) => !v)}
                >
                  {showMeasurements ? 'СКРЫТЬ ТАБЛИЦУ' : 'ТАБЛИЦА РАЗМЕРОВ'}
                </button>
              </div>

              <div className="modal-size-pills" role="radiogroup" aria-label="Размер одежды">
                {product.sizes.map((sz) => (
                  <button
                    key={sz}
                    type="button"
                    role="radio"
                    aria-checked={size === sz}
                    className={`size-box-btn ${size === sz ? 'is-selected' : ''}`}
                    onClick={() => setSize(sz)}
                  >
                    {sz}
                  </button>
                ))}
              </div>

              {showMeasurements && (
                <div className="measurements-box">
                  <div className="measurements-head">
                    <span>Размер</span>
                    <span>Грудь</span>
                    <span>Длина</span>
                    <span>Пояс</span>
                  </div>
                  {SIZE_MEASUREMENTS.map((row) => (
                    <div key={row.size} className="measurements-row">
                      <strong>{row.size}</strong>
                      <span>{row.chest}</span>
                      <span>{row.length}</span>
                      <span>{row.waist}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="modal-cta-row">
              <button
                type="button"
                className="btn-solid-black btn-full"
                onClick={() => {
                  onAddToCart(product, size);
                  onClose();
                }}
              >
                ДОБАВИТЬ В КОРЗИНУ · {formatRub(product.price)}
              </button>

              <button
                type="button"
                className={`btn-outline-square ${isWishlisted ? 'is-liked' : ''}`}
                onClick={() => onToggleWishlist(product.id)}
                aria-label="Добавить в избранное"
              >
                <HeartIcon size={17} filled={isWishlisted} />
              </button>
            </div>

            {pairProduct && (
              <div className="pair-with-box">
                <img src={pairProduct.image} alt={pairProduct.name} />
                <div className="pair-with-info">
                  <span>ДОПОЛНИТЬ ОБРАЗ С ГЛАВНОЙ</span>
                  <strong>{pairProduct.name}</strong>
                  <small>{formatRub(pairProduct.price)}</small>
                </div>
                <button
                  type="button"
                  className="btn-underline-link"
                  onClick={() => onSelectProduct(pairProduct)}
                >
                  ОТКРЫТЬ
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
