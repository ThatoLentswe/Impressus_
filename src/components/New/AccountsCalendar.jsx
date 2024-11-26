import React, {useEffect, useRef} from 'react';
import {Grid, Typography} from '@mui/material';
import {startOfMonth, endOfMonth, differenceInDays, format, add, sub, setDate} from 'date-fns';
import {HiOutlineChevronDoubleLeft, HiOutlineChevronDoubleRight} from 'react-icons/hi';
import {useDraggable} from 'react-use-draggable-scroll';
import {useStateContext} from '../../contexts/ContextProvider';
import CalendarCell from "./CalendarCell";
import avatar from "../../data/avatar.jpg";

const AccountsCalendar = ({date = new Date(), onChange}) => {
    const {globalRadius} = useStateContext();
    const startDate = startOfMonth(date);
    const endDate = endOfMonth(date);
    const numDays = differenceInDays(endDate, startDate) + 1;

    const prevMonth = () => onChange(sub(date, {months: 1}));
    const nextMonth = () => onChange(add(date, {months: 1}));

    const handleClickDate = (index) => {
        const value = setDate(date, index);
        onChange(value);
    };

    const ref = useRef();
    const {events} = useDraggable(ref);

    return (
        <Grid item container className xs={12}>
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
                    <Typography sx={{fontWeight: '600', fontSize: '25px'}}>{format(date, 'dd LLLL yyyy')}</Typography>
                    <HiOutlineChevronDoubleRight onClick={nextMonth} style={{cursor: 'pointer'}}/>
                </Grid>
                <Grid
                    mt={2}
                    p={4}
                    xs={12}
                    sx={{
                        borderRadius: globalRadius,
                        boxShadow: 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px',
                        background: 'white',
                        maxHeight: '50vh',
                        overflow: 'auto',
                    }}
                >

                    <div
                        className="flex maxWidthFlex space-x-3 overflow-x-scroll scrollbar-hide"
                        {...events}
                        ref={ref}
                    >
                        {Array.from({length: numDays}).map((_, i) => {
                            const strD = new Date(date.getFullYear(), date.getMonth(), i + 1).getDay();
                            return (
                                <CalendarCell
                                    year={date.getFullYear()}
                                    className={'flex-none w-20 h-20'}
                                    flagSize={'20px'}
                                    month={date.getMonth() + 1}
                                    isActive={i + 1 === date.getDate()}
                                    click={() => handleClickDate(i + 1)}
                                    day={i + 1}
                                    hasBackground
                                    key={i}
                                    strDate={strD}
                                />
                            );
                        })}
                    </div>
                </Grid>
            </Grid>
        </Grid>
    );
};

export default AccountsCalendar;
