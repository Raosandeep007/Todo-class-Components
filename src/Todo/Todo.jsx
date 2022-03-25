import axios from "axios";
import React from "react";
import "./Todo.css";

export class Todo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      todo: [],
      query: {},
      page: 1,
    };
  }

  handleChange(e) {
    const { name } = e.target;
    this.setState({
      query: { ...this.state.query, [name]: e.target.value },
    });
  }

  // on mounting I want to diaplay all the data
  handleAdd() {
    var { query } = this.state;
    if (Object.keys(query).length > 0) {
      if (!query.time) {
        alert("set a date and time for completion");
      } else {
        const payload = {
          title: query,
          status: false,
        };
        axios
          .post("https://shadow-glittery-bosworth.glitch.me/todos", payload)
          .then((res) => {
            this.handleGetTodos();
          });
      }
    } else {
      alert("Nothing to add");
    }
  }

  handleGetTodos(e) {
    this.setState({
      query: {},
    });
    const { page } = this.state;
    return axios
      .get(
        "https://shadow-glittery-bosworth.glitch.me/todos?_sort=id&_order=desc",
        {
          params: { _limit: 3, _page: page },
        }
      )
      .then((res) =>
        this.setState(
          {
            todo: res.data,
          },

          () => {}
        )
      );
  }

  componentDidMount() {
    this.handleGetTodos();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.page !== this.state.page) {
      this.handleGetTodos();
    }
  }

  handleChecked(id, status) {
    const payload = {
      status: !status,
    };
    axios
      .patch(`https://shadow-glittery-bosworth.glitch.me/todos/${id}`, payload)
      .then((res) => {
        this.handleGetTodos();
      });
  }
  handleDelete(id) {
    axios
      .delete(`https://shadow-glittery-bosworth.glitch.me/todos/${id}`)
      .then((res) => {
        this.handleGetTodos();
      })
      .catch((err) => console.error(err));
  }
  handleDeletecompleted() {
    let completed = this.state.todo.filter((t) => t.status == true);
    completed.forEach((complete) => {
      axios
        .delete(
          `https://shadow-glittery-bosworth.glitch.me/todos/${complete.id}`
        )
        .then((res) => {
          this.handleGetTodos();
        })
        .catch((err) => console.error(err));
    });
  }

  render() {
    const { todo, query } = this.state;
    return (
      <div>
        <div id="addtododiv">
          <h1 id="heading">ADD YOUR TODO</h1>
          <div id="adddiv">
            <button
              onClick={(e) => {
                this.handleDeletecompleted();
              }}
            >
              DELETE ALL COMPLETED TODOS
            </button>
            <input
              id="inputtodo"
              name="task"
              onChange={(e) => {
                this.handleChange(e);
              }}
              type="text"
              required
              placeholder="Add Something"
            />
            <input
              id="inputtodo"
              type="datetime-local"
              name="time"
              onChange={(e) => {
                this.handleChange(e);
              }}
            />
            <button
              onClick={(e) => {
                this.handleAdd();
              }}
            >
              ADD TODO
            </button>
          </div>
        </div>
        {todo?.map((item) => (
          <div
            id="tododiv"
            style={{
              color: item.status == true ? "white" : "black",
              backgroundColor: item.status == true ? "green" : "",
            }}
            key={item.id}
          >
            <div
              id="statusdiv"
              style={{
                color: item.status == true ? "white" : "",
              }}
            >
              <input
                id="checkbox"
                type="checkbox"
                checked={item.status}
                onChange={this.handleChecked.bind(this, item.id, item.status)}
              />
              <span>Mark&nbsp;</span>
              <span>{item.status == true ? "Incompleted" : "Complete"}</span>
            </div>
            <div id="titlediv">{item.title.task}</div>

            <div id="date_time_div">
              <div
                style={{
                  color: item.status == true ? "" : "blue",
                }}
              >
                {new Date(item.title.time).toString().slice(0, 21)}
              </div>
              <hr />
              <button
                id="deletebtn"
                onClick={this.handleDelete.bind(this, item.id)}
              >
                DELETE
              </button>
            </div>
          </div>
        ))}

        <div id="nextprevdiv">
          <button
            disabled={this.state.page === 1 ? true : false}
            style={{
              cursor: this.state.page === 1 ? "not-allowed" : "Pointer",
            }}
            onClick={() => this.setState({ page: this.state.page - 1 })}
          >
            &#8678; Prev
          </button>{" "}
          <button
            disabled={todo.length < 1 ? true : false}
            style={{ cursor: todo.length < 1 ? "not-allowed" : "Pointer" }}
            onClick={() => this.setState({ page: this.state.page + 1 })}
          >
            Next &#x21E8;
          </button>
        </div>
      </div>
    );
  }
}
