import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Modal } from './modal';
import './Adminsdashboard.css';

// AdminsdashboardsPage.js
import { BsFillPencilFill, BsFillTrashFill } from "react-icons/bs";
function AdminsdashboardsPage() {
    const [userData, setUserData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const perPage = 10;
    const [selectedRows, setSelectedRows] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [isHeaderCheckboxChecked, setIsHeaderCheckboxChecked] = useState(false);

    useEffect(() => {
        axios.get('https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json')
            .then(response => {
                setUserData(response.data.map(user => ({ ...user })));
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }, []);

    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
        setCurrentPage(1);
    };

    const [modalOpen, setModalOpen] = useState(false);
    const [rowToEdit, setRowToEdit] = useState(null);
    const handleEdit = (index) => {
        const row = userData[index]; // Fetch the row based on the index
        setRowToEdit(row); // Set the row to be edited in state
        setModalOpen(true); // Open the modal
    };

    // Function to close the modal
    const closeModal = () => {
        setModalOpen(false);
        setRowToEdit(null);
    };

    const handleSubmit = (updatedUserData) => {
        const updatedData = userData.map((user) =>
            user === rowToEdit ? { ...updatedUserData } : user
        );

        // Ensure updatedData is correctly populated before setting the state
        console.log(updatedData); // Log to verify the content before using it

        setUserData(updatedData);
        closeModal();
    };




    const handleDelete = (index) => {
        const updatedData = [...userData];
        updatedData.splice(index, 1);
        setUserData(updatedData);
    };

    const filteredData = userData.filter(user =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.role.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const indexOfLastRow = currentPage * perPage;
    const indexOfFirstRow = indexOfLastRow - perPage;
    const currentRows = filteredData.slice(indexOfFirstRow, indexOfLastRow);

    const totalPages = Math.ceil(filteredData.length / perPage);

    const handlePreviousPage = () => {
        setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
    };

    const handleNextPage = () => {
        setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
    };
    const [AdminsdashboardList, setAdminsdashboardList] = useState([{
        Name: '',
        Email: '',
        Role: '',


    }]);



    const handleRowCheckboxChange = (e, name) => {
        const isChecked = e.target.checked;
        if (isChecked) {
            setSelectedRows([...selectedRows, name]);
        } else {
            const updatedSelectedRows = selectedRows.filter(rowName => rowName !== name);
            setSelectedRows(updatedSelectedRows);
        }
    };


    const handleFormSubmit = (e) => {
        e.preventDefault();
    };

    const handleBulkDelete = () => {
        let updatedData;
        if (searchTerm) {
            updatedData = userData.filter((user) => {
                return !selectedRows.includes(user.name) && (
                    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    user.role.toLowerCase().includes(searchTerm.toLowerCase())
                );
            });
        } else {
            updatedData = userData.filter((user) => !selectedRows.includes(user.name));
        }
    
        setUserData(updatedData);
        setSelectedRows([]);
    
        // Uncheck the header checkbox after deletion
        setIsHeaderCheckboxChecked(false);

    };
    




    const handleHeaderCheckboxChange = (e) => {
        
        const isChecked = e.target.checked;
        let allRowNames = [];
    
        if (isChecked) {
            const start = (currentPage - 1) * perPage;
            const end = Math.min(currentPage * perPage, filteredData.length);
            const currentRows = filteredData.slice(start, end);
            allRowNames = currentRows.map((row) => row.name);
        }
    
        setSelectedRows(isChecked ? allRowNames : []);
        setIsHeaderCheckboxChecked(isChecked);
    };
    
    


    return (
        <>
            <div className="top-content1">
                <div className="inner-bg" style={{ padding: "0px 0px 80px 0" }}>
                    <div className="container">
                        <div className="row">
                            <div className="col-12">
                                <div className="form1-box">
                                    <div className='abc'>
                                        <form className="ab" onSubmit={handleFormSubmit}>
                                            <div className="form1-top">
                                                <div className="form1-top-left">
                                                    <h1>Admin Dashboard</h1>
                                                </div>
                                                <div className="form1-top-right">
                                                    <i className="fa fa-plane"></i>
                                                </div>

                                                <div className='container' style={{ display: 'flex' }}>
                                                    <div className='row col-3'>

                                                        <input
                                                            type="text"
                                                            placeholder="Search"
                                                            value={searchTerm}
                                                            onChange={handleSearch}
                                                            style={{ width: '75%', height: '60px', borderRadius: '10px', paddingInline: '25px', fontSize: '20px' }}
                                                        />
                                                    </div>
                                                    <div className="row col-3"></div>
                                                    <div className="row col-3"></div>
                                                    <div className="row col-3" style={{ marginLeft: '300px' }} >
                                                        <div style={{ border: '1px solid #ccc', padding: '5px', height: '60px', width: '60px', backgroundColor: '#444' }}>
                                                            <i className="fa fa-trash" aria-hidden="true" onClick={handleBulkDelete} style={{ fontSize: '33px', marginLeft: '10px', marginTop: '6px', cursor: 'pointer' }}></i>
                                                        </div>
                                                    </div>
                                                </div>

                                            </div>

                                            <table style={{ fontSize: '18px' }}>
                                                <thead>
                                                    <tr>
                                                        <th><input type="checkbox" id="headerCheckbox" checked={isHeaderCheckboxChecked} onChange={handleHeaderCheckboxChange} style={{ height: '20px' }} /></th>
                                                        <th>Name</th>
                                                        <th>Email</th>
                                                        <th>Role</th>
                                                        <th>Action</th>
                                                    </tr>
                                                </thead>


                                                <tbody>
                                                    {currentRows.map((row, index) => {
                                                        const rowIndex = indexOfFirstRow + index;
                                                        return (
                                                            <tr key={rowIndex} className={selectedRows.includes(rowIndex) ? 'selected-row' : ''}>
                                                                <th> <input type="checkbox" onChange={(e) => handleRowCheckboxChange(e, row.name)}
                                                                    checked={selectedRows.includes(row.name)} style={{ height: '20px' }} /></th>
                                                                <td>{row.name}</td>
                                                                <td>{row.email} </td>
                                                                <td>{row.role}</td>
                                                                <td>
                                                                    <span className='actions'>

                                                                        <BsFillTrashFill className="delete-btn1" onClick={() => handleDelete(rowIndex)} />
                                                                        <BsFillPencilFill onClick={() => handleEdit(rowIndex)} />

                                                                    </span>

                                                                </td>
                                                            </tr>
                                                        );
                                                    })}

                                                </tbody>



                                            </table>

                                            <div className="pagination-container">
                                                <button className="first-page" onClick={() => setCurrentPage(1)} style={{ width: '50px', height: '50px', fontSize: '10px', marginRight: '3px' }}>
                                                    First
                                                </button>
                                                <button className="previous-page" onClick={handlePreviousPage} style={{ width: '50px', height: '50px', fontSize: '10px', marginRight: '3px' }}>
                                                    Prev
                                                </button>
                                                <button className="previous-page" style={{ width: '50px', height: '50px', fontSize: '10px', marginRight: '3px' }}>
                                                    {currentPage}
                                                </button>
                                                <button className="next-page" onClick={handleNextPage} style={{ width: '50px', height: '50px', fontSize: '10px', marginRight: '3px' }}>
                                                    Next
                                                </button>
                                                <button className="last-page" onClick={() => setCurrentPage(totalPages)} style={{ width: '50px', height: '50px', fontSize: '10px', marginRight: '3px' }}>
                                                    Last
                                                </button>
                                            </div>
                                        </form>
                                        {modalOpen && (
                                            <Modal
                                                closeModal={closeModal}
                                                onSubmit={handleSubmit}
                                                defaultValue={rowToEdit}
                                            />
                                        )}

                                    </div>
                                </div>

                            </div>

                        </div>

                    </div>
                </div>
            </div>
        </>

    );
}

export default AdminsdashboardsPage;
