import React, { useContext } from "react";
import ExpenseContext from "../Store/ExpenseContext";
import { BsFillPencilFill, BsFillTrashFill } from "react-icons/bs";

const ExpenseList = (props) => {
    const ExpenseCtx = useContext(ExpenseContext);
    const deleteHandler = () => {
        console.log(props.id);
        ExpenseCtx.deleteExpense(props.id);
    };

    return (
        <tr key={props.id}>
            <td>{props.title}</td>
            <td>{props.description}</td>
            <td>Rs {props.amount}</td>
            <td>
                <BsFillPencilFill onClick={props.onEdit}></BsFillPencilFill>
            </td>
            <td>
                <BsFillTrashFill onClick={deleteHandler}></BsFillTrashFill>
            </td>
        </tr>
    );
};

export default ExpenseList;
