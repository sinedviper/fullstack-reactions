import { Card, Image, Button } from "semantic-ui-react";
import {useStore} from "../../../app/stores/store.ts";
import {Link, useParams} from "react-router-dom";
import {useEffect} from "react";
import LoadingComponent from "../../../app/layout/LoadingComponent.tsx";
import {observer} from "mobx-react-lite";

export default observer(function ActivityDetails() {
    const {id} = useParams();
    const {activityStore} = useStore();
    const {selectedActivity, loadActivity, loadingInitial} = activityStore

    useEffect(() => {
        if(id) {
            loadActivity(id);
        }
    }, [id, loadActivity]);

    if(loadingInitial || !selectedActivity) return <LoadingComponent />;

    return (
        <Card fluid >
            <Image src={`/assets/categoryImages/${selectedActivity.category}.jpg`} />
            <Card.Content>
                <Card.Header>{selectedActivity.title}</Card.Header>
                <Card.Meta>
                    <span>{selectedActivity.date}</span>
                </Card.Meta>
                <Card.Description>{selectedActivity.description}</Card.Description>
            </Card.Content>
            <Card.Content extra>
                <Button.Group widths={"2"}>
                    <Button
                        as={Link}
                        to={`/manage/${selectedActivity.id}`}
                        basic 
                        color={"blue"} 
                        content={"Edit"} 
                    />
                    <Button
                        as={Link}
                        to={`/activities`}
                        basic 
                        color={"grey"} 
                        content={"Cancel"} 
                    />
                </Button.Group>
            </Card.Content>
        </Card>
    )
})