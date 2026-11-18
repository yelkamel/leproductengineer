"use client";

import { skillMarkdown, type Skill } from "@lpe/curriculum";
import { useState } from "react";
import { Case } from "@lpe/ui";
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
    <Case className="p-5 sm:p-6">
    <section aria-labelledby="skill-title">
      <p className="bd-kicker">Skill du kata</p>
      <h2 id="skill-title" className="mt-2 font-mono text-lg font-medium">
        {skill.name}
      </h2>
      <p className="mt-1 max-w-[65ch] text-ink-soft">{skill.description}</p>
      <p className="mt-3 text-[15px]">
        À poser dans <code className="rounded-[3px] bg-sky-mist px-1.5 py-0.5 font-mono text-xs">.claude/skills/{skill.name}/SKILL.md</code>{" "}
        (Claude Code) ou l&apos;équivalent de ton agent.
      </p>
      <div className="mt-4 flex flex-wrap gap-2">
        <Button variant="secondary" onClick={copy}>
          {copied ? "Copié" : "Copier"}
        </Button>
        <Button variant="secondary" onClick={download}>
          Télécharger SKILL.md
        </Button>
      </div>
      <details className="mt-4 text-sm">
        <summary className="cursor-pointer font-semibold">Voir le contenu</summary>
        <pre className="mt-3 max-h-96 overflow-auto rounded-[4px] border-2 border-ink bg-sky-mist p-4 font-mono text-xs whitespace-pre-wrap">
          {markdown}
        </pre>
      </details>
    </section>
    </Case>
  );
}
