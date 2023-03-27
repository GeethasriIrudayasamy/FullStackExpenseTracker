import React, { useState, useCallback, useEffect } from "react";
import axios from "axios";

const ExpenseContext = React.createContext({
    listOfExpense: [],
    addExpense: (expense) => {},
    editExpense: (expense) => {},
    deleteExpense: (id) => {},
});

export default ExpenseContext;

export const ExpenseContextProvider = (props) => {
    const [expenses, setExpenses] = useState([]);
    const getExpenseData = useCallback(async () => {
        await axios
            .get("http://localhost:5000/api/expenses")

            .then((res) => {
                // console.log(res.data);
                setExpenses(res.data);
            })
            .catch((err) => {
                setExpenses([]);
                alert(err.message);
            });
    }, []);

    useEffect(() => {
        getExpenseData();
    }, [getExpenseData]);

    const postDataHandler = useCallback(
        async (expenseDetail) => {
            console.log("Posting data in progress");
            await axios
                .post("http://localhost:5000/api/expenses", {
                    expenseDetail,
                })
                .then(() => {
                    getExpenseData();
                })
                .catch((err) => alert(err.message));
        },
        [getExpenseData]
    );

    const deleteDataHandler = useCallback(
        async (id) => {
            console.log("Deleting data in progress");
            await axios
                .delete(`http://localhost:5000/api/expenses/${id}`)
                .then(() => {
                    getExpenseData();
                })
                .catch((err) => alert(err.message));
        },
        [getExpenseData]
    );
    const editDataHandler = useCallback(
        async (expenseDetail) => {
            console.log("Editing data in progress");
            await axios
                .put(`http://localhost:5000/api/expenses/${expenseDetail.id}`, {
                    expenseDetail,
                })
                .then(() => {
                    getExpenseData();
                })
                .catch((err) => alert(err.message));
        },
        [getExpenseData]
    );

    const expenseContext = {
        listOfExpense: expenses,
        addExpense: postDataHandler,
        deleteExpense: deleteDataHandler,
        editExpense: editDataHandler,
    };

    return (
        <div>
            <ExpenseContext.Provider value={expenseContext}>
                {props.children}
            </ExpenseContext.Provider>
        </div>
    );
};
