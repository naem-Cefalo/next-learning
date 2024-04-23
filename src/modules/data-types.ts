interface TextSummary {
  summary: string;
  length?: number;
}

interface Skill {
  id: number;
  name: string;
}
interface SkillsProps {
  skills: Skill[];
}


export type { TextSummary, SkillsProps };