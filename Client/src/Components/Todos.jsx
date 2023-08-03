import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { authState } from "../Store/atoms/authState";
import { useNavigate } from "react-router-dom";

const TodoList = () => {
    const [ title, setTitle ] = useState("");
    const [ description, setDescription ] = useState("");
    const [todos, setTodos ] = useState([]);
    const auth = useRecoilValue(authState);
    const navigate = useNavigate();

    useEffect(() => {
        const getTodos = async () => {
            const response = await fetch("http://localhost:3000/todo/todos", {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            });
            const data = await response.json();
            setTodos(data);
        }
        getTodos();
    }, [auth.token]);

    const handleAdd = async () => {
        const response = await fetch("http://localhost:3000/todo/todos", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("token")}`
            },
            body: JSON.stringify({ title, description })
        });
        const data = await response.json();
        setTodos([...todos, data ]);
    };

    const handleDelete = async (id) => {
        const response = await fetch(`http://localhost:3000/todo/todos/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
            
        });
        const data = await response.json();
        setTodos(todos.filter((todo) => (todo._id !== id)));
    };

    const markDone = async (id) => {
        const response = await fetch(`http://localhost:3000/todo/todos/${id}/done`, {
            method: "PATCH",
            headers: { Authorization: `Bearer ${localStorage.getItem("token")}`}
        });
        const updatedTodo = await response.json();
        setTodos(todos.map((todo) => ( todo._id === updatedTodo._id ? updatedTodo : todo )));
    };

    return(
        <div>
            <div style={{display: "flex", justifyContent: "center", alignItems: "center"}}>
                <h2 style={{marginRight: 20}}>Welcome {auth.username}</h2>
                <div>
                    <button type="button" onClick={() => {
                        localStorage.removeItem("token");
                        navigate("/login");
                    }}>Logout</button>
                </div>
            </div>
            <center>
            <h2>Todo List</h2>
            <input type="text" placeholder="Title" onChange={(e) => {setTitle(e.target.value)}}/>
            <input type="text" placeholder="Description" onChange={(e) => {setDescription(e.target.value)}}/>
            <button type="button" onClick={handleAdd}>ADD</button>
            </center>
            <div style={{display: "flex", justifyContent: "center", flexWrap: "wrap", marginTop: 100}}>
                {todos.map((todo) => {
                    return (
                        <div key={todo._id}>
                            <h3>{todo.title}</h3>
                            <p>{todo.description}</p>
                            <button onClick={() => markDone(todo._id)}>{todo.done ? 'Done' : 'Mark as Done'}</button>
                            <button onClick={() => handleDelete(todo._id)}>Delete</button>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default TodoList;