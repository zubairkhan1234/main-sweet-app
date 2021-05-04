import React, { useEffect, useState } from 'react'
import axios from 'axios'
import  BaseURL  from '../Url/BaseURL'
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import Card from '@material-ui/core/Card';
import { makeStyles } from '@material-ui/core/styles';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { Table } from '@material-ui/core';
import CardActions from '@material-ui/core/CardActions';
import { UseGlobalState, UseGlobalStateUpdate } from '../../context/context'



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
    }
}));


export default function DeliveringOrder() {
    const globalState = UseGlobalState()
    const globalStateUpdate = UseGlobalStateUpdate()

    const classes = useStyles()

    const [order, setorder] = useState([])

    useEffect(() => {

        axios({
            method: "get",
            url: BaseURL + '/admin/getorders/delivering',
            withCredentials: true
        })
            .then(function (response) {

                if (response.status === 200) {
                    // console.log(response.data.data)
                    // console.log("lkdflasdfkj ", response.data.data)
                    setorder(response.data.data)

                }
            })
            .catch(function (error) {
                console.log(error)

            })
    }, [])


    // const removeFromCart = (productToRemove) => {
    //     setorder(
    //         order.filter((product) => product !== productToRemove)
    //     );
    // };

    console.log(globalState)

    return (
        <div style={{ margin: 20 }}>

            <h1>All Order With delever detail</h1>
            <div maxWidth="xl">
                <div className={classes.border1}>
                    {order.map((product, idx) => {
                        return <div className={classes.border2} key={idx} value={product.id}>


                            <h1>Order Detail</h1>
                            <div className={classes.headingArea}>
                                <div className={classes.header}><h4 className={classes.heading}>Image</h4></div>
                                <div className={classes.header}><h4 className={classes.heading}>Sweet Name</h4></div>
                                <div className={classes.header}><h4 className={classes.heading}>sweet description</h4></div>
                                <div className={classes.header}><h4 className={classes.heading}>Sweet Price</h4></div>
                                <div className={classes.header}><h4 className={classes.heading}>Sweet Quantity in kg</h4></div>
                                <div className={classes.header}><h4 className={classes.heading}>total</h4></div>
                            </div>

                            {
                                product.orders.map((order, index) => {
                                    {/* console.log(order) */ }

                                    return (
                                        <>
                                            <div key={index} value={order.id}  >

                                                <div style={{ margin: "0px", display: 'flex', justifyContent: 'space-between', textAlign: 'center', height: 70 }}>

                                                    <div className={classes.header} >
                                                        <img
                                                            className={`products ${classes.root}`}
                                                            src={order.cartimage}
                                                            alt={order.cartimage}
                                                        />
                                                    </div>
                                                    <div className={classes.header}>
                                                        <span className={classes.forFont}  variant="h5" id="title" component="h2">
                                                            {order.title}
                                                        </span>
                                                    </div>
                                                    <div className={classes.header}>
                                                        <span className={classes.display}  variant="h5" id="title" component="h2">
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
                                })
                            }

                            <h1>Reciever Detail</h1>
                            <div className={classes.detailArea} >
                                <div>
                                    Name:  {product.name}
                                </div> <br />
                                <div>
                                    Phone Number:  {product.phone}
                                </div> <br />
                                <div>
                                    Email: {product.email}
                                </div> <br />
                                <div>
                                    Address: {product.address}
                                </div> <br />
                                <div>
                                    {product.total}
                                </div> <br />
                                <div>
                                    <h1 style={{color: "#3f51b5"}}>Delivered</h1>
                                    {/* <button
                                        style={{ margin: '20px', backgroundColor: '#3f51b5', border: 'none', padding: '10px', borderRadius: '4px', color: '#ffff' }}
                                        size="small" onClick={() => removeFromCart(product)} color="primary">
                                        Accept Order
                                    </button>
                                    <button
                                        style={{ margin: '20px', backgroundColor: '#3f51b5', border: 'none', padding: '10px', borderRadius: '4px', color: '#ffff' }}
                                        size="small" onClick={() => removeFromCart(product)} color="primary">
                                        Remove Order
                                    </button> */}
                                </div>
                            </div>
                        </div>
                    })}



                </div>
            </div>
        </div>
    )
}







