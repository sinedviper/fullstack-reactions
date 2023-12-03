import {Fragment} from "react";
import {Segment, Header} from "semantic-ui-react"

import {useStore} from "../../../app/stores/store.ts";
import {observer} from "mobx-react-lite";
import ActivitiesListItem from "./ActivitiesListItem.tsx";

export default observer(function ActivityList () {
    const {activityStore} = useStore();
    const { groundedActivities } = activityStore

    return (
        <>
            {groundedActivities.map(([group, activities], key) =>
                (<Fragment key={key}>
                    <Header sub color="teal">
                        {group}
                    </Header>
                    <Segment>
                        {activities.map((activity)=> (<ActivitiesListItem key={activity.id} activity={activity} />))}
                    </Segment>
                </Fragment>)
            )}
        </>
    )
})