import { SkillsProps } from '@/modules/data-types';
import { create } from 'zustand';

type State = {
  skills: SkillsProps['skills'];
};

type Action = {
  setSkillsData: (skill: State['skills']) => any;
};

export const useCandidateStore = create<State & Action>((set) => ({
  skills: [],
  setSkillsData: (skills) => set(() => ({ skills: skills })),
}));
