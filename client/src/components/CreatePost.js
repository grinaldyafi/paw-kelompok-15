import React, { Component } from "react";
import Axios from "axios";
import { setErrors } from "./../conmmon/setErrors";
import CKEditor from "@ckeditor/ckeditor5-react";
import { Redirect } from 'react-router'
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import "../App.css";
class CreatePost extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      description: "",
      category: "",
      errors: {},
    };
  }
  handleInputChange = (e) => {
    const { name, value } = e.target;
    this.setState({
      ...this.state,
      [name]: value,
    });
  };

  validate = (titlte, description, category) => {
    const errors = setErrors(titlte, description, category);
    this.setState({ errors: errors });
    return Object.values(errors).every((err) => err === "");
  };

  onSubmit = (e) => {
    e.preventDefault();
    const { title, description, category } = this.state;
    if (this.validate(title, description, category)) {
      const data = {
        title: title,
        description: description,
        postCategory: category,
      };
      console.log(data);
      Axios.post("/posts/add", data).then((res) => {
        if (res.data.success) {
          alert("Added");
          this.setState({ title: "", description: "", category: "",redirect: true });
        }
      });
    }
  };

  render() {
    const { redirect } = this.state;

     if (redirect) {
       return <Redirect to='/'/>;
     }
    return (
      <div className="todo-app">
        <h1 className="create-new">Create New Task</h1>
        <form className="needs-validation" noValidate>
        <label>Title</label>
          <div className="form-group">
            <input
              type="text"
              className="todo-input"
              name="title"
              placeholder="Enter title"
              value={this.state.title}
              onChange={this.handleInputChange}
            />
            {this.state.errors.title && (
              <div className="text-danger">{this.state.errors.title}</div>
            )}
          </div>
          <label>Category</label>
          <div className="form-group">
            
            <input
              type="text"
              className="todo-input"
              name="category"
              placeholder="Enter category"
              value={this.state.category}
              onChange={this.handleInputChange}
            />
            {this.state.errors.category && (
              <div className="text-danger">{this.state.errors.category}</div>
            )}
          </div>
          <div className="form-group">
            {/* <label>Description</label> */}
            <CKEditor
              editor={ClassicEditor}
              className="description"
              data={this.state.description}
              onChange={(event, editor) => {
                const data = editor.getData();
                this.setState({ description: data });
              }}
            />
            {this.state.errors.description && (
              <div className="text-danger">{this.state.errors.description}</div>
            )}
          </div>

          <button
            className="btn btn-success"
            type="submit"
            onClick={this.onSubmit}
          >
            <i className="far fa-check-square"></i>
            &nbsp;Submit
          </button>
        </form>
      </div>
    );
  }
}

export default CreatePost;
