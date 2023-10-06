import React, { Component } from "react";
import BookDataService from "../services/book.service";

import { styles } from "../css-common"
import { TextField, Button, withStyles } from "@material-ui/core";

class Book extends Component {
    constructor(props) {
        super(props);
        this.onChangeTitle = this.onChangeTitle.bind(this);
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.getBook = this.getBook.bind(this);
        this.updateBook = this.updateBook.bind(this);
        this.deleteBook = this.deleteBook.bind(this);

        this.state = {
            currentBook: {
                id: null,
                title: "",
                description: "",
            },
            message: ""
        };
    }

    componentDidMount() {
        this.getBook(this.props.match.params.id);
    }

    onChangeTitle(e) {
        const title = e.target.value;

        this.setState(function (prevState) {
            return {
                currentBook: {
                    ...prevState.currentBook,
                    title: title
                }
            };
        });
    }

    onChangeDescription(e) {
        const description = e.target.value;

        this.setState(prevState => ({
            currentBook: {
                ...prevState.currentBook,
                description: description
            }
        }));
    }

    getBook(id) {
        BookDataService.get(id)
            .then(response => {
                this.setState({
                    currentBook: response.data
                });
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    }

    updateBook() {
        BookDataService.update(
            this.state.currentBook.id,
            this.state.currentBook
        )
            .then(response => {
                console.log(response.data);
                this.setState({
                    message: "The Book was updated successfully!"
                });
            })
            .catch(e => {
                console.log(e);
            });
    }

    deleteBook() {
        BookDataService.delete(this.state.currentBook.id)
            .then(response => {
                console.log(response.data);
                this.props.history.push('/Books')
            })
            .catch(e => {
                console.log(e);
            });
    }

    render() {
        const { currentBook } = this.state;
        const { classes } = this.props

        return (
            <div>
                {currentBook ? (
                    <div className={classes.form}>
                        <h2>Book</h2>
                        <form>
                            <div>
                                <TextField
                                    className={classes.textField}
                                    label="Title"
                                    name="title"
                                    value={currentBook.title}
                                    onChange={this.onChangeTitle}
                                    required
                                />
                            </div>
                            <div>
                                <TextField
                                    className={classes.textField}
                                    label="Description"
                                    name="description"
                                    value={currentBook.description}
                                    onChange={this.onChangeDescription}
                                    required
                                />
                            </div>
                        </form>
                        <div className={classes.buttonWrapper}>
                            <Button
                                className={`${classes.delete} ${classes.button}`}
                                onClick={this.deleteBook}>
                                Delete
                            </Button>

                            <Button
                                type="submit"
                                className={`${classes.update} ${classes.button}`}
                                onClick={this.updateBook}>
                                Update
                            </Button>
                        </div>
                        <p>{this.state.message}</p>
                    </div>
                ) : (
                        <div>
                            <br />
                            <p>Please click on a book...</p>
                        </div>
                    )}
            </div>
        );
    }
}

export default withStyles(styles)(Book)