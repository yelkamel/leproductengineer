import { allLessons, findLesson } from "@lpe/curriculum";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { LessonView } from "@/components/lesson-view";

// Export statique : une page HTML par leçon, générée au build.
export const dynamicParams = false;

export function generateStaticParams() {
  return allLessons.map((r) => ({ module: r.module.slug, lesson: r.lesson.slug }));
}

export async function generateMetadata({ params }: PageProps<"/learn/[module]/[lesson]">): Promise<Metadata> {
  const { module, lesson } = await params;
  return { title: findLesson(module, lesson)?.lesson.title };
}

export default async function LessonPage({ params }: PageProps<"/learn/[module]/[lesson]">) {
  const { module, lesson } = await params;
  const ref = findLesson(module, lesson);
  if (!ref) notFound();
  return <LessonView moduleSlug={ref.module.slug} lessonSlug={ref.lesson.slug} />;
}
