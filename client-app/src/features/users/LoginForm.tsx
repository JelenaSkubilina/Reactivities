import { ErrorMessage, Formik } from "formik";
import { observer } from "mobx-react-lite";
import React from "react";
import { Button, Form, Header, Label } from "semantic-ui-react";
import MyTextInput from "../../app/common/form/MyTextInput";
import { useStore } from "../../app/stores/store";

export default observer(function LoginForm() {
    const {userStore} = useStore();
    return (
        <Formik
            initialValues={{email: '', password: ''}}
            onSubmit={(values, {setErrors}) => userStore.login(values).catch(error =>
                 setErrors({email: 'Invalid email', password: 'Invalid password'}))}
        >
            {({handleSubmit, isSubmitting, errors}) => (
                <Form className='ui form' onSubmit={handleSubmit} autoComplete='off'>
                    <Header as='h2' content='Login to Reactivities' color='teal' textAlign='center'/>
                    <MyTextInput name='email' placeholder='Email'/>
                    <MyTextInput name='password' placeholder='Password' type='password'/>
                    <ErrorMessage 
                         name='error' render={()=> 
                        <Label style={{marginBottom: 10}} basic color='red' content={[errors.email, errors.password]}></Label> }
                    />
                    <Button loading={isSubmitting} positive content='Login' type='submit' fluid />
                </Form>
            )}
        </Formik>
    )
})