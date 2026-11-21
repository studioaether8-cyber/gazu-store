import React, { useState } from 'react';
import { PRODUCTS, formatRub } from '../data/products';
import {
  BagIcon,
  CloseIcon,
  HeartIcon,
  MenuIcon,
  SearchIcon,
  UserIcon,
} from './Icons';

const NAV_LINKS = [
  { id: 'graphic', label: 'ГРАФИКА' },
  { id: 'jersey', label: 'ДЖЕРСИ' },
  { id: 'outerwear', label: 'КУРТКИ' },
  { id: 'pants', label: 'БРЮКИ' },
  { id: 'essential', label: 'БАЗА' },
];

export default function Header({
  activeCategory,
  onSelectCategory,
  cartCount,
  wishlistCount,
  onOpenCart,
  onOpenUtility,
  onOpenProduct,
}) {
  const [searchOpen, setSearchOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [query, setQuery] = useState('');

  const trimmed = query.trim().toLowerCase();
  const matches = trimmed
    ? PRODUCTS.filter(
        (p) =>
          p.name.toLowerCase().includes(trimmed) ||
          p.color.toLowerCase().includes(trimmed) ||
          p.categoryLabel.toLowerCase().includes(trimmed)
      )
    : [];

  return (
    <header className="site-header-wrap">
      {/* Slim Black Announcement Bar */}
      <div className="announcement-bar">
        <div className="container announcement-inner">
          <span className="announcement-left">БЕСПЛАТНАЯ ДОСТАВКА ОТ 5 000 ₽</span>
          <div className="announcement-links">
            <button type="button" onClick={() => onOpenUtility('track')}>
              ОТСЛЕДИТЬ ЗАКАЗ
            </button>
            <span aria-hidden="true">|</span>
            <button type="button" onClick={() => onOpenUtility('help')}>
              ВОЗВРАТ 15 ДНЕЙ
            </button>
            <span aria-hidden="true">|</span>
            <button type="button" onClick={() => onOpenUtility('help')}>
              ПОМОЩЬ
            </button>
          </div>
        </div>
      </div>

      {/* Main Navigation Integrated on Warm Stone Canvas */}
      <div className="main-nav-band">
        <div className="container main-nav">
          <div className="nav-left-desktop">
            {NAV_LINKS.map((link) => (
              <button
                key={link.id}
                type="button"
                className={`nav-link-btn ${activeCategory === link.id ? 'is-active' : ''}`}
                onClick={() => onSelectCategory(link.id)}
              >
                {link.label}
              </button>
            ))}
          </div>

          <button
            type="button"
            className="mobile-menu-trigger"
            onClick={() => setMobileMenuOpen((v) => !v)}
            aria-label="Меню категорий"
          >
            {mobileMenuOpen ? <CloseIcon size={18} /> : <MenuIcon size={18} />}
          </button>

          <a
            href="#top"
            className="nav-brand-logo"
            onClick={(e) => {
              e.preventDefault();
              onSelectCategory('all', false);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          >
            GAZU
          </a>

          <div className="nav-right-actions">
            <button
              type="button"
              className="nav-action-btn"
              onClick={() => setSearchOpen((v) => !v)}
              aria-label="Поиск"
            >
              <SearchIcon size={15} />
              <span>ПОИСК</span>
            </button>

            <button
              type="button"
              className="nav-action-btn nav-hide-sm"
              onClick={() => onOpenUtility('account')}
              aria-label="Кабинет"
            >
              <UserIcon size={15} />
              <span>КАБИНЕТ</span>
            </button>

            <button
              type="button"
              className="nav-action-btn"
              onClick={() => onOpenCart('wishlist')}
              aria-label={`Избранное (${wishlistCount})`}
            >
              <HeartIcon size={15} filled={wishlistCount > 0} />
              <span className="nav-action-label">ИЗБРАННОЕ</span>
              {wishlistCount > 0 && <span className="nav-action-count">({wishlistCount})</span>}
            </button>

            <button
              type="button"
              className="nav-action-btn"
              onClick={() => onOpenCart('cart')}
              aria-label={`Корзина (${cartCount})`}
            >
              <BagIcon size={15} />
              <span className="nav-action-label">КОРЗИНА</span>
              <span className="nav-action-count">({cartCount})</span>
            </button>
          </div>
        </div>

        {/* Mobile Category Drawer */}
        {mobileMenuOpen && (
          <div className="mobile-nav-drawer">
            <div className="container mobile-nav-links">
              <button
                type="button"
                onClick={() => {
                  onSelectCategory('all');
                  setMobileMenuOpen(false);
                }}
              >
                ВЕСЬ КАТАЛОГ
              </button>
              {NAV_LINKS.map((link) => (
                <button
                  key={link.id}
                  type="button"
                  onClick={() => {
                    onSelectCategory(link.id);
                    setMobileMenuOpen(false);
                  }}
                >
                  {link.label}
                </button>
              ))}
              <button
                type="button"
                onClick={() => {
                  onOpenUtility('account');
                  setMobileMenuOpen(false);
                }}
              >
                КАБИНЕТ И ЗАКАЗЫ
              </button>
            </div>
          </div>
        )}

        {/* Collapsible Live Search Bar */}
        {searchOpen && (
          <div className="search-drawer">
            <div className="container">
              <div className="search-input-row">
                <SearchIcon size={16} />
                <input
                  type="text"
                  autoFocus
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Поиск по коллекции: Ferrari, CHOIZE, Akogareru, HLDE..."
                />
                <button
                  type="button"
                  onClick={() => {
                    setSearchOpen(false);
                    setQuery('');
                  }}
                  aria-label="Закрыть поиск"
                >
                  <CloseIcon size={16} />
                </button>
              </div>

              {trimmed && (
                <div className="search-results">
                  {matches.length === 0 ? (
                    <p className="search-empty">По запросу «{query}» ничего не найдено.</p>
                  ) : (
                    <div className="search-results-grid">
                      {matches.map((item) => (
                        <button
                          key={item.id}
                          type="button"
                          className="search-result-card"
                          onClick={() => {
                            onOpenProduct(item);
                            setSearchOpen(false);
                          }}
                        >
                          <img src={item.image} alt={item.name} />
                          <div>
                            <strong>{item.name}</strong>
                            <span>{formatRub(item.price)}</span>
                          </div>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
