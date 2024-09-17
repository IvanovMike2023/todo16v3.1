// import React from 'react';
// import ReactDOM from 'react-dom/client';
// import './index.css';
// import reportWebVitals from './reportWebVitals';
// import App from './app/App';
// import {Provider} from 'react-redux';
// import {store} from './app/store';
// import {BrowserRouter, createBrowserRouter, Navigate, RouterProvider} from "react-router-dom";
// import {Login} from "./components/Login/Login";
// import {TodolistsList} from "./features/TodolistsList/TodolistsList";
// import {ErrorPage} from "./components/ErrorPage/ErrorPage";
// const router = createBrowserRouter([
//     {
//         path: "/",
//         element: <App/>,
//         errorElement: <ErrorPage/>,
//         children: [
//             {
//                 index: true,
//                 element: <Navigate to="/todolists"/>
//             },
//             {
//                 path: "/login",
//                 element: <Login/>,
//             },
//             {
//                 path: "/todolists",
//                 element: <TodolistsList/>,
//             },
//         ],
//     },
// ]);
// const root = ReactDOM.createRoot(
//     document.getElementById('root') as HTMLElement
// );
//
// root.render(
//     <Provider store={store}>
//         {/*<App/>*/}
//         <RouterProvider router={router}/>
//     </Provider>
// );
//
// // If you want to start measuring performance in your app, pass a function
// // to log results (for example: reportWebVitals(console.log))
// // or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
//
// import axios from 'axios'
// import React, { ChangeEvent, useEffect, useState } from 'react'
// import ReactDOM from 'react-dom/client';
//
// // Types
// type CommentType = {
//     postId: string
//     id: string
//     name: string
//     email: string
//     body: string
// }
//
// // Api
// const instance = axios.create({baseURL: 'https://exams-frontend.kimitsu.it-incubator.io/api/'})
//
// const commentsAPI = {
//     getComments() {
//         return instance.get<CommentType[]>('comments')
//     },
//     createComment() {
//         const payload = {body: 'Это просто заглушка. Backend сам сгенерирует новый комментарий и вернет его вам'}
//         // Promise.resolve() стоит в качестве заглушки, чтобы TS не ругался и код компилировался
//         // Promise.resolve() нужно удалить и написать правильный запрос для создания нового комментария
//         return instance.post('comments', {body:payload.body})
//         //return Promise.resolve().
//     }
// }
//
//
// // App
// export const App = () => {
//
//     const [comments, setComments] = useState<CommentType[]>([])
//
//     useEffect(() => {
//         commentsAPI.getComments()
//             .then((res) => {
//                 setComments(res.data)
//             })
//     }, [])
//
//     const createPostHandler = () => {
//         commentsAPI.createComment()
//             .then((res: any) => {
//                 const newComment = res.data
//                 console.log(newComment)
//                 setComments([newComment, ...comments,])
//             })
//     };
//
//     return (
//         <>
//             <h1>📝 Список комментариев</h1>
//             <div style={{marginBottom: '15px'}}>
//                 <button style={{marginLeft: '15px'}}
//                         onClick={() => createPostHandler()}>
//                     Добавить новый комментарий
//                 </button>
//             </div>
//
//             {
//                 comments.map(c => {
//                     return <div key={c.id}><b>Comment</b>: {c.body} </div>
//                 })
//             }
//         </>
//     )
// }
//
// const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
// root.render(<App/>)



// 📜 Описание:
// Напишите запрос на сервер для создания нового комментария.
// Типизацию возвращаемых данных в ответе указывать необязательно, но можно и указать (в ответах учтены оба варианта).
// Исправленную версию строки напишите в качестве ответа.
//
// 🖥 Пример ответа: return Promise.resolve(payload)

//
// import { useEffect } from "react";
// import ReactDOM from "react-dom/client";
// import { Provider, TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
// import { ThunkAction, ThunkDispatch } from "redux-thunk";
// import axios from "axios";
// import { configureStore, combineReducers } from "@reduxjs/toolkit";
//
// // Types
// type TodoType = {
//     id: string;
//     title: string;
//     order: number;
//     createdAt: string;
//     updatedAt: string;
//     completed: boolean;
// };
//
// // Api
// const instance = axios.create({ baseURL: "https://exams-frontend.kimitsu.it-incubator.io/api/" });
//
// const todosAPI = {
//     getTodos() {
//         return instance.get<TodoType[]>("todos");
//     },
//     changeTodoStatus(id: string, completed: boolean) {
//         return instance.put(`todos/${id}`, { completed });
//     },
// };
//
// // Reducer
// const initState = [] as TodoType[];
//
// type InitStateType = typeof initState;
//
// const todosReducer = (state: InitStateType = initState, action: ActionsType) => {
//     switch (action.type) {
//         case "TODOS/GET-TODOS":
//             return action.todos;
//
//         case "TODOS/CHANGE-TODO-STATUS":
//             return state.map((t) => {
//                 if (t.id === action.todo.id) {
//                     return { ...t, completed: action.todo.completed };
//                 } else {
//                     return t;
//                 }
//             });
//
//         default:
//             return state;
//     }
// };
//
// const getTodosAC = (todos: TodoType[]) => ({ type: "TODOS/GET-TODOS", todos }) as const;
// const changeTodoStatusAC = (todo: TodoType) =>
//     ({ type: "TODOS/CHANGE-TODO-STATUS", todo }) as const;
// type ActionsType = ReturnType<typeof getTodosAC> | ReturnType<typeof changeTodoStatusAC>;
//
// // Thunk
// const getTodosTC = (): AppThunk => (dispatch) => {
//     todosAPI.getTodos().then((res) => {
//         console.log(res)
//         dispatch(getTodosAC(res.data));
//     });
// };
//
// const changeTodoStatusTC =
//     (id: string, completed: boolean): AppThunk =>
//         (dispatch) => {
//             todosAPI.changeTodoStatus(id, completed).then((res) => {
//                 console.log(res)
//                 dispatch(changeTodoStatusAC(res.data));
//             });
//         };
//
// // Store
// const rootReducer = combineReducers({
//     todos: todosReducer,
// });
//
// const store = configureStore({ reducer: rootReducer });
// type RootState = ReturnType<typeof store.getState>;
// type AppDispatch = ThunkDispatch<RootState, unknown, ActionsType>;
// type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, ActionsType>;
// const useAppDispatch = () => useDispatch<AppDispatch>();
// const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
//
// // App
// const App = () => {
//     const dispatch = useAppDispatch();
//     const todos = useAppSelector((state) => state.todos);
//     console.log(todos)
//     useEffect(() => {
//         dispatch(getTodosTC());
//     }, []);
//
//     const changeStatusHandler = (id: string, completed: boolean) => {
//         dispatch(changeTodoStatusTC(id, completed));
//     };
//
//     return (
//         <>
//             <h2>✅ Список тудулистов</h2>
//             {todos.length ? (
//                 todos.map((t) => {
//                     return (
//                         <div style={t.completed ? { color: "grey" } : {}} key={t.id}>
//                             <input
//                                 type="checkbox"
//                                 checked={t.completed}
//                                 onChange={() => changeStatusHandler(t.id, !t.completed)}
//                             />
//                             <b>Описание</b>: {t.title}
//                         </div>
//                     );
//                 })
//             ) : (
//                 <h2>Тудулистов нету 😥</h2>
//             )}
//         </>
//     );
// };
//
// const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
// root.render(
//     <Provider store={store}>
//         <App />
//     </Provider>,
// );

