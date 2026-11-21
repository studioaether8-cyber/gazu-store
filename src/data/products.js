export const SIZES = ['S', 'M', 'L', 'XL'];

export const SIZE_MEASUREMENTS = [
  { size: 'S', chest: '116 см', length: '68 см', waist: '72–78 см' },
  { size: 'M', chest: '122 см', length: '71 см', waist: '78–84 см' },
  { size: 'L', chest: '128 см', length: '74 см', waist: '84–90 см' },
  { size: 'XL', chest: '134 см', length: '77 см', waist: '90–98 см' },
];

export const CATEGORY_FILTERS = [
  { id: 'all', label: 'ВСЕ' },
  { id: 'graphic', label: 'ФУТБОЛКИ' },
  { id: 'jersey', label: 'ДЖЕРСИ' },
  { id: 'outerwear', label: 'КУРТКИ' },
  { id: 'pants', label: 'БРЮКИ' },
  { id: 'essential', label: 'БАЗА' },
];

export const PRODUCTS = [
  {
    id: 'akogareru-tee',
    name: 'Футболка Akogareru Oversize',
    category: 'graphic',
    categoryLabel: 'ГРАФИКА · Y2K ARCHIVE',
    color: 'Выстиранный угольно-чёрный / Красный принт',
    price: 3490,
    oldPrice: 4290,
    badge: 'БЕСТСЕЛЛЕР',
    image: './images/prod-akogareru.jpg',
    sizes: SIZES,
    material: '100% чесаный хлопок джерси, 250 г/м²',
    fit: 'Свободный boxy крой со спущенным плечом',
    description:
      'Плотная футболка с эффектом лёгкой винтажной стирки. Крупная шелкография на груди объединяет растровый портрет, красную иероглифику «あこがれる» и типографику в духе Y2K.',
  },
  {
    id: 'choize-jersey',
    name: 'Джерси CHOIZE 69 Oversize',
    category: 'jersey',
    categoryLabel: 'ДЖЕРСИ · BLOKECORE',
    color: 'Глубокий чёрный / Белый кант',
    price: 3890,
    oldPrice: 4690,
    badge: 'БЕСТСЕЛЛЕР',
    image: './images/prod-choize.jpg',
    sizes: SIZES,
    material: 'Гладкий плотный хлопково-спортивный трикотаж, 240 г/м²',
    fit: 'Удлинённый оверсайз с широкими рукавами',
    description:
      'Уличное прочтение футбольной формы: контрастный белый кант по плечевым и боковым швам, готический номер «69», гербовый шеврон и крупный контурный принт CHOIZE.',
  },
  {
    id: 'z-tribal-tee',
    name: 'Футболка Z-Cyber Tribal',
    category: 'graphic',
    categoryLabel: 'ГРАФИКА · CYBER',
    color: 'Ледяной небесно-голубой / Белый',
    price: 3690,
    oldPrice: 4490,
    badge: 'НОВИНКА',
    image: './images/prod-ztribal.jpg',
    sizes: SIZES,
    material: 'Гладкий двухслойный джерси, 245 г/м²',
    fit: 'Расслабленный оверсайз с широкой горловиной',
    description:
      'Пастельный голубой силуэт с симметричными белыми трайбл-элементами по бокам торса и фирменной овальной эмблемой «Z» на груди и манжетах рукавов.',
  },
  {
    id: 'ferrari-jacket',
    name: 'Куртка Scuderia F1 Racing Bomber',
    category: 'outerwear',
    categoryLabel: 'ВЕРХНЯЯ ОДЕЖДА · ОБРАЗ С ГЛАВНОЙ',
    color: 'Гоночный красный / Белый кант',
    price: 8990,
    oldPrice: 10990,
    badge: 'ОБРАЗ ДНЯ',
    pairWithId: 'hlde-pants',
    image: './images/prod-ferrari-jacket.jpg',
    sizes: SIZES,
    material: 'Плотный хлопковый твил с мягкой стёганой подкладкой',
    fit: 'Укороченный объёмный бомбер со стойкой',
    description:
      'Архивная гоночная куртка-бомбер на молнии с контрастной белой окантовкой, полосатой резинкой на манжетах и поясе и детальной вышивкой патчей Scuderia F1.',
  },
  {
    id: 'hlde-pants',
    name: 'Брюки HLDE Wide-Leg Graphic',
    category: 'pants',
    categoryLabel: 'БРЮКИ · ОБРАЗ С ГЛАВНОЙ',
    color: 'Тёмно-графитовый кислотный деним/флис',
    price: 5990,
    oldPrice: 7290,
    badge: 'ОБРАЗ ДНЯ',
    pairWithId: 'ferrari-jacket',
    image: './images/prod-hlde-pants.jpg',
    sizes: SIZES,
    material: 'Тяжёлый футер без начёса 460 г/м², эффект кислотной варки',
    fit: 'Ультра-широкие трубы с асимметричной передней панелью',
    description:
      'Массивные широкие брюки из плотного вываренного трикотажа с висящим передним поясом-панелью, трафаретным графическим принтом HLDE и вертикальными текстовыми колонками.',
  },
  {
    id: 'acid-blank-tee',
    name: 'Футболка Heavyweight Acid-Wash',
    category: 'essential',
    categoryLabel: 'БАЗА · ESSENTIAL',
    color: 'Минеральный серый графит',
    price: 2990,
    oldPrice: 3690,
    badge: 'БАЗА',
    image: './images/prod-acid-tee.jpg',
    sizes: SIZES,
    material: '100% органический плотный хлопок, 280 г/м²',
    fit: 'Классический архитектурный оверсайз',
    description:
      'Идеальная базовая футболка без внешних логотипов. Высокая плотность ткани держит геометрию плеч, а минеральная стирка создаёт живую графитовую фактуру.',
  },
];

export const formatRub = (amount) =>
  `${new Intl.NumberFormat('ru-RU').format(amount)} ₽`;
