import { Routes, Route, BrowserRouter } from "react-router-dom";
import { PageWrapper } from "@/shared/layout/PageWrapper";
import { ProtectedRoute } from "./ProtectedRoute";
import HomePage from "@/modules/catalog/productos/pages/HomePage";
import ProductPage from "@/modules/catalog/productos/pages/ProductPage";
import CartPage from "@/modules/cart/pages/CartPage";
import OrdersPage from "@/modules/pedidos/pages/OrdersPage";
import OrderDetailPage from "@/modules/pedidos/pages/OrderDetailPage";
import CheckoutPage from "@/modules/checkout/pages/CheckoutPage";
import PaymentPage from "@/modules/checkout/pages/PaymentPage";
import PaymentResultPage from "@/modules/checkout/pages/PaymentResultPage";
import LoginPage from "@/modules/auth/pages/LoginPage";
import RegisterPage from "@/modules/auth/pages/RegisterPage";
import AccountPage from "@/modules/account/pages/AccountPage";

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Rutas públicas (sin layout) */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        {/* Rutas con layout — catálogo y carrito son públicos */}
        <Route element={<PageWrapper />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/productos/:id" element={<ProductPage />} />
          <Route path="/cart" element={<CartPage />} />

          {/* Rutas que requieren auth */}
          <Route element={<ProtectedRoute />}>
            <Route path="/cuenta" element={<AccountPage />} />
            <Route path="/pedidos" element={<OrdersPage />} />
            <Route path="/pedidos/:id" element={<OrderDetailPage />} />
            <Route path="/pedidos/:id/pago/:status" element={<PaymentResultPage />} />
            <Route path="/checkout" element={<CheckoutPage />} />
            <Route path="/pago/:pedidoId" element={<PaymentPage />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