// 📜 Описание:
// При загрузке приложения вы должны увидеть список тудулистов,
// но из-за невнимательности была допущена ошибка.
// Найдите и исправьте ошибку.
// Исправленную версию строки напишите в качестве ответа.

// 🖥 Пример ответа: type InitStateType = typeof initState

//
// import { useFormik } from 'formik';
// import React from 'react'
// import ReactDOM from 'react-dom/client';
// import { BrowserRouter, Route, Routes } from 'react-router-dom'
//
//
// // Types
// type LoginFieldsType = {
//     firstName: string
//     email: string
// }
//
// // Main
// export const Login = () => {
//
//     const formik = useFormik({
//         initialValues: {
//             firstName: '',
//             email: '',
//         },
//         validate: (values) => {
//             const errors: Partial<LoginFieldsType> = {};
//
//             if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
//                 errors.email = 'Invalid email address';
//             }
//             return errors
//         },
//         onSubmit: values => {
//             alert(JSON.stringify(values, null, 2));
//         }
//     });
//
//     // Функция необходима для того, чтобы вебшторм не ругался на true в JSX
//     const getTrue = () => {
//         return true
//     }
//
//     return (
//         <form onSubmit={formik.handleSubmit}>
//             <div>
//                 <input placeholder={'Введите имя'} {...formik.getFieldProps('firstName')}/>
//             </div>
//             <div>
//                 <input placeholder={'Введите email'}{...formik.getFieldProps('email')}/>
//                 {formik.touched.email && <div style={{color: 'red'}}>{formik.errors.email}</div>}
//             </div>
//             <button type="submit">Отправить</button>
//         </form>
//     );
// }
//
// // App
// export const App = () => {
//     return (
//         <Routes>
//             <Route path={''} element={<Login/>}/>
//         </Routes>
//     )
// }
//
// const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
// root.render(<BrowserRouter><App/></BrowserRouter>)

// 📜 Описание:
// Загрузив приложение вы увидите ошибку под полем email, но вы еще ничего не ввели.
// Исправьте 46 строку кода так, чтобы:
// 1) Сообщение об ошибке показывалось только в том случае, когда email введен некорректно.
// 2) Вместо ERROR должен быть конкретный текст ошибки прописанный в валидации к этому полю.
// 3) Сообщение должно показываться только в том случае, когда мы взаимодействовали с полем.
// Исправленную версию строки напишите в качестве ответа.

// 🖥 Пример ответа: {true && <div style={{color: 'red'}}>error.email</div>}
//
// import axios from "axios";
// import React, { useEffect } from "react";
// import ReactDOM from "react-dom/client";
// import { Provider, TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
// import { ThunkAction, ThunkDispatch } from "redux-thunk";
// import { configureStore, combineReducers } from "@reduxjs/toolkit";
//
// // Types
// type CommentType = {
//     postId: string;
//     id: string;
//     name: string;
//     email: string;
//     body: string;
// };
//
// // Api
// const instance = axios.create({ baseURL: "https://exams-frontend.kimitsu.it-incubator.io/api/" });
//
// const commentsAPI = {
//     getComments() {
//         return instance.get<CommentType[]>("comments");
//     },
// };
//
// // Reducer
// const initState = [] as CommentType[];
//
// type InitStateType = typeof initState;
//
// const commentsReducer = (state: InitStateType = initState, action: ActionsType): InitStateType => {
//     switch (action.type) {
//         case "COMMENTS/GET-COMMENTS":
//             return action.comments;
//         default:
//             return state;
//     }
// };
//
// const getCommentsAC = (comments: CommentType[]) =>
//     ({ type: "COMMENTS/GET-COMMENTS", comments }) as const;
// type ActionsType = ReturnType<typeof getCommentsAC>;
// //ReturnType<any>, RootState, unknown, ActionsType
// const getCommentsTC = (): ThunkAction<ReturnType<any>,RootState, unknown, ActionsType> => (dispatch) => {
//     commentsAPI.getComments().then((res) => {
//         dispatch(getCommentsAC(res.data));
//     });
// };
//
// // Store
// const rootReducer = combineReducers({
//     comments: commentsReducer,
// });
//
// const store = configureStore({ reducer: rootReducer });
// type RootState = ReturnType<typeof store.getState>;
// type AppDispatch = ThunkDispatch<RootState, unknown, ActionsType>;
// const useAppDispatch = () => useDispatch<AppDispatch>();
// const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
//
// // App
// export const App = () => {
//     const comments = useAppSelector((state) => state.comments);
//     const dispatch = useAppDispatch();
//
//     useEffect(() => {
//         dispatch(getCommentsTC());
//     }, []);
//
//     return (
//         <>
//             <h1>📝 Список комментариев</h1>
//             {comments.map((c) => {
//                 return (
//                     <div key={c.id}>
//                         <b>Comment</b>: {c.body}{" "}
//                     </div>
//                 );
//             })}
//         </>
//     );
// };
//
// const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
// root.render(
//     <Provider store={store}>
//         <App />
//     </Provider>,
// );

// 📜 Описание:
// Ваша задача стоит в том чтобы правильно передать нужные типы в дженериковый тип ThunkAction<any, any, any, any>.
// Что нужно написать вместо any, any, any, any чтобы правильно типизировать thunk creator?
// Ответ дайте через пробел

// 🖥 Пример ответа: unknown status isDone void

//
// import React, { useState } from "react";
// import ReactDOM from "react-dom/client";
// import { Provider, TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
// import axios, { AxiosError } from "axios";
// import { ThunkAction, ThunkDispatch } from "redux-thunk";
// import { configureStore, combineReducers } from "@reduxjs/toolkit";
//
// // Types
// type NullableType<T> = null | T;
//
// type LoginFieldsType = {
//     email: string;
//     password: string;
// };
//
// // API
// const instance = axios.create({ baseURL: "https://exams-frontend.kimitsu.it-incubator.io/api/" });
//
// const api = {
//     login(data: LoginFieldsType) {
//         return instance.post("auth/login", data);
//     },
// };
//
// // Reducer
// const initState = {
//     isLoading: false,
//     error: null as NullableType<string>,
//     isLoggedIn: false,
// };
//
// type InitStateType = typeof initState;
//
// const appReducer = (state: InitStateType = initState, action: ActionsType): InitStateType => {
//     switch (action.type) {
//         case "APP/SET-IS-LOGGED-IN":
//             return { ...state, isLoggedIn: action.isLoggedIn };
//         case "APP/IS-LOADING":
//             return { ...state, isLoading: action.isLoading };
//         case "APP/SET-ERROR":
//             return { ...state, error: action.error };
//         default:
//             return state;
//     }
// };
//
// // Actions
// const setIsLoggedIn = (isLoggedIn: boolean) =>
//     ({ type: "APP/SET-IS-LOGGED-IN", isLoggedIn }) as const;
// const setLoadingAC = (isLoading: boolean) => ({ type: "APP/IS-LOADING", isLoading }) as const;
// const setError = (error: string | null) => ({ type: "APP/SET-ERROR", error }) as const;
// type ActionsType =
//     | ReturnType<typeof setIsLoggedIn>
//     | ReturnType<typeof setLoadingAC>
//     | ReturnType<typeof setError>;
//
// // Thunk
// const loginTC =
//     (values: LoginFieldsType): AppThunk =>
//         (dispatch) => {
//             dispatch(setLoadingAC(true));
//             api
//                 .login(values)
//                 .then((res) => {
//                     dispatch(setIsLoggedIn(true));
//                     alert("Вы залогинились успешно");
//                 })
//                 .catch((e) => {
//                     dispatch(setError(e.response.data.errors))
//                     console.log(e.response.data.errors)
//                     console.log('e')
//                 })
//                 .finally(() => {
//                     dispatch(setLoadingAC(false));
//                 });
//         };
//
// // Store
// const rootReducer = combineReducers({
//     app: appReducer,
// });
//
// const store = configureStore({ reducer: rootReducer });
// type RootState = ReturnType<typeof store.getState>;
// type AppDispatch = ThunkDispatch<RootState, unknown, ActionsType>;
// type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, ActionsType>;
// const useAppDispatch = () => useDispatch<AppDispatch>();
// const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
//
// // Loader
// export const Loader = () => {
//     return <h1>Loading ...</h1>;
// };
//
// // App
// export const App = () => {
//     const dispatch = useAppDispatch();
//
//     const [form, setForm] = useState<LoginFieldsType>({ email: "", password: "" });
//
//     const error = useAppSelector((state) => state.app.error);
//     const isLoading = useAppSelector((state) => state.app.isLoading);
//
//     const changeFormValuesHandler = (e: React.ChangeEvent<HTMLInputElement>, field: string) => {
//         if (field === "email") {
//             setForm({ ...form, email: e.currentTarget.value });
//         }
//         if (field === "password") {
//             setForm({ ...form, password: e.currentTarget.value });
//         }
//     };
//
//     const submitForm = (e: React.MouseEvent<HTMLButtonElement>) => {
//         e.preventDefault();
//         dispatch(loginTC(form));
//     };
//     return (
//         <div>
//             {error && <h2 style={{ color: "red" }}>{error}</h2>}
//             {isLoading && <Loader />}
//             <form>
//                 <div>
//                     <input
//                         placeholder={"Введите email"}
//                         value={form.email}
//                         onChange={(e) => changeFormValuesHandler(e, "email")}
//                     />
//                 </div>
//                 <div>
//                     <input
//                         type={"password"}
//                         placeholder={"Введите пароль"}
//                         value={form.password}
//                         onChange={(e) => changeFormValuesHandler(e, "password")}
//                     />
//                 </div>
//                 <button type="submit" onClick={submitForm}>
//                     Залогиниться
//                 </button>
//             </form>
//         </div>
//     );
// };
//
// const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
// root.render(
//     <Provider store={store}>
//         <App />
//     </Provider>,
// );

