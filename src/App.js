import * as React from 'react';
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
import { conditionalExpression, STATEMENT_OR_BLOCK_KEYS } from '@babel/types';

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
  const classes = useStyles();

  const handleOpen = (e, cellValues) => {
    setOpen(true);
  };
  const handleEdit = (e, cellValues) => {
    alert('TODO: ACTUALLY SET STATE; (include button text "save")');
    setOpen(true);
    console.log(e, cellValues.row.name, cellValues.row.address)
    // STOPPING POINT
  };
  const handleCreate = () => {
    alert('USE ACTUAL FORM INPUT, NOT HARDCODED');
    setRows(rows => [...rows, { id: 10, address: 'Foo', name: 'Bar' }])
    setOpen(false);
  };
  const handleDelete = () => {
    alert('TODO');
    setOpen(false);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleSubmit = () => {
    alert('here')
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
            <Button color="primary" onClick={(event) => {handleEdit(event, cellValues)}}>Edit</Button>
            <Button color="primary" onClick={(event) => {handleDelete(event, cellValues)}}>Delete</Button>
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
            <Typography variant="h6" className={classes.title}>
              Manage Hospitals
            </Typography>
            <Button color="inherit" onClick={handleOpen}>Add</Button>
          </Toolbar>
        </AppBar>
        <div style={{ height: 400, width: '100%' }}>
          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={5}
            disableSelectionOnClick
          />
        </div>
      </Container>

      <div>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
      <form onSubmit={handleSubmit}>
        <DialogTitle id="form-dialog-title">Add New Hospital</DialogTitle>
        <DialogContent>
          <DialogContentText>
            (You deserve a better address input, I know.)
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Name"
            type="text"
            fullWidth
          />
          <TextField
            autoFocus
            margin="dense"
            id="address"
            label="Address"
            type="text"
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button type="button" onClick={handleClose} color="secondary">
            Cancel
          </Button>
          <Button typre="submit" onClick={handleCreate} color="primary">
            Create
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  </div>
    </React.Fragment>
  );
}

export default App
