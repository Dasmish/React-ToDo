import React from 'react';

let storage = window.localStorage;
let counter = null;
export default class TodoList extends React.PureComponent {

    createLi = (InnerText) => {
        let node = document.createElement('li');
        let div_node = document.createElement('div');
        div_node.className = 'delete-task';
        let text = document.createTextNode(InnerText)
        node.appendChild(div_node)
        node.appendChild(text);
        document.querySelector('.ul-list').appendChild(node)
    }

    createList = (e) => {
        let list = document.querySelector('.todo-input')
        if(e.code === 'Enter') {
            counter = counter + 1;
            console.log(typeof counter)
            storage.setItem('task' + counter, list.value)
            this.createLi(list.value);
            list.value = '';
            
            storage.setItem('counter', counter);
        }
    }

    getTasks = () => {
        counter = +(storage.getItem('counter'));
        for (let index = 1; index <= storage.length; index++) {
            if(storage.getItem('task' + index) !== null) {
                let store_text = storage.getItem('task' + index)
                this.createLi(store_text);
            }
        }
    }

    async getJSONTasks () {
        let read = await fetch('127.0.0.1:3001/dolphins');
        console.log('object')
        console.log(read)
        let data = await read.json();
        console.log(data)
    }

    componentDidMount() {
        // this.getTasks();
        this.getJSONTasks();
        document.querySelector('.todo-input').addEventListener('keydown', e => {
            this.createList(e);
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