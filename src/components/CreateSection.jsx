import React, { useEffect, useState } from 'react'
import { Box, HStack, Heading, Button } from '@chakra-ui/react'
import { v4 as uuidv4 } from 'uuid';


const CreateSection = ({ tasks, setTasks }) => {

    const [task, setTask] = useState({
        id: "",
        name: "",
        status: "active"
    })

    useEffect(() => {
        console.log({ task });
    }, [task])

    const handleGo = (e) => {
        e.preventDefault();
        setTasks([...tasks, task]);
        setTask({
            id: "",
            name: "",
            status: "active"
        })
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleGo(e);
        }
    };

    return (
        <Box display={'flex'} justifyContent={'center'} flexDir={'column'} alignItems={'center'}>
            <Heading color={'white'}>Task Manager</Heading>
            <HStack align={'center'} justifyContent={'center'} mt={'2rem'} background={'white'} p={'.5rem 1rem'} borderRadius={'30px'}>
                <input
                    className="todo-input"
                    value={task.name}
                    onChange={(e) => setTask({ ...task, id: uuidv4(), name: e.target.value })}
                    onKeyPress={handleKeyPress}
                    style={{
                        width: '50vw',
                        outline: 'none',
                        paddingLeft: '1rem',
                    }}
                    placeholder={'Enter Something to do...'}
                    border={'none'}
                    w={'50vw'}
                    outline={'none'}
                />
                <Button
                    background={'#3174c1'}
                    color={'white'}
                    borderRadius={'30px'}
                    _hover={{ background: '#3174c1', color: 'white' }}
                    onClick={handleGo}
                >
                    Go
                </Button>
            </HStack>
        </Box>
    )
}

export default CreateSection