// 📜 Описание:
// Перед вами форма логинизации. Введите любые логин и пароль и попробуйте залогиниться.
// У вас это навряд ли получится 😈, т.к. вы не знаете email и пароль.
// Откройте Network и проанализируйте запрос.
// Задача: вывести сообщение об ошибке, которую возвращает сервер, говорящую о том что email или password некорректны.

// В качестве ответа указать строку коду, которая позволит это осуществить.
// 🖥 Пример ответа: dispatch('Error message')
// ❗ Типизировать ошибку не надо, т.к. там есть много нюансов, о которых вы узнаете позже
// import React, { useEffect } from "react";
// import ReactDOM from "react-dom/client";
// import { ThunkAction, ThunkDispatch } from "redux-thunk";
// import { Provider, TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
// import axios, { AxiosError } from "axios";
// import { configureStore, combineReducers, Dispatch } from "@reduxjs/toolkit";
//
// // TYPES
// type TodoType = {
//     id: string;
//     title: string;
//     order: number;
//     createdAt: string;
//     updatedAt: string;
//     completed: boolean;
// };
//
// type UserType = {
//     id: string;
//     name: string;
//     age: number;
// };
//
// type UsersResponseType = {
//     items: UserType[];
//     totalCount: number;
// };
//
// // API
// const instance = axios.create({ baseURL: "https://exams-frontend.kimitsu.it-incubator.io/api/" });
//
// const api = {
//     getTodos() {
//         return instance.get<TodoType[]>("todos");
//     },
//     getUsers() {
//         return instance.get<UsersResponseType>("users");
//     },
// };
//
// // Reducer
// const initState = {
//     isLoading: false,
//     error: null as string | null,
//     todos: [] as TodoType[],
//     users: [] as UserType[],
// };
//
// type InitStateType = typeof initState;
//
// const appReducer = (state: InitStateType = initState, action: ActionsType): InitStateType => {
//     switch (action.type) {
//         case "APP/GET-TODOS":
//             return { ...state, todos: action.todos };
//         case "APP/GET-USERS":
//             return { ...state, users: action.users };
//         case "APP/IS-LOADING":
//             return { ...state, isLoading: action.isLoading };
//         case "APP/SET-ERROR":
//             return { ...state, error: action.error };
//         default:
//             return state;
//     }
// };
//
// const getUsersAC = (users: UserType[]) => ({ type: "APP/GET-USERS", users }) as const;
// const getTodosAC = (todos: TodoType[]) => ({ type: "APP/GET-TODOS", todos }) as const;
// const setLoadingAC = (isLoading: boolean) => ({ type: "APP/IS-LOADING", isLoading }) as const;
// const setError = (error: string | null) => ({ type: "APP/SET-ERROR", error }) as const;
//
// type ActionsType =
//     | ReturnType<typeof getUsersAC>
//     | ReturnType<typeof getTodosAC>
//     | ReturnType<typeof setLoadingAC>
//     | ReturnType<typeof setError>;
//
// // Utils functions
// function baseSuccessHandler<T>(dispatch: Dispatch, actionCreator: Function, data: T) {
//     dispatch(actionCreator(data));
//     dispatch(setLoadingAC(false));
// }
//
// // Thunk
// const getTodosTC = (): AppThunk => (dispatch) => {
//     dispatch(setLoadingAC(true));
//     api
//         .getTodos()
//         .then((res) => {
//             // console.log(res.data)
//             // dispatch(getTodosAC(res.data))
//             baseSuccessHandler(dispatch,getTodosAC,res.data)
//             // ❗❗❗ XXX ❗❗❗
//         })
//         .catch((e: AxiosError) => {
//             dispatch(setError(e.message));
//             dispatch(setLoadingAC(false));
//         });
// };
//
// const getUsersTC = (): AppThunk => (dispatch) => {
//     dispatch(setLoadingAC(true));
//     api
//         .getUsers()
//         .then((res) => {
//             //console.log(res.data.items)
//             baseSuccessHandler(dispatch,getUsersAC,res.data.items)
//             // ❗❗❗ YYY ❗❗❗
//         })
//         .catch((e: AxiosError) => {
//             dispatch(setError(e.message));
//             dispatch(setLoadingAC(false));
//         });
// };
//
// // Store
// const rootReducer = combineReducers({
//     app: appReducer,
// });
//
// const store = configureStore({ reducer: rootReducer });
// type RootState = ReturnType<typeof store.getState>;
// type AppDispatch = ThunkDispatch<RootState, unknown, ActionsType>;
// type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, ActionsType>;
// const useAppDispatch = () => useDispatch<AppDispatch>();
// const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
//
// // COMPONENTS
// // Loader
// export const Loader = () => {
//     return <h1>Loading ...</h1>;
// };
//
// const App = () => {
//     return (
//         <>
//             <h1>✅Todos & 🙂Users</h1>
//             <div style={{ display: "flex", justifyContent: "space-evenly" }}>
//                 <Todos />
//                 <Users />
//             </div>
//         </>
//     );
// };
//
// const Todos = () => {
//     const dispatch = useAppDispatch();
//     const todos = useAppSelector((state) => state.app.todos);
//     const error = useAppSelector((state) => state.app.error);
//     const isLoading = useAppSelector((state) => state.app.isLoading);
//
//     useEffect(() => {
//         dispatch(getTodosTC());
//     }, []);
//
//     return (
//         <div>
//             <h2>✅ Список тудулистов</h2>
//             {!!error && <h2 style={{ color: "red" }}>{error}</h2>}
//             {isLoading && <Loader />}
//             {todos.map((t) => {
//                 return (
//                     <div style={t.completed ? { color: "grey" } : {}} key={t.id}>
//                         <input type="checkbox" checked={t.completed} />
//                         <b>Описание</b>: {t.title}
//                     </div>
//                 );
//             })}
//         </div>
//     );
// };
//
// const Users = () => {
//     const dispatch = useAppDispatch();
//     const users = useAppSelector((state) => state.app.users);
//     const error = useAppSelector((state) => state.app.error);
//     const isLoading = useAppSelector((state) => state.app.isLoading);
//
//     useEffect(() => {
//         dispatch(getUsersTC());
//     }, []);
//
//     return (
//         <div>
//             <h2>🙂 Список юзеров</h2>
//             {!!error && <h2 style={{ color: "red" }}>{error}</h2>}
//             {isLoading && <Loader />}
//             <div>
//                 {users.map((u) => {
//                     return (
//                         <div key={u.id}>
//                             <b>name</b>:{u.name} - <b>age</b>:{u.age}
//                         </div>
//                     );
//                 })}
//             </div>
//         </div>
//     );
// };
//
// const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
// root.render(
//     <Provider store={store}>
//         <App />
//     </Provider>,
// );

