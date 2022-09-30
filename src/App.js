import React, { Component } from "react";
import "./App.css"

class TodoItems extends Component {
    constructor(props){
        super(props);
        this.createTasks = this.createTasks.bind(this);

    }

    createTasks(item) {
        return (< li key={item.key} >
            
            <input type="checkbox" className="form-check-input" type="checkbox" value="" id="defaultCheck1" onClick={() => this.switchTask(item)} />
            <a className={item.completed ? 'item done' : 'item'}>{item.text} </a>
            <button onClick={() => this.delete(item.key)} type="button" className="btn btn-outline-dark btn-sm"> x </button>
            
           
        </li >);
        
    }

    switchTask(item) {
        this.props.switchTask(item);
    }

    delete(key) {
        this.props.delete(key);
    }

    render() {
        var todoEntries = this.props.entries;
        var listItems = todoEntries.map(this.createTasks);

        return (
            <ul className="ToDoList">
                {listItems}
            </ul>
            );
    }
}
class Page extends Component{
  render(){
    return (
     <div id="site" class="container-fluid">
        <br></br>
        <h1 class="cover-heading"> ToDoList. Enter some things to do and make them get finished!</h1>
        <br></br>
        <div id="todo">
        <TodoList/>
        </div>
        <footer class="text-center">
        <hr />
            <p>&copy; 2022 - (c) ToDoList</p>
        </footer>
    </div>
        
      )
      
  }

}
class TodoList extends Component {
   
  constructor(props) {
      super(props);
      this.state = {
          items: JSON.parse(localStorage.getItem('item')) || [] 
      };
      this.addItem = this.addItem.bind(this);
      this.deleteItem = this.deleteItem.bind(this);
      this.switchTask = this.switchTask.bind(this);
  }



  addItem(e) {
      if (this.newInput.value !== "") {
          var newItem = {
              text: this.newInput.value,
              key: Date.now(),
              completed: false
          };

          this.setState((prevState) => {
              return {
                  items: prevState.items.concat(newItem)
              };

          }, () => {
              localStorage.setItem('item', JSON.stringify(this.state.items))
          });
      }

      this.newInput.value = "";
      e.preventDefault();
  }

  
  deleteItem(key) {
      var newItems = this.state.items.filter( (item) => item.key != key);
      this.setState({
          items: newItems
      }, () => {
          localStorage.setItem('item', JSON.stringify(newItems))
      });
  }

  switchTask(item) {
      item.completed = !item.completed;
      this.forceUpdate();
  }

  sumDone(items) {
      var counter = 0;
      items.forEach(items => {
          if ( items.completed  == true) 
            counter++;
      })
      return (<a>{counter}</a>)
  }



  render() {
      return (          
          <div className="ToDoList" >
          <h1>My List</h1>
              <div className="form-group">
                  <a className="text">Tasks count: {this.state.items.length} | </a>
                  <a className="text">Finished: {this.sumDone(this.state.items)} </a>
                  <div className="container-fluid" >
                  <form onSubmit={this.addItem}>
                     <input className ="input-group-text" ref={(a) => this.newInput = a} placeholder="Enter task..." />
                  </form>
              </div>
              </div>
              <TodoItems switchTask={this.switchTask} entries={this.state.items} delete={this.deleteItem}  />
                  <button type="button" className="btn btn-outline-secondary" variant="outline-primary" onClick={() => this.state.items.forEach(items => {
                  if (items.completed === true) this.deleteItem(items.key);
                  })}>Remove finished</button>   
          </div>
      );
      
  }

}

export default Page;
