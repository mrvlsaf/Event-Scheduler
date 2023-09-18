import { Box } from '@mui/material'
import React, { useState } from 'react'
import Table from '@mui/material/Table';
import Paper from '@mui/material/Paper';
import FullCalendar from '@fullcalendar/react'
import TableRow from '@mui/material/TableRow';
import TableHead from '@mui/material/TableHead';
import TableCell from '@mui/material/TableCell';
import TableBody from '@mui/material/TableBody';
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from "@fullcalendar/interaction"
import TableContainer from '@mui/material/TableContainer';
import { useEventsContext } from '../context/EventsContext'

const style = {
    bgcolor: 'background.paper',
    border: '2px solid #000',
    p: 4,
    margin: "1em 0"
};

const CalenderView = () => {
    const [events, setEvents] = useState([]);
    const { eventsData } = useEventsContext();

    const onClick = (info) => {
        const clickedDate = info.date;
        const eventsForClickedDate = eventsData.filter((event) => {
            const eventDate = new Date(event.start);
            return (
                eventDate.getFullYear() === clickedDate.getFullYear() &&
                eventDate.getMonth() === clickedDate.getMonth() &&
                eventDate.getDate() === clickedDate.getDate()
            );
        });
        setEvents(eventsForClickedDate)
    }

    return (
        <div className='calender-view-cont'>
            <FullCalendar
                plugins={[dayGridPlugin, interactionPlugin]}
                initialView="dayGridMonth"
                events={eventsData}
                headerToolbar={{
                    left: 'prev,next today',
                    center: 'title',
                    right: '',
                }}
                dateClick={onClick}
                height="auto"
            />
            <div>
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Name</TableCell>
                                <TableCell align="right">Description</TableCell>
                                <TableCell align="right">Start&nbsp;</TableCell>
                                <TableCell align="right">End&nbsp;</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {events.length ? events.map((event) => {
                                return (
                                    <TableRow
                                        key={event.id}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                        <TableCell component="th" scope="row">
                                            {event.name}
                                        </TableCell>
                                        <TableCell align="right">{event.description}</TableCell>
                                        <TableCell align="right">{event.start}</TableCell>
                                        <TableCell align="right">{event.end}</TableCell>
                                    </TableRow>
                                )
                            }) : <Box sx={style}>No events for this day (try clicking on a date or add a new one)</Box>}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
        </div>
    )
}

export default CalenderView