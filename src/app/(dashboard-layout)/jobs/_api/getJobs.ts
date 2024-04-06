import http from "../../../../../httpService";

export interface JobQueryParams {
  status?: string|null;
  showDeleted?: boolean;
  page: number;
  rows: number;
  query?: string;
}

const getJobs = async (params: JobQueryParams) => {
  try {
    const res = await http.get(`/jobs?state=${params.status}&search=${params.query}&showDeleted=${params.showDeleted}&page=${params.page}&rowsPerPage=${params.rows}`);
    return res.data;
    
  } catch (err) {
    console.log(err);
  }
  
};

export default getJobs;