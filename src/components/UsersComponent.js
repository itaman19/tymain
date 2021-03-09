import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers } from '../redux/actioncreator';
import { Loading } from './LoadingComponent';

export default function Users() {
    const dispatch = useDispatch();
    
    const { users,loading,errMess } = useSelector(state => state.users)
    var i = 0;
    const usersList = users.map((user) => {
        i++;
        return (
            <tr>
                <td><b>{i}</b></td>
                <td><b>{user.admin?"Admin":user.name }</b></td>
                <td><b>{user.username }</b></td>
                <td><b>{user.phone }</b></td>
            </tr>
        );
        
    })
    useEffect(() => {
        
        if (users.length===0) {
            dispatch(fetchUsers());
            

        }
        return () => {
            
        }
    }, []);
    return (
        <div className="mt-5">
            { loading
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
                            <th>Sr.No</th>
                            <th>Full Name</th>
                            <th>Email</th>
                            <th>Phone Number</th>
                        </tr>
                        </thead>
                        <tbody>
                            {usersList}
                        </tbody>
                    </table>
                    </div>
            }
       </div>
    )
}
