import React from 'react';
import { Flex, Button, Select, Text } from '@chakra-ui/react';

function Pagination({ currentPage, totalPages, pageSize, onPageChange, onPageSizeChange }) {
  return (
    <Flex justifyContent="space-between" alignItems="center" mt="20px">
      <Button
        onClick={() => onPageChange(currentPage - 1)}
        isDisabled={currentPage === 1}
      >
        Previous
      </Button>
      <Flex alignItems="center">
        <Text mr="10px">Page {currentPage} of {totalPages}</Text>
        <Select
          value={pageSize}
          onChange={(e) => onPageSizeChange(Number(e.target.value))}
          width="100px"
        >
          <option value={5}>5</option>
          <option value={10}>10</option>
          <option value={20}>20</option>
        </Select>
      </Flex>
      <Button
        onClick={() => onPageChange(currentPage + 1)}
        isDisabled={currentPage === totalPages}
      >
        Next
      </Button>
    </Flex>
  );
}

export default Pagination;
