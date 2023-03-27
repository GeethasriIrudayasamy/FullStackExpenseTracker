import React, { useRef, useContext, Fragment, useState } from "react";
import "./ExpenseForm.css";
import ExpenseList from "./ExpenseList";
import Table from "react-bootstrap/Table";
import ExpenseContext from "../Store/ExpenseContext";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";

const ExpenseForm = () => {
    const ExpenseCtx = useContext(ExpenseContext);
    const [update, setUpdate] = useState(false);
    const [expense, setExpense] = useState();
    const titleInputRef = useRef();
    const amountInputRef = useRef();
    const descriptionInputRef = useRef();

    const editHandler = (expense) => {
        // console.log(expense);
        setUpdate(true);
        titleInputRef.current.value = expense.title;
        amountInputRef.current.value = expense.amount;
        descriptionInputRef.current.value = expense.description;
        setExpense(expense);
    };

    const submitHandler = async (event) => {
        event.preventDefault();
        const title = titleInputRef.current.value;
        const amount = amountInputRef.current.value;
        const description = descriptionInputRef.current.value;

        if (!update) {
            const expense = {
                title: title,
                amount: amount,
                description: description,
            };
            ExpenseCtx.addExpense(expense);
        } else {
            const expenseToEdit = {
                id: expense.id,
                title: title,
                amount: amount,
                description: description,
            };
            // console.log(expenseToEdit);
            ExpenseCtx.editExpense(expenseToEdit);
            setUpdate(false);
        }

        event.target.reset();
    };
    let content;

    if (ExpenseCtx.listOfExpense.length === 0) {
        content = <div>No Expenses</div>;
    } else {
        content = (
            <Table striped hover>
                <tbody>
                    {ExpenseCtx.listOfExpense.map((data) => (
                        <ExpenseList
                            key={data.id}
                            id={data.id}
                            title={data.title}
                            description={data.description}
                            amount={data.amount}
                            onEdit={() => {
                                editHandler(data);
                            }}
                        ></ExpenseList>
                    ))}
                </tbody>
            </Table>
        );
    }

    return (
        <Fragment>
            <Form onSubmit={submitHandler}>
                <Row className="align-items-center">
                    <Col xs="auto">
                        <Form.Label htmlFor="inlineFormInput">Title</Form.Label>
                        <Form.Control
                            className="mb-2"
                            id="inlineFormInput"
                            ref={titleInputRef}
                        />
                    </Col>
                </Row>
                <Row className="inputs">
                    <Col xs="auto">
                        <Form.Label htmlFor="inlineFormInput">
                            Amount
                        </Form.Label>
                        <Form.Control
                            className="mb-2"
                            id="inlineFormInput"
                            type="number"
                            ref={amountInputRef}
                        />
                    </Col>
                </Row>
                <Row className="inputs">
                    <Col xs="auto">
                        <Form.Group className="mb-2">
                            <Form.Label htmlFor="inlineFormInput">
                                Description
                            </Form.Label>
                            <Form.Select
                                className="mb-3"
                                id="inlineFormInput"
                                type="email"
                                ref={descriptionInputRef}
                            >
                                <option>Select Any Description </option>
                                <option>Education</option>
                                <option>Food</option>
                                <option>Health</option>
                                <option>Groceries</option>
                                <option>Others...</option>
                            </Form.Select>
                        </Form.Group>
                    </Col>
                </Row>
                <Row className="align-items-center">
                    <Col xs="auto">
                        <Button type="submit" className="btn">
                            {!update ? `Submit` : `Update`}
                        </Button>
                    </Col>
                </Row>
            </Form>
            {content}
        </Fragment>
    );
};

export default ExpenseForm;
