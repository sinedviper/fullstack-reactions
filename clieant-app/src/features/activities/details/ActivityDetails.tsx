import { Card, Image, Button } from "semantic-ui-react";
import {useStore} from "../../../app/stores/store.ts";

export default function ActivityDetails() {
    const {activityStore} = useStore();
    const {cancelSelectedActivity, openForm, selectedActivity} = activityStore

    if(!selectedActivity) return;

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
                        onClick={() => openForm(selectedActivity.id)}
                        basic 
                        color={"blue"} 
                        content={"Edit"} 
                    />
                    <Button 
                        onClick={cancelSelectedActivity}
                        basic 
                        color={"grey"} 
                        content={"Cancel"} 
                    />
                </Button.Group>
            </Card.Content>
        </Card>
    )
}