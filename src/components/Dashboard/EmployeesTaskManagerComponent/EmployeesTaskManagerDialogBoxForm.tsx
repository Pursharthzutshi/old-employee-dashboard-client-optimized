import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../ReduxHooks";
import { SetEmployeeEmailId, setAlreadyAddedEmployeeStatus, setEmployeeDeadLine, setEmployeeName, setEmployeeTaskDesc } from "../../../ReduxSlicers/AddEmployeesTaskSlicer";
import { gql, useQuery } from "@apollo/client";
import { setShowEmployeesDialogBox, setShowEmployeesEditDialogBox } from "../../../ReduxSlicers/ShowEmployeesDialogBoxSlicer";
import "./EmployeesTaskManagerDialogBoxForm.css"
import Calendar from 'react-calendar';
import { FaCross, FaTimes } from "react-icons/fa";

import { setTaskAssign } from "../../../ReduxSlicers/ShowTaskAssignEmployeeInDialogBoxSlicer";

const showUsersEmailIdsQuery = gql`
query fetchEmailUsersIds{
  fetchEmailUsersIds {
  name  
  emailId
  }
}
`


function EmployeesTaskManagerDialogBoxForm() {

    const { data: FetchUserData, loading, error, refetch } = useQuery(showUsersEmailIdsQuery);

    const alreadyAddedEmployeeStatus = useAppSelector((state) => state.AddEmployeesTaskSlicer.alreadyAddedEmployeeStatus)


    const [selectedUsers, setSelectedUsers] = useState<any>([]);


    const taskAssignedToEmployee = useAppSelector((state) => state.ShowTaskAssignEmployeeInDialogBoxSlicer.taskAssigned)
    const Dispatch = useAppDispatch();

    const addSelectedUser = (currentUsers: String) => {


        if (!selectedUsers.includes(currentUsers)) {

            FetchUserData.fetchEmailUsersIds.find((val: any) => {
                if (val.emailId === currentUsers) {
                    setSelectedUsers((prevUser: any) => [...prevUser, currentUsers])
                    Dispatch(setTaskAssign(true))
                    return;
                }
            })
        } else {
            Dispatch(setAlreadyAddedEmployeeStatus(true));
        }

        // if(currentUsers == usersEmailIds)
        // setSelectedUsers((prevUser:any)=>[...prevUser,currentUsers])
    }

    useEffect(() => {
        Dispatch(SetEmployeeEmailId(selectedUsers));

    })

    const removeSelectedUsers = (selectedEmailId: any) => {
        const updatedSelectedUsers = selectedUsers.filter((val: any) => {
            console.log(selectedEmailId)
            return val !== selectedEmailId;
        })
        console.log(selectedUsers)
        setSelectedUsers(updatedSelectedUsers)
    }

    const closeDialogBox = () => {
        Dispatch(setShowEmployeesDialogBox(false));
        Dispatch(setShowEmployeesEditDialogBox(false));
    }

    useEffect(() => {
        console.log(selectedUsers)
    }, [selectedUsers])

    if (loading) return <p>Loading...</p>;


    return (
        <div className="employee-dialog-box-div">

            <div className="close-dialog-box-icon-div" onClick={closeDialogBox}>
                <FaTimes className="close-dialog-box-icon" >Close</FaTimes>
            </div>

            <h3 className="add-new-task-heading">Edit a New Task</h3>

            <input type="text" placeholder="Task Name" onChange={(e: any) => { Dispatch(setEmployeeName(e.target.value)) }} />

            <input onChange={(e: any) => addSelectedUser(e.target.value)} type="text" name="city" list="cityname" />

            <datalist id="cityname">
                <select>
                    {
                        FetchUserData.fetchEmailUsersIds.map((val: any) => {
                            return <option value={val.emailId}>
                                {val.name}
                            </option>
                        })
                    }

                </select>
            </datalist>

            {
                taskAssignedToEmployee && selectedUsers.length > 0 && <div className="selected-employees-container">

                    <strong>Task Assigned to the Employee</strong>
                    {
                        selectedUsers.map((val: any) => {
                            return (
                                <div className="selected-employees-div">
                                    <p>{val}</p>
                                    <FaTimes className="selected-employees-cancel-icon" onClick={() => removeSelectedUsers(val)}></FaTimes>
                                </div>
                            )
                        })
                    }
                </div>
            }

            {
                alreadyAddedEmployeeStatus ? <h4 className="">Added Already</h4> : null
            }


            <input type="text" placeholder="Task Description" onChange={(e: any) => { Dispatch(setEmployeeTaskDesc(e.target.value)) }} />
            {/* <input type="text" placeholder="deadLine" onChange={(e: any) => { Dispatch(setEmployeeDeadLine(e.target.value)) }} /> */}
            {/* //<input className="calendar" type="date"/> */}
            {/* <Calendar/> */}

        </div>
    )
}

export default EmployeesTaskManagerDialogBoxForm;