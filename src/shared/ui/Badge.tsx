export function Badge({ count }: { count: number }) {
  if (count === 0) return null;
  return (
    <span className="absolute -top-1.5 -right-1.5 bg-indigo-600 text-white text-[10px] font-bold rounded-full min-w-[18px] h-[18px] flex items-center justify-center px-1 leading-none">
      {count > 99 ? "99+" : count}
    </span>
  );
}
