import React from "react";

import ExamTable from '../../component/exam-table/component';
import ButtonsMenu from "../../component/buttons-menu/component";

function ExamPage(props) {
    return (
        <div>
            <ButtonsMenu></ButtonsMenu>
            <ExamTable></ExamTable>
        </div>
    )
}

export default ExamPage;