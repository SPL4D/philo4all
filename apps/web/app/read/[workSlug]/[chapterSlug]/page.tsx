import { notFound } from "next/navigation";
import { getCorpusWorkBySlug } from "../../../../lib/corpus";
import { Reader } from "../../../../components/reader";

export function generateStaticParams() {
  return [];
}

export default function ReaderPage({ params }: { params: { workSlug: string; chapterSlug: string } }) {
  const work = getCorpusWorkBySlug(params.workSlug);

  if (!work) {
    notFound();
  }

  const chapter = work.chapters.find((candidate) => candidate.slug === params.chapterSlug);

  if (!chapter) {
    notFound();
  }

  return <Reader work={work} chapter={chapter} />;
}
