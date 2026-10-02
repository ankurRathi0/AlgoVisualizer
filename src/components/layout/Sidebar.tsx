import Link from "next/link";
import {
  Home,
  Boxes,
  Link2,
  Layers,
  GitBranch,
  Share2,
  Binary,
  ArrowUpDown,
  Search,
} from "lucide-react";
import type { ComponentType } from "react";

interface NavEntry {
  label: string;
  href?: string;
  icon: ComponentType<{ className?: string }>;
}

const ENTRIES: NavEntry[] = [
  { label: "Home", href: "/", icon: Home },
  { label: "Arrays", href: "/algorithms/bubble-sort", icon: Boxes },
  { label: "Sorting", href: "/algorithms/bubble-sort", icon: ArrowUpDown },
  { label: "Linked List", icon: Link2 },
  { label: "Stack & Queue", icon: Layers },
  { label: "Trees", icon: GitBranch },
  { label: "Graphs", icon: Share2 },
  { label: "Searching", icon: Search },
  { label: "Dynamic Programming", icon: Binary },
];

export function Sidebar() {
  return (
    <aside className="hidden w-56 flex-col gap-1 border-r border-amber-500/10 bg-black/40 px-3 py-6 lg:flex">
      {ENTRIES.map(({ label, href, icon: Icon }) =>
        href ? (
          <Link
            key={label}
            href={href}
            className="flex items-center gap-3 rounded-md px-3 py-2 text-sm text-zinc-300 hover:bg-amber-500/10 hover:text-amber-300"
          >
            <Icon className="h-4 w-4" />
            {label}
          </Link>
        ) : (
          <div
            key={label}
            title="Coming soon"
            className="flex cursor-default items-center gap-3 rounded-md px-3 py-2 text-sm text-zinc-600"
          >
            <Icon className="h-4 w-4" />
            {label}
          </div>
        ),
      )}

      <p className="mt-auto px-3 pt-8 text-xs italic text-zinc-600">
        &ldquo;Visualize. Understand. Master.&rdquo;
      </p>
    </aside>
  );
}
