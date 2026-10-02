import Link from "next/link";
import { Triangle, Search } from "lucide-react";

const NAV_ITEMS = [
  { label: "Learn", href: "/" },
  { label: "Visualize", href: "/algorithms/bubble-sort" },
];

const SOON_ITEMS = ["Practice", "Problems", "Resources"];

export function TopNav() {
  return (
    <header className="flex h-16 items-center justify-between border-b border-amber-500/10 bg-black/60 px-6 backdrop-blur">
      <Link href="/" className="flex items-center gap-2">
        <Triangle className="h-5 w-5 fill-amber-400 text-amber-400" />
        <span className="font-mono text-lg font-semibold text-zinc-100">AlgoVisualizer</span>
      </Link>

      <nav className="hidden items-center gap-6 text-sm font-medium md:flex">
        {NAV_ITEMS.map((item) => (
          <Link key={item.label} href={item.href} className="text-zinc-300 hover:text-amber-400">
            {item.label}
          </Link>
        ))}
        {SOON_ITEMS.map((label) => (
          <span key={label} title="Coming soon" className="cursor-default text-zinc-600">
            {label}
          </span>
        ))}
      </nav>

      <div className="flex items-center gap-3">
        <div className="hidden items-center gap-2 rounded-full border border-amber-500/15 bg-zinc-900 px-3 py-1.5 text-sm text-zinc-500 sm:flex">
          <Search className="h-4 w-4" />
          <span>Search algorithms…</span>
        </div>
        <span
          title="Coming soon"
          className="cursor-default rounded-full bg-amber-500/90 px-4 py-1.5 text-sm font-medium text-black"
        >
          Sign In
        </span>
      </div>
    </header>
  );
}
