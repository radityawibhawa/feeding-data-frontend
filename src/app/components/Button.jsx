"use client";
import { Button, ButtonGroup } from '@chakra-ui/react'

function ButtonComponent({ text, onClick, theColor }){
    return(
        <Button colorScheme={theColor} size='md' onClick={onClick}>
            {text}
        </Button>
    );
}

export default ButtonComponent;