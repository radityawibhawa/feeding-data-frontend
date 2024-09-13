"use client";
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, Grid, InputGroup, InputLeftElement, Input, Flex, TableContainer, Table, Thead, Tr, Th, Tbody, Td } from '@chakra-ui/react';
import { SearchIcon } from '@chakra-ui/icons';
import ButtonComponent from './Button';
import ModalDetail from './Modal';
import ModalForm from './ModalForm';
import ModalDelete from './ModalDelete';
import Pagination from './Pagination';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function MenuTable() {
  const [jobs, setJobs] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedJobId, setSelectedJobId] = useState(null);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [deleteJobId, setDeleteJobId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [totalPages, setTotalPages] = useState(1);
  const [editJobData, setEditJobData] = useState(null);

  const fetchJobs = async (term, pageSize, pageNumber) => {
    try {
      const response = await axios.get(`http://localhost:4000/jobs?search=${term}&pageSize=${pageSize}&pageNumber=${pageNumber}`);
      setJobs(response.data.jobs);
      setTotalPages(response.data.totalPages);
      response.data.jobs.forEach(job => {
        console.log('Job Details:', job);
      });
    } catch (error) {
      console.error('Error fetching jobs:', error);
    }
  };

  useEffect(() => {
    fetchJobs(searchTerm, pageSize, currentPage); // Fetch jobs when the component mounts and when pageSize or currentPage changes
  }, [searchTerm, pageSize, currentPage]);

  const onOpen = (id) => {
    setSelectedJobId(id);
    setIsOpen(true);
  };
  const onClose = () => setIsOpen(false);

  const onFormOpen = (job = null) => {
    setEditJobData(job);
    setIsFormOpen(true);
  };
  const onFormClose = () => setIsFormOpen(false);

  const onDeleteOpen = (id) => {
    setDeleteJobId(id);
    setIsDeleteOpen(true);
  };

  const onDeleteClose = () => {
    setIsDeleteOpen(false);
    setDeleteJobId(null);
  };

  const handleSearch = () => {
    fetchJobs(searchTerm, pageSize, currentPage);
  };

  const handleExport = async (searchTerm, pageSize, pageNumber) => {
    try {
      const response = await axios.get(`http://localhost:4000/jobs/export?search=${searchTerm}&pageSize=${pageSize}&pageNumber=${pageNumber}`, {
        responseType: 'blob',
      });
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'jobs.xlsx');
      document.body.appendChild(link);
      link.click();
    } catch (error) {
      console.error('Error exporting jobs:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:4000/jobs/${id}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        toast.success('Job deleted successfully');
        fetchJobs(searchTerm, pageSize, currentPage); // Refresh the job list after deletion
      } else {
        toast.error('Failed to delete job');
      }
    } catch (error) {
      console.error('Error deleting job:', error);
      toast.error('Error deleting job');
    }
  };

  const handleJobAdded = () => {
    fetchJobs(searchTerm, pageSize, currentPage); // Refresh the job list after adding a new job
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handlePageSizeChange = (size) => {
    setPageSize(size);
    setCurrentPage(1);
  };

  return (
    <>
      <ToastContainer />
      <Box paddingTop='50px' paddingRight='50px' paddingLeft='50px'>
        <Grid templateColumns='repeat(5, 1fr)' gap={2}>
          <Box width='250px'>
            <InputGroup>
              <InputLeftElement pointerEvents="none">
                <SearchIcon color="gray.300" />
              </InputLeftElement>
              <Input
                type="text"
                placeholder="Search Here"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    handleSearch();
                  }
                }}
              />
            </InputGroup>
          </Box>
          <Box>
            <ButtonComponent text='Search' onClick={handleSearch} />
          </Box>
          <Flex justifyContent="flex-end" alignItems="center" gridColumn="span 3" gap={3}>
            <ButtonComponent text='Add Jobs' onClick={() => onFormOpen()} />
            <ButtonComponent text='Import to CSV' onClick={() => handleExport(searchTerm, pageSize, currentPage)} />
          </Flex>
        </Grid>
      </Box>
      <Box paddingRight='50px' paddingLeft='50px' mt='20px'>
        <TableContainer>
          <Table variant='simple'>
            <Thead bg="teal.500">
              <Tr>
                <Th>Job Vacancy</Th>
                <Th>Company/Advertiser</Th>
                <Th>Location</Th>
                <Th>Detail</Th>
              </Tr>
            </Thead>
            <Tbody>
              {jobs.map((job) => (
                <Tr key={job.id}>
                  <Td>{job.jobTitle}</Td>
                  <Td>{job.jobAdvertiser}</Td>
                  <Td>{job.jobLocation}</Td>
                  <Td gap='10px'>
                    <Flex gap='10px'>
                      <ButtonComponent text="Details" onClick={() => onOpen(job.id)} />
                      <ButtonComponent text="Delete" onClick={() => onDeleteOpen(job.id)} />
                      <ButtonComponent text="Edit" onClick={() => onFormOpen(job)} />
                    </Flex>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
          <ModalDetail isOpen={isOpen} onClose={onClose} jobId={selectedJobId} />
          <ModalForm isOpen={isFormOpen} onClose={onFormClose} onJobAdded={handleJobAdded} jobData={editJobData} />
          <ModalDelete isOpen={isDeleteOpen} onClose={onDeleteClose} jobId={deleteJobId} onDelete={handleDelete} />
        </TableContainer>
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          pageSize={pageSize}
          onPageChange={handlePageChange}
          onPageSizeChange={handlePageSizeChange}
        />
      </Box>
    </>
  );
}

export default MenuTable;
