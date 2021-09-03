import React, { useReducer, useState } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { DataGrid } from '@material-ui/data-grid';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { modes } from 'react-transition-group/SwitchTransition';
import { moduleExpression } from '@babel/types';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

const App = () => {

  const [open, setOpen] = React.useState(false);
  const [rows, setRows] = React.useState([
    { id: 1, address: 'Snow', name: 'Jon' },
    { id: 2, address: 'Lannister', name: 'Cersei' },
    { id: 3, address: 'Lannister', name: 'Jaime' },
    { id: 4, address: 'Stark', name: 'Arya' },
    { id: 5, address: 'Targaryen', name: 'Daenerys' },
    { id: 6, address: 'Melisandre', name: null },
    { id: 7, address: 'Clifford', name: 'Ferrara' },
    { id: 8, address: 'Frances', name: 'Rossini' },
    { id: 9, address: 'Roxie', name: 'Harvey' },
  ]);
  const initialFormValues = {
    name: "",
    id: 99999,
    address: "",
    formSubmitted: false,
    success: false,
  };
  const [values, setValues] = React.useState(initialFormValues);
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [formState, setFormState] = useState({
    isEditable: false,
    dialogTitle: "",
    submitText: "",
    rowId: 0,
  });
  const classes = useStyles();

  const handleClose = () => {
    setOpen(false);
  };
  const handleCreate = (e, cellValues) => { // TODO RENAME
    setOpen(true);
    setFormState({
      isEditable: false,
      dialogTitle: "Add New Hospital",
      submitText: "Create",
      rowId: 0,
    })
  };
  const handleDelete = ({id}) => {
    const deletionIndex = rows.map(row => row.id).indexOf(id);
    const deletedRows = [...rows.filter((row) => row.id === id)];
    setRows(
      rows.filter((row) => deletedRows.filter((deletion) => deletion.id === row.id).length < 1)
    );
    setOpen(false);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    values.id = values.id + 1;
    console.log("values.id", values.id)
    if (formState.isEditable) {
      console.log("EDITING")
      const updatedRows = [...rows];
      const updatedRow = { id: formState.rowId };
      updatedRow.name = name ? name : updatedRows[formState.updateIndex].name;
      updatedRow.address = address ? address : updatedRows[formState.updateIndex].address;
      updatedRows[formState.updateIndex] = updatedRow;
      setRows(updatedRows);
    } else {
      console.log("CREATING")
      setRows(rows => [...rows, {
        id: values.id,
        name,
        address,
      }])
    }
    setOpen(false);
  };
  const handleUpdate = (e, { row }) => {
    setOpen(true);
    const updateIndex = rows.map(r => r.id).indexOf(row.id);
    setName(row.name)
    setAddress(row.address)
    setFormState({
      isEditable: true,
      dialogTitle: `Update ${row.name}`,
      submitText: `Update`,
      rowId: row.id,
      updateIndex,
    });
  };

  const columns: GridColDef[] = [
    {
      field: 'id',
      headerName: 'ID',
      hide: true,
    },
    {
      field: 'name',
      headerName: 'Name',
      width: 150,
      editable: true,
    },
    {
      field: 'address',
      headerName: 'Address',
      width: 150,
      editable: true,
    },
    {
      field: "",
      headerName: "Actions",
      sortable: false,
      width: 200,
      disableClickEventBubbling: true,
      renderCell: (cellValues) => {
        return (
          <>
            <Button color="primary" onClick={(event) => {handleUpdate(event, cellValues)}}>Edit</Button>
            <Button color="primary" onClick={(event) => {handleDelete(cellValues)}}>Delete</Button>
          </>
       );
      }
    },
  ];

  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="sm">
        <AppBar position="static">
          <Toolbar>
            <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title}>Manage Hospitals</Typography>
            <Button color="inherit" onClick={handleCreate}>Add</Button>
          </Toolbar>
        </AppBar>
        <div style={{ height: 400, width: '100%' }}>
          <DataGrid rows={rows} columns={columns} pageSize={5} disableSelectionOnClick />
        </div>
      </Container>
      <div>
        <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
          <form onSubmit={handleSubmit}>
            <DialogTitle id="form-dialog-title">{formState.dialogTitle}</DialogTitle>
            <DialogContent>
              <TextField id="name" type="text" name="name" label="Name"
                inputProps={formState.isEditable ? { defaultValue: name } : ""}
                margin="dense" fullWidth
                onBlur={e => setName(e.target.value)}
                onChange={e => setName(e.target.value)}
              />
              <TextField
                id="address" type="text" name="Address" label="Address"
                inputProps={formState.isEditable ? { defaultValue: address } : ""}
                margin="dense" fullWidth
                onBlur={e => setAddress(e.target.value)}
                onChange={e => setAddress(e.target.value)}
              />
            </DialogContent>
            <DialogActions>
              <Button type="button" onClick={handleClose} color="secondary">Cancel</Button>
              <Button type="submit" color="primary">{formState.submitText}</Button>
            </DialogActions>
          </form>
        </Dialog>
      </div>
    </React.Fragment>
  );
}

export default App
