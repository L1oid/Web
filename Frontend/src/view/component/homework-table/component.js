import React, { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";

import Input from '../Input/component.js';
import { ProductFactory, UserFactory } from '../../../domain/service.js'

import './component.css';

const product = ProductFactory.createInstance();
const user = UserFactory.createInstance();

function HomeworkTable() {
    const [subject, setSubject] = useState('');
    const [exercise, setExercise] = useState('');
    const [subjectStatus, setSubjectStatus] = useState('');
    const [date, setDate] = useState('');
    const [status, setStatus] = useState('');
    const [sortedStatus, setSortedStatus] = useState(false);
    const [result, setResult] = useState({status: null, data: [{description: null, id: null, name: null, price: null, date: null}]});

    useEffect(() => {
        getList();
    }, []);

    async function getList() {
        let result = await product.getList();
        if (result.status === 200) {
            setResult(result);
        }
        else {
            user.exit();
            setStatus("Error");
        }
    }

    async function getSortedListByDate() {
        let result = await product.getSortedListByDate();
        if (result.status === 200) {
            setResult(result);
        }
        else {
            user.exit();
            setStatus("Error");
        }
    }

    async function onClickSorted() {
        if (sortedStatus === false) {
            getSortedListByDate();
            setSortedStatus(true);
        }
        else if (sortedStatus === true) {
            getList();
            setSortedStatus(false);
        }
    }

    async function onClickAdd() {
        product.setProduct(subject, subjectStatus, exercise, date);
        let result = await product.add();
        if (result.status === 200) {
            getList();
        }
        else if (result.status === 401) {
            user.exit();
            setStatus("Error");
        }
    }

    async function onClickDelete(id) {
        let result = await product.delete(id);
        if (result.status === 200) {
            getList();
        }
        else if (result.status === 401) {
            user.exit();
            setStatus("Error");
        }
    }

    function subjectStatusInWord(status) {
        if (status === 1) {
            return "Ожидание"
        } else if (status === 2) {
            return "Выполненно"
        } else if (status === 3) {
            return "В процессе"
        }
    }

    return (
        <table>
            <tr>
                <th>ID</th>
                <th><button className="TableButton" onClick={onClickSorted}>Дата</button></th>
                <th>Предмет</th>
                <th>Задание</th>
                <th>Статус</th>
                <th></th>
            </tr>
            <tr>
                <td></td>
                <td><Input class="TableInput" type="text" getValue={setDate}/></td>
                <td><Input class="TableInput" type="text" getValue={setSubject}/></td>
                <td><Input class="TableInput" type="text" getValue={setExercise}/></td>
                <td>
                    <select className="TableSelect" onChange={(event) => setSubjectStatus(event.target.value)}>
                        <option className="TableOption" value='1'>Ожидание</option>
                        <option className="TableOption" value='2'>Выполненно</option>
                        <option className="TableOption" value='3'>В процессе</option>
                    </select>
                </td>
                <td><button className="TableButton" onClick={onClickAdd}>Добавить</button></td>
            </tr>
            {
                result.data.map((row) =>
                    <tr>
                        <td>{row.id}</td>
                        <td>{row.date}</td>
                        <td>{row.name}</td>
                        <td>{row.description}</td>
                        <td>{subjectStatusInWord(row.price)}</td>
                        <td><button className="TableButton" onClick={onClickDelete.bind(this, row.id)}>Удалить</button></td>
                    </tr>
                )
            }
            {status === "Error" && <Navigate to="/login" replace={true} />}
        </table>
    )
}

export default HomeworkTable;