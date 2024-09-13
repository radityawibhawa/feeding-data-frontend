import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalFooter, FormControl, FormLabel, Input, Button } from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons';
import { toast } from 'react-toastify';

function ModalForm({ isOpen, onClose, onJobAdded, jobData }) {
  const [jobTitle, setJobTitle] = useState('');
  const [jobAdvertiser, setJobAdvertiser] = useState('');
  const [jobLocation, setJobLocation] = useState('');
  const [jobType, setJobType] = useState('');
  const [description, setDescription] = useState('');
  const [minSalary, setMinSalary] = useState('');
  const [maxSalary, setMaxSalary] = useState('');
  const [employmentType, setEmploymentType] = useState('');
  const [responsibilities, setResponsibilities] = useState(['']);
  const [keyQualifications, setKeyQualifications] = useState(['']);

  useEffect(() => {
    if (jobData) {
      setJobTitle(jobData.jobTitle);
      setJobAdvertiser(jobData.jobAdvertiser);
      setJobLocation(jobData.jobLocation);
      setJobType(jobData.jobType);
      setDescription(jobData.description);
      setMinSalary(jobData.minSalary);
      setMaxSalary(jobData.maxSalary);
      setEmploymentType(jobData.employmentType);
      setResponsibilities(jobData.responsibilities.split('; '));
      setKeyQualifications(jobData.keyQualifications.split('; '));
    } else {
      // Reset form fields when adding a new job
      resetFormFields();
    }
  }, [jobData]);

  const resetFormFields = () => {
    setJobTitle('');
    setJobAdvertiser('');
    setJobLocation('');
    setJobType('');
    setDescription('');
    setMinSalary('');
    setMaxSalary('');
    setEmploymentType('');
    setResponsibilities(['']);
    setKeyQualifications(['']);
  };

  const handleAddInput = () => {
    setResponsibilities([...responsibilities, '']);
  };

  const handleAddInputQualification = () => {
    setKeyQualifications([...keyQualifications, '']);
  };

  const handleInputChange = (index, value) => {
    const newResponsibilities = [...responsibilities];
    newResponsibilities[index] = value;
    setResponsibilities(newResponsibilities);
  };

  const handleInputChangeQualification = (index, value) => {
    const newQualification = [...keyQualifications];
    newQualification[index] = value;
    setKeyQualifications(newQualification);
  };

  const handleSubmit = async () => {
    const jobDataToSubmit = {
      jobTitle,
      jobAdvertiser,
      jobLocation,
      jobType,
      description,
      minSalary: parseInt(minSalary, 10),
      maxSalary: parseInt(maxSalary, 10),
      employmentType,
      responsibilities: responsibilities.join('; '),
      keyQualifications: keyQualifications.join('; ')
    };

    try {
      if (jobData && jobData.id) {
        await axios.put(`http://localhost:4000/jobs/${jobData.id}`, jobDataToSubmit);
        toast.success('Job updated successfully');
      } else {
        await axios.post('http://localhost:4000/jobs', jobDataToSubmit);
        toast.success('Job added successfully');
        resetFormFields(); // Reset form fields after adding a new job
      }
      onJobAdded();
      onClose();
    } catch (error) {
      console.error('Error submitting job:', error);
      toast.error('Error submitting job');
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{jobData ? 'Edit Job' : 'Add Job'}</ModalHeader>
        <ModalBody pb={6}>
          <FormControl>
            <FormLabel>Job Title</FormLabel>
            <Input placeholder='Job Title' value={jobTitle} onChange={(e) => setJobTitle(e.target.value)} />
          </FormControl>
          <FormControl mt={3}>
            <FormLabel>Job Advertiser</FormLabel>
            <Input placeholder='Job Advertiser' value={jobAdvertiser} onChange={(e) => setJobAdvertiser(e.target.value)} />
          </FormControl>
          <FormControl mt={3}>
            <FormLabel>Job Location</FormLabel>
            <Input placeholder='Job Location' value={jobLocation} onChange={(e) => setJobLocation(e.target.value)} />
          </FormControl>
          <FormControl mt={3}>
            <FormLabel>Job Type</FormLabel>
            <Input placeholder='Job Type' value={jobType} onChange={(e) => setJobType(e.target.value)} />
          </FormControl>
          <FormControl mt={3}>
            <FormLabel>Description</FormLabel>
            <Input placeholder='Description' value={description} onChange={(e) => setDescription(e.target.value)} />
          </FormControl>
          <FormControl mt={3}>
            <FormLabel>Employment Type</FormLabel>
            <Input placeholder='Employment Type' value={employmentType} onChange={(e) => setEmploymentType(e.target.value)} />
          </FormControl>
          <FormControl mt={3}>
            <FormLabel>Minimum Salary</FormLabel>
            <Input placeholder='Minimum Salary' value={minSalary} onChange={(e) => setMinSalary(e.target.value)} />
          </FormControl>
          <FormControl mt={3}>
            <FormLabel>Maximum Salary</FormLabel>
            <Input placeholder='Maximum Salary' value={maxSalary} onChange={(e) => setMaxSalary(e.target.value)} />
          </FormControl>
          <FormControl mt={3}>
            <FormLabel>Responsibilities</FormLabel>
            {responsibilities.map((responsibility, index) => (
              <Input
                key={index}
                placeholder='Responsibilities'
                value={responsibility}
                onChange={(e) => handleInputChange(index, e.target.value)}
                mt={index > 0 ? 3 : 0}
              />
            ))}
          </FormControl>
          <Button mt='3px' colorScheme='teal' variant='outline' onClick={handleAddInput}>
            <AddIcon />
          </Button>
          <FormControl mt={3}>
            <FormLabel>Key Qualifications</FormLabel>
            {keyQualifications.map((qualification, index) => (
              <Input
                key={index}
                placeholder='Key Qualifications'
                value={qualification}
                onChange={(e) => handleInputChangeQualification(index, e.target.value)}
                mt={index > 0 ? 3 : 0}
              />
            ))}
          </FormControl>
          <Button colorScheme='teal' variant='outline' onClick={handleAddInputQualification}>
            <AddIcon />
          </Button>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme='blue' mr={3} onClick={handleSubmit}>
            Save
          </Button>
          <Button colorScheme='blue' mr={3} onClick={onClose}>
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default ModalForm;