"use client";

import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";
import { badgeOrange, cardBase, cardHover } from "@/lib/styles";

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
            className={cn(cardBase, cardHover, "px-4 py-4")}
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
                  className={badgeOrange}
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
