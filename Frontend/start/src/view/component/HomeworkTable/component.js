import React from "react";

import './component.css';
import Input from '../../component/Input/component.js';
import ButtonNavigate from '../../component/ButtonNavigate/component';
import { ProductFactory } from '../../../domain/service.js'

class Component extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            subject: "",
            exercise: "",
            subject_status: "",
            status: null
        }
        this.onChangeSubject = this.onChangeSubject.bind(this);
        this.onChangeExercise = this.onChangeExercise.bind(this);
        this.onChangeSubjectStatus = this.onChangeSubjectStatus.bind(this);
    }

    onChangeSubject(subject) {
        this.setState({
            subject: subject
        });
    }

    onChangeExercise(exercise) {
        this.setState({
            exercise: exercise
        });
    }

    onChangeSubjectStatus(subject_status) {
        this.setState({
            subject_status: subject_status
        });
    }

    render() {
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
                    <td><button className="TableButton">Добавить</button></td>
                </tr>
                {}
            </table>
        )
    }
}

export default Component;