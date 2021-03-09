import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchOrders, updateOrder } from '../redux/actioncreator';
import { Loading } from './LoadingComponent';

export default function AdminOrders() {
    const dispatch = useDispatch();
    
    const setDeliveryStatus = (order, newDeliveryStatus) => {
        console.log(newDeliveryStatus);
        const updatedOrder = { ...order, delivered: newDeliveryStatus };
        console.log("del")
                 console.log(updatedOrder);
        dispatch(updateOrder(updatedOrder));
        
        
    }
     const setPaymentStatus = (order, newPaymentStatus) => {
         const updatedOrder = { ...order, payment: newPaymentStatus };
         console.log("pay")
         console.log(updatedOrder);
         dispatch(updateOrder(updatedOrder));
       
        
        
    }
    const { orders,loading,errMess } = useSelector(state => state.orders);
    
    const ordersList = orders.map((order) => {
        const orderedProducts = order.products.map((product) => {
            return (
                <tr>
                    <td><Link to={"/products/"+product.product} className="text-primary"><b>{product.product}</b></Link></td>
                    <td><b>{product.qnty}</b></td>
                </tr>
            )
        })
        const time = order.createdAt === order.updatedAt ? "-" : order.updatedAt.split("T")[1].split(":");
        let hour = time[0] * 1 + 5;
        let minute = time[1] * 1 + 30;
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
        return (
            <tr>
                <td><b>{order._id}</b></td>
                <td><b>
                    <table>
                        <thead className="bg_light">
                            <tr>
                            <td><b></b>Product</td>
                            <td><b></b>Quantity</td>
                        </tr>
                        </thead>
                        <tbody>
                            {orderedProducts}
                        </tbody>
                    </table>
                    </b>
                </td>
                <td><b>{order.totalAmt }</b></td>
                <td><b>
                    <tr>{order.user.name}</tr>
                    <tr>{order.user.username }</tr>
                    <tr>{order.user.phone}</tr>
                    </b>
                </td>
                <td><b>
                    <tr>{order.user.address}</tr>
                    <tr>Pincode : {order.user.pin}</tr>
                    </b>
                </td>
                <td><b>
                    <select value={order.delivered+""} className={order.delivered==="true"?"text-success":"text-danger"} onChange={(e) => setDeliveryStatus(order,e.target.value)}>
                        <option value="true" className="text-success">Delivered</option>
                        <option value="false" className="text-danger">Not Delivered</option>
                    </select>
                    </b>
                </td>
                <td><b>
                    <select value={order.payment+""} className={order.payment==="true"?"text-success":"text-danger"} onChange={(e) => { setPaymentStatus(order,e.target.value);}}>
                        <option value="true" className="text-success">Paid</option>
                        <option value="false" className="text-danger">Not Paid</option>
                    </select>
                    </b>
                </td>
                <td><b>{order.paymentMethod}</b></td>
                    {order.createdAt === order.updatedAt
                        ?
                        "___"
                        :
                        <td>
                         <tr><b>Date : { order.updatedAt.split("T")[0]}</b></tr>
                            <tr><b>Time : {hour}:{minute}{hour<12?" a.m":" p.m" }</b></tr>
                            </td>
                        }
                   
            </tr>
        );
        
    })
    useEffect(() => {
        if (orders.length===0) {
           dispatch(fetchOrders());
       }
       
       return () => {
           
       }
   }, [])
    return (
        <div className="mt-5">
            {
                loading
            ?
            <Loading/>
            :
            errMess
                ?
                <h3 className="d-flex justify-content-center col-12">{errMess}. Check your internet connection ! Or server may be down </h3>
                :
                <div className=" table-responsive">
                    <table class="table">
                        <thead class="thead-dark">
                        <tr>
                            <th>OrderId</th>
                            <th>Ordered Items</th>
                            <th>Total Price</th>    
                            <th>User</th>
                            <th>Delivery Address</th>
                            <th>Deliver Status</th>
                            <th>Payment Status</th>
                            <th>Payment Method</th>
                            <th>Delivered on</th>            
                        </tr>
                        </thead>
                        <tbody>
                            {ordersList}
                        </tbody>
                    </table>
                </div>
            }
        </div>
    )
}
