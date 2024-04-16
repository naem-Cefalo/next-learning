import { SkillsProps } from '@/app/modules/data-types';
import { create } from 'zustand';

type State = {
  tableData: any;
  skills: SkillsProps['skills'];
};

type Action = {
  setTableData: (values: object) => any;
  setSkillsData: (skill: State['skills']) => any;
};

export const useCandidateStore = create<State & Action>((set) => ({
  count: 2,
  skills: [],
  tableData: [],
  setTableData: (values) =>
    set((state) => ({ tableData: [...state.tableData, values] })),
  // setSkillsData: (skills) => set(() => ({ skills: skills })),
  setSkillsData: (skills) => set(() => ({ skills: skills })),
}));
