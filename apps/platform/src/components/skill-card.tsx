"use client";

import { skillMarkdown, type Skill } from "@lpe/curriculum";
import { useState } from "react";
import { Button } from "./ui";

export function SkillCard({ skill }: { skill: Skill }) {
  const [copied, setCopied] = useState(false);
  const markdown = skillMarkdown(skill);

  async function copy() {
    try {
      await navigator.clipboard.writeText(markdown);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  }

  function download() {
    const url = URL.createObjectURL(new Blob([markdown], { type: "text/markdown" }));
    const a = Object.assign(document.createElement("a"), { href: url, download: "SKILL.md" });
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <section aria-labelledby="skill-title" className="rounded-2xl border border-border bg-surface p-6">
      <p className="text-xs font-medium uppercase tracking-wider text-accent">Skill de la leçon</p>
      <h2 id="skill-title" className="mt-1 font-mono text-lg font-semibold">
        {skill.name}
      </h2>
      <p className="mt-1 text-sm text-muted">{skill.description}</p>
      <p className="mt-3 text-sm">
        À poser dans <code className="rounded bg-background px-1.5 py-0.5 font-mono text-xs">.claude/skills/{skill.name}/SKILL.md</code>{" "}
        (Claude Code) ou l&apos;équivalent de ton agent.
      </p>
      <div className="mt-4 flex flex-wrap gap-2">
        <Button variant="secondary" onClick={copy}>
          {copied ? "Copié ✓" : "Copier"}
        </Button>
        <Button variant="secondary" onClick={download}>
          Télécharger SKILL.md
        </Button>
      </div>
      <details className="mt-4 text-sm">
        <summary className="cursor-pointer text-muted">Voir le contenu</summary>
        <pre className="mt-3 max-h-96 overflow-auto rounded-lg bg-background p-4 font-mono text-xs whitespace-pre-wrap">
          {markdown}
        </pre>
      </details>
    </section>
  );
}