// 📜 Описание:
// Перед вами список тудулистов и пользователей, которые находятся в постоянной загрузке.
// Откройте network и вы увидите что запросы на сервер уходят и возвращаются с хорошими данными,
// но вместо этого пользователь видит на экране Loader.
// Для обработки успешного результата написана утилитная функция baseSuccessHandler.
// Ваша задача воспользоваться этой функцией отобразить Todos и Users
// Что нужно написать вместо XXX и YYY, чтобы реализовать данную задачу?
// Ответ дайте через пробел.

// 🖥 Пример ответа: dispatch(baseSuccessHandler(1,2,3))  dispatch(baseSuccessHandler(3,2,1)
// import React, { useEffect } from "react";
// import ReactDOM from "react-dom/client";
// import { Provider, TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
// import { ThunkAction, ThunkDispatch } from "redux-thunk";
// import axios from "axios";
// import { configureStore, combineReducers } from "@reduxjs/toolkit";
//
// // Types
// type PostDomainType = PostType & {
//     isDisabled: boolean;
// };
//
// type PostType = {
//     body: string;
//     id: string;
//     title: string;
//     userId: string;
// };
//
// // Api
// const instance = axios.create({ baseURL: "https://exams-frontend.kimitsu.it-incubator.io/api/" });
//
// const postsAPI = {
//     getPosts() {
//         return instance.get<PostType[]>("posts");
//     },
//     deletePost(id: string) {
//         return instance.delete<{ message: string }>(`posts/${id}?delay=3`);
//     },
// };
//
// // Reducer
// const initState = {
//     isLoading: false,
//     posts: [] as PostDomainType[],
// };
//
// type InitStateType = typeof initState;
//
// const postsReducer = (state: InitStateType = initState, action: ActionsType): InitStateType => {
//     switch (action.type) {
//         case "POSTS/GET-POSTS":
//             return {
//                 ...state,
//                 posts: action.posts.map((t) => {
//                     return { ...t, isDisabled: false };
//                 }),
//             };
//
//         case "POSTS/DELETE-POST":
//             return { ...state, posts: state.posts.filter((t) => t.id !== action.id) };
//
//         case "POSTS/IS-LOADING":
//             return { ...state, isLoading: action.isLoading };
//
//         case "POSTS/IS-DISABLED":
//             return {
//                 ...state,
//                 posts: state.posts.map((t) => {
//                     if (t.id === action.id) {
//                         return { ...t, isDisabled: action.isDisabled };
//                     } else {
//                         return t;
//                     }
//                 }),
//             };
//
//         default:
//             return state;
//     }
// };
//
// const getPostsAC = (posts: PostType[]) => ({ type: "POSTS/GET-POSTS", posts }) as const;
// const deletePostAC = (id: string) => ({ type: "POSTS/DELETE-POST", id }) as const;
// const setLoadingAC = (isLoading: boolean) => ({ type: "POSTS/IS-LOADING", isLoading }) as const;
// const setIsDisabled = (isDisabled: boolean, id: string) =>
//     ({ type: "POSTS/IS-DISABLED", isDisabled, id }) as const;
// type ActionsType =
//     | ReturnType<typeof getPostsAC>
//     | ReturnType<typeof deletePostAC>
//     | ReturnType<typeof setLoadingAC>
//     | ReturnType<typeof setIsDisabled>;
//
// // Thunk
// const getPostsTC = (): AppThunk => (dispatch) => {
//     postsAPI.getPosts().then((res) => {
//         dispatch(getPostsAC(res.data));
//     });
// };
//
// const deletePostTC =
//     (id: string): AppThunk =>
//         (dispatch) => {
//             dispatch(setIsDisabled(true, id));
//             dispatch(setLoadingAC(true));
//             postsAPI.deletePost(id).then((res) => {
//                 dispatch(deletePostAC(id));
//                 dispatch(setLoadingAC(false));
//             });
//         };
//
// // Store
// const rootReducer = combineReducers({
//     posts: postsReducer,
// });
//
// const store = configureStore({ reducer: rootReducer });
// type RootState = ReturnType<typeof store.getState>;
// type AppDispatch = ThunkDispatch<RootState, unknown, ActionsType>;
// type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, ActionsType>;
// const useAppDispatch = () => useDispatch<AppDispatch>();
// const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
//
// // Loader
// export const Loader = () => {
//     return <h1>Loading ...</h1>;
// };
//
// // App
// const App = () => {
//     const dispatch = useAppDispatch();
//     const posts = useAppSelector((state) => state.posts.posts);
//     const isLoading = useAppSelector((state) => state.posts.isLoading);
//
//     useEffect(() => {
//         dispatch(getPostsTC());
//     }, []);
//
//     const deletePostHandler = (id: string) => {
//         dispatch(deletePostTC(id));
//     };
//
//     return (
//         <div>
//             <div style={{ position: "absolute", top: "0px" }}>{isLoading && <Loader />}</div>
//             <div style={{ marginTop: "100px" }}>
//                 <h1>📜 Список постов</h1>
//                 {posts.map((p) => {
//                     return (
//                         <div key={p.id}>
//                             <b>title</b>: {p.title}
//                             <button disabled={p.isDisabled} style={{ marginLeft: "15px" }} onClick={() => deletePostHandler(p.id)}>
//                                 удалить пост
//                             </button>
//                         </div>
//                     );
//                 })}
//             </div>
//         </div>
//     );
// };
//
// const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
// root.render(
//     <Provider store={store}>
//         <App />
//     </Provider>,
// );

// 📜 Описание:
// Перед вами список постов.
// Откройте network и быстро нажмите на кнопку удалить пост несколько раз подряд.
// Откройте вкладку Preview и проанализируйте ответ с сервера
// Первое сообщение будет "Post has been successfully deleted",
// а следующие "Post with id: 63626ac315d01f80765587ee does not exist"
// Т.е. бэкенд первый раз удаляет, а потом уже не может, т.к. пост удален из базы данных.

// Ваша задача при первом клике задизаблить кнопку удаления,
// соответсвенно не давать пользователю возможности слать повторные запросы.
// ❗ Необходимо задизаблить кнопку именно удаляемого поста, а не все кнопки.
// Необходимую строку кода для решения этой задачи напишите в качестве ответа.

