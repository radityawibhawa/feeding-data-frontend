"use client";
import { Button, ButtonGroup } from '@chakra-ui/react'

function ButtonComponent({ text, onClick }){
    return(
        <Button colorScheme='teal' size='md' onClick={onClick}>
            {text}
        </Button>
    );
}

export default ButtonComponent;