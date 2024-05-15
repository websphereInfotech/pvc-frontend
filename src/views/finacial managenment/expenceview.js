import React, { useEffect, useState } from 'react';
import { Typography, Grid, Paper, Table, TableHead, TableCell, TableBody, TableRow } from '@mui/material';
import { useMediaQuery } from '@mui/material';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Expenseview } from 'store/thunk';

const ExpenseDetailsPage = () => {
  const isMobile = useMediaQuery('(max-width:600px)');
  const dispatch = useDispatch();
  const { id } = useParams();
  const [data, setData] = useState({});

  useEffect(() => {
    dispatch(Expenseview(id))
      .then((data) => {
        setData(data);
      })
      .catch((error) => {
        console.error('Error fetching expense data:', error);
      });
  }, [dispatch, id]);

  return (
    <Paper elevation={3} style={{ padding: '24px' }}>
      <Typography variant="h4" align="center" id="mycss">
        Expense View
      </Typography>
      <Grid container spacing={4} sx={{ padding: '0px 20px' }}>
        <Grid item xs={12} sm={6} md={3}>
          <Typography variant="subtitle1">Vendor</Typography>
          <Typography variant="subtitle2">{data.customer}</Typography>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Typography variant="subtitle1">Voucher No.</Typography>
          <Typography variant="subtitle2">{data.voucherno}</Typography>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Typography variant="subtitle1">Date</Typography>
          <Typography variant="subtitle2">{new Date(data?.date).toLocaleDateString()}</Typography>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Typography variant="subtitle1">GST IN</Typography>
          <Typography variant="subtitle2">{data.gstin}</Typography>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Typography variant="subtitle1">Mobile No.</Typography>
          <Typography variant="subtitle2">{data.mobileno}</Typography>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Typography variant="subtitle1">Email</Typography>
          <Typography variant="subtitle2">{data.email}</Typography>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Typography variant="subtitle1">Bill No.</Typography>
          <Typography variant="subtitle2">{data.billno}</Typography>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Typography variant="subtitle1">Payment Method</Typography>
          <Typography variant="subtitle2">{data.payment}</Typography>
        </Grid>
        {/* <Grid item xs={12} sm={6} md={3}>
          <Typography variant="subtitle1">Quotation Ref.</Typography>
          <Typography variant="subtitle2">{data.quotationref}</Typography>
        </Grid> */}

        <Grid item xs={12}>
          <div style={{ overflowX: 'auto', maxHeight: '300px', maxWidth: '100%' }}>
            <Table>
              <TableHead>
                <TableCell sx={{ fontSize: '12px' }}>SR.NO.</TableCell>
                <TableCell width={450} sx={{ fontSize: '12px' }}>
                  NATURE OF EXPENSE
                </TableCell>
                <TableCell sx={{ fontSize: '12px' }}>DESCRIPTION</TableCell>
                <TableCell sx={{ fontSize: '12px' }}>TAXABLE AMT. (₹) </TableCell>
                <TableCell sx={{ fontSize: '12px' }}>AMOUNT (₹)</TableCell>
              </TableHead>
              <TableBody>
                {data.expenseItems &&
                  data.expenseItems.map((item, index) => (
                    <TableRow key={index}>
                      <TableCell>{item?.serialno}</TableCell>
                      <TableCell>{item?.expensse}</TableCell>
                      <TableCell>{item?.description}</TableCell>
                      <TableCell>{item?.taxable}</TableCell>
                      <TableCell>{item?.mrp}</TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </div>
        </Grid>

        <Grid item xs={12}>
          {isMobile ? (
            // For mobile screens, show each total on separate lines
            <>
              <div style={{ borderBottom: '0.2px solid lightgrey', width: '100%', display: 'flex', justifyContent: 'space-between' }}>
                <p>Taxable Amt.</p>
                <p>₹0.00</p>
              </div>
              <div style={{ borderBottom: '0.2px solid lightgrey', width: '100%', display: 'flex', justifyContent: 'space-between' }}>
                <p>Sub Total</p>
                <p>₹0.00</p>
              </div>
              <div style={{ borderBottom: '0.2px solid lightgrey', width: '100%', display: 'flex', justifyContent: 'space-between' }}>
                <p>Total Amt.</p>
                <p>₹0.00</p>
              </div>
            </>
          ) : (
            // For larger screens, show all totals on one line
            <div style={{ float: 'right', width: '30%' }}>
              <div style={{ borderBottom: '0.2px solid lightgrey', display: 'flex', justifyContent: 'space-between' }}>
                <p>Taxable Amt.</p>
                <p>₹0.00</p>
              </div>
              <div style={{ borderBottom: '0.2px solid lightgrey', display: 'flex', justifyContent: 'space-between' }}>
                <p>Sub Total</p>
                <p>₹0.00</p>
              </div>
              <div style={{ borderBottom: '0.2px solid lightgrey', display: 'flex', justifyContent: 'space-between' }}>
                <p>Total Amt.</p>
                <p>₹0.00</p>
              </div>
            </div>
          )}
        </Grid>

        {isMobile ? (
          <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center' }}>
            <Link to="/expenselist" style={{ textDecoration: 'none' }}>
              <div>
                <button
                  style={{
                    width: '100px',
                    color: '#425466',
                    padding: '8px',
                    borderColor: '#425466',
                    display: 'flex',
                    justifyContent: 'center',
                    borderRadius: '5px'
                  }}
                >
                  Cancel
                </button>
              </div>
            </Link>
          </Grid>
        ) : (
          <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Link to="/expenselist" style={{ textDecoration: 'none' }}>
              <div>
                <button
                  style={{
                    width: '100px',
                    color: '#425466',
                    padding: '8px',
                    borderColor: '#425466',
                    display: 'flex',
                    justifyContent: 'center',
                    borderRadius: '5px'
                  }}
                >
                  Cancel
                </button>
              </div>
            </Link>
          </Grid>
        )}
      </Grid>
    </Paper>
  );
};

export default ExpenseDetailsPage;
