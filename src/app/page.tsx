import Link from "next/link";
import {
  Boxes,
  Link2,
  Layers,
  GitBranch,
  Share2,
  ArrowUpDown,
} from "lucide-react";
import { HeroVisual } from "@/components/HeroVisual";
import { TopicCard } from "@/components/TopicCard";

const TOPICS = [
  { label: "Arrays", description: "Visualize operations & traversals", icon: Boxes, href: "/algorithms/bubble-sort" },
  { label: "Sorting", description: "Watch algorithms in action", icon: ArrowUpDown, href: "/algorithms/bubble-sort" },
  { label: "Linked List", description: "See how nodes connect in memory", icon: Link2 },
  { label: "Stack & Queue", description: "Push, pop, and queue operations", icon: Layers },
  { label: "Trees", description: "Binary trees, BST, traversals", icon: GitBranch },
  { label: "Graphs", description: "BFS, DFS, shortest path", icon: Share2 },
];

export default function Home() {
  return (
    <main className="flex flex-1 flex-col gap-16 px-6 py-12 lg:px-10">
      <section className="grid items-center gap-10 lg:grid-cols-2">
        <div className="flex flex-col gap-5">
          <span className="inline-flex w-fit items-center rounded-full border border-amber-500/30 px-3 py-1 text-xs font-medium text-amber-400">
            INTERACTIVE VISUALIZATIONS
          </span>
          <h1 className="text-4xl font-bold leading-tight text-zinc-100 lg:text-5xl">
            Algorithms,
            <br />
            <span className="text-amber-400">step by step.</span>
          </h1>
          <p className="max-w-md text-zinc-400">
            No autoplay you can&apos;t pause. Every run is a numbered list of
            steps you control — scrub to any step, read the synced
            pseudocode, and pick how you want it explained.
          </p>
          <div className="flex gap-3">
            <Link
              href="/algorithms/bubble-sort"
              className="rounded-full bg-amber-500 px-5 py-2.5 text-sm font-semibold text-black hover:bg-amber-400"
            >
              Start Learning →
            </Link>
            <Link
              href="#topics"
              className="rounded-full border border-amber-500/30 px-5 py-2.5 text-sm font-semibold text-zinc-200 hover:border-amber-500"
            >
              Explore Visualizations
            </Link>
          </div>
        </div>
        <HeroVisual />
      </section>

      <section id="topics" className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-zinc-100">Explore Topics</h2>
        </div>
        <div className="flex flex-wrap gap-4">
          {TOPICS.map((topic) => (
            <TopicCard key={topic.label} {...topic} />
          ))}
        </div>
      </section>
    </main>
  );
}
