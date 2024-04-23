import CandidateCreateForm from '../_components/CandidateCreateForm';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Candidate apply',
  description: '...',
};

const CandidateFormPage: React.FC = () => {
  return <CandidateCreateForm />;
};

export default CandidateFormPage;
