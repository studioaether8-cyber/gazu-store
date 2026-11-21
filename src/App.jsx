import React, { useCallback, useEffect, useState } from 'react';
import CartDrawer from './components/CartDrawer';
import CategoryStrip from './components/CategoryStrip';
import Footer from './components/Footer';
import Header from './components/Header';
import HeroSection from './components/HeroSection';
import NewVibesBanner from './components/NewVibesBanner';
import ProductGrid from './components/ProductGrid';
import ProductModal from './components/ProductModal';
import TrustBar from './components/TrustBar';
import UtilityModal from './components/UtilityModal';
import { PRODUCTS } from './data/products';

const CART_KEY = 'gazu_store_cart_v1';
const WISHLIST_KEY = 'gazu_store_wishlist_v1';
const ORDERS_KEY = 'gazu_store_orders_v1';

function readLS(key, fallback) {
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}

export default function App() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [cartItems, setCartItems] = useState(() => readLS(CART_KEY, []));
  const [wishlistIds, setWishlistIds] = useState(() => readLS(WISHLIST_KEY, []));
  const [orders, setOrders] = useState(() => readLS(ORDERS_KEY, []));

  const [drawerOpen, setDrawerOpen] = useState(false);
  const [drawerTab, setDrawerTab] = useState('cart');
  const [modalProduct, setModalProduct] = useState(null);
  const [utilityMode, setUtilityMode] = useState(null);
  const [toast, setToast] = useState('');

  useEffect(() => {
    try {
      window.localStorage.setItem(CART_KEY, JSON.stringify(cartItems));
    } catch {
      // ignore storage quota errors
    }
  }, [cartItems]);

  useEffect(() => {
    try {
      window.localStorage.setItem(WISHLIST_KEY, JSON.stringify(wishlistIds));
    } catch {
      // ignore storage quota errors
    }
  }, [wishlistIds]);

  useEffect(() => {
    try {
      window.localStorage.setItem(ORDERS_KEY, JSON.stringify(orders));
    } catch {
      // ignore storage quota errors
    }
  }, [orders]);

  useEffect(() => {
    if (!toast) return undefined;
    const t = window.setTimeout(() => setToast(''), 2500);
    return () => window.clearTimeout(t);
  }, [toast]);

  useEffect(() => {
    const onEsc = (e) => {
      if (e.key === 'Escape') {
        setDrawerOpen(false);
        setModalProduct(null);
        setUtilityMode(null);
      }
    };
    window.addEventListener('keydown', onEsc);
    return () => window.removeEventListener('keydown', onEsc);
  }, []);

  const scrollToCatalog = useCallback(() => {
    const el = document.getElementById('catalog');
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, []);

  const handleSelectCategory = useCallback(
    (categoryId, shouldScroll = true) => {
      setActiveCategory(categoryId);
      if (shouldScroll) {
        window.requestAnimationFrame(() => scrollToCatalog());
      }
    },
    [scrollToCatalog]
  );

  const addToCart = useCallback((product, size, openDrawer = true) => {
    setCartItems((prev) => {
      const exists = prev.find((i) => i.id === product.id && i.size === size);
      if (exists) {
        return prev.map((i) =>
          i.id === product.id && i.size === size ? { ...i, qty: i.qty + 1 } : i
        );
      }
      return [
        ...prev,
        {
          id: product.id,
          name: product.name,
          price: product.price,
          oldPrice: product.oldPrice,
          image: product.image,
          size,
          qty: 1,
        },
      ];
    });
    setToast(`${product.name} (${size}) добавлена в корзину`);
    if (openDrawer) {
      setDrawerTab('cart');
      setDrawerOpen(true);
    }
  }, []);

  const updateCartQty = useCallback((id, size, delta) => {
    setCartItems((prev) =>
      prev
        .map((i) => (i.id === id && i.size === size ? { ...i, qty: i.qty + delta } : i))
        .filter((i) => i.qty > 0)
    );
  }, []);

  const removeCartItem = useCallback((id, size) => {
    setCartItems((prev) => prev.filter((i) => !(i.id === id && i.size === size)));
  }, []);

  const toggleWishlist = useCallback((id) => {
    const prod = PRODUCTS.find((p) => p.id === id);
    setWishlistIds((prev) => {
      const has = prev.includes(id);
      if (prod) {
        setToast(
          has ? `${prod.name} удалена из избранного` : `${prod.name} сохранена в избранное`
        );
      }
      return has ? prev.filter((x) => x !== id) : [...prev, id];
    });
  }, []);

  const cartCount = cartItems.reduce((sum, i) => sum + i.qty, 0);

  return (
    <div className="gazu-app">
      <Header
        activeCategory={activeCategory}
        onSelectCategory={handleSelectCategory}
        cartCount={cartCount}
        wishlistCount={wishlistIds.length}
        onOpenCart={(tab) => {
          setDrawerTab(tab || 'cart');
          setDrawerOpen(true);
        }}
        onOpenUtility={setUtilityMode}
        onOpenProduct={setModalProduct}
      />

      <main>
        <HeroSection
          onScrollToCatalog={() => handleSelectCategory('all', true)}
          onExploreLook={() => {
            const heroJacket = PRODUCTS.find((p) => p.id === 'ferrari-jacket');
            if (heroJacket) setModalProduct(heroJacket);
          }}
        />

        <CategoryStrip onSelectCategory={(cat) => handleSelectCategory(cat, true)} />

        <NewVibesBanner onExploreCollection={() => handleSelectCategory('graphic', true)} />

        <TrustBar />

        <ProductGrid
          activeCategory={activeCategory}
          onSelectCategory={(cat) => setActiveCategory(cat)}
          wishlistIds={wishlistIds}
          onToggleWishlist={toggleWishlist}
          onOpenProduct={setModalProduct}
          onQuickAdd={(prod, sz) => addToCart(prod, sz, true)}
        />
      </main>

      <Footer
        onSelectCategory={(cat) => handleSelectCategory(cat, true)}
        onOpenUtility={setUtilityMode}
      />

      <ProductModal
        product={modalProduct}
        isWishlisted={modalProduct ? wishlistIds.includes(modalProduct.id) : false}
        onClose={() => setModalProduct(null)}
        onAddToCart={(prod, sz) => addToCart(prod, sz, true)}
        onToggleWishlist={toggleWishlist}
        onSelectProduct={setModalProduct}
      />

      <CartDrawer
        isOpen={drawerOpen}
        initialTab={drawerTab}
        cartItems={cartItems}
        wishlistIds={wishlistIds}
        onClose={() => setDrawerOpen(false)}
        onUpdateQty={updateCartQty}
        onRemoveItem={removeCartItem}
        onClearCart={() => setCartItems([])}
        onToggleWishlist={toggleWishlist}
        onAddWishlistToCart={(prod, sz) => addToCart(prod, sz, false)}
        onOpenProduct={setModalProduct}
        onOrderCreated={(ord) => setOrders((prev) => [ord, ...prev])}
      />

      <UtilityModal
        mode={utilityMode}
        orders={orders}
        onClose={() => setUtilityMode(null)}
      />

      {toast && (
        <div className="gazu-toast" role="status" aria-live="polite">
          {toast}
        </div>
      )}
    </div>
  );
}
