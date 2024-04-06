import { create } from 'zustand';

type State = {
  tableData: any;
};

type Action = {
  setTableData: (values: object) => any;
};

export const useCandidateStore = create<State & Action>((set) => ({
  count: 2,
  tableData: [],
  setTableData: (values) =>
    set((state) => ({ tableData: [...state.tableData, values] })),
}));
