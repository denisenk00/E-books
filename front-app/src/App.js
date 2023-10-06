import React, { Component } from "react";
import { Switch, Route, Link } from "react-router-dom";
import "./App.css";
import { styles } from "./css-common"

import AddBook from "./components/add-book.component";
import Book from "./components/book.component";
import BookList from "./components/books-list.component";

import { AppBar, Toolbar, Typography, withStyles } from '@material-ui/core';

class App extends Component {
  render() {
    const { classes } = this.props

    return (
      <div>
        <AppBar className={classes.appBar} position="static">
          <Toolbar>
            <Typography className={classes.name} variant="h6">
              E-Books
            </Typography>
            <Link to={"/books"} className={classes.link}>
              <Typography variant="body2">
                Books
              </Typography>
            </Link>
            <Link to={"/add"} className={classes.link}>
              <Typography variant="body2">
                Add
            </Typography>
            </Link>
          </Toolbar>
        </AppBar>

          <Switch>
            <Route exact path={["/", "/books"]} component={BookList} />
            <Route exact path="/add" component={AddBook} />
            <Route path="/books/:id" component={Book} />
          </Switch>
      </div>
    );
  }
}

export default withStyles(styles)(App);