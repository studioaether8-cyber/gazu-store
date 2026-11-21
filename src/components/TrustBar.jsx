import React from 'react';
import {
  LockIcon,
  QualityBadgeIcon,
  ReturnBoxIcon,
  TruckIcon,
} from './Icons';

const TRUST_ITEMS = [
  {
    icon: TruckIcon,
    title: 'БЫСТРАЯ ДОСТАВКА',
    desc: 'Отправка по РФ за 24 часа',
  },
  {
    icon: ReturnBoxIcon,
    title: 'ЛЁГКИЙ ВОЗВРАТ',
    desc: 'Обмен и возврат до 15 дней',
  },
  {
    icon: QualityBadgeIcon,
    title: 'ПРОВЕРЕННОЕ КАЧЕСТВО',
    desc: 'Плотный хлопок и чёткий крой',
  },
  {
    icon: LockIcon,
    title: 'БЕЗОПАСНАЯ ОПЛАТА',
    desc: 'СБП, карта или при получении',
  },
];

export default function TrustBar() {
  return (
    <section className="trust-bar-band" aria-label="Преимущества магазина">
      <div className="container trust-bar-grid">
        {TRUST_ITEMS.map((item) => {
          const IconComponent = item.icon;
          return (
            <div key={item.title} className="trust-item">
              <div className="trust-icon">
                <IconComponent size={24} />
              </div>
              <div className="trust-copy">
                <h4>{item.title}</h4>
                <p>{item.desc}</p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
