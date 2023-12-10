import {useState, useEffect} from "react";
import {Form, Segment, Button, Header} from "semantic-ui-react";
import {observer} from "mobx-react-lite";
import {Link, useNavigate, useParams} from "react-router-dom";
import {Formik} from "formik";
import * as yup from "yup"
import {v4 as uuid} from "uuid";

import {useStore} from "../../../app/stores/store.ts";
import {Activity} from "../../../app/models/activity.ts";
import LoadingComponent from "../../../app/layout/LoadingComponent.tsx";
import MyTextInput from "../../../app/common/form/MyTextInput.tsx";
import MyTextArea from "../../../app/common/form/MyTextArea.tsx";
import MySelectInput from "../../../app/common/form/MySelectInput.tsx";
import {categoryOptions} from "../../../app/common/options/categoryOptions.ts";
import MyDateInput from "../../../app/common/form/MyDateInput.tsx";

export default observer(function ActivityForm() {
    const {activityStore} = useStore();
    const { createActivity, updateActivity, loading, loadActivity, loadingInitial} = activityStore
    const {id} = useParams();
    const navigate = useNavigate();

    const [activity, setActivity] = useState<Activity>({
        id: "",
        title: "",
        description: "",
        date: null,
        category: "",
        city: "",
        venue: ""
    })

    const validationSchema = yup.object({
        title: yup.string().required("The activity title is required"),
        description: yup.string().required("The activity description is required"),
        category: yup.string().required("The activity category is required"),
        date: yup.string().required("The activity date is required").nullable(),
        venue: yup.string().required("The activity venue is required"),
        city: yup.string().required("The activity city is required"),
    })

    useEffect(() => {
        if(id) {
            loadActivity(id).then(activity => setActivity(activity!));
        }
    }, [loadActivity, id]);
    
    function handleSubmit(activity: Activity) {
        if(!activity.id) {
            activity.id = uuid();
            createActivity(activity).then(()=>navigate(`/activities/${activity.id}`));
        } else {
            updateActivity(activity).then(()=>navigate(`/activities/${activity.id}`));
        }
    }

    if(loadingInitial) {
        return <LoadingComponent content={"Loading activity..."} />
    }
    
    return (
        <Segment clearing>
            <Header content={"Activity Details"} sub color={"teal"} />
            <Formik validationSchema={validationSchema} enableReinitialize initialValues={activity} onSubmit={handleSubmit}>
                {({ handleSubmit, isValid, isSubmitting, dirty })=>(
                    <Form className={"ui form"} onSubmit={handleSubmit} autoComplete="off" >
                        <MyTextInput name={"title"} placeholder={"Title"} />
                        <MyTextArea row={3} placeholder={"Description"} name={"description"} />
                        <MySelectInput options={categoryOptions} placeholder={"Category"} name={"category"} />
                        <MyDateInput
                            placeholderText={"Date"}
                            name={"date"}
                            showTimeSelect
                            timeCaption={"time"}
                            dateFormat={"MMMM d, yyyy h:mm aa"}
                        />
                        <Header content={"Location Details"} sub color={"teal"} />
                        <MyTextInput placeholder={"City"} name={"city"} />
                        <MyTextInput placeholder={"Venue"} name={"venue"} />
                        <Button
                            disabled={!isValid || isSubmitting || !dirty}
                            floated={"right"}
                            positive
                            type={"submit"}
                            content={"Submit"}
                            loading={loading}
                        />
                        <Button
                            as={Link}
                            to={"/activities"}
                            floated={"right"}
                            type={"button"}
                            content={"Cancel"}
                        />
                </Form>)}
            </Formik>

        </Segment>
    )
})