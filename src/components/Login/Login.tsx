import React from 'react'
import Grid from '@mui/material/Grid'
import Checkbox from '@mui/material/Checkbox'
import FormControl from '@mui/material/FormControl'
import FormControlLabel from '@mui/material/FormControlLabel'
import FormGroup from '@mui/material/FormGroup'
import FormLabel from '@mui/material/FormLabel'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import {useFormik} from "formik";

type ErrorsType = {
    email?: string
    password?: string
}
export const Login = () => {
    const formik = useFormik({
        initialValues: {
            email: '',
            password: ''
        },
        onSubmit: values => {
            alert(JSON.stringify(values, null, 2));
        },
        validate: values => {
            const errors: ErrorsType = {};
            if (!values.email) {
                errors.email = 'Required';
            } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
                errors.email = 'Invalid email address';
            }
            if (!values.password) {
                errors.password = 'Required'
            } else if (values.password.length < 6) {
                errors.password = 'Invalid password';
            }
            return errors
        }
    });

    console.log(formik.errors)
    return (
        <form onSubmit={formik.handleSubmit}>
            <Grid container justifyContent={'center'}>
                <Grid item justifyContent={'center'}>
                    <FormControl>
                        <FormGroup>
                            <TextField name="email" label="Email" margin="normal" onChange={formik.handleChange}
                                       value={formik.values.email}/>
                            {formik.touched.email && formik.errors.email ?
                               ( <div style={{color: 'red'}}>{formik.errors.email}</div>) : null}
                            <TextField name="password" type="password" label="password" margin="normal"
                                       onChange={formik.handleChange}
                                       value={formik.values.password}/>
                            {formik.touched.password && formik.errors.password ?
                                (<div style={{color: 'red'}}>{formik.errors.password}</div>) : null}
                            <FormControlLabel label={'Remember me'} control={<Checkbox/>}/>
                            <Button type={'submit'} variant={'contained'} color={'primary'}>
                                Login
                            </Button>
                        </FormGroup>
                    </FormControl>
                </Grid>
            </Grid>
        </form>
    )
}