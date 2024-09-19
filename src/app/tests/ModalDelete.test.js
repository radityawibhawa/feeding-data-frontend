import { render, screen, fireEvent } from "@testing-library/react";
import '@testing-library/jest-dom';
import ModalDelete from "../components/ModalDelete";
import { ChakraProvider } from "@chakra-ui/react";
import React from "react";

const renderWithChakra = (ui) => {
    return render(<ChakraProvider>{ui}</ChakraProvider>);
};

test('renders delete confirmation modal correctly', () => {
    renderWithChakra(<ModalDelete isOpen={true} onClose={() => {}} jobId="1" onDelete={() => {}} />);

    expect(screen.getByText('Delete Confirmation')).toBeInTheDocument();
    expect(screen.getByText('Are you sure want to delete this data?')).toBeInTheDocument();
    expect(screen.getByText('Yes')).toBeInTheDocument();
    expect(screen.getByText('No')).toBeInTheDocument();
});

test('calls onClose when No button is clicked', () => {
    const onClose = jest.fn();
    renderWithChakra(<ModalDelete isOpen={true} onClose={onClose} jobId="1" onDelete={() => {}} />);

    fireEvent.click(screen.getByText('No'));
    expect(onClose).toHaveBeenCalled();
});

test('calls onDelete and onClose when Yes button is clicked', () => {
    const onClose = jest.fn();
    const onDelete = jest.fn();
    renderWithChakra(<ModalDelete isOpen={true} onClose={onClose} jobId="1" onDelete={onDelete} />);

    fireEvent.click(screen.getByText('Yes'));
    expect(onDelete).toHaveBeenCalledWith("1");
    expect(onClose).toHaveBeenCalled();
});