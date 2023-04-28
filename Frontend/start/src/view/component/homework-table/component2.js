import React from "react";
import { Navigate } from "react-router-dom";

import './component.css';
import Input from '../Input/component.js';
import { ProductFactory } from '../../../domain/service.js'

class Component extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            subject: "",
            exercise: "",
            subject_status: "",
            status: null,
            result: {status: null, data: [{description: null, id: null, name: null, price: null}]}
        }
        this.onChangeSubject = this.onChangeSubject.bind(this);
        this.onChangeExercise = this.onChangeExercise.bind(this);
        this.onChangeSubjectStatus = this.onChangeSubjectStatus.bind(this);
        this.onClickAdd = this.onClickAdd.bind(this);
        this.onClickDelete = this.onClickDelete.bind(this);
    }

    async getList() {
        let product = ProductFactory.createInstance();
        let result = await product.getList();
        if (result.status === 200) {
            this.setState({result: result});
        }
        else {
            this.setState({status: "Error"});
            localStorage.removeItem('MyStudyOrganaizedUserToken');
        }
    }

    componentDidMount() {
        this.getList();
    }

    onChangeSubject(subject) {
        this.setState({subject: subject});
    }

    onChangeExercise(exercise) {
        this.setState({exercise: exercise});
    }

    onChangeSubjectStatus(subject_status) {
        this.setState({subject_status: subject_status});
    }

    async onClickAdd() {
        let product = ProductFactory.createInstance();
        product.setProduct(this.state.subject, this.state.subject_status, this.state.exercise);
        let result = await product.add();
        if (result.status === 200) {
            let result = await product.getList();
            if (result.status === 200) {
                this.setState({result: result});
            }
            else {
                this.setState({status: "Error"});
                localStorage.removeItem('MyStudyOrganaizedUserToken');
            }
        }
        else if (result.status === 401) {
            this.setState({status: "Error"});
            localStorage.removeItem('MyStudyOrganaizedUserToken');
        }
    }

    async onClickDelete(id) {
        let product = ProductFactory.createInstance();
        let result = await product.delete(id);
        if (result.status === 200) {
            let result = await product.getList();
            if (result.status === 200) {
                this.setState({result: result});
            }
            else {
                this.setState({status: "Error"});
                localStorage.removeItem('MyStudyOrganaizedUserToken');
            }
        }
        else if (result.status === 401) {
            this.setState({status: "Error"});
            localStorage.removeItem('MyStudyOrganaizedUserToken');
        }
    }

    render() {
        let table = this.state.result.data.map((row) =>
            <tr>
                <td>{row.id}</td>
                <td>{row.name}</td>
                <td>{row.description}</td>
                <td>{row.price}</td>
                <td><button className="TableButton" onClick={this.onClickDelete.bind(this, row.id)}>Удалить</button></td>
            </tr>
        );
        return (
            <table>
                <tr>
                    <th>ID</th>
                    <th>Предмет</th>
                    <th>Задание</th>
                    <th>Статус</th>
                    <th></th>
                </tr>
                <tr>
                    <td></td>
                    <td><Input class="TableInput" type="text" getValue={this.onChangeSubject}/></td>
                    <td><Input class="TableInput" type="text" getValue={this.onChangeExercise}/></td>
                    <td><Input class="TableInput" type="text" getValue={this.onChangeSubjectStatus}/></td>
                    <td><button className="TableButton" onClick={this.onClickAdd}>Добавить</button></td>
                </tr>
                {table}
                {this.state.status === "Error" && <Navigate to="/login" replace={true} />}
            </table>
        )
    }
}

export default Component;