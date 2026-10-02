import Link from "next/link";
import type { ComponentType } from "react";
import { Card, CardContent } from "./ui/card";
import { CardHoverMotion } from "./CardHoverMotion";

interface Props {
  label: string;
  description: string;
  icon: ComponentType<{ className?: string }>;
  href?: string;
}

export function TopicCard({ label, description, icon: Icon, href }: Props) {
  const card = (
    <CardHoverMotion disabled={!href}>
      <Card
        className={`min-w-[180px] flex-1 border transition-colors ${
          href ? "border-amber-500/15 hover:border-amber-500" : "border-amber-500/10 opacity-50"
        }`}
      >
        <CardContent className="flex flex-col gap-4">
          <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-gradient-to-br from-amber-400/20 to-black shadow-[0_0_20px_rgba(245,196,81,0.25)]">
            <Icon className="h-8 w-8 text-amber-400" />
          </div>
          <div>
            <p className="font-semibold text-foreground">{label}</p>
            <p className="text-sm text-muted-foreground">{description}</p>
          </div>
        </CardContent>
      </Card>
    </CardHoverMotion>
  );

  if (!href) {
    return <div title="Coming soon">{card}</div>;
  }

  return <Link href={href}>{card}</Link>;
}