// 🖥 Пример ответа: style={{marginRight: '20px'}}


///------------------
// import React from 'react'
// import ReactDOM from 'react-dom/client';
// import {BrowserRouter, Route, Routes} from 'react-router-dom'
//
// export const Main = () => {
//     return (
//         <>
//             <h2>✅ Список тудулистов</h2>
//             <h2>📜 Список постов</h2>
//         </>
//     )
// }
//
// // App
// export const App = () => {
//     return (
//         <Routes>
//             <Route path={'/'} element={<Main/>}/>
//         </Routes>
//     )
// }
//
// const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
// root.render(<BrowserRouter><App/></BrowserRouter>)

// 📜 Описание:
// Белый экран... Приложение не работает.
// Найдите и исправьте ошибку, чтобы на экране отобразилось 2 заголовка.
// Исправленную версию строки напишите в качестве ответа.

// 🖥 Пример ответа: <Route path={'/'} component={<Main/>}/>
//
// import { useFormik } from "formik";
// import React from "react";
// import { Provider, TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
// import ReactDOM from "react-dom/client";
// import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
// import axios from "axios";
// import { ThunkAction, ThunkDispatch } from "redux-thunk";
// import { configureStore, combineReducers } from "@reduxjs/toolkit";
//
// // Types
// type LoginFieldsType = {
//     email: string;
//     password: string;
// };
//
// // API
// const instance = axios.create({ baseURL: "https://exams-frontend.kimitsu.it-incubator.io/api/" });
//
// const api = {
//     login(data: LoginFieldsType) {
//         return instance.post("auth/login", data);
//     },
// };
//
// // Reducer
// const initState = {
//     isLoading: false,
//     error: null as string | null,
//     isLoggedIn: false,
// };
//
// type InitStateType = typeof initState;
//
// const appReducer = (state: InitStateType = initState, action: ActionsType): InitStateType => {
//     switch (action.type) {
//         case "APP/SET-IS-LOGGED-IN":
//             return { ...state, isLoggedIn: action.isLoggedIn };
//         case "APP/IS-LOADING":
//             return { ...state, isLoading: action.isLoading };
//         case "APP/SET-ERROR":
//             return { ...state, error: action.error };
//         default:
//             return state;
//     }
// };
//
// // Actions
// const setIsLoggedIn = (isLoggedIn: boolean) =>
//     ({ type: "APP/SET-IS-LOGGED-IN", isLoggedIn }) as const;
// const setLoadingAC = (isLoading: boolean) => ({ type: "APP/IS-LOADING", isLoading }) as const;
// const setError = (error: string | null) => ({ type: "APP/SET-ERROR", error }) as const;
// type ActionsType =
//     | ReturnType<typeof setIsLoggedIn>
//     | ReturnType<typeof setLoadingAC>
//     | ReturnType<typeof setError>;
//
// // Thunk
// const loginTC =
//     (values: LoginFieldsType): AppThunk =>
//         (dispatch) => {
//             dispatch(setLoadingAC(true));
//             api
//                 .login(values)
//                 .then((res) => {
//                     dispatch(setIsLoggedIn(true));
//                     alert("Вы залогинились успешно");
//                 })
//                 .catch((e) => {
//                     dispatch(setError(e.response.data.errors));
//                 })
//                 .finally(() => {
//                     dispatch(setLoadingAC(false));
//                     setTimeout(() => {
//                         dispatch(setError(null));
//                     }, 3000);
//                 });
//         };
//
// // Store
// const rootReducer = combineReducers({
//     app: appReducer,
// });
//
// const store = configureStore({ reducer: rootReducer });
// type RootState = ReturnType<typeof store.getState>;
// type AppDispatch = ThunkDispatch<RootState, unknown, ActionsType>;
// type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, ActionsType>;
// const useAppDispatch = () => useDispatch<AppDispatch>();
// const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
//
// // Loader
// export const Loader = () => {
//     return <h1>Loading ...</h1>;
// };
//
// // Profile
// export const Profile = () => {
//     return <h2>😎 Profile</h2>;
// };
//
// // Login
// export const Login = () => {
//     const dispatch = useAppDispatch();
//     const navigate = useNavigate();
//
//     const error = useAppSelector((state) => state.app.error);
//     const isLoading = useAppSelector((state) => state.app.isLoading);
//     const isLoggedIn = useAppSelector((state) => state.app.isLoggedIn);
//
//     const formik = useFormik({
//         initialValues: {
//             email: "darrell@gmail.com",
//             password: "123",
//         },
//         onSubmit: (values) => {
//             dispatch(loginTC(values));
//         },
//     });
//     if(isLoggedIn) {navigate('profile')}
//     return (
//         <div>
//             {!!error && <h2 style={{ color: "red" }}>{error}</h2>}
//             {isLoading && <Loader />}
//             <form onSubmit={formik.handleSubmit}>
//                 <div>
//                     <input placeholder={"Введите email"} {...formik.getFieldProps("email")} />
//                 </div>
//                 <div>
//                     <input
//                         type={"password"}
//                         placeholder={"Введите пароль"}
//                         {...formik.getFieldProps("password")}
//                     />
//                 </div>
//                 <button type="submit">Залогиниться</button>
//             </form>
//         </div>
//     );
// };
//
// // App
// export const App = () => {
//     return (
//         <Routes>
//             <Route path={""} element={<Login />} />
//             <Route path={"profile"} element={<Profile />} />
//         </Routes>
//     );
// };
//
// const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
// root.render(
//     <Provider store={store}>
//         <BrowserRouter>
//             <App />
//         </BrowserRouter>
//     </Provider>,
// );
// import { useFormik } from 'formik';
// import React from 'react'
// import ReactDOM from 'react-dom/client';
// import { BrowserRouter, Route, Routes } from 'react-router-dom'
//
//
// // Main
// export const Login = () => {
//
//     const formik = useFormik({
//         initialValues: {
//             firstName: '',
//             lastName: '',
//             email: '',
//             password: '',
//             phone: '',
//         },
//         onSubmit: values => {
//             alert(JSON.stringify(values, null, 2));
//         },
//     });
//
//     return (
//         <form onSubmit={formik.handleSubmit}>
//             <div>
//                 <input
//                     name="firstName"
//                     onChange={formik.handleChange}
//                     value={formik.values.firstName}
//                     placeholder={'Введите имя'}
//                 />
//             </div>
//             <div>
//                 <input
//                     name="lastName"
//                     onChange={formik.handleChange}
//                     value={formik.values.lastName}
//                     placeholder={'Введите фамилию'}
//                 />
//             </div>
//             <div>
//                 <input
//                     name="email"
//                     onChange={formik.handleChange}
//                     value={formik.values.email}
//                     placeholder={'Введите email'}
//                 />
//             </div>
//             <div>
//                 <input
//                     name="password"
//                     onChange={formik.handleChange}
//                     value={formik.values.password}
//                     placeholder={'Введите пароль'}
//                     type={'password'}
//                 />
//             </div>
//             <div>
//                 <input
//                     name="password"
//                     onChange={formik.handleChange}
//                     value={formik.values.phone}
//                     placeholder={'Введите телефон'}
//                 />
//             </div>
//             <button type="submit">Отправить</button>
//         </form>
//     );
// }
//
// // App
// export const App = () => {
//     return (
//         <Routes>
//             <Route path={''} element={<Login/>}/>
//         </Routes>
//     )
// }
//
// const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
// root.render(<BrowserRouter><App/></BrowserRouter>)

// 📜 Описание:
// Форма заполнения данных работает некорректно.
// Пользователи жалуются на поле ввода "Телефона"
// Найдите в коде ошибку. Исправленную версию строки напишите в качестве ответа.

