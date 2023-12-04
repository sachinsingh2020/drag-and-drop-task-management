import { Box } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
// import TaskSection from './TaskSection';
import CreateSection from './CreateSection.jsx';
import ListSection from './ListSection.jsx';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

const MainPage = () => {
    const [tasks, setTasks] = useState(localStorage.getItem('tasks') ? JSON.parse(localStorage.getItem('tasks')) : []);

    useEffect(() => {
        setTasks(tasks);
        localStorage.setItem('tasks', JSON.stringify(tasks));
        console.log({ tasks })
    }, [tasks])



    // const handleActiveDelete = (item) => (e) => {
    //     e.preventDefault();
    //     const newActiveItems = activeTasks.filter((task) => task !== item);
    //     setActiveTasks(newActiveItems);
    // };

    // const handleCompletedDelete = (item) => (e) => {
    //     e.preventDefault();
    //     const newCompletedItems = completedTasks.filter((task) => task !== item);
    //     setCompletedTasks(newCompletedItems);
    // };

    // const handleComplete = (item) => (e) => {
    //     e.preventDefault();
    //     const newActiveItems = activeTasks.filter((task) => task !== item);
    //     setActiveTasks(newActiveItems);
    //     setCompletedTasks([...completedTasks, item]);
    // };

    return (
        <DndProvider backend={HTML5Backend}>
            <Box
                w={'100vw'}
                background={'#3174c1'}
                display={'flex'}
                flexDir={'column'}
                justifyContent={'center'}
                alignItems={'center'}
                pt={'3rem'}
            >
                <CreateSection
                    tasks={tasks}
                    setTasks={setTasks}
                />
                <ListSection tasks={tasks} setTasks={setTasks} />

                {/* <DndProvider backend={HTML5Backend}>
                <TaskSection
                    handleActiveDelete={handleActiveDelete}
                    handleCompletedDelete={handleCompletedDelete}
                    handleComplete={handleComplete}
                    activeTasks={activeTasks}
                    completedTasks={completedTasks}
                    setActiveTasks={setActiveTasks}
                />
            </DndProvider> */}
            </Box>
        </DndProvider>
    );
};

export default MainPage;
