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
export default Todo;
