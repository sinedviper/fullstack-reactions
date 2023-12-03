import { SyntheticEvent, useState } from "react";
import {Button, Icon, Item, Segment} from "semantic-ui-react";
import {Link} from "react-router-dom";
import {observer} from "mobx-react-lite";

import {Activity} from "../../../app/models/activity.ts";
import {useStore} from "../../../app/stores/store.ts";

interface Props {
    activity: Activity
}

export default observer(function ActivitiesListItem({activity}:Props) {
    const {activityStore} = useStore();
    const {loading, deleteActivity} = activityStore;

    const [target, setTarget] = useState("");

    function handleActivityDelete(e: SyntheticEvent<HTMLButtonElement>, id: string): void {
        setTarget(e.currentTarget.name);
        deleteActivity(id);
    }

    return (
        <Segment.Group>
            <Segment>
                <Item.Group>
                    <Item>
                        <Item.Image size={"tiny"} circular src={"/assets/user.png"} />
                        <Item.Content>
                            <Item.Header as={Link} to={`/activities/${activity.id}`}>
                                {activity.title}
                            </Item.Header>
                        </Item.Content>
                    </Item>
                </Item.Group>
            </Segment>
            <Segment>
                <span>
                    <Icon name={"clock"} /> {activity.date}
                    <Item name={"marker"} /> {activity.venue}
                </span>
            </Segment>
            <Segment secondary>
                Attendees go here
            </Segment>
            <Segment clearing>
                <span>{activity.description}</span>
                <Button as={Link} to={`/activities/${activity.id}`} color={"teal"} floated={"right"} content={"View"} />
            </Segment>
        </Segment.Group>
    )
})