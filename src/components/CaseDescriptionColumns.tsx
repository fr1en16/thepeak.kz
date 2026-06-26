import { formatTypography } from "@/utils/typography";

interface CaseDescriptionColumnsProps {
  paragraphs: string[];
}

export default function CaseDescriptionColumns({ paragraphs }: CaseDescriptionColumnsProps) {
  const columns = [
    paragraphs.slice(0, Math.ceil(paragraphs.length / 2)),
    paragraphs.slice(Math.ceil(paragraphs.length / 2)),
  ];

  return (
    <section className="relative border-b border-white/10 px-[var(--page-margin)] py-16 md:py-24">
      <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-8">
        {columns.map((column, index) => (
          <div key={index} className="space-y-6 lg:col-span-6">
            {column.map((paragraph) => (
              <p
                key={paragraph}
                className="no-invert font-sans text-base leading-[1.65] text-white/75 sm:text-lg"
              >
                {formatTypography(paragraph)}
              </p>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}
