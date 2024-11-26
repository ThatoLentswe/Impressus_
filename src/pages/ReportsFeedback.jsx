import { Grid, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { Button as NextUIButton, Input as NUIInput, Loading } from '@nextui-org/react';
import { CiSearch } from 'react-icons/ci';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useStateContext } from '../contexts/ContextProvider';
import { globalConfig } from '../globalConfig';
import UseToken from '../hooks/UseToken';
import notFound from '../data/no-data.png';
import ReportsItem from '../components/New/ReportsItem';

const ReportsFeedback = () => {
  const { globalRadius } = useStateContext();
  const { backend } = globalConfig;
  const isMounted = true;

  const [token] = UseToken();
  const [reports, setReports] = useState([]);
  const [loadingReport, setLoadingReport] = useState(false);
  const [paginationReports, setPaginationReports] = useState({ page: 0, count: 0, limit: 10 });
  const [lastReports, setLastReports] = useState([]);
  const [nextPageReports, setNextPageReports] = useState(1);

  const getUserReports = async () => {
    setLoadingReport(true);
    await axios.get(`${backend}/reports?page=${nextPageReports}`, { headers: { Authorization: `Bearer ${token}` } })
      .then((response) => {
        setLoadingReport(false);

        if (isMounted) {
          setLastReports(response.data.data);
          setNextPageReports(response.data.page + 1);
          setReports([...reports, ...response.data.data]);
          setPaginationReports({ page: response.data.page, count: response.data.count, limit: response.data.limit });
        } else {
          setLastReports(response.data.data);
          setNextPageReports(response.data.page + 1);
          setReports([...reports, ...response.data.data]);
          setPaginationReports({ page: response.data.page, count: response.data.count, limit: response.data.limit });
        }
      })
      .catch(() => {
        setLoadingReport(false);
        toast.error('an error occurred');
      });
  };

  useEffect(() => {
    getUserReports();
  }, []);

  const loadMoreReports = () => {
    getUserReports();
  };

  return (
    <Grid container item xs={12} p={2}>
      <Grid container item xs={12} md={6} p={2}>
        <Grid item xs={12} sm={12} container direction="row" p={2}>
          <Grid container item justifyContent="flex-start" alignItems="center" xs={6}>
            <Typography ml={2} sx={{ fontSize: '22px', fontWeight: '300' }}>
              Reports
            </Typography>
          </Grid>
          <Grid container item xs={6}>
            <NUIInput fullWidth placeholder="type here..." size="xl" contentRight={(<CiSearch />)} />
          </Grid>
        </Grid>
        <Grid item xs={12} sm={12} style={{ height: '70vh', overflow: 'auto' }} p={2}>

          {
            !loadingReport && reports.length === 0
              ? (
                <Grid xs={12} justifyContent="center" alignItems="center" pt={5} pb={5}>
                  <img src={notFound} style={{ width: '40%' }} alt="" />
                </Grid>
              )
              : ''
          }
          {reports.map((report, key) => (
            <ReportsItem report={report} key={key} />
          ))}
          {loadingReport ? (
            <Grid xs={12} justifyContent="center" alignItems="center" pt={2} pb={2}>
              <Loading type="spinner" size="lg" />
            </Grid>
          )
            : (
              <Grid container justifyContent="center" alignItems="center">
                {
                      lastReports.length > 0 && lastReports.length === paginationReports.limit ? (
                        <NextUIButton onPress={() => loadMoreReports()} style={{ boxShadow: 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px', cursor: 'pointer', background: '#ffffff', color: '#A1A0A0', marginBottom: '8px', marginTop: '8px' }} mt={2} mb={2}>
                          See More
                        </NextUIButton>
                      ) : ''
                    }
              </Grid>
            )}

        </Grid>
      </Grid>
      <Grid container item xs={12} md={6} p={2}>
        Feedback
      </Grid>
    </Grid>
  );
};

export default ReportsFeedback;
