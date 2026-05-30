import { Routes, Route, BrowserRouter } from "react-router-dom";
import { PageWrapper } from "@/shared/layout/PageWrapper";
import HomePage from "@/modules/catalog/pages/HomePage";
import ProductPage from "@/modules/catalog/pages/ProductPage";
import CartPage from "@/modules/cart/pages/CartPage";
import OrdersPage from "@/modules/pedidos/pages/OrdersPage";
import CheckoutPage from "@/modules/checkout/pages/CheckoutPage";

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<PageWrapper />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/productos/:id" element={<ProductPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/pedidos" element={<OrdersPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
