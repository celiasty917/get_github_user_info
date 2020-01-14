import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import AppBar from '@material-ui/core/AppBar';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';
import TextField from '@material-ui/core/TextField';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';


 const useStyles = makeStyles(theme => ({
  '@global': {
    ul: {
      margin: 0,
      padding: 0,
    },
    li: {
      listStyle: 'none',
    },
  },
  appBar: {
    borderBottom: `1px solid ${theme.palette.divider}`,
  },
  toolbar: {
    flexWrap: 'wrap',
  },
  toolbarTitle: {
    flexGrow: 1,
  },
  link: {
    margin: theme.spacing(1, 1.5),
  },
  heroContent: {
    padding: theme.spacing(3, 0, 6),
  },
  cardHeader: {
    backgroundColor:
      theme.palette.type === 'dark' ? theme.palette.grey[700] : theme.palette.grey[200],
  },
  cardPricing: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'baseline',
    marginBottom: theme.spacing(2),
  },
  footer: {
    borderTop: `1px solid ${theme.palette.divider}`,
    marginTop: theme.spacing(3),
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3),
    [theme.breakpoints.up('sm')]: {
      paddingTop: theme.spacing(3),
      paddingBottom: theme.spacing(3),
    },
  },
  paper: {
    marginTop: theme.spacing(3),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'left',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));


const footers = [

];

class GitHub {
  constructor() {
    this.client_id = 'e989261b2b0e141fd509';
    this.client_secret = '308a04f83032c80a4fb8c50ffa055899901a4d72';
  }
  async getUser(user){
    const infoResponse = await fetch(`https://api.github.com/users/${user}?client_id=${this.client_id}&client_secret=${this.client_secret}`);
    const info = await infoResponse.json();

    return {
      info
    }
  }
}


function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Get_Github_user_info
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}


class UsernameInput extends Component {

  constructor(){
    super();
    this.state = {
      data:'',
    }
  }

  handle(event){
    this.setState({
      data:event.target.value,
    })
  }

  handleClick(e){

    const userText = this.state.data;
    const github = new GitHub();

    if(userText !== ''){
      //make http call

      github.getUser(userText)
      .then(data => {
        if(data.info.message === 'Not Found'){
          //show alert
          document.getElementById('profile').innerHTML = `Username: Not Found`;
        } else {
          document.getElementById('profile').innerHTML = `
          <div class="panel panel-default">
            <div class="panel-heading">
              <h2 class="panel-title">${data.info.login}</h2>
            </div>
            <div class="panel-body">
              <div class = "row">
                <div class = "column">
                  <img src="${data.info.avatar_url}" alt="No pic"> <br />
                </div>
                <div class = "column" style="padding-left:15px"><font size="3">
                  
                  <strong>Name:</strong> ${data.info.name} <br />
                  <strong>Email:</strong> ${data.info.email} <br />
                  <strong>No. Repository:</strong> ${data.info.public_repos} <br />
                  <strong>No. Follers:</strong> ${data.info.followers} <br />
                  <strong>No. Following:</strong> ${data.info.following} <br />
                  <strong>Company:</strong> ${data.info.company} <br />
                  <strong>Location:</strong> ${data.info.location} <br />
                  <strong>Bio:</strong> ${data.info.bio} <br />
                  <strong>URL:</strong> <a href="${data.info.html_url}">${data.info.html_url}</a></font>
                </div>

              </div>
            </div>
          </div>`;
        }
      })
    } else {
      //Clear profile.
      document.getElementById('profile').innerHTML = '';
    }
  }

  _handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      this.handleClick(e);
    }
  }

  render(){
    return (
      <div>
      <TextField type="text" onChange={ this.handle.bind(this) } 
            onKeyDown={ this._handleKeyDown.bind(this) }
            variant="outlined" margin="normal" fullWidth
            id="Username"
            label="Enter a Github Username"
            name="Username" 
            autoFocus/>
      <Button onClick={ this.handleClick.bind(this) } fullWidth
            variant="contained"
            color="primary"
            className = {makeStyles(theme => ({
              submit: {
                margin: theme.spacing(3, 0, 2),
              },
            })).submit}>Search</Button>
      </div>
    );
  }

}



function App() {
  const classes = useStyles();

  return (
    <React.Fragment>
      <noscript>You need to enable JavaScript to run this app.</noscript>
      <CssBaseline />
      <AppBar position="static" color="default" elevation={0} className={classes.appBar}>
        <Toolbar className={classes.toolbar}>
          <Typography variant="h6" color="inherit" noWrap className={classes.toolbarTitle}>
            MINI Project
          </Typography>
        </Toolbar>
      </AppBar>

      <Container component="main" maxWidth="sm" className={classes.heroContent}>
        <CssBaseline />

        <div className={classes.paper}>
          <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
            Search GitHub Users
          </Typography>
          <Typography variant="h5" align="center" color="textSecondary" component="p">
            Enter a Github username to get the User's information.
          </Typography><br />
          <UsernameInput />
        </div>
        <br />

        <div id="profile">
        </div>
   

      </Container>

      <Container maxWidth="md" component="footer" className={classes.footer}>
        <Grid container spacing={4} justify="space-evenly">
          {footers.map(footer => (
            <Grid item xs={6} sm={3} key={footer.title}>
              <Typography variant="h6" color="textPrimary" gutterBottom>
                {footer.title}
              </Typography>
              <ul>
                {footer.description.map(item => (
                  <li key={item}>
                    <Link href="#" variant="subtitle1" color="textSecondary">
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </Grid>
          ))}
        </Grid>
        <Box mt={2}>
          <Copyright />
        </Box>
      </Container>
    </React.Fragment>
  );
}

export default App;
