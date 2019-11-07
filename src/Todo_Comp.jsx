import React from 'react';
import axios from 'axios'

import TaskList from './tasks.json'

const storage = window.localStorage;
let counter = null;
let ReactTodos = [];
let ReactTodo = {};

export default class TodoList extends React.PureComponent {

    constructor(props) {
        super(props)
        this.state = {
            lists: [],
        }
    }

    createLi = InnerText => {
        let node = document.createElement('li');
        // let count_node = document.createElement('div');
        let delete_node = document.createElement('div');
        // count_node.textContent = id;
        delete_node.className = 'delete-task';
        let text = document.createTextNode(InnerText)
        // node.appendChild(count_node)
        node.appendChild(delete_node)
        node.appendChild(text);
        document.querySelector('.ul-list').appendChild(node)
    }

    createList = (e) => {
        let list = document.querySelector('.todo-input')
        if(e.code === 'Enter') {
            counter += 1;
            const ReactStorage = JSON.parse(storage.getItem("React Tasks"));
            if(ReactStorage != null) {
                
            }
            ReactTodo = {
                id: counter,
                value: list.value
            }
            ReactTodos.push(ReactTodo);
            console.log(ReactTodos);
            storage.setItem('React Tasks', JSON.stringify(ReactTodos));
            this.createLi(list.value);
            list.value = '';
            
            storage.setItem('counter', counter);
        }
    }

    onDeleteTask = (index) => {
        console.log(index)
    }

    getTasks = () => {
        counter = +(storage.getItem('counter'));
        let ReactStorage = JSON.parse(storage.getItem("React Tasks"));
        if(ReactStorage != null) {            
            for (let index = 0; index < ReactStorage.length; index++) {
                console.log(ReactStorage[index].value)
                this.createLi(ReactStorage[index].value)
            }
        }
    }

    getJSONTasks () {
        try {
            TaskList.forEach(item => {
                this.createLi(item.text)
            })
        } catch (error) {
            alert(error)
        }
    }
    setJSONTask = (e) => {
        if(e.code === 'Enter') {
            let val = document.querySelector('input');
            this.createLi(val.value);
            let rawData = JSON.stringify({id: 4, text: val.value})
            let blob = new Blob([rawData], {type : 'application/json'})
            console.log(blob)
            val.value = '';
        }
    }

    componentDidMount() {
        this.getTasks();
        // this.getJSONTasks();

        document.querySelector('.todo-input').addEventListener('keydown', e => {
            // this.setJSONTask(e);
            this.createList(e);
        })
        document.addEventListener('click', e => {
            if(e.target.className === 'delete-task') {
                this.onDeleteTask(e.target)
            }
        })
    }

    render() {
        return (
            <React.Fragment>
                <h1>ToDo</h1>
                <input className='todo-input' type='text'/>
                <ul className='ul-list'></ul>
            </React.Fragment>
        )
    }
        
}