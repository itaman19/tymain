import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { fetchOrders } from '../redux/actioncreator';
import Accordion from 'react-bootstrap/Accordion'
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Loading } from './LoadingComponent';

export default function Orders() {
    var OrdersList;
    var ekey = 0;
    const dispatch = useDispatch();
    const { orders, loading, errMess } = useSelector(state => state.orders)
    const {address,pin,phone} = useSelector(state => state.auth)
    const defkey = 1;
      const orderItemsList = (orderItems) =>
        orderItems.map((product) => {
            return (
            <div className="media border border-bottom-1 bg-white" key={product.product._id}>
                    <img src={"https://localhost:3445/"+product.product.image} alt="product_image" className="d-flex col-3 img img-fluid cart_img" />
                    <div class="media-body" className="col-9 mt-3">
                        <div className=" d-flex justify-content-between">
                            <div>
                                <Link to={`/products/${product.product._id}`} ><h3>{product.product.name}</h3></Link>

                                    <h5>Qty:{product.qnty}</h5>

                            </div>
                            <h2 className="mt-2">Rs {product.product.price*product.qnty}</h2> 
                        </div>
                    </div>
                    
            </div>
        );
        });
    if (orders.length != 0) {
        OrdersList = orders.map((order) => {        
        const a = orderItemsList(order.products);
        ekey = ekey + 1;
            const time = order.createdAt.split("T")[1].split(":");
            console.log(time[0]);
            let hour = time[0] * 1 + 5;
            console.log(hour);
            let minute =time[1] * 1 + 30;
            if (minute > 60) {
                hour++;
                minute = minute - 60;
            }
             if (hour > 24) {
            hour = hour - 24;
            }
            if (minute) {
                var umin = minute + "";
                umin= umin.split("").length;
                if (umin === 1) {
                    minute = "0" + minute;
                }
            }
            
            
            const deliveredTime = order.createdAt === order.updatedAt ? "-" : order.updatedAt.split("T")[1].split(":");
             let deliveredHour = deliveredTime[0] * 1 + 5;
            let deliveredMinute =deliveredTime[1] * 1 + 30;
            if (deliveredMinute > 60) {
            deliveredHour++;
            deliveredMinute = deliveredMinute - 60;
            }
             if (deliveredHour > 24) {
            deliveredHour = deliveredHour - 24;
            }
            
              if (deliveredMinute) {
                var umin = deliveredMinute + "";
                umin= umin.split("").length;
                if (umin === 1) {
                    deliveredMinute = "0" + deliveredMinute;
                }
            }
            
            return (
            <div>
            <Accordion defaultActiveKey={defkey}>

            <Card>
                <Accordion.Toggle as={Card.Header} eventKey={ekey} className="mean-fruit-gradient d-flex justify-content-between">
                            <b>OrderID :- {order._id}</b>
                            <b>Ordered on :- {order.createdAt.split("T")[0]}</b>
                                <b>Time :- {hour}:{minute}{hour<12?" a.m":" p.m" }</b>
                </Accordion.Toggle>
                <Accordion.Collapse eventKey={ekey}>
                    <Card.Body className="cloudy-knoxville-gradient">
                            <div>
                                {a}
                                </div>
                            <div >
                                    <div className="d-flex justify-content-end">
                                        <h3 className="mt-2"><span className="fa fa-inr mr-2" />{order.totalAmt}</h3>
                                     </div>
                                    <div className="d-flex justify-content-between">
                                        <div>
                                                <h5><b> Delivery Stauts :</b></h5>  {order.delivered === "true"
                                                ?
                                                order.createdAt === order.updatedAt
                                                    ?
                                                   ""
                                                    :
                                                     <div className="text-success">
                                                        <h6><b>Delivered On:</b></h6>
                                                        <h6>Date : {order.updatedAt.split("T")[0]}</h6>
                                                            <h6>Time : {deliveredHour}:{deliveredMinute}{deliveredHour<12?" a.m":" p.m"  }</h6>
                                                    </div>
                                                    
                                                :
                                                <h5 className="text-danger"><b>Not Delivered</b></h5>}
                                        </div>
                                        <div>
                                                <h5><b> Payment Stauts :</b></h5>  {order.payment === "true" ? <h5 className="text-success"><b>Paid</b></h5>:<h5 className="text-danger"><b>Not Paid</b></h5> }
                                       </div>
                                    </div>
                                        <div className="mt-2">
                                        <h5 className="mt-2 d-flex"><b>Payment Method : <p className="text-success">{order.paymentMethod ==="PPI"?"Paytm Wallet":order.paymentMethod ==="NB"?"Net Banking":order.paymentMethod ==="CC"?"Credit Card":order.paymentMethod ==="DC"?"Debit Card":"Cash on Delivery" }</p></b></h5>
                                        <h5> <b>Delivery Address :</b></h5>
                                        <h5>{address}</h5>
                                        <h5>PinCode : {pin}</h5>
                                        <h5>Phone Number : {phone}</h5>
                                    </div>

                           
                        </div>    
                    </Card.Body>
                </Accordion.Collapse>
            </Card>
            </Accordion>
            </div>
        );
    });
        }

    useEffect(() => {
        if (orders.length===0) {
            dispatch(fetchOrders())
        }
        return () => {
            
        }
    }, [])
    return (
        <div className="container mt-5">
            {loading
                ?
                <Loading />
                :
                errMess
                    ?
                    <h3 className="d-flex justify-content-center col-12">{errMess}. Check your internet connection ! Or server may be down </h3>
                    :
                    orders.length === 0
                        ?
                        <Link to="/home"><h3>You haven't ordered anything .Go to home and continue shopping!</h3></Link>
                        :
                        OrdersList
                        
            }
        </div>
    )
}
