"use client";

import { Calendar, momentLocalizer, View, Views } from "react-big-calendar";
import moment from "moment";
import { calendarEvents } from "@/lib/data";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { useState } from "react";

const localizer = momentLocalizer(moment);

const BigCalendar = () => {
    const [view, setView] = useState<View>(Views.WORK_WEEK);
    // Set default date to June 19, 2025 (where your events are)
    const [date, setDate] = useState(new Date(2025, 5, 19));

    const handleOnChangeView = (selectedView: View) => {
        setView(selectedView);
    };

    const handleNavigate = (newDate: Date) => {
        setDate(newDate);
    };

    return (
        <Calendar
            localizer={localizer}
            events={calendarEvents}
            startAccessor="start"
            endAccessor="end"
            views={["work_week", "day"]}
            view={view}
            date={date}
            onNavigate={handleNavigate}
            style={{ height: "98%" }}
            onView={handleOnChangeView}
            min={new Date(2025, 5, 19, 8, 0, 0)} // June 19th, 8 AM
            max={new Date(2025, 5, 19, 17, 0, 0)} // June 19th, 5 PM
        />
    );
};

export default BigCalendar;