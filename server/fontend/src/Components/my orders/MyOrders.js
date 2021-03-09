import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { BaseURL } from '../Url/BaseURL'
import { makeStyles } from '@material-ui/core/styles';




const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
    width: 70,
    height: 60,
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
    margin: '0px'
  }
}));



export default function MyOrders() {
  const classes = useStyles()


  const [order, setOrder] = useState([])


  useEffect(() => {

    axios({
      method: "get",
      url: BaseURL + '/myorders',
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

      <h1 style={{color:'#3f51b5'}}>This is my all order</h1>
      <div maxWidth="xl">
        <div style={{border: '2px solid #3f51b5', borderRadius: '10px'}}>
          {order.map((product, idx) => {
            return <div style={{ border: '2px solid #3f51b5', backgroundColor: '#bacaff', margin: 20, padding: 20, borderRadius: 10 }} key={idx} value={product.id}>

              <div>
                Name:  {product.createdOn}
              </div> <br />

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
                              style={{borderRadius: '5px'}}
                              src={order.cartimage}
                              alt={order.cartimage}
                            />
                          </div>
                          <div className={classes.header}>
                            <span style={{ lineHeight: "100px", padding: "10px" }} gutterBottom variant="h5" id="title" component="h2">
                              {order.title}
                            </span>
                          </div>
                          <div className={classes.header}>
                            <span style={{ lineHeight: "100px", padding: "10px" }} gutterBottom variant="h5" id="title" component="h2">
                              {order.description}
                            </span>
                          </div>
                          <div className={classes.header}>
                            <span style={{ lineHeight: "100px", padding: "10px" }} id="price" variant="body2" component="h2">
                              {order.price}
                            </span>
                          </div>
                          <div className={classes.header}>
                            <span style={{ lineHeight: "100px", padding: "10px" }} id="price" variant="body2" component="h2">
                              {order.quantity}kg
                                                        </span>

                          </div>
                          <div className={classes.header}>
                            <span style={{ lineHeight: "100px", padding: "10px" }} id="price" variant="body2" component="h2">
                              {order.quantity * order.price}
                            </span>

                          </div>

                        </div>
                      </div>

                    </>
                  )
                })
              }
            </div>
          })}



        </div>
      </div>
    </div>
  )
}