// 🖥 Пример ответа: <form onSubmit={formik.handleSubmit}>

// 📜 Описание:
// ❗ Email и password менять не надо. Это просто тестовые данные с которыми будет происходить успешный запрос.
// Нажмите на кнопку "Залогиниться" и вы увидели alert с успешным сообщением
// Задача: при успешной логинизации, редиректнуть пользователя на страницу Profile.

// Напишите строку кода, которую нужно добавить
// 🖥 Пример ответа: if (true) { console.log('hello') }


// 📜 Описание:
// Начните вводить в поле firstName символы. После ввода первого символа кнопка "Отправить" раздизаблится.
// Задача: кнопка "Отправить" должна раздизаблиться только в том случае, если длинна имени больше, либо равна 5 символам.
// Т.е. вам необходимо самостоятельно написать эту валидацию для поля firstName.
// ❗ В качестве текста ошибки напишите 'Must be 5 characters or more'
// ❗ Текст ошибки выводить не нужно (только если для себя поиграться).

// В качестве ответа напишите полностью строку кода с условием.
// 🖥 Пример ответа: if (true) { errors.firstName = 'Must be 5 characters or more' }
// ❗ Сторонние библиотеки (например yup) использовать запрещено

//+++
//------
// import React from 'react'
// import ReactDOM from 'react-dom/client';
// import {BrowserRouter, Navigate, Outlet, Route, Routes} from 'react-router-dom'
//
//
// export const PageNotFound = () => {
//     return <h2>⛔ 404. Page not found ⛔</h2>
// }
//
// export const Profile = () => {
//     return <h2>😎 Профиль</h2>
// }
//
//
// export const Main = () => {
//     return (
//         <>
//             <h2>✅ Список тудулистов</h2>
//             <h2>📜 Список постов</h2>
//         </>
//     )
// }
//
// // App
// export const App = () => {
//
//     return (
//
//         <Routes>
//             <Route path={'profile'} element={<Profile/>}/>
//             <Route path={'*'} element={<Navigate to={'profile'}/>}  />
//             {/* ❗❗❗ XXX ❗❗❗  */}
//         </Routes>
//     )
// }
//
//
// const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
// root.render(<BrowserRouter><App/></BrowserRouter>)

// 📜 Описание:
// Вместо ХХХ напишите роут таким образом, чтобы вне зависимости от того чтобы будет в урле (login или home или...)
// вас всегда редиректило на страницу профиля и при в это в урле по итогу
// был адрес /profile

// 🖥 Пример ответа: <Route path={'/'} element={'to profile page'}/>
///-----
// import React, { useEffect } from "react";
// import { Provider, TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
// import ReactDOM from "react-dom/client";
// import { BrowserRouter, Route, Routes } from "react-router-dom";
// import { ThunkAction, ThunkDispatch } from "redux-thunk";
// import axios from "axios";
// import { configureStore, combineReducers } from "@reduxjs/toolkit";
// import {GetTasksResponse, ResponseType} from "./api/todolists-api";
// const instance = axios.create({
//     baseURL: 'https://social-network.samuraijs.com/api/1.1/',
//     withCredentials: true,
//     headers: {
//         'API-KEY': 'a2bc24bd-0a71-4fa5-ad1c-5b343082cdb6'
//     }
// })
// // Utils
//
// // Api
// // const instance = axios.create({
// //     baseURL: "xxx",
// // });
//
// const api = {
//     getUsers() {
//         return instance.get<GetTasksResponse>(`todo-lists/70530da6-46fa-4c86-9620-0698621c0cda/tasks`)
//     },
// };
//
// // Reducer
// const initState = {
//     isLoading: false,
//     users: [] as any[],
// };
//
// type InitStateType = typeof initState;
//
// const appReducer = (state: InitStateType = initState, action: ActionsType): InitStateType => {
//     switch (action.type) {
//         case "APP/SET-USERS":
//             /* 1 */
//             console.log(1)
//             return { ...state, users: action.users };
//         case "APP/IS-LOADING":
//             /* 2 */
//             console.log(2)
//             return { ...state, isLoading: action.isLoading };
//         default:
//             return state;
//     }
// };
//
// // Actions
// const setUsersAC = (users: any[]) => ({ type: "APP/SET-USERS", users }) as const;
// const setLoadingAC = (isLoading: boolean) => ({ type: "APP/IS-LOADING", isLoading }) as const;
// type ActionsType = ReturnType<typeof setUsersAC> | ReturnType<typeof setLoadingAC>;
//
// // Thunk
// const getUsersTC = (): AppThunk => (dispatch) => {
//     /* 3 */
//     console.log('3')
//     dispatch(setLoadingAC(true));
//     api.getUsers().then((res) => {
//         /* 4 */
//         console.log(4)
//         dispatch(setLoadingAC(false));
//         /* 5 */
//         console.log(5)
//         dispatch(setUsersAC(res.data.items));
//     });
// };
//
// // Store
// const rootReducer = combineReducers({
//     app: appReducer,
// });
//
// const store = configureStore({ reducer: rootReducer });
// type RootState = ReturnType<typeof store.getState>;
// type AppDispatch = ThunkDispatch<RootState, unknown, ActionsType>;
// type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, ActionsType>;
// const useAppDispatch = () => useDispatch<AppDispatch>();
// const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
//
// // Loader
// export const Loader = () => {
//     /* 6 */
//     console.log(6)
//     return <h1>Loading ...</h1>;
// };
//
// // Login
// export const Login = () => {
//     /* 7 */
//     console.log(7)
//     const users = useAppSelector((state) => state.app.users);
//     const isLoading = useAppSelector((state) => state.app.isLoading);
//
//     return (
//         <div>
//             {isLoading && <Loader />}
//             {users.map((u) => (
//                 <p key={u.id}>{u.email}</p>
//             ))}
//             <h1>
//                 В данном задании на экран смотреть не нужно. Рекомендуем взять ручку, листик и
//                 последовательно, спокойно расставить цифры в нужном порядке. Прежде чем давать ответ
//                 обязательно посчитайте к-во цифр и сверьте с подсказкой. Удачи 🚀
//             </h1>
//         </div>
//     );
// };
//
// // App
// export const App = () => {
//     /* 8 */
//     console.log(8)
//     const dispatch = useAppDispatch();
//
//     useEffect(() => {
//         /* 9 */
//         console.log(9)
//         dispatch(getUsersTC());
//     }, []);
//
//     /* 10 */
//     console.log(10)
//     return (
//         <Routes>
//             <Route path={""} element={<Login />} />
//         </Routes>
//     );
// };
//
// const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
// root.render(
//     <Provider store={store}>
//         <BrowserRouter>
//             <App />
//         </BrowserRouter>
//     </Provider>,
// );
//8 10 7 9 3 2 7 6 4 2 5 1 7
// 📜 Описание:
// Задача: напишите в какой последовательности вызовутся числа при успешном запросе.
// Подсказка: будет 13 чисел.
// Ответ дайте через пробел.

// 🖥 Пример ответа: 1 2 3 4 5 6 7 8 9 10 1 2 3

//
// import React from 'react'
// import ReactDOM from 'react-dom/client';
// import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
//
//
// export const PageNotFound = () => {
//     return <h2>⛔ 404. Page not found ⛔</h2>
// }
//
// export const Profile = () => {
//     return <h2>😎 Профиль</h2>
// }
//
//
// export const Main = () => {
//     return (
//         <>
//             <h2>✅ Список тудулистов</h2>
//             <h2>📜 Список постов</h2>
//         </>
//     )
// }
//
// // App
// export const App = () => {
//
//     return (
//         <Routes>
//             <Route path={'profile'} element={<Profile/>}/>
//             <Route path={'*'} element={<Navigate to={'profile'}/>}/>
//             {/* ❗❗❗ XXX ❗❗❗  */}
//         </Routes>
//     )
// }
//
//
// const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
// root.render(<BrowserRouter><App/></BrowserRouter>)

