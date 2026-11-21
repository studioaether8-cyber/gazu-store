import React, { useEffect, useState } from 'react';
import { PRODUCTS, formatRub } from '../data/products';
import { CheckIcon, CloseIcon, HeartIcon, MinusIcon, PlusIcon, TrashIcon } from './Icons';

const FREE_SHIPPING_THRESHOLD = 5000;

export default function CartDrawer({
  isOpen,
  initialTab,
  cartItems,
  wishlistIds,
  onClose,
  onUpdateQty,
  onRemoveItem,
  onClearCart,
  onToggleWishlist,
  onAddWishlistToCart,
  onOpenProduct,
  onOrderCreated,
}) {
  const [tab, setTab] = useState(initialTab || 'cart');
  const [step, setStep] = useState('bag');
  const [orderInfo, setOrderInfo] = useState(null);
  const [form, setForm] = useState({
    name: '',
    contact: '',
    city: '',
    address: '',
    delivery: 'courier',
    payment: 'sbp',
  });
  const [error, setError] = useState('');

  useEffect(() => {
    if (isOpen && initialTab) {
      setTab(initialTab);
      if (initialTab === 'cart' && step === 'success' && cartItems.length > 0) {
        setStep('bag');
      }
    }
  }, [isOpen, initialTab]);

  if (!isOpen) return null;

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.qty, 0);
  const oldTotal = cartItems.reduce((sum, item) => sum + item.oldPrice * item.qty, 0);
  const discount = Math.max(0, oldTotal - subtotal);
  const totalCount = cartItems.reduce((sum, item) => sum + item.qty, 0);
  const remainingFree = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal);
  const shippingFee = subtotal === 0 || remainingFree === 0 ? 0 : 490;
  const finalTotal = subtotal + shippingFee;
  const progressPct = Math.min(100, Math.round((subtotal / FREE_SHIPPING_THRESHOLD) * 100));

  const wishlistProducts = PRODUCTS.filter((p) => wishlistIds.includes(p.id));

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name.trim() || !form.contact.trim() || !form.address.trim()) {
      setError('Укажите имя, телефон или Telegram и адрес доставки.');
      return;
    }
    setError('');
    const num = `GZ-${Math.floor(1000 + Math.random() * 8999)}`;
    const record = {
      orderNumber: num,
      date: new Date().toLocaleDateString('ru-RU'),
      status: 'Принят в обработку',
      name: form.name.trim(),
      contact: form.contact.trim(),
      address: `${form.city.trim() ? `${form.city.trim()}, ` : ''}${form.address.trim()}`,
      delivery: form.delivery === 'courier' ? 'Курьером' : 'СДЭК ПВЗ',
      items: [...cartItems],
      total: finalTotal,
    };
    setOrderInfo(record);
    onOrderCreated(record);
    onClearCart();
    setStep('success');
  };

  return (
    <div className="drawer-backdrop" onClick={onClose} role="presentation">
      <aside
        className="cart-drawer"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label="Корзина и избранное"
      >
        <div className="drawer-top">
          <div className="drawer-tabs" role="tablist">
            <button
              type="button"
              role="tab"
              aria-selected={tab === 'cart'}
              className={`drawer-tab ${tab === 'cart' ? 'is-active' : ''}`}
              onClick={() => {
                setTab('cart');
                if (step === 'success' && cartItems.length > 0) setStep('bag');
              }}
            >
              КОРЗИНА ({totalCount})
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={tab === 'wishlist'}
              className={`drawer-tab ${tab === 'wishlist' ? 'is-active' : ''}`}
              onClick={() => setTab('wishlist')}
            >
              ИЗБРАННОЕ ({wishlistProducts.length})
            </button>
          </div>

          <button
            type="button"
            className="modal-close-square"
            onClick={onClose}
            aria-label="Закрыть панель"
          >
            <CloseIcon size={17} />
          </button>
        </div>

        <div className="drawer-body">
          {tab === 'wishlist' ? (
            wishlistProducts.length === 0 ? (
              <div className="drawer-empty">
                <div className="drawer-empty-icon">
                  <HeartIcon size={24} />
                </div>
                <h3>Избранное пусто</h3>
                <p>Нажмите на иконку сердца на любой карточке товара, чтобы сохранить вещь.</p>
              </div>
            ) : (
              <div className="drawer-list">
                {wishlistProducts.map((item) => (
                  <div key={item.id} className="drawer-item">
                    <button
                      type="button"
                      className="drawer-thumb"
                      onClick={() => {
                        onOpenProduct(item);
                        onClose();
                      }}
                    >
                      <img src={item.image} alt={item.name} />
                    </button>

                    <div className="drawer-item-info">
                      <div className="drawer-item-head">
                        <strong>{item.name}</strong>
                        <button
                          type="button"
                          className="icon-muted-btn"
                          onClick={() => onToggleWishlist(item.id)}
                          aria-label={`Удалить ${item.name} из избранного`}
                        >
                          <TrashIcon size={14} />
                        </button>
                      </div>
                      <span className="drawer-item-sub">{item.color}</span>

                      <div className="drawer-item-bottom">
                        <span className="drawer-price">{formatRub(item.price)}</span>
                        <button
                          type="button"
                          className="btn-solid-black btn-xs"
                          onClick={() => {
                            onAddWishlistToCart(item, 'L');
                            setTab('cart');
                            setStep('bag');
                          }}
                        >
                          В КОРЗИНУ · L
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )
          ) : step === 'success' && orderInfo ? (
            <div className="order-success">
              <div className="success-badge">
                <CheckIcon size={22} />
              </div>
              <span className="eyebrow-label">ЗАКАЗ ОФОРМЛЕН</span>
              <h3>Заказ #{orderInfo.orderNumber} оформлен</h3>
              <p>
                Детали заказа и трек-номер отправлены на <strong>{orderInfo.contact}</strong>.
              </p>

              <div className="receipt-box">
                <div className="receipt-row">
                  <span>Получатель</span>
                  <strong>{orderInfo.name}</strong>
                </div>
                <div className="receipt-row">
                  <span>Доставка</span>
                  <strong>{orderInfo.delivery}</strong>
                </div>
                <div className="receipt-row">
                  <span>Адрес</span>
                  <strong>{orderInfo.address}</strong>
                </div>
                <div className="receipt-line" />
                {orderInfo.items.map((item) => (
                  <div key={`${item.id}-${item.size}`} className="receipt-row">
                    <span>
                      {item.name} · {item.size} × {item.qty}
                    </span>
                    <strong>{formatRub(item.price * item.qty)}</strong>
                  </div>
                ))}
                <div className="receipt-line" />
                <div className="receipt-row receipt-total">
                  <span>Итого</span>
                  <strong>{formatRub(orderInfo.total)}</strong>
                </div>
              </div>

              <button
                type="button"
                className="btn-solid-black btn-full"
                onClick={() => {
                  setStep('bag');
                  onClose();
                }}
              >
                ВЕРНУТЬСЯ В МАГАЗИН
              </button>
            </div>
          ) : cartItems.length === 0 ? (
            <div className="drawer-empty">
              <div className="drawer-empty-icon">GZ</div>
              <h3>Корзина пуста</h3>
              <p>Выберите вещи из коллекции GAZU и добавьте нужный размер в корзину.</p>
              <button type="button" className="btn-solid-black" onClick={onClose}>
                ПЕРЕЙТИ К ПОКУПКАМ
              </button>
            </div>
          ) : step === 'checkout' ? (
            <form className="checkout-form" onSubmit={handleSubmit} noValidate>
              <div className="checkout-top">
                <button
                  type="button"
                  className="btn-underline-link"
                  onClick={() => setStep('bag')}
                >
                  ← НАЗАД В КОРЗИНУ
                </button>
                <strong>{formatRub(finalTotal)}</strong>
              </div>

              <label className="field">
                <span>ИМЯ И ФАМИЛИЯ</span>
                <input
                  type="text"
                  placeholder="Адам Смирнов"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                />
              </label>

              <label className="field">
                <span>ТЕЛЕФОН ИЛИ TELEGRAM</span>
                <input
                  type="text"
                  placeholder="+7 (999) 000-00-00 или @username"
                  value={form.contact}
                  onChange={(e) => setForm({ ...form, contact: e.target.value })}
                />
              </label>

              <div className="field-grid-2">
                <label className="field">
                  <span>ГОРОД</span>
                  <input
                    type="text"
                    placeholder="Москва"
                    value={form.city}
                    onChange={(e) => setForm({ ...form, city: e.target.value })}
                  />
                </label>

                <label className="field">
                  <span>АДРЕС ИЛИ ПВЗ</span>
                  <input
                    type="text"
                    placeholder="Никитская, 10"
                    value={form.address}
                    onChange={(e) => setForm({ ...form, address: e.target.value })}
                  />
                </label>
              </div>

              <div className="field">
                <span>ДОСТАВКА</span>
                <div className="choice-grid-2">
                  <button
                    type="button"
                    className={`choice-box ${form.delivery === 'courier' ? 'is-active' : ''}`}
                    onClick={() => setForm({ ...form, delivery: 'courier' })}
                  >
                    Курьером ({shippingFee === 0 ? '0 ₽' : '490 ₽'})
                  </button>
                  <button
                    type="button"
                    className={`choice-box ${form.delivery === 'cdek' ? 'is-active' : ''}`}
                    onClick={() => setForm({ ...form, delivery: 'cdek' })}
                  >
                    СДЭК ПВЗ ({shippingFee === 0 ? '0 ₽' : '490 ₽'})
                  </button>
                </div>
              </div>

              <div className="field">
                <span>ОПЛАТА</span>
                <div className="choice-grid-2">
                  <button
                    type="button"
                    className={`choice-box ${form.payment === 'sbp' ? 'is-active' : ''}`}
                    onClick={() => setForm({ ...form, payment: 'sbp' })}
                  >
                    СБП / Картой онлайн
                  </button>
                  <button
                    type="button"
                    className={`choice-box ${form.payment === 'cod' ? 'is-active' : ''}`}
                    onClick={() => setForm({ ...form, payment: 'cod' })}
                  >
                    При получении
                  </button>
                </div>
              </div>

              {error && <p className="form-error">{error}</p>}

              <button type="submit" className="btn-solid-black btn-full">
                ПОДТВЕРДИТЬ ЗАКАЗ · {formatRub(finalTotal)}
              </button>
            </form>
          ) : (
            <>
              <div className="shipping-meter">
                <p>
                  {remainingFree === 0
                    ? 'Бесплатная доставка открыта'
                    : `До бесплатной доставки: ${formatRub(remainingFree)}`}
                </p>
                <div className="shipping-track">
                  <div className="shipping-fill" style={{ width: `${progressPct}%` }} />
                </div>
              </div>

              <div className="drawer-list">
                {cartItems.map((item) => (
                  <div key={`${item.id}-${item.size}`} className="drawer-item">
                    <div className="drawer-thumb">
                      <img src={item.image} alt={item.name} />
                    </div>

                    <div className="drawer-item-info">
                      <div className="drawer-item-head">
                        <strong>{item.name}</strong>
                        <button
                          type="button"
                          className="icon-muted-btn"
                          onClick={() => onRemoveItem(item.id, item.size)}
                          aria-label={`Удалить ${item.name}`}
                        >
                          <TrashIcon size={14} />
                        </button>
                      </div>
                      <span className="drawer-item-sub">Размер {item.size}</span>

                      <div className="drawer-item-bottom">
                        <div className="qty-box">
                          <button
                            type="button"
                            onClick={() => onUpdateQty(item.id, item.size, -1)}
                            aria-label="Уменьшить количество"
                          >
                            <MinusIcon size={12} />
                          </button>
                          <span>{item.qty}</span>
                          <button
                            type="button"
                            onClick={() => onUpdateQty(item.id, item.size, 1)}
                            aria-label="Увеличить количество"
                          >
                            <PlusIcon size={12} />
                          </button>
                        </div>

                        <div className="drawer-price-col">
                          <span className="drawer-price">{formatRub(item.price * item.qty)}</span>
                          <span className="drawer-old">{formatRub(item.oldPrice * item.qty)}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="drawer-summary">
                {discount > 0 && (
                  <div className="summary-row">
                    <span>Скидка коллекции</span>
                    <span>−{formatRub(discount)}</span>
                  </div>
                )}
                <div className="summary-row">
                  <span>Доставка</span>
                  <span>{shippingFee === 0 ? 'Бесплатно' : formatRub(shippingFee)}</span>
                </div>
                <div className="summary-row summary-total">
                  <span>ИТОГО</span>
                  <strong>{formatRub(finalTotal)}</strong>
                </div>

                <button
                  type="button"
                  className="btn-solid-black btn-full"
                  onClick={() => setStep('checkout')}
                >
                  ОФОРМИТЬ ЗАКАЗ
                </button>
              </div>
            </>
          )}
        </div>
      </aside>
    </div>
  );
}
