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
type ErrorsType={
    email?: string
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
            const errors:ErrorsType = {};
            if (!values.email) {
                errors.email = 'Required';
            } else if (values.email.length > 15) {
                errors.email = 'Must be 15 characters or less';
            }
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
                                   value={formik.values.email}  />
                        {formik.errors.email ? <div>{formik.errors.email}</div> : null}
                        <TextField name="password" type="password" label="password" margin="normal" onChange={formik.handleChange}
                                   value={formik.values.password} />
                        <FormControlLabel label={'Remember me'} control={<Checkbox />} />
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