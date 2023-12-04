import { Box, Text } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react'
import { useDrag, useDrop } from 'react-dnd';
import { AiFillCloseCircle } from "react-icons/ai";

const ListSection = ({ tasks, setTasks }) => {
    const [activeTasks, setActiveTasks] = useState([]);
    const [completedTasks, setCompletedTasks] = useState([]);

    useEffect(() => {
        const fActiveTasks = tasks.filter((task) => task.status === 'active');
        const fCompletedTasks = tasks.filter((task) => task.status === 'completed');

        setActiveTasks(fActiveTasks);
        setCompletedTasks(fCompletedTasks);

    }, [tasks])

    const statuses = ['active', 'completed'];

    return (
        <div style={{ display: "flex", justifyContent: "space-around", width: "60vw", marginTop: "1rem" }} >
            {statuses.map((status, index) => (
                <Section
                    key={index}
                    status={status}
                    tasks={tasks}
                    setTasks={setTasks}
                    activeTasks={activeTasks}
                    completedTasks={completedTasks}
                />
            ))}
        </div>
    )
}

export default ListSection

const Section = ({ status, tasks, setTasks, activeTasks, completedTasks }) => {
    // eslint-disable-next-line
    const [{ isOver }, drop] = useDrop(() => ({
        accept: "task",
        drop: (item) => addItemToSection(item.id),
        collect: (monitor) => ({
            isOver: !!monitor.isOver()
        })
    }))

    let text = "active";
    let bg = "grey";
    let tasksToMap = activeTasks;

    if (status === "completed") {
        text = "completed";
        bg = "green";
        tasksToMap = completedTasks;
    }

    const addItemToSection = (id) => {
        console.log("addItemToSection", id, status);
        setTasks((prev) => {
            const mTasks = prev.map(t => {
                if (t.id === id) {
                    return { ...t, status: status }
                }
                return t;
            })
            localStorage.setItem('tasks', JSON.stringify(mTasks));
            return mTasks;
        })
    }


    return <Box ref={drop} >
        <Header text={text} count={tasksToMap.length} bg={bg} />
        <Box>
            {
                tasksToMap.length > 0 && tasksToMap.map((task, index) => <Task key={task.id} task={task} tasks={tasks} setTasks={setTasks} />)
            }
        </Box>
    </Box>
}

const Header = ({ text, bg, count }) => {
    return (
        <div
            style={{ background: bg, width: "15rem", textAlign: "center", display: "flex", justifyContent: "center", padding: ".5rem 1rem", color: "white", borderRadius: "10px" }}
        >
            <div>{text}</div>
            <div
                style={{
                    marginLeft: ".7rem",
                    background: "white",
                    color: "black",
                    padding: ".1rem .5rem",
                    borderRadius: "50%",
                }}
            >{count}</div>
        </div>
    )
}


const Task = ({ task, tasks, setTasks }) => {

    const [{ isDragging }, drag] = useDrag(() => ({
        type: "task",
        item: { id: task.id },
        collect: (monitor) => ({
            isDragging: !!monitor.isDragging()
        })
    }))

    console.log(isDragging);

    const handleRemove = (id) => () => {
        console.log("handleRemove", id);

        const fTasks = tasks.filter((task) => task.id !== id);
        localStorage.setItem('tasks', JSON.stringify(fTasks));
        setTasks(fTasks);
    }
    return (
        <div
            ref={drag}
            style={
                isDragging ?
                    {
                        opacity: "1",
                        background: "#e5d3d3",
                        padding: ".5rem 1rem",
                        borderRadius: "10px",
                        marginTop: ".5rem",
                        display: "flex",
                        justifyContent: "space-between"
                    } :
                    {
                        background: "#e5d3d3",
                        padding: ".5rem 1rem",
                        borderRadius: "10px",
                        marginTop: ".5rem",
                        display: "flex",
                        justifyContent: "space-between"
                    }}


        >
            <Text>{task.name}</Text>
            <AiFillCloseCircle
                onClick={handleRemove(task.id)}
            />

        </div >
    )
}