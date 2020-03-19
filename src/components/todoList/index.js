import React from 'react';
import './index.css';
class Todo extends React.Component {
    render() {
        return (
            <li id={this.props.todoId}>
            <input onClick = {this.props.onStatusChange} className={this.props.todoState===true?"check":"check checked"} type="checkbox"></input>
            <input onBlur={this.props.updateTodo} className={this.props.todoState===true?"content-text add-element":"completed add-element"} type="text" defaultValue={this.props.todoText} disabled={this.props.todoState===false?true:false}></input>
            <span onClick={this.props.removetodoFromtodosList} className="remove">×</span>
        </li>);
    }
}

class TodoList extends React.Component {
    constructor(props) {
        super(props);
        this.state = { count: 0, todoList: [] ,filterType:'all'};
    }
    storeStateInLocalstorage=()=>{
        window.localStorage.setItem('todoAppState',JSON.stringify(this.state));
    }
   
    componentDidMount=()=>{
         window.onunload=this.storeStateInLocalstorage;
        const parsedTodoState = JSON.parse(window.localStorage.getItem('todoAppState'));
        if(parsedTodoState!==null){
            this.setState({
                count:parsedTodoState.count,
                todoList:parsedTodoState.todoList,
                filterType:parsedTodoState.filterType
            });
        }
    }
    updateTodo = (event) =>{
        const currentTodoId = parseInt(event.target.parentElement.id);
        const updatedTodo = event.target.value;
        const duplicateTodoList = [...this.state.todoList];
        const currentTodo=duplicateTodoList.findIndex(todo=>{
           return todo.todoId === currentTodoId;
        });
        duplicateTodoList[currentTodo].todo = updatedTodo;
        console.log(duplicateTodoList);
        this.setState({todoList:[...duplicateTodoList]});
    }
    renderInactiveTodos=()=>{
        const inActiveTodos= this.state.todoList.filter((todo => {
            return (!todo.isActive);
        }));
        return inActiveTodos;
    }
    renderActiveTodos=()=>{
        return this.state.todoList.filter((todo => {
            return (todo.isActive);
        }));
    }

    changeFilterType=(event)=>{
        let state;
        const  filterType =event.target.value;
        if(filterType=== 'allItems'){
            state="all";
        }else if(filterType === 'activeItems'){
            state="active";
        }else{
            state="completed";
        }
        this.setState({filterType:state});
    }

    onStatusChange = (event)=>{
         const currentTodoId = parseInt(event.target.parentElement.id);
         const duplicateTodoList = [...this.state.todoList];
         const currentTodo=duplicateTodoList.findIndex(todo=>{
            return todo.todoId === currentTodoId;
         });
         duplicateTodoList[currentTodo].isActive = !duplicateTodoList[currentTodo].isActive;
         this.setState({todoList:[...duplicateTodoList]});
    }
    removetodoFromtodosList = (event) =>{
        const currentTodoId = parseInt(event.target.parentElement.id);
        const updatedList = this.state.todoList.filter((todo => {
            return (todo.todoId !== currentTodoId);
        }));
        this.setState({ todoList: [...updatedList] });
    }
    renderAllTodos=()=>{
        const allTodos = [...this.state.todoList];
        return allTodos;
    }
    clearCompleted=()=>{
        const updatedList = this.state.todoList.filter((todo => {
            return (todo.isActive);
        }));
        this.setState({todoList:[...updatedList]});
    }
    addTodo = (event) => {
        if (event.keyCode === 13) {
            const newTodo = event.target.value;
            if (newTodo !== '') {
                this.setState((previousState => ({
                    count: previousState.count + 1,
                    todoList: [...previousState.todoList,{todoId:this.state.count+1,todo:newTodo,isActive:true}]
                })));
            }
            else {
                alert("todo sholudn't be empty");
            }
            event.target.value = "";
        }
    }
    todosToRender=()=>{
        if(this.state.filterType === 'all'){
            return this.renderAllTodos();
        }else if(this.state.filterType === 'active'){
            return this.renderActiveTodos();
        }else {
            return this.renderInactiveTodos();
        }
    }
    render() {
       let todosToRender = this.todosToRender();
       const activeTodoItemsCount = this.renderActiveTodos().length;
       const completedItemsCount = this.renderInactiveTodos().length;
        return (<div >
            <p className='heading'>todos</p>
        <div className={this.state.todoList.length===0?"todo-container":"todo-container paper-shadow"} id='container'>
            <div className="list-container">
                <span className='toggle' id='all'>❯</span>
                <input onKeyDown={this.addTodo} type="text" id='addElement' className='add-element' placeholder='What needs to be done!' />
                <ul id='todoList'>
                { todosToRender.map((todo) => {
       return <Todo key={todo.todoId} updateTodo={this.updateTodo} onStatusChange={this.onStatusChange} todoState ={todo.isActive} todoId={todo.todoId} todoText={todo.todo} removetodoFromtodosList = {this.removetodoFromtodosList} />;
    })}
                </ul>
            </div>
            <div className={this.state.todoList.length===0?"data-info empty":"data-info"}>
                <p id='itemsCount'>{activeTodoItemsCount} items left</p>
                <div className="data-status">
                    <button onClick={this.changeFilterType} className={this.state.filterType==='all'?'filter':"in-active"} value='allItems' type='button'>All</button>
                    <button onClick={this.changeFilterType} className={this.state.filterType==='active'?'filter':"in-active"} value='activeItems' type='button'>Active</button>
                    <button onClick={this.changeFilterType} className={this.state.filterType==='completed'?'filter':"in-active"} value='completedItems' type='button'>Completed</button>
                </div>
                <div className="clear">
                    <button onClick={this.clearCompleted} className={completedItemsCount!==0?"in-active":"hide"}id='clearCompleted' type='button'>Clear Completed</button>
                </div>
            </div>
        </div>
        </div>);
    }
}
export default TodoList;
