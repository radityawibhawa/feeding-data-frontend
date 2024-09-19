import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import ModalDetail from '../components/Modal';
import { ChakraProvider } from '@chakra-ui/react';
import React from 'react';

const mockJobDetails = {
    jobTitle: 'Software Engineer',
    jobAdvertiser: 'Tech Company',
    jobLocation: 'Jakarta, Indonesia',
    jobType: 'Full-time',
    minSalary: 10000000,
    maxSalary: 20000000,
    responsibilities: 'Develop software;Collaborate with team;Write tests',
    keyQualifications: 'Bachelor\'s degree;3+ years experience;Proficient in JavaScript'
};

const renderWithChakra = (ui) => {
    return render(<ChakraProvider>{ui}</ChakraProvider>);
};

jest.mock('axios', () => ({
    get: jest.fn(() => Promise.resolve({ data: { jobs: [mockJobDetails] } }))
}));

test('renders job details correctly', async () => {
    renderWithChakra(<ModalDetail isOpen={true} onClose={() => {}} jobId="1" />);

    expect(screen.getByText('Loading...')).toBeInTheDocument();

    // Wait for the job details to be fetched and rendered
    const jobTitle = await screen.findByText('Software Engineer');
    expect(jobTitle).toBeInTheDocument();
    expect(screen.getByText('Tech Company')).toBeInTheDocument();
    expect(screen.getByText('Jakarta, Indonesia')).toBeInTheDocument();
    expect(screen.getByText('Full-time')).toBeInTheDocument();
    // expect(screen.getByText('10,000,000-20,000,000')).toBeInTheDocument();
    expect(screen.getByText('Responsibilities :')).toBeInTheDocument();
    expect(screen.getByText('Develop software')).toBeInTheDocument();
    expect(screen.getByText('Collaborate with team')).toBeInTheDocument();
    expect(screen.getByText('Write tests')).toBeInTheDocument();
    expect(screen.getByText('Key Qualifications :')).toBeInTheDocument();
    expect(screen.getByText('Bachelor\'s degree')).toBeInTheDocument();
    expect(screen.getByText('3+ years experience')).toBeInTheDocument();
    expect(screen.getByText('Proficient in JavaScript')).toBeInTheDocument();
});

test('renders loading state correctly', () => {
    renderWithChakra(<ModalDetail isOpen={true} onClose={() => {}} jobId="1" />);

    expect(screen.getByText('Loading...')).toBeInTheDocument();
});