// 📜 Описание:
// Вместо ХХХ напишите роут таким образом, чтобы вне зависимости от того чтобы будет в урле (login или home или...)
// вас всегда редиректило на страницу профиля и при в это в урле по итогу
// был адрес /profile

// 🖥 Пример ответа: <Route path={'/'} element={'to profile page'}/>
// import { useFormik } from 'formik';
// import React from 'react'
// import ReactDOM from 'react-dom/client';
// import { BrowserRouter, Route, Routes } from 'react-router-dom'
//
//
// // Types
// type LoginFieldsType = {
//     firstName: string
//     email: string
// }
//
// // Main
// export const Login = () => {
//
//     const formik = useFormik({
//         initialValues: {
//             firstName: '',
//             email: '',
//         },
//         validate: (values) => {
//             const errors: Partial<LoginFieldsType> = {};
//
//             if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
//                 errors.email = 'Invalid email address';
//             }
//             return errors
//         },
//         onSubmit: values => {
//             alert(JSON.stringify(values, null, 2));
//         }
//     });
//
//     // Функция необходима для того, чтобы вебшторм не ругался на true в JSX
//     const getTrue = () => {
//         return true
//     }
//     if(formik.errors){
//         //console.log(formik.errors)
//        // console.log(formik.touched)
//     }
//     console.log(formik.touched)
//     return (
//         <form onSubmit={formik.handleSubmit}>
//             <div>
//                 <input placeholder={'Введите имя'} {...formik.getFieldProps('firstName')}/>
//             </div>
//             <div>
//                 <input placeholder={'Введите email'}{...formik.getFieldProps('email')}/>
//                 {  formik.touched.email && formik.errors.email  && <div style={{color: 'red'}}>{formik.errors.email}</div>}
//             </div>
//             <button type="submit">Отправить</button>
//         </form>
//     );
// }
//
// // App
// export const App = () => {
//     return (
//         <Routes>
//             <Route path={''} element={<Login/>}/>
//         </Routes>
//     )
// }
//
// const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
// root.render(<BrowserRouter><App/></BrowserRouter>)

// 📜 Описание:
// Загрузив приложение вы увидите ошибку под полем email, но вы еще ничего не ввели.
// Исправьте 46 строку кода так, чтобы:
// 1) Сообщение об ошибке показывалось только в том случае, когда email введен некорректно.
// 2) Вместо ERROR должен быть конкретный текст ошибки прописанный в валидации к этому полю.
// 3) Сообщение должно показываться только в том случае, когда мы взаимодействовали с полем.
// Исправленную версию строки напишите в качестве ответа.

// 🖥 Пример ответа: {true && <div style={{color: 'red'}}>error.email</div>}
//-----
//
// import { useFormik } from 'formik';
// import React from 'react'
// import ReactDOM from 'react-dom/client';
// import { BrowserRouter, Route, Routes } from 'react-router-dom'
//
// // Main
// export const Login = () => {
//
//     const formik = useFormik({
//         initialValues: {
//             email: '',
//             password: '',
//         },
//         onSubmit: values => {
//             alert(JSON.stringify(values, null, 2));
//            // formik.resetForm();
//         },
//     });
//
//     return (
//         <form onSubmit={formik.handleSubmit} >
//             <div>
//                 <input
//                     name="email"
//                     onChange={formik.handleChange}
//                     value={formik.values.email}
//                     type="text"
//                     placeholder={'Введите email'}
//                 />
//             </div>
//             <div>
//                 <input
//                     name="password"
//                     onChange={formik.handleChange}
//                     value={formik.values.password}
//                     type="password"
//                     placeholder={'Введите пароль'}
//                 />
//             </div>
//             <button type="submit">Отправить</button>
//         </form>
//     );
// }
//
// // App
// export const App = () => {
//     return (
//         <Routes>
//             <Route path={'/'} element={<Login/>}/>
//         </Routes>
//     )
// }
//
// const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
// root.render(<BrowserRouter><App/></BrowserRouter>)

// 📜 Описание:
// При заполнении данных формы и их отправке вы должны увидеть alert c
// введенными значениями, но из-за допущенной ошибки форма работает не корректно.
// Найдите ошибку и исправленную версию строки напишите в качестве ответа.
// ❗После того как показался alert форма не должна перегружать все приложение

// 🖥 Пример ответа: <div onClick={handleClick}>
///-----


// 📜 Описание:
// При заполнении данных формы и их отправке вы должны увидеть alert c
// введенными значениями, но из-за допущенной ошибки форма работает не корректно.
// Найдите ошибку и исправленную версию строки напишите в качестве ответа.
// ❗После того как показался alert форма не должна перегружать все приложение

// 🖥 Пример ответа: <div onClick={handleClick}>
// import React, { useEffect } from "react";
// import { Provider, TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
// import ReactDOM from "react-dom/client";
// import { BrowserRouter, Route, Routes } from "react-router-dom";
// import { ThunkAction, ThunkDispatch } from "redux-thunk";
// import { configureStore, combineReducers } from "@reduxjs/toolkit";
// import axios, { AxiosResponse } from 'axios'
// import {GetTasksResponse} from "./api/todolists-api";
//
// const instance = axios.create({
//     baseURL: 'https://social-network.samuraijs.com/api/1.1/',
//     withCredentials: true,
//     headers: {
//         'API-KEY': 'a2bc24bd-0a71-4fa5-ad1c-5b343082cdb6'
//     }
// })
// // Utils
// //console.log = () => {};
//
//
//
// // const api = {
// //     getUsers() {
// //         /* 1 */
// //         console.log(1)
// //         return instance.get("xxx");
// //     },
// // };
// const api = {
//     getUsers() {
//         console.log(1)
//         return instance.get<GetTasksResponse>(`todo-lists/70530da6-46fa-4c86-9620-0698621c0cda/tasks`)
//     },
// };
// // Reducer
// const initState = {
//     isLoading: false,
//     users: [] as any[],
// };
//
// type InitStateType = typeof initState;
//
// const appReducer = (state: InitStateType = initState, action: ActionsType): InitStateType => {
//     switch (action.type) {
//         case "APP/SET-USERS":
//             /* 2 */
//             console.log(2)
//             return { ...state, users: action.users };
//         default:
//             return state;
//     }
// };
//
// // Actions
// const setUsersAC = (users: any[]) => ({ type: "APP/SET-USERS", users }) as const;
// type ActionsType = ReturnType<typeof setUsersAC>;
//
// // Thunk
// const getUsersTC = (): AppThunk => (dispatch) => {
//     /* 3 */
//     console.log(3)
//     api.getUsers().then((res) => {
//         /* 4 */
//         console.log(4)
//         dispatch(setUsersAC(res.data.items));
//     });
// };
//
// // Store
// const rootReducer = combineReducers({
//     app: appReducer,
// });
//
// const store = configureStore({ reducer: rootReducer });
// type RootState = ReturnType<typeof store.getState>;
// type AppDispatch = ThunkDispatch<RootState, unknown, ActionsType>;
// type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, ActionsType>;
// const useAppDispatch = () => useDispatch<AppDispatch>();
// const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
//
// // Login
// export const Login = () => {
//     const users = useAppSelector((state) => state.app.users);
//     /* 5 */
//     console.log(5)
//     console.log(6)
//     return (
//         <div>
//             {/* 6 */ }
//                        {
//                            users.map((u) => (
//                 <p key={u.id}>{u.email}</p>
//             ))}
//
//             <h1>
//                 В данном задании на экран смотреть не нужно. Рекомендуем взять ручку, листик и
//                 последовательно, спокойно расставить цифры в нужном порядке. Прежде чем давать ответ
//                 обязательно посчитайте к-во цифр и сверьте с подсказкой. Удачи 🚀
//             </h1>
//         </div>
//     );
// };
//
// // App
// export const App = () => {
//     /* 7 */
//     console.log(7)
//     const dispatch = useAppDispatch();
//
//     useEffect(() => {
//         /* 8 */
//         console.log(8)
//         dispatch(getUsersTC());
//     }, []);
//
//     /* 9 */
//     console.log(9)
//     return (
//         <Routes>
//             <Route path={""} element={<Login />} />
//         </Routes>
//     );
// };
//
// const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
// root.render(
//     <Provider store={store}>
//         <BrowserRouter>
//             <App />
//         </BrowserRouter>
//     </Provider>,
// );

