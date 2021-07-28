import { observer } from "mobx-react-lite";
import React from "react";
import { Button, Header, Segment } from "semantic-ui-react";
import { useStore } from "../../app/stores/store";
import { Formik, Form } from "formik";
import * as Yup from 'yup';
import MyTextInput from "../../app/common/form/MyTextInput";
import MyTextArea from "../../app/common/form/MyTextArea";

interface Props {
    setEditMode: (editMode: boolean) => void;
   }

export default observer (function ProfileEditForm({setEditMode}: Props) {
    const {profileStore: {profile, updateProfile}} = useStore();

    const validationSchema = Yup.object({
        displayName: Yup.string().required()
    })

    function handleFormSubmit(values: any) {
        updateProfile(values).then(() => setEditMode(false));
    }

    return (
        <Segment clearing>
            <Header content='Activity Details' sub color='teal'/>
            <Formik
                validationSchema={validationSchema}
                enableReinitialize
                initialValues={{displayName: profile?.displayName, bio: profile?.bio}}
                onSubmit={values => handleFormSubmit(values)}>
                {({ handleSubmit, isValid , isSubmitting, dirty}) => (
                    <Form className='ui form' onSubmit={handleSubmit} autoComplete='off'>
                        <MyTextInput name='displayName' placeholder='Display name'/>
                        <MyTextArea rows={3} placeholder='Bio' name='bio'/>
                        <Button 
                            disabled={isSubmitting || !dirty || !isValid}
                            loading={isSubmitting} 
                            floated='right' 
                            positive 
                            type='submit'
                            content='Update profile'
                        />
                    </Form>
                )}
            </Formik>
        </Segment>
    )
})