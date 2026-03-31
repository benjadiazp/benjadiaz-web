"use client";

import { useTranslations } from "next-intl";

type SkillCategory = {
  key: string;
  skills: string[];
};

const categories: SkillCategory[] = [
  {
    key: "languages",
    skills: ["TypeScript", "JavaScript", "C#", "Python", "HTML", "CSS"],
  },
  {
    key: "frameworks",
    skills: ["React", "Next.js", "Node.js", "Express", "NestJS", ".NET", "Meteor"],
  },
  {
    key: "cloud",
    skills: ["Azure", "AWS", "Vercel", "Docker"],
  },
  {
    key: "databases",
    skills: ["MongoDB", "SQL Server", "PostgreSQL"],
  },
  {
    key: "tools",
    skills: ["Git", "GitHub", "Bun", "Unity", "Blender"],
  },
];

export default function Skills() {
  const t = useTranslations("Skills");

  return (
    <div className="w-full">
      <h2
        id="skills-heading"
        className="text-center text-xl font-bold tracking-tight md:text-3xl"
      >
        {t("title")}
      </h2>

      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {categories.map((category) => (
          <div
            key={category.key}
            className="rounded-xl border border-gray-200/70 bg-white/60 px-4 py-4 shadow-sm backdrop-blur-sm transition-all hover:border-orange-200 hover:shadow-md dark:border-gray-800/70 dark:bg-gray-900/50 dark:hover:border-orange-500/20"
          >
            <h3 className="font-mono text-sm font-bold">
              <span className="text-gradient-accent">
                {t(category.key)}
              </span>
            </h3>
            <div className="mt-3 flex flex-wrap gap-2">
              {category.skills.map((skill) => (
                <span
                  key={skill}
                  className="inline-flex items-center rounded-md border border-orange-200/80 bg-orange-50/80 px-2 py-0.5 font-mono text-[11px] font-semibold text-orange-600 dark:border-orange-500/25 dark:bg-orange-500/10 dark:text-orange-400"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
