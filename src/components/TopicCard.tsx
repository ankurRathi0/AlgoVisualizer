import Link from "next/link";
import type { ComponentType } from "react";

interface Props {
  label: string;
  description: string;
  icon: ComponentType<{ className?: string }>;
  href?: string;
}

export function TopicCard({ label, description, icon: Icon, href }: Props) {
  const content = (
    <>
      <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-gradient-to-br from-amber-400/20 to-black shadow-[0_0_20px_rgba(245,196,81,0.25)]">
        <Icon className="h-8 w-8 text-amber-400" />
      </div>
      <div>
        <p className="font-semibold text-zinc-100">{label}</p>
        <p className="text-sm text-zinc-500">{description}</p>
      </div>
    </>
  );

  const className =
    "flex min-w-[180px] flex-1 flex-col gap-4 rounded-xl border border-amber-500/15 bg-zinc-950 p-5 transition-colors";

  if (!href) {
    return (
      <div className={`${className} opacity-50`} title="Coming soon">
        {content}
      </div>
    );
  }

  return (
    <Link href={href} className={`${className} hover:border-amber-500`}>
      {content}
    </Link>
  );
}
