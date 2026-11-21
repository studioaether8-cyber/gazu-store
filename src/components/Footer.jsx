import React, { useState } from 'react';

export default function Footer({ onSelectCategory, onOpenUtility }) {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSub = (e) => {
    e.preventDefault();
    if (!email.trim()) return;
    setSubscribed(true);
    setEmail('');
  };

  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <div className="footer-brand">
          <span className="footer-logo">GAZU</span>
          <p>
            Минималистичная витрина архивного стритвира и базового гардероба. Ограниченные дропы,
            плотный хлопок и чёткий силуэт.
          </p>
        </div>

        <div className="footer-col">
          <h4>КАТАЛОГ</h4>
          <button type="button" onClick={() => onSelectCategory('all')}>Вся коллекция</button>
          <button type="button" onClick={() => onSelectCategory('graphic')}>Графические футболки</button>
          <button type="button" onClick={() => onSelectCategory('jersey')}>Джерси</button>
          <button type="button" onClick={() => onSelectCategory('outerwear')}>Верхняя одежда</button>
          <button type="button" onClick={() => onSelectCategory('pants')}>Широкие брюки</button>
          <button type="button" onClick={() => onSelectCategory('essential')}>Базовая одежда</button>
        </div>

        <div className="footer-col">
          <h4>СЕРВИС</h4>
          <button type="button" onClick={() => onOpenUtility('track')}>Отследить заказ</button>
          <button type="button" onClick={() => onOpenUtility('help')}>Доставка и оплата</button>
          <button type="button" onClick={() => onOpenUtility('help')}>Возврат 15 дней</button>
          <button type="button" onClick={() => onOpenUtility('account')}>Личный кабинет</button>
        </div>

        <div className="footer-col footer-newsletter">
          <h4>НОВЫЕ ДРОПЫ</h4>
          <p>Оставьте почту или Telegram — сообщим о поступлении размеров первыми.</p>
          {subscribed ? (
            <p className="footer-sub-ok">Вы подписаны на обновления GAZU.</p>
          ) : (
            <form className="footer-form" onSubmit={handleSub}>
              <input
                type="text"
                placeholder="Email или @telegram"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <button type="submit">ОК</button>
            </form>
          )}
        </div>
      </div>

      <div className="container footer-bottom">
        <span>© 2026 GAZU STUDIO. Все права защищены.</span>
        <span>Москва · Санкт-Петербург · Доставка по РФ</span>
      </div>
    </footer>
  );
}
