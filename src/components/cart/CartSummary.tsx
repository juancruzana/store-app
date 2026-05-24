import { ChevronRight } from "lucide-react";
import { formatPrice } from "@/utils/formatPrice";

const ENVIO = 2.0;

interface CartSummaryProps {
  total: number;
  onCheckout: () => void;
  onContinue?: () => void;
}

export function CartSummary({ total, onCheckout, onContinue }: CartSummaryProps) {
  return (
    <div className="space-y-2">
      <div className="flex justify-between text-sm text-gray-500">
        <span>Subtotal</span>
        <span>{formatPrice(total)}</span>
      </div>
      <div className="flex justify-between text-sm text-gray-500">
        <span>Envío</span>
        <span>{formatPrice(ENVIO)}</span>
      </div>
      <div className="flex justify-between text-base font-bold text-indigo-600 pt-2 border-t border-gray-100">
        <span>Total</span>
        <span>{formatPrice(total + ENVIO)}</span>
      </div>
      <button
        onClick={onCheckout}
        className="mt-3 w-full bg-indigo-600 text-white py-3 rounded-xl font-semibold text-sm hover:bg-indigo-700 transition"
      >
        Continuar
      </button>
      {onContinue && (
        <button
          onClick={onContinue}
          className="w-full flex items-center justify-center gap-1 text-sm text-indigo-600 hover:underline py-1"
        >
          <ChevronRight className="w-4 h-4" />
          Seguir comprando
        </button>
      )}
    </div>
  );
}
