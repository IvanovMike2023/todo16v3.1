import React, {useEffect} from 'react'
import './App.css'
import {TodolistsList} from '../features/TodolistsList/TodolistsList'
import {useAppDispatch, useAppSelector} from './store'
import {RequestStatusType} from './app-reducer'
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import LinearProgress from '@mui/material/LinearProgress';
import {Menu} from '@mui/icons-material';
import {ErrorSnackbar} from '../components/ErrorSnackbar/ErrorSnackbar'
import {Outlet, Route, Routes} from "react-router-dom";
import {Login} from "../components/Login/Login";
import {CircularProgress} from "@mui/material";
import {logoutTC, meTC} from "../components/Login/auth-reducer";


function App() {
    const status = useAppSelector<RequestStatusType>((state) => state.app.status)
    const dispatch=useAppDispatch()
    const isInitialized = useAppSelector<boolean>(state=>state.app.isInitialized)
    const isLoggedIn = useAppSelector<boolean>(state=>state.auth.isLoggedIn)
    useEffect(() => {
        dispatch(meTC())
    }, [])
    const Logout=()=>{
        dispatch(logoutTC ())
    }
    if (!isInitialized) {
        return (
            <div style={{ position: 'fixed', top: '30%', textAlign: 'center', width: '100%' }}>
                <CircularProgress />
            </div>
        )
    }
    return (
        <div className="App">
            <ErrorSnackbar/>
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" color="inherit" aria-label="menu">
                        <Menu/>
                    </IconButton>
                    <Typography variant="h6">
                        News
                    </Typography>
                    { isLoggedIn && <Button onClick={Logout} color="inherit">Logout</Button>}
                </Toolbar>
                {status === 'loading' && <LinearProgress/>}
            </AppBar>
            <Container fixed>
                <Outlet/>
                {/*<Routes>*/}
                {/*    <Route path={'/'} element={<TodolistsList/>}/>*/}
                {/*    <Route path={'login'} element={<Login/>}/>*/}
                {/*    <Route path="*" element={'404'} />*/}
                {/*</Routes>*/}
            </Container>
        </div>
    )
}

export default App
