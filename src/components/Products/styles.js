import { makeStyles } from '@mui/styles';

export default makeStyles((theme) => ({
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing(3),
  },
  root: {
    flexGrow: 1,
  },
  searchoff:{
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  }
}));