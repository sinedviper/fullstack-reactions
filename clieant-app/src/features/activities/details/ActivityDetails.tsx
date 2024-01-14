import { Grid } from 'semantic-ui-react'
import { useStore } from '../../../app/stores/store.ts'
import { useParams } from 'react-router-dom'
import { useEffect } from 'react'
import LoadingComponent from '../../../app/layout/LoadingComponent.tsx'
import { observer } from 'mobx-react-lite'
import ActivityDetailedHeader from './ActivityDetailedHeader.tsx'
import ActivityDetailedInfo from './ActivityDetailedInfo.tsx'
import ActivityDetailedChat from './ActivityDetailedChat.tsx'
import ActivityDetailedSidebar from './ActivityDetailedSidebar.tsx'

export default observer(function ActivityDetails() {
    const { id } = useParams()
    const { activityStore } = useStore()
    const { selectedActivity, loadActivity, loadingInitial } = activityStore

    useEffect(() => {
        if (id) {
            loadActivity(id)
        }
    }, [id, loadActivity])

    if (loadingInitial || !selectedActivity) return <LoadingComponent />

    return (
        <Grid>
            <Grid.Column width={10}>
                <ActivityDetailedHeader activity={selectedActivity} />
                <ActivityDetailedInfo activity={selectedActivity} />
                <ActivityDetailedChat />
            </Grid.Column>
            <Grid.Column width={6}>
                <ActivityDetailedSidebar activity={selectedActivity} />
            </Grid.Column>
        </Grid>
    )
})
