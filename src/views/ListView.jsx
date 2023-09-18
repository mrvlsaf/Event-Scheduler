import { TextField } from '@mui/material';
import listPlugin from "@fullcalendar/list"
import FullCalendar from '@fullcalendar/react'
import NewEvent from '../components/NewEvent';
import React, { useEffect, useState } from 'react'
import interactionPlugin from "@fullcalendar/interaction"
import { useEventsContext } from '../context/EventsContext';

const ListView = () => {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const [data, setData] = useState({});
    const [searchQuery, setSearchQuery] = useState("");
    const { eventsData, setEventsData } = useEventsContext();
    const [filteredEvents, setFilteredEvents] = useState([]);

    const eventDidMount = (info) => {
        const event = info.event.toPlainObject();
        const eventEl = info.el;
        const editButton = document.createElement("button");
        editButton.textContent = "Edit";
        editButton.style.marginRight = "1em";
        editButton.addEventListener("click", () => {
            handleEdit(event);
        });
        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.addEventListener("click", () => {
            handleDelete(event.id);
        });
        editButton.classList.add("edit-btn")
        deleteButton.classList.add("delete-btn")
        eventEl.appendChild(editButton);
        eventEl.appendChild(deleteButton);
    };

    useEffect(() => {
        setFilteredEvents(eventsData)
    }, [eventsData])

    const handleEdit = (event) => {
        setData({
            id: event.id,
            name: event.extendedProps.name,
            description: event.extendedProps.description,
            startDate: event.start.slice(0, 10),
            startTime: event.start.slice(11, 16),
            endDate: event.end.slice(0, 10),
            endTime: event.end.slice(11, 16),
        })
    }
    const handleDelete = (id) => setEventsData(eventsData.filter((event) => event.id != id))

    const handleSearchInputChange = (e) => {
        const query = e.target.value;
        setSearchQuery(query);
        const filtered = eventsData.filter(
            (event) =>
                event.name.toLowerCase().includes(query.toLowerCase()) ||
                event.start.includes(query)
        );
        setFilteredEvents(filtered);
    };

    useEffect(() => {
        if (data.id) handleOpen();
    }, [data])

    return (
        <div className='list-view-cont'>
            <div className='new-event-cont'>
                <span>Events</span>
                <div onClick={handleOpen} className='add-event-button'>
                    + Add Event
                </div>
                <NewEvent
                    open={open}
                    setOpen={setOpen}
                    data={data}
                    setData={setData}
                />
            </div>
            <div className='filter-container'>
                <TextField
                    label="Search by event name or date"
                    variant="outlined"
                    sx={{ width: "60%", marginTop: "0.5em" }}
                    value={searchQuery}
                    onChange={handleSearchInputChange}
                />
            </div>
            <FullCalendar
                plugins={[listPlugin, interactionPlugin]}
                initialView="listYear"
                events={filteredEvents}
                headerToolbar={{
                    left: '',
                    center: '',
                    right: '',
                }}
                height="auto"
                eventDidMount={eventDidMount}
            />
        </div>
    )
}

export default ListView