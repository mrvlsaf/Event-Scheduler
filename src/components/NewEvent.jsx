import Box from '@mui/material/Box';
import { Modal, Button } from '@mui/material'
import CustomTextField from './CustomTextField'
import React, { useEffect, useState } from 'react'
import { useEventsContext } from '../context/EventsContext';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 450,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

const NewEvent = ({ open, setOpen, data, setData }) => {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [startDate, setStartDate] = useState("");
    const [startTime, setStartTime] = useState("");
    const [endDate, setEndDate] = useState("");
    const [endTime, setEndTime] = useState("");

    const { eventsData, setEventsData } = useEventsContext();

    const handleClose = () => {
        setOpen(false);
        setData({});
    }

    useEffect(() => {
        setName(data.name)
        setDescription(data.description)
        setStartDate(data.startDate)
        setStartTime(data.startTime)
        setEndDate(data.endDate)
        setEndTime(data.endTime)
    }, [data])

    const handleSubmit = (e) => {
        e.preventDefault();
        const startDatetime = new Date(startDate + "T" + startTime);
        const endDatetime = new Date(endDate + "T" + endTime);
        const formattedStart = startDatetime.toISOString();
        const formattedEnd = endDatetime.toISOString();
        const event = {
            id: parseInt(data.id ? data.id : new Date().getTime()),
            name,
            description,
            start: formattedStart,
            end: formattedEnd,
        };
        if (data.id) updateEvent(event);
        else onAddEvent(event);
        setName("");
        setDescription("");
        setStartDate("");
        setStartTime("");
        setEndDate("");
        setEndTime("");
        handleClose();
    };

    const updateEvent = (event) => {
        const indexToUpdate = eventsData.findIndex((obj) => obj.id === event.id);
        const copyEvents = [...eventsData];
        copyEvents[indexToUpdate] = event;
        setEventsData(copyEvents)
    }

    const onAddEvent = (event) => setEventsData([...eventsData, event]);

    return (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                <div className='add-event-heading'>Add New Event</div>
                <form onSubmit={handleSubmit}>
                    <CustomTextField
                        label="Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                    <CustomTextField
                        label="Description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                        multiline
                        rows={2}
                    />
                    <CustomTextField
                        label="Start Date"
                        type="date"
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                        required
                    />
                    <CustomTextField
                        label="Start Time"
                        type="time"
                        value={startTime}
                        onChange={(e) => setStartTime(e.target.value)}
                        required
                    />
                    <CustomTextField
                        label="End Date"
                        type="date"
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                        required
                    />
                    <CustomTextField
                        label="End Time"
                        type="time"
                        value={endTime}
                        onChange={(e) => setEndTime(e.target.value)}
                        required
                    />
                    <Button type="submit" sx={{ width: "100%" }} variant="contained" color="primary">
                        {data.id ? "Update" : "Create"}
                    </Button>
                </form>
            </Box>
        </Modal>
    )
}

export default NewEvent