// 📜 Описание:
// Задача: напишите в какой последовательности вызовутся числа при успешном запросе.
// Подсказка: будет 11 чисел.
// Ответ дайте через пробел.

// 🖥 Пример ответа: 1 2 3 4 5 6 7 8 9 1 2
//////-------
// import { useFormik } from 'formik';
// import React from 'react'
// import ReactDOM from 'react-dom/client';
// import { BrowserRouter, Route, Routes } from 'react-router-dom'
//
//
// // Types
// type LoginFieldsType = {
//     firstName?: string
// }
//
// // Main
// export const Login = () => {
//
//     const formik = useFormik({
//         initialValues: {
//             firstName: '',
//         },
//         validate: (values) => {
//             const errors: LoginFieldsType = {};
//             if(values.firstName.length<5){
//                 errors.firstName='Must be 5 characters or more'
//             }
//             return errors
//         },
//         onSubmit: values => {
//             alert(JSON.stringify(values, null, 2));
//         }
//     });
//     console.log(formik.errors)
//     //console.log(formik.dirty)
//     return (
//         <form onSubmit={formik.handleSubmit}>
//             <div>
//                 <input placeholder={'Введите имя'} {...formik.getFieldProps('firstName')}/>
//             </div>
//             <button type="submit" disabled={!(formik.isValid && formik.dirty)}>Отправить</button>
//         </form>
//     );
// }
//
// // App
// export const App = () => {
//     return (
//         <Routes>
//             <Route path={''} element={<Login/>}/>
//         </Routes>
//     )
// }
//
// const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
// root.render(<BrowserRouter><App/></BrowserRouter>)

// 📜 Описание:
// Начните вводить в поле firstName символы. После ввода первого символа кнопка "Отправить" раздизаблится.
// Задача: кнопка "Отправить" должна раздизаблиться только в том случае, если длинна имени больше, либо равна 5 символам.
// Т.е. вам необходимо самостоятельно написать эту валидацию для поля firstName.
// ❗ В качестве текста ошибки напишите 'Must be 5 characters or more'
// ❗ Текст ошибки выводить не нужно (только если для себя поиграться).

// В качестве ответа напишите полностью строку кода с условием.
// 🖥 Пример ответа: if (true) { errors.firstName = 'Must be 5 characters or more' }
// ❗ Сторонние библиотеки (например yup) использовать запрещено
////----
// import React, { useEffect } from "react";
// import ReactDOM from "react-dom/client";
// import { ThunkAction, ThunkDispatch } from "redux-thunk";
// import { Provider, TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
// import axios from "axios";
// import { configureStore, combineReducers } from "@reduxjs/toolkit";
//
// // Types
// type PostType = {
//     body: string;
//     id: string;
//     title: string;
//     userId: string;
// };
//
// type PayloadType = {
//     title: string;
//     body?: string;
// };
//
// // Api
// const instance = axios.create({ baseURL: "https://exams-frontend.kimitsu.it-incubator.io/api/" });
//
// const postsAPI = {
//     getPosts() {
//         return instance.get<PostType[]>("posts");
//     },
//     updatePostTitle(postId: string, post: PayloadType) {
//         return instance.put<PostType>(`posts/${postId}`, post);
//     },
// };
//
// // Reducer
// const initState = [] as PostType[];
//
// type InitStateType = typeof initState;
//
// const postsReducer = (state: InitStateType = initState, action: ActionsType): InitStateType => {
//     switch (action.type) {
//         case "POSTS/GET-POSTS":
//             return action.posts;
//
//         case "POSTS/UPDATE-POST-TITLE":
//             return state.map((p) => {
//                 if (p.id === action.post.id) {
//                     return { ...p, title: action.post.title };
//                 } else {
//                     return p;
//                 }
//             });
//
//         default:
//             return state;
//     }
// };
//
// const getPostsAC = (posts: PostType[]) => ({ type: "POSTS/GET-POSTS", posts }) as const;
// const updatePostTitleAC = (post: PostType) => ({ type: "POSTS/UPDATE-POST-TITLE", post }) as const;
// type ActionsType = ReturnType<typeof getPostsAC> | ReturnType<typeof updatePostTitleAC>;
//
// const getPostsTC = (): AppThunk => (dispatch) => {
//     postsAPI.getPosts().then((res) => {
//         dispatch(getPostsAC(res.data));
//     });
// };
//
// const updatePostTC =
//     (postId: string): AppThunk =>
//         (dispatch, getState: any) => {
//             try {
//                 const currentPost = getState().posts.find((p: PostType) => p.id === postId);
//                 if (currentPost) {
//                     const payload = { title: "Это просто заглушка. Backend сам сгенерирует новый title" };
//                     postsAPI.updatePostTitle(postId, payload).then((res) => {
//                         dispatch(updatePostTitleAC(res.data));
//                     });
//                 }
//             } catch (e) {
//                 alert("Обновить пост не удалось 😢");
//             }
//         };
//
// // Store
// const rootReducer = combineReducers({
//     posts: postsReducer,
// });
//
// const store = configureStore({ reducer: rootReducer });
// type RootState = ReturnType<typeof store.getState>;
// type AppDispatch = ThunkDispatch<RootState, unknown, ActionsType>;
// type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, ActionsType>;
// const useAppDispatch = () => useDispatch<AppDispatch>();
// const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
//
// // App
// const App = () => {
//     const dispatch = useAppDispatch();
//     const posts = useAppSelector((state) => state.posts);
//
//     useEffect(() => {
//         dispatch(getPostsTC());
//     }, []);
//
//     const updatePostHandler = (postId: string) => {
//         dispatch(updatePostTC(postId));
//     };
//
//     return (
//         <>
//             <h1>📜 Список постов</h1>
//             {posts.map((p) => {
//                 return (
//                     <div key={p.id}>
//                         <b>title</b>: {p.title}
//                         <button onClick={() => updatePostHandler(p.id)}>Обновить пост</button>
//                     </div>
//                 );
//             })}
//         </>
//     );
// };
//
// const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
// root.render(
//     <Provider store={store}>
//         <App />
//     </Provider>,
// );

// 📜 Описание:
// Попробуйте обновить пост и вы увидите alert с ошибкой.
// Debugger / network / console.log вам в помощь
// Найдите ошибку и вставьте исправленную строку кода в качестве ответа.

// 🖥 Пример ответа: const payload = {...currentPost, tile: 'Летим 🚀'}