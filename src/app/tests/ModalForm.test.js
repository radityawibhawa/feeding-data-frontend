import { render, screen, fireEvent } from "@testing-library/react";
import '@testing-library/jest-dom';
import ModalForm from "../components/ModalForm";
import React from "react";
import { ChakraProvider } from "@chakra-ui/react";

const renderWithChakra = (ui) => {
    return render(<ChakraProvider>{ui}</ChakraProvider>);
};

const mockJobData = {
    jobTitle: 'Software Engineer',
    jobAdvertiser: 'Tech Company',
    jobLocation: 'Jakarta, Indonesia',
    jobType: 'Full-time',
    description: 'Develop and maintain software applications.',
    minSalary: 10000000,
    maxSalary: 20000000,
    employmentType: 'Permanent',
    responsibilities: 'Develop software;Collaborate with team;Write tests',
    keyQualifications: 'Bachelor\'s degree;3+ years experience;Proficient in JavaScript'
};

test('renders add job modal correctly', () => {
    renderWithChakra(<ModalForm isOpen={true} onClose={() => {}} onJobAdded={() => {}} jobData={null} />);

    expect(screen.getByText('Add Job')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Job Title')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Job Advertiser')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Job Location')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Job Type')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Description')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Employment Type')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Minimum Salary')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Maximum Salary')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Responsibilities')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Key Qualifications')).toBeInTheDocument();
    expect(screen.getByText('Save')).toBeInTheDocument();
    expect(screen.getByText('Close')).toBeInTheDocument();
});

test('renders edit job modal correctly', () => {
    renderWithChakra(<ModalForm isOpen={true} onClose={() => {}} onJobAdded={() => {}} jobData={mockJobData} />);

    expect(screen.getByText('Edit Job')).toBeInTheDocument();
    expect(screen.getByDisplayValue('Software Engineer')).toBeInTheDocument();
    expect(screen.getByDisplayValue('Tech Company')).toBeInTheDocument();
    expect(screen.getByDisplayValue('Jakarta, Indonesia')).toBeInTheDocument();
    expect(screen.getByDisplayValue('Full-time')).toBeInTheDocument();
    expect(screen.getByDisplayValue('Develop and maintain software applications.')).toBeInTheDocument();
    expect(screen.getByDisplayValue('Permanent')).toBeInTheDocument();
    expect(screen.getByDisplayValue('10000000')).toBeInTheDocument();
    expect(screen.getByDisplayValue('20000000')).toBeInTheDocument();
    expect(screen.getAllByPlaceholderText('Responsibilities').length).toBe(1);
    expect(screen.getAllByPlaceholderText('Key Qualifications').length).toBe(1);
    expect(screen.getByText('Save')).toBeInTheDocument();
    expect(screen.getByText('Close')).toBeInTheDocument();
});

test('calls onClose when Close button is clicked', () => {
    const onClose = jest.fn();
    renderWithChakra(<ModalForm isOpen={true} onClose={onClose} onJobAdded={() => {}} jobData={null} />);

    fireEvent.click(screen.getByText('Close'));
    expect(onClose).toHaveBeenCalled();
});

test('updates form fields correctly', () => {
    renderWithChakra(<ModalForm isOpen={true} onClose={() => {}} onJobAdded={() => {}} jobData={null} />);

    fireEvent.change(screen.getByPlaceholderText('Job Title'), { target: { value: 'New Job Title' } });
    expect(screen.getByDisplayValue('New Job Title')).toBeInTheDocument();

    fireEvent.change(screen.getByPlaceholderText('Job Advertiser'), { target: { value: 'New Job Advertiser' } });
    expect(screen.getByDisplayValue('New Job Advertiser')).toBeInTheDocument();

    fireEvent.change(screen.getByPlaceholderText('Job Location'), { target: { value: 'New Job Location' } });
    expect(screen.getByDisplayValue('New Job Location')).toBeInTheDocument();

    fireEvent.change(screen.getByPlaceholderText('Job Type'), { target: { value: 'New Job Type' } });
    expect(screen.getByDisplayValue('New Job Type')).toBeInTheDocument();

    fireEvent.change(screen.getByPlaceholderText('Description'), { target: { value: 'New Description' } });
    expect(screen.getByDisplayValue('New Description')).toBeInTheDocument();

    fireEvent.change(screen.getByPlaceholderText('Employment Type'), { target: { value: 'New Employment Type' } });
    expect(screen.getByDisplayValue('New Employment Type')).toBeInTheDocument();

    fireEvent.change(screen.getByPlaceholderText('Minimum Salary'), { target: { value: '5000000' } });
    expect(screen.getByDisplayValue('5000000')).toBeInTheDocument();

    fireEvent.change(screen.getByPlaceholderText('Maximum Salary'), { target: { value: '10000000' } });
    expect(screen.getByDisplayValue('10000000')).toBeInTheDocument();
});

test('adds new responsibility input field', () => {
    renderWithChakra(<ModalForm isOpen={true} onClose={() => {}} onJobAdded={() => {}} jobData={null} />);

    fireEvent.click(screen.getByTestId('add-responsibility'));
    expect(screen.getAllByPlaceholderText('Responsibilities').length).toBe(2);
});

test('adds new key qualification input field', () => {
    renderWithChakra(<ModalForm isOpen={true} onClose={() => {}} onJobAdded={() => {}} jobData={null} />);

    fireEvent.click(screen.getByTestId('add-qualification'));
    expect(screen.getAllByPlaceholderText('Key Qualifications').length).toBe(2);
});