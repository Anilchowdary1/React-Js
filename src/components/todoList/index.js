import React from 'react';
class Todo extends React.Component {
    constructor(props) {
        super(props);
        this.todoId = props.todoId;
        this.todoText = props.todoText;
        this.removetodoFromtodosList = props.removetodoFromtodosList;
        this.state = {
            status: "Active",
            text: this.todoText
        };
        //this.onChangeText = this.onChangeText.bind(this);
        this.onStatusChange = this.onStatusChange.bind(this);
    }

    onStatusChange() {
        this.setState((previousState => ({ status: previousState.status === 'Active' ? 'inActive' : 'Active' })));
    }
    /*onChangeText() {
        this.setState((previousState => ({ text: event.target.value })));
    }*/


    render() {
        return (
            <li>
            <input onClick = {this.onStatusChange}  className="check" type="checkbox"></input><input className={this.state.status==='Active'?"content-text":"completed"} type="text" defaultValue={this.state.text} disabled={this.state.status==='Active'?false:true}></input><span className="remove">×</span>
        </li>);
    }
}

class TodoList extends React.Component {
    constructor(props) {
        super(props);
        this.addTodo = this.addTodo.bind(this);
        this.state = { count: 0, todoList: [] };
        //this.removetodoFromtodosList = this.removetodoFromtodosList.bind(this);
    }
    addTodo = (event) => {
        if (event.keyCode === 13) {
            const newTodo = event.target.value;
            if (newTodo !== '') {
                this.setState((previousState => ({
                    count: previousState.count + 1,
                    todoList: [...previousState.todoList, { todoId: previousState.count + 1, todo: newTodo }]
                })));
            }
            else {
                alert("todo sholudn't be empty");
            }
            event.target.value = "";
        }
    }
    render() {
        console.log(this.state.todoList);
        return (<div>
            <p className='heading'>todos</p>
        <div className="todo-container" id='container'>
            <div className="list-container">
                <span className='toggle' id='all'>❯</span>
                <input onKeyDown={this.addTodo} type="text" id='addElement' className='add-element' placeholder='What needs to be done!' />
                <ul id='todoList'>
                { this.state.todoList.map((todo) => {
       return <Todo key={todo.todoId} todoId={todo.todoId} todoText={todo.todo} removeCarFromCarsList = "" />;
    })}
                </ul>
            </div>
            <div className={this.state.todoList.length===0?"data-info empty":"data-info"}>
                <p id='itemsCount'>0 items left</p>
                <div className="data-status">
                    <button className='filter' id='allItems' type='button'>All</button>
                    <button className='in-active' id='activeItems' type='button'>Active</button>
                    <button className='in-active' id='completedItems' type='button'>Completed</button>
                </div>
                <div className="clear">
                    <button className='in-active' id='clearCompleted' type='button'>Clear Completed</button>
                </div>
            </div>
        </div>
        </div>);
    }
}
export default TodoList;
