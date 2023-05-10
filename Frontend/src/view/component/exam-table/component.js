import React from "react";

import './component.css';

import { ProductFactory } from '../../../domain/service.js'

const product = ProductFactory.createInstance();

function Exam(props) {
    function onClickCounter() {
        product.counter();
    }

    return (
        <div className="ExamContainer">
            <button className="CounterButton" onClick={onClickCounter}>Counter</button>
        </div>
    )
}

export default Exam;