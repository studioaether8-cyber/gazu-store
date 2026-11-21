import React, { useState } from 'react';
import { formatRub } from '../data/products';
import { CloseIcon } from './Icons';

export default function UtilityModal({
  mode,
  orders,
  onClose,
}) {
  const [trackCode, setTrackCode] = useState('');
  const [trackResult, setTrackResult] = useState(null);

  if (!mode) return null;

  const handleTrack = (e) => {
    e.preventDefault();
    const cleaned = trackCode.trim().toUpperCase().replace(/^#/, '');
    if (!cleaned) return;
    const found = orders.find((o) => o.orderNumber.toUpperCase() === cleaned);
    setTrackResult(
      found || {
        orderNumber: cleaned,
        status: 'Передан в службу доставки',
        delivery: 'СДЭК / Курьер',
        date: 'Сегодня',
      }
    );
  };

  return (
    <div className="modal-backdrop" onClick={onClose} role="presentation">
      <div
        className="utility-modal"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label={
          mode === 'track'
            ? 'Отслеживание заказа'
            : mode === 'account'
              ? 'Личный кабинет'
              : 'Помощь и возврат'
        }
      >
        <div className="utility-modal-head">
          <div>
            <span className="eyebrow-label">GAZU СЕРВИС</span>
            <h3>
              {mode === 'track'
                ? 'Отследить заказ'
                : mode === 'account'
                  ? 'Кабинет покупателя'
                  : 'Доставка, возврат и помощь'}
            </h3>
          </div>
          <button
            type="button"
            className="modal-close-square"
            onClick={onClose}
            aria-label="Закрыть"
          >
            <CloseIcon size={17} />
          </button>
        </div>

        {mode === 'track' && (
          <div className="utility-body">
            <form className="track-form" onSubmit={handleTrack}>
              <input
                type="text"
                placeholder="Введите номер заказа (например, GZ-4120)"
                value={trackCode}
                onChange={(e) => setTrackCode(e.target.value)}
              />
              <button type="submit" className="btn-solid-black">
                ПРОВЕРИТЬ
              </button>
            </form>

            {trackResult && (
              <div className="receipt-box">
                <div className="receipt-row">
                  <span>Заказ</span>
                  <strong>#{trackResult.orderNumber}</strong>
                </div>
                <div className="receipt-row">
                  <span>Статус</span>
                  <strong>{trackResult.status}</strong>
                </div>
                <div className="receipt-row">
                  <span>Служба</span>
                  <strong>{trackResult.delivery}</strong>
                </div>
              </div>
            )}
          </div>
        )}

        {mode === 'account' && (
          <div className="utility-body">
            {orders.length === 0 ? (
              <p className="utility-muted">
                У вас пока нет оформленных заказов в этой сессии. После оформления здесь появится
                история покупок и номера отслеживания.
              </p>
            ) : (
              <div className="account-orders">
                {orders.map((ord) => (
                  <div key={ord.orderNumber} className="receipt-box">
                    <div className="receipt-row">
                      <strong>Заказ #{ord.orderNumber}</strong>
                      <span>{ord.status}</span>
                    </div>
                    <div className="receipt-row">
                      <span>{ord.address}</span>
                      <strong>{formatRub(ord.total)}</strong>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {mode === 'help' && (
          <div className="utility-body help-blocks">
            <div>
              <strong>Доставка</strong>
              <p>Бесплатная доставка курьером или в пункт выдачи СДЭК при сумме заказа от 5 000 ₽. Отправка в течение 24 часов.</p>
            </div>
            <div>
              <strong>Обмен и возврат 15 дней</strong>
              <p>Если не подошёл размер, вещь с сохранёнными бирками можно бесплатно обменять или вернуть в течение 15 дней.</p>
            </div>
            <div>
              <strong>Поддержка GAZU</strong>
              <p>Telegram @gazu_support · hello@gazu.store · Ежедневно с 10:00 до 22:00</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
