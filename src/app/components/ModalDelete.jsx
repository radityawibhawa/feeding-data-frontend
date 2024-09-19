import { Button, Flex, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, Text } from "@chakra-ui/react";
import React from "react";


function ModalDelete({ isOpen, onClose, jobId, onDelete }){

    const handleDelete = () => {
        onDelete(jobId);
        onClose();
    };

    return(
        <>    
            <Modal isOpen={isOpen} onClose={onClose} >
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Delete Confirmation</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Flex padding='10px' justifyContent='center' alignItems='center'>
                            <Text>
                                Are you sure want to delete this data?
                            </Text>
                        </Flex>
                        <Flex gap='10px' padding='10px' justifyContent='center' alignItems='center'>
                                <Button variant='solid' colorScheme='teal' onClick={handleDelete}>
                                    Yes
                                </Button>
                                <Button variant='outline' colorScheme='teal' onClick={onClose}>
                                    No
                                </Button>
                        </Flex>
                    </ModalBody>
                </ModalContent>
            </Modal>
        </>
    );
}

export default ModalDelete;