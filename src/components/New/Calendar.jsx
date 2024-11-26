import React from 'react';
import {Grid, Typography} from '@mui/material';
import {startOfMonth, endOfMonth, differenceInDays, format, add, sub, setDate} from 'date-fns';
import {HiOutlineChevronDoubleLeft, HiOutlineChevronDoubleRight} from 'react-icons/hi';
import CalendarCell from './CalendarCell';
import {useStateContext} from '../../contexts/ContextProvider';
import avatar from '../../data/avatar.jpg';

const Calendar = ({date = new Date(), onChange}) => {
    const {globalRadius} = useStateContext();
    const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const startDate = startOfMonth(date);
    const endDate = endOfMonth(date);
    const numDays = differenceInDays(endDate, startDate) + 1;

    console.log(date.getFullYear(), date.getMonth(), date.getDate(), date)

    const prefixDays = startDate.getDay();

    const prevMonth = () => onChange(sub(date, {months: 1}));
    const nextMonth = () => onChange(add(date, {months: 1}));

    const handleClickDate = (index) => {
        const value = setDate(date, index);
        onChange(value);
    };

    return (
        <Grid item container className xs={12}>
            <Grid
                item
                container
                xs={12}
                direction="row"
                justifyContent="space-around"
                alignItems="center"
                className="grid grid-cols-7 items-center text-center justify-center"
            >
                <HiOutlineChevronDoubleLeft onClick={prevMonth} style={{cursor: 'pointer'}}/>
                <Typography>{format(date, 'dd LLLL yyyy')}</Typography>
                <HiOutlineChevronDoubleRight onClick={nextMonth} style={{cursor: 'pointer'}}/>
            </Grid>
            <Grid
                item
                mt={2}
                p={4}
                className="grid grid-cols-7 items-center text-center justify-center"
                xs={12}
                sx={{
                    borderRadius: globalRadius,
                    boxShadow: 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px',
                    background: 'white',
                }}
            >
                {daysOfWeek.map((day, i) => (
                    <CalendarCell onClick={() => handleClickDate(date)} day={day} key={i}>{day}</CalendarCell>))}

                <Grid className="col-span-7" mr={1} ml={1} style={{borderBottom: '1px solid #EAEBEC'}}/>

                {Array.from({length: prefixDays}).map((_, i) => (
                    <CalendarCell onClick={() => handleClickDate(i + 1)} key={i}/>))}

                {Array.from({length: numDays}).map((_, i) => (
                    <CalendarCell
                        year={date.getFullYear()}
                        month={date.getMonth() + 1}
                        flagSize={'10px'}
                        isActive={i + 1 === date.getDate()}
                        click={() => handleClickDate(i + 1)} day={i + 1}
                        img={avatar}
                        hasBackground
                        key={i}/>))}
            </Grid>
        </Grid>
    );
};

export default Calendar;
