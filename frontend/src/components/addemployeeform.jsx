import { useState, useEffect } from "react";


function AddEmployeeForm({onClose, onEmployeeAdded}){
    return(
        <div>
            <h1>Add Employee</h1>
            <button onClick={onClose}>Close</button>
        </div>
    );
}   

export default AddEmployeeForm;  
