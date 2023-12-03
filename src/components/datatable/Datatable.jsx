import { Box, TextField, InputAdornment, IconButton } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { DeleteOutline } from "@mui/icons-material";
import React, { useEffect, useState } from 'react';
import { fetchDataFromAPI } from '../../Data/api.js';
import './Datatable.css';
const Datatable = () => {
  
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]); // Add state for filtered data
  const [searchValue, setSearchValue] = useState(""); // State to hold search query
  const [rowSelectionModel, setRowSelectionModel] = useState([]); // State for selected rows
  const [editRowId, setEditRowId] = useState(null); // Track the row being edited
  const pageSize = 10; // Default page size

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const jsonData = await fetchDataFromAPI();
    setData(jsonData);
    setFilteredData(jsonData);
  };
  
  const handleDelete = (id) => {
    setData(data.filter((item) => item.id !== id));
  };
  

  const handleSearchInputChange = (event) => {
    const { value } = event.target;
    setSearchValue(value);
    filterData(value);
  };

  // Function to filter data based on search value
  const filterData = (query) => {
    const filtered = data.filter((item) =>
      Object.values(item).some(
        (value) =>
          typeof value === "string" && value.toLowerCase().includes(query.toLowerCase())
      )
    );
    setFilteredData(filtered);
  };
  // Use filteredData instead of rawData for the DataGrid rows
  const rows = searchValue ? filteredData : data;

  const handleSelectionChange=(newRowSelectionModel)=>{
    const currentPageRowIds = data.slice(0, pageSize).map((row) => row.id); // pageSize is the current page size
    const selectedOnCurrentPage = newRowSelectionModel.filter((id) => currentPageRowIds.includes(id));
    setRowSelectionModel(selectedOnCurrentPage);
  }
  

  const handleDeleteSelected = () => {
    const updatedData = data.filter((row) => !rowSelectionModel.includes(row.id));
    setData(updatedData);
    setRowSelectionModel([]);
  };
  
  const columns = [
    
    {
      field: "id",
      headerName: "ID",
      flex: 1,
      renderCell: (params) => {
        if (params.row.id === editRowId) {
          return (
            <TextField
              value={params.row.id}
              onChange={(e) => handleEditFieldChange(e, "id", params.row.id)}
              className="editableCell"
            />
          );
        }
        return params.value;
      },
    },
    {
      field: "name",
      headerName: "Name",
      flex: 1,
      renderCell: (params) => {
        if (params.row.id === editRowId) {
          return (
            <TextField
              value={params.row.name}
              onChange={(e) => handleEditFieldChange(e, "name", params.row.id)}
              className="editableCell"
            />
          );
        }
        return params.value;
      },
    },
    {
      field: "email",
      headerName: "Email",
      flex: 1,
      renderCell: (params) => {
        if (params.row.id === editRowId) {
          return (
            <TextField
              value={params.row.email}
              onChange={(e) => handleEditFieldChange(e, "email", params.row.id)}
              className="editableCell"
            />
          );
        }
        return params.value;
      },
    },
    {
      field: "role",
      headerName: "Role",
      flex: 1,
      renderCell: (params) => {
        if (params.row.id === editRowId) {
          return (
            <TextField
              value={params.row.role}
              onChange={(e) => handleEditFieldChange(e, "role", params.row.id)}
              className="editableCell"
            />
          );
        }
        return params.value;
      },
    },
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => {
        if (params.row.id === editRowId) {
          return (
            <div className="cellAction">
              <div
                className="saveButton"
                onClick={() => handleSave(params.row.id)}
              >
                Save
              </div>
            </div>
          );
        } else {
          return (
            <div className="cellAction">
              <div
                className="editButton"
                onClick={() => handleEdit(params.row.id)}
              >
                Edit
              </div>
              <div
                className="deleteButton"
                onClick={() => handleDelete(params.row.id)}
              >
                Delete
              </div>
            </div>
          );
        }
      },
    },
    
  ];

  const handleEdit = (id) => {
    setEditRowId(id);
  };

  const handleEditFieldChange = (e, fieldName, id) => {
    const updatedData = data.map((row) =>
      row.id === id ? { ...row, [fieldName]: e.target.value } : row
    );
    setData(updatedData);
  };

  const handleSave = (editedRow) => {
    setEditRowId(null);
    // You can save the edited data to the backend or perform other actions here
    console.log("Edited Row Data:", editedRow);
  };

  

  
  return (
    <Box m="20px">
      <Box marginBottom="20px" display="flex" justifyContent="flex-start">
        <TextField
          label="Search"
          variant="outlined"
          value={searchValue}
          onChange={handleSearchInputChange}
          style={{ width: 300 }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton>
                  <SearchIcon className="search-icon"/>
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Box>
      <Box display="flex" justifyContent="flex-end" marginBottom="10px">
      {rowSelectionModel.length > 0 && (
          <IconButton onClick={handleDeleteSelected}>
            <DeleteOutline />
          </IconButton>
        )}
      </Box>
      <Box
        m="40px 0 0 0"
        height="85vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .name-column--cell": {
            color: '#007FFF',
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: '#a4a9fc',
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: '#f2f0f0',
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: '#a4a9fc',
          },
          "& .MuiCheckbox-root": {
            color: '#1e5245',
          },
          "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
            color: '#141414',
          },
        }}
      >
        <DataGrid
          getRowId={(row) => row.id}
          rows={rows || []}
          columns={columns}
          components={{ Toolbar: GridToolbar }}
          checkboxSelection 
          disableRowSelectionOnClick {...rows}
          onRowSelectionModelChange={handleSelectionChange}
          rowSelectionModel={rowSelectionModel}
          initialState={{
            ...rows.initialState,
            pagination: { paginationModel: { pageSize: 10 } },
          }}
          pageSizeOptions={[5, 10, 25]}
        />
      </Box>
    </Box>
  );
};


export default Datatable;
