"use client";
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Button,
    useDisclosure,
    Text,
    UnorderedList,
    ListItem,
    HStack,
} from '@chakra-ui/react'
import axios from 'axios';
import { useEffect, useState } from 'react';
import { FaMapMarkerAlt } from "react-icons/fa";
import { FaClock } from "react-icons/fa";
import { FaBuilding } from "react-icons/fa";
import { FaMoneyBill } from "react-icons/fa";

function ModalDetail({ isOpen, onClose, jobId }) {
    
    const [jobDetails, setJobDetails] = useState(null);

    useEffect(() => {
        const fetchJobDetails = async () => {
            if (jobId){
                try{
                    const response = await axios.get(`http://localhost:4000/jobs?search=${jobId}`)
                    setJobDetails(response.data.jobs[0]);
                } catch (error) {
                    console.error('Error fetching job details : ', error);
                }
            }
        };

        fetchJobDetails();
    }, [jobId])

    // const formattedMinSalary = new Intl.NumberFormat('id-ID').format(jobDetails.minSalary);
    // const formattedMaxSalary = new Intl.NumberFormat('id-ID').format(jobDetails.maxSalary);
    
    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Job Details</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    {jobDetails ? (
                        <>
                            <Text>{jobDetails.jobTitle}</Text>
                            <Text>{jobDetails.jobAdvertiser}</Text>
                            <HStack mt='20px'>
                                <FaMapMarkerAlt />
                                <Text>{jobDetails.jobLocation}</Text>
                            </HStack>
                            <HStack mt='8px'>
                                <FaClock />
                                <Text>{jobDetails.jobType}</Text>
                            </HStack>
                            <HStack mt='8px'>
                                <FaMoneyBill />
                                <Text>{new Intl.NumberFormat('id-ID').format(jobDetails.minSalary)}-{new Intl.NumberFormat('id-ID').format(jobDetails.maxSalary)}</Text>
                            </HStack>
                            <Text mt='15px'>
                                Responsibilities : 
                            </Text>
                            <UnorderedList>
                                {jobDetails.responsibilities.split(/[;]/).map((item, index) => (
                                    <ListItem key={index}>{item.trim()}</ListItem>
                                ))}
                            </UnorderedList>
                            <Text mt='15px'>
                                Key Qualifications :
                            </Text>
                            <UnorderedList>
                                {jobDetails.keyQualifications.split(/[;]/).map((item, index) => (
                                    <ListItem key={index}>{item.trim()}</ListItem>
                                ))}
                            </UnorderedList>
                        </>
                    ) : (
                        <Text>Loading...</Text>
                    )}
                </ModalBody>
                <ModalFooter>
                    <Button colorScheme="blue" mr={3} onClick={onClose}>
                        Close
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
}

export default ModalDetail;