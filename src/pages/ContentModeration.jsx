import {Grid, Typography} from '@mui/material';
import React, {useEffect, useState} from 'react';
import {
    Dropdown as NUIDropdown,
    Button as NUIButton,
} from '@nextui-org/react';
import {BsFilter} from 'react-icons/bs';
import {FiChevronDown} from 'react-icons/fi';
import {useStateContext} from '../contexts/ContextProvider';
import ReportedPosts from '../components/New/ReportedPosts';
import UnReportedPosts from '../components/New/UnReportedPosts';
import {TiTick} from "react-icons/ti";

const ContentModeration = () => {
    const {globalRadius} = useStateContext();
    const [selected, setSelected] = React.useState(new Set(['inappropriate_Language']));
    const [videosToShow, setVideosToShow] = useState('unreported')

    const selectedValue = React.useMemo(
        () => Array.from(selected).join(', ').replaceAll('_', ' '),
        [selected],
    );

    const violationTypes = [
        {
            key: 'inappropriate_Language',
            display: 'Inappropriate Language',
        },
        {
            key: 'adult_Content',
            display: 'Adult Content',
        },
        {
            key: 'violence',
            display: 'Violence',
        },
        {
            key: 'harmful_or_dangerous_acts',
            display: 'Harmful or dangerous acts',
        },
        {
            key: 'shocking_content',
            display: 'Shocking content',
        },
        {
            key: 'recreational_drugs_and_drug-related_content',
            display: 'Recreational drugs and drug-related content',
        },
        {
            key: 'hateful_and_derogatory_content',
            display: 'Hateful and derogatory content',
        },
    ];

    return (
        <>
            <Grid container p={2}>
                <Grid container item xs={12}>
                    <Grid container item xs={12} sm={9} md={9} p={2}>
                        <Grid p={1} pl={4} xs={12} item direction="row" container justifyContent="flex-start"
                              alignItems="center" sx={{
                            borderRadius: globalRadius,
                            boxShadow: 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px',
                            background: 'white'
                        }}>
                            <Typography sx={{fontSize: '25px', fontWeight: '500'}}>
                                Flagged Videos
                            </Typography>
                            <Typography ml={3}>
                                <Grid container justifyContent="center" alignItems="center" sx={{
                                    fontSize: '25px',
                                    fontWeight: '500',
                                    background: '#FB3958',
                                    color: '#ffffff',
                                    borderRadius: '50px',
                                    width: '42px',
                                    height: '42px'
                                }}>9</Grid>
                            </Typography>
                        </Grid>
                    </Grid>
                    <Grid container item xs={12} sm={3} md={3} p={1} justifyContent="space-between" alignItems="center">
                        <Grid p={1} xs={12} sx={{
                            borderRadius: globalRadius,
                            boxShadow: 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px',
                            background: 'white'
                        }} container justifyContent="flex-start" alignItems="center">
                            <Typography ml={3} p={1} style={{
                                background: '#E9E9E9',
                                fontSize: '25px',
                                borderRadius: '50px',
                                color: '#A1A0A0',
                                cursor: 'pointer'
                            }}>
                                <BsFilter style={{color: '#343434'}}/>
                            </Typography>

                            <Grid pl={2}>
                                <NUIDropdown>
                                    <NUIDropdown.Button
                                        style={{borderRadius: '50px'}}
                                        css={{
                                            tt: 'capitalize',
                                            color: '#A1A0A0',
                                            fontSize: '23px',
                                            background: '#ffffff'
                                        }}
                                        iconRight={<FiChevronDown style={{color: '#A1A0A0'}}/>}
                                    >
                                        Filters
                                    </NUIDropdown.Button>
                                    <NUIDropdown.Menu aria-label="Static Actions" selectedKeys={selected}
                                                      onSelectionChange={setSelected} selectionMode="single">
                                        {
                                            violationTypes && violationTypes.map((violationType) => (
                                                <NUIDropdown.Item key={violationType.key} css={{}}
                                                                  showFullDescription>{violationType.display}</NUIDropdown.Item>
                                            ))
                                        }
                                    </NUIDropdown.Menu>
                                </NUIDropdown>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>

                <Grid container item xs={12}>
                    <Grid mt={1} xs={12} item direction="row" container justifyContent="center" alignItems="center">
                        <NUIButton.Group>
                            <NUIButton onPress={() => setVideosToShow('reported')}>
                                User Reported Videos
                                {videosToShow === 'reported' && <TiTick style={{marginLeft: '12px'}}/>}
                            </NUIButton>
                            <NUIButton onPress={() => setVideosToShow('ai-detected')}>
                                AI Detected Videos
                                {videosToShow === 'ai-detected' && <TiTick style={{marginLeft: '12px'}}/>}
                            </NUIButton>
                            <NUIButton onPress={() => setVideosToShow('unreported')}>
                                UnReported Videos
                                {videosToShow === 'unreported' && <TiTick style={{marginLeft: '12px'}}/>}
                            </NUIButton>
                        </NUIButton.Group>
                    </Grid>
                </Grid>
            </Grid>

            {videosToShow === 'reported' && <ReportedPosts/>}
            {videosToShow === 'unreported' && <UnReportedPosts/>}
        </>
    );
};

export default ContentModeration;
