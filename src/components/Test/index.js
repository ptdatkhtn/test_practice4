import React, { Component } from "react";

const params = "username=tulip2014";

export default class index extends Component {
  constructor(props) {
    super(props);
    this.state = { value: "", isSubmit: false };
  }

  componentDidMount() {
    fetch(
      `https://hxj1tck8l1.execute-api.us-east-1.amazonaws.com/default/users/taken?${params}`
      //   {
      //     method: "POST",
      //     headers: {
      //       Accept: "application/json",
      //       "Content-Type": "application/json"
      //     },
      //     body: JSON.stringify({})
      //   }
    )
      .then(res => res.json())
      .then(
        result => {
          this.setState({
            isLoaded: true,
            items: result.items
          });
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        error => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      );
  }
  handleChange = event => {
    this.setState({
      value: event.target.value
    });
    if (event.target.value.length > 3) {
      this.setState({
        isSubmit: true
      });
    } else {
      this.setState({
        isSubmit: false
      });
    }
  };

  handleSubmit = event => {
    console.log("A name was submitted: " + this.state.value);
    event.preventDefault();
  };

  render() {
    const isDisabled = this.state.isSubmit;
    const value = this.state.value || "";
    console.log(value);
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Username:
          <input
            type="text"
            value={this.state.value}
            onChange={this.handleChange}
          />
        </label>
        <input type="submit" value="Submit" disabled={!isDisabled} />
        {value.length < 4 && (
          <p className={{ fontsize: "6px", color: "red" }}>
            Username must be at least 4 characters long
          </p>
        )}
      </form>
    );
  }
}
