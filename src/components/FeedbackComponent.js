import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { fetchFeedbacks, fetchOrders } from '../redux/actioncreator';
import { Loading } from './LoadingComponent';

export default function Feedbacks() {
    const dispatch = useDispatch();
    
    const { feedbacks,loading,errMess } = useSelector(state => state.feedbacks);
    
    const feedbacksList = feedbacks.map((feedback) => {
        const mailto = "mailto:" + feedback.email;
        return (
            <tr>
                
                <td><b>{feedback._id}</b></td>
                <td><b>{feedback.name}</b></td>
                <td>
                    <tr><b>{feedback.email}</b></tr>
                    <tr><a role="button" className="btn btn-success mt-2" href={mailto}><i className="fa fa-envelope mr-2"></i>Send Reply</a></tr>
                </td>
                <td><b>{feedback.message}</b></td>
                
            </tr>
        );
        
    })
   useEffect(() => {
       if (feedbacks.length===0) {
           dispatch(fetchFeedbacks());
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
                            <th>Feedback ID</th>
                            <th>User name</th>
                            <th>Mail</th>    
                            <th>Feedback</th>
                        </tr>
                        </thead>
                        <tbody>
                            {feedbacksList}
                        </tbody>
                    </table>
                </div>
            }
        </div>
    )
}
