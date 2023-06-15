import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import '../styles/Calendar.css'
import { Link } from 'react-router-dom';


const Calendar = () => {
    const minDate = new Date;
    minDate.setDate(minDate.getDate() + 1);

    const MAX_SELECTED_SLOTS = 3;
    const unavailableSlots = [
        { hora_inicio: "20:00" },
        { hora_inicio: "16:00" }
    ];

    const [selectedSlots, setSelectedSlots] = useState({});
    const [selectedDate, setSelectedDate] = useState(minDate);

    const handleSlotClick = (slot) => {
        const isSelected = selectedSlots[selectedDate]?.includes(slot);
        const selectedDaySlots = selectedSlots[selectedDate] || [];
        let updatedSlots = { ...selectedSlots };

        if (isSelected) {
            const updatedDaySlots = selectedDaySlots.filter((s) => s !== slot);
            updatedSlots[selectedDate] = updatedDaySlots;
        } else {
            const totalSelectedSlots = Object.values(selectedSlots).flat();
            if (totalSelectedSlots.length < MAX_SELECTED_SLOTS) {
                if (!updatedSlots[selectedDate]) {
                    updatedSlots[selectedDate] = [];
                }
                updatedSlots[selectedDate].push(slot);
            }
        }

        setSelectedSlots(updatedSlots);
    };

    const deselectAllSlots = (newDate) => {
        const hasSelectedSlots = Object.keys(selectedSlots).length > 0;
        const isSameDay = newDate && newDate.toDateString() === selectedDate?.toDateString();

        if (hasSelectedSlots && !isSameDay) {
            setSelectedSlots({ ...selectedSlots, [selectedDate]: selectedSlots[selectedDate] || [] });
        }

        setSelectedDate(newDate);
    };

    const renderSlots = () => {
        const timeSlots = [
            { start: '16:00', end: '17:00' },
            { start: '17:00', end: '18:00' },
            { start: '18:00', end: '19:00' },
            { start: '19:00', end: '20:00' },
            { start: '20:00', end: '21:00' },
            { start: '21:00', end: '22:00' },
            { start: '22:00', end: '23:00' },
            { start: '23:00', end: '00:00' },
        ];

        const slots = selectedSlots[selectedDate] || [];
        const totalSelectedSlots = Object.values(selectedSlots).flat();
        const isMaxSlotsReached = totalSelectedSlots.length >= MAX_SELECTED_SLOTS;

        return timeSlots.map((slot, index) => {
            const isUnavailable = unavailableSlots.find(unavailableSlot => unavailableSlot.hora_inicio === slot.start);
            const isSelected = slots.includes(slot.start);

            const slotClass = `slot ${isSelected ? 'selected' : ''} ${isMaxSlotsReached ? 'disabled' : ''} ${isUnavailable ? 'unavailable' : ''}`;

            return (
                <div
                    key={index}
                    className={slotClass}
                    onClick={() => handleSlotClick(slot.start)}
                >
                    {slot.start}
                </div>
            );
        });
    };


    const renderSelectedSlots = () => {
        return Object.keys(selectedSlots).map((date) => {
            const slots = selectedSlots[date];

            if (slots.length > 0) {
                return (
                    <div key={date}>
                        <h3>{new Date(date).toLocaleDateString()}</h3>
                        <div className='time-slots'>
                            {slots.map((slot, index) => (
                                <div className='slot' key={index}>{slot}</div>
                            ))}
                        </div>
                    </div>
                );
            }

            return null;
        });
    };

    const canContinue = Object.values(selectedSlots).flat().length === MAX_SELECTED_SLOTS;

    return (
        <div className='calendar-container'>
            <div className='calendar'>
                <DatePicker
                    selected={selectedDate}
                    onChange={deselectAllSlots}
                    dateFormat="dd-MM-yyyy"
                    className="date-picker"
                    minDate={minDate}
                />
                <div className='time-slots'>
                    {renderSlots()}
                </div>
                <div className='line'></div>
                <div>
                    <h2>Horarios seleccionados:</h2>
                    {renderSelectedSlots()}
                </div>
                {canContinue && <div className='button-container'>
                    <Link to="/">
                        <button className='btn-continuar'>Continuar</button>
                    </Link>
                </div>}
            </div>
        </div>
    );
};

export default Calendar;
