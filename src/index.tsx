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

// 📜 Описание:
// ❗ Email и password менять не надо. Это просто тестовые данные с которыми будет происходить успешный запрос.
// Нажмите на кнопку "Залогиниться" и вы увидели alert с успешным сообщением
// Задача: при успешной логинизации, редиректнуть пользователя на страницу Profile.

// Напишите строку кода, которую нужно добавить
// 🖥 Пример ответа: if (true) { console.log('hello') }
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
import React, { useEffect } from "react";
import { Provider, TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ThunkAction, ThunkDispatch } from "redux-thunk";
import axios from "axios";
import { configureStore, combineReducers } from "@reduxjs/toolkit";

// Utils
console.log = () => {};

// Api
const instance = axios.create({
    baseURL: "xxx",
});

const api = {
    getUsers() {
        return instance.get("xxx");
    },
};

// Reducer
const initState = {
    isLoading: false,
    users: [] as any[],
};

type InitStateType = typeof initState;

const appReducer = (state: InitStateType = initState, action: ActionsType): InitStateType => {
    switch (action.type) {
        case "APP/SET-USERS":
            /* 1 */
            return { ...state, users: action.users };
        case "APP/IS-LOADING":
            /* 2 */
            return { ...state, isLoading: action.isLoading };
        default:
            return state;
    }
};

// Actions
const setUsersAC = (users: any[]) => ({ type: "APP/SET-USERS", users }) as const;
const setLoadingAC = (isLoading: boolean) => ({ type: "APP/IS-LOADING", isLoading }) as const;
type ActionsType = ReturnType<typeof setUsersAC> | ReturnType<typeof setLoadingAC>;

// Thunk
const getUsersTC = (): AppThunk => (dispatch) => {
    /* 3 */
    console.log('3')
    dispatch(setLoadingAC(true));
    api.getUsers().then((res) => {
        /* 4 */
        dispatch(setLoadingAC(false));
        /* 5 */
        dispatch(setUsersAC(res.data.data));
    });
};

// Store
const rootReducer = combineReducers({
    app: appReducer,
});

const store = configureStore({ reducer: rootReducer });
type RootState = ReturnType<typeof store.getState>;
type AppDispatch = ThunkDispatch<RootState, unknown, ActionsType>;
type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, ActionsType>;
const useAppDispatch = () => useDispatch<AppDispatch>();
const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

// Loader
export const Loader = () => {
    /* 6 */
    return <h1>Loading ...</h1>;
};

// Login
export const Login = () => {
    /* 7 */
    const users = useAppSelector((state) => state.app.users);
    const isLoading = useAppSelector((state) => state.app.isLoading);

    return (
        <div>
            {isLoading && <Loader />}
            {users.map((u) => (
                <p key={u.id}>{u.email}</p>
            ))}
            <h1>
                В данном задании на экран смотреть не нужно. Рекомендуем взять ручку, листик и
                последовательно, спокойно расставить цифры в нужном порядке. Прежде чем давать ответ
                обязательно посчитайте к-во цифр и сверьте с подсказкой. Удачи 🚀
            </h1>
        </div>
    );
};

// App
export const App = () => {
    /* 8 */
    const dispatch = useAppDispatch();

    useEffect(() => {
        /* 9 */
        dispatch(getUsersTC());
    }, []);

    /* 10 */
    return (
        <Routes>
            <Route path={""} element={<Login />} />
        </Routes>
    );
};

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(
    <Provider store={store}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>,
);

// 📜 Описание:
// Задача: напишите в какой последовательности вызовутся числа при успешном запросе.
// Подсказка: будет 13 чисел.
// Ответ дайте через пробел.

// 🖥 Пример ответа: 1 2 3 4 5 6 7 8 9 10 1 2 3
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
//     if(!formik.errors){
//         console.log('ssss')
//     }
//     return (
//         <form onSubmit={formik.handleSubmit}>
//             <div>
//                 <input placeholder={'Введите имя'} {...formik.getFieldProps('firstName')}/>
//             </div>
//             <div>
//                 <input placeholder={'Введите email'}{...formik.getFieldProps('email')}/>
//                 {getTrue() &&  <div style={{color: 'red'}}>{formik.errors.email}</div>}
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
//             console.log('sdvsdvd')
//             alert(JSON.stringify(values, null, 2));
//             formik.resetForm();
//
//         },
//     });
//
//     return (
//         <form>
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
// import React, { useEffect } from "react";
// import { Provider, TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
// import ReactDOM from "react-dom/client";
// import { BrowserRouter, Route, Routes } from "react-router-dom";
// import { ThunkAction, ThunkDispatch } from "redux-thunk";
// import axios from "axios";
// import { configureStore, combineReducers } from "@reduxjs/toolkit";
//
// // Utils
// console.log = () => {};
//
// // Api
// const instance = axios.create({
//     baseURL: "xxx",
// });
//
// const api = {
//     getUsers() {
//         /* 1 */
//         return instance.get("xxx");
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
//             /* 2 */
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
//     api.getUsers().then((res) => {
//         /* 4 */
//         dispatch(setUsersAC(res.data.data));
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
//
//     return (
//         <div>
//             {/* 6 */}
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
//     /* 7 */
//     const dispatch = useAppDispatch();
//
//     useEffect(() => {
//         /* 8 */
//         dispatch(getUsersTC());
//     }, []);
//
//     /* 9 */
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
//             if(values.firstName.length<=5){
//                 errors:{'Must be 5 characters or more'}
//             }
//             const errors: LoginFieldsType = {};
//             return errors
//         },
//         onSubmit: values => {
//             alert(JSON.stringify(values, null, 2));
//         }
//     });
//     console.log(formik.errors)
//     return (
//         <form onSubmit={formik.handleSubmit}>
//             <div>
//                 <input placeholder={'Введите имя'} {...formik.getFieldProps('firstName')}/>
//             </div>
//             <button type="submit" disabled={!(formik.isValid && formik.dirty && formik.values.firstName.length>=5)}>Отправить</button>
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