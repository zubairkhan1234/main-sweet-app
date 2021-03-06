import React, { useEffect, useState } from 'react'
import BaseURL from '../Url/BaseURL'
import { makeStyles } from '@material-ui/core/styles';
import Moment from 'react-moment';
import 'moment-timezone';
import axios from 'axios'





const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
    width: 70,
    height: 60,
    [theme.breakpoints.down('xs')]: {
      width: 30,
      height: 25,
    }
  },
  media: {
    height: 100,
  },
  fontSize: {
    fontSize: 18,
  },
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  header: {
    width: "15%",
    textAlign: 'center',
    margin: '0px',
    [theme.breakpoints.down('xs')]: {
      width: "auto",
      textAlign: 'center',
      margin: '0px',
    },
    [theme.breakpoints.down('md')]: {
      width: "auto",
      textAlign: 'center',
      margin: '0px',
    }
  },
  heading: {
    [theme.breakpoints.down('xs')]: {
      display: "none"
    }
  },
  forFont: {
    lineHeight: "100px",
    [theme.breakpoints.down('xs')]: {
      lineHeight: "30px",
      paddingLeft: "3px",
    }
  },
  border1: {
    border: '2px solid #3f51b5', borderRadius: '10px',
  },
  border2: {
    border: '2px solid #3f51b5',
    backgroundColor: '#bacaff',
    margin: 20,
    padding: 20,
    borderRadius: 10,
    [theme.breakpoints.down('xs')]: {
      margin: 6,
      padding: 20,
      borderRadius: 5,

    }
  },
  display: {
    lineHeight: "100px",
    [theme.breakpoints.down('xs')]: {
      display: 'none'

    }
  },
  button: {
    margin: '20px',
    backgroundColor: '#3f51b5',
    border: 'none',
    padding: '10px',
    borderRadius: '4px',
    color: '#ffff',
    [theme.breakpoints.down('xs')]: {
      margin: '0px 15px 0px 0px',
      backgroundColor: '#3f51b5',
      border: 'none',
      padding: '10px',
      borderRadius: '4px',
      color: '#ffff',
    }
  },
  headingArea: {
    margin: "15px",
    display: 'flex',
    justifyContent: 'space-between',
    height: 70,
    [theme.breakpoints.down('xs')]: {
      height: 0,
    }
  },
  detailArea: {
    padding: 20,
    textAlign: 'left',
    [theme.breakpoints.down('xs')]: {
      padding: 3,

    }
  },
  headerHeading: {
    marginTop: '7%',
    marginBottom: '2%',
    textAlign: 'center',
    fontSize: '30px',
    fontWeight: 600,
    textShadow: '5px 5px 5px #758287',
    color: '#3f51b5',
    [theme.breakpoints.down('md')]: {
      marginTop: '9%',
      marginBottom: '2%',
      textAlign: 'center',
      fontSize: '25px',
      fontWeight: 600,
    },
    [theme.breakpoints.down('sm')]: {
      marginTop: '11%',
      marginBottom: '2%',
      textAlign: 'center',
      fontSize: '20px',
      fontWeight: 600,
    },
    [theme.breakpoints.down('xs')]: {
      marginTop: '22%',
      marginBottom: '5%',
      textAlign: 'center',
      fontSize: '20px',
      fontWeight: 600,
    }
  }
}));



export default function MyOrders() {
  const classes = useStyles()


  const [order, setOrder] = useState([])


  useEffect(() => {

    axios({
      method: "get",
      url: BaseURL + '/get/myOrder',
      withCredentials: true
    })
      .then(function (response) {
        console.log(response.data)
        if (response.status === 200) {
          setOrder(response.data.data)
        }
      })
      .catch(function (response) {
        console.log(response)
      })

  }, [])


  console.log(order)

  return (
    <div style={{ margin: 20 }}>


      <div maxWidth="xl">
        <div className={classes.headerHeading}>
          <span >My all Orders</span>
        </div>
        <div className={classes.border1}>
          {order.map((product, idx) => {
            return <div key={idx} className={classes.border2} >
              <div className={classes.headingArea}>
                <div className={classes.header}><h4 className={classes.heading}>Image</h4></div>
                <div className={classes.header}><h4 className={classes.heading}>Sweet Name</h4></div>
                <div className={classes.header}><h4 className={classes.heading}>sweet description</h4></div>
                <div className={classes.header}><h4 className={classes.heading}>Sweet Price</h4></div>
                <div className={classes.header}><h4 className={classes.heading}>Sweet Quantity in kg</h4></div>
                <div className={classes.header}><h4 className={classes.heading}>total</h4></div>
              </div>
              {/* <div>
                Name:  {product.createdOn}
              </div> <br />
              <div>
                <b>Ordered Time</b>
                <br />
                <Moment format="dddd, MMMM Do YYYY, h:mm:ss a">{product.createdOn}</Moment>
              </div>
              <br /> */}
              <div>
                <p style={{ color: 'red' }}><b>Order Status : </b> {product.status} </p>
              </div>
              <div style={{ color: 'red' }}>
                <b>Ordered Time : </b>
                <Moment fromNow>{product.createdOn}</Moment>
              </div>
              <br />

              {
                product.orders.map((order, index) => {
                  {/* console.log(order) */ }

                  return (
                    <>
                      <div key={index}>

                        <div style={{ margin: "0px", display: 'flex', justifyContent: 'space-between', textAlign: 'center', height: 70 }}>

                          <div className={classes.header} >
                            <img
                              className={`products ${classes.root}`}
                              style={{ borderRadius: '5px' }}
                              src={order.cartimage}
                              alt={order.cartimage}
                            />
                          </div>
                          <div className={classes.header}>
                            <span className={classes.forFont} variant="h5" id="title" component="h2">
                              {order.title}
                            </span>
                          </div>
                          <div className={classes.header}>
                            <span className={classes.display} variant="h5" id="title" component="h2">
                              {order.description}
                            </span>
                          </div>
                          <div className={classes.header}>
                            <span className={classes.forFont} id="price" variant="body2" component="h2">
                              {order.price}
                            </span>
                          </div>
                          <div className={classes.header}>
                            <span className={classes.forFont} id="price" variant="body2" component="h2">
                              {order.quantity}kg
                            </span>
                          </div>
                          <div className={classes.header}>
                            <span className={classes.forFont} id="price" variant="body2" component="h2">
                              {order.quantity * order.price}
                            </span>
                          </div>
                        </div>
                      </div>

                    </>
                  )
                })}
              <div style={{ textAlign: 'right', paddingRight: 90 }}>
                <h2>{product.total}</h2>
              </div>
            </div>
          })}



        </div>
      </div>
    </div>
  )
}
