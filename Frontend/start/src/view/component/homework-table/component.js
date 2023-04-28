import React from "react";
import { Navigate } from "react-router-dom";

import './component.css';
import Input from '../Input/component.js';
import { ProductFactory } from '../../../domain/service.js'

function HomeworkTable() {

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

export default HomeworkTable;