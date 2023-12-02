import {makeAutoObservable, runInAction} from "mobx";
import {v4 as uuid} from "uuid";

import {Activity} from "../models/activity.ts";
import agent from "../api/agent.ts";

export default class ActivityStore {
    activityRegistry = new Map<string, Activity>();
    selectedActivity: Activity | undefined = undefined;
    editMode = false;
    loading = false;
    loadingInitial = true;

    constructor() {
        makeAutoObservable(this)
    }


    get activitiesByDate () {
        return Array.from(this.activityRegistry.values()).sort((a, b)=> Date.parse(a.date) - Date.parse(b.date));
    }

    loadActivities = async (): Promise<void> => {
        this.setLoadingInitial(true);
        try {
            const activities = await agent.Activities.list();
            activities.forEach((activity: Activity) => {
                activity.date = activity.date.split("T")[0];
                this.activityRegistry.set(activity.id, activity);
            })
            this.setLoadingInitial(false);
        } catch (e) {
            console.log(e);
            this.setLoadingInitial(false);
        }
    }

    setLoadingInitial = (state: boolean): void => {
        this.loadingInitial = state;
    }

    selectActivity = (id: string) => {
        this.selectedActivity = this.activityRegistry.get(id);
    }

    cancelSelectedActivity = () => {
        this.selectedActivity = undefined;
    }

    openForm = (id?: string): void => {
        id ? this.selectActivity(id) : this.cancelSelectedActivity();
        this.editMode = true;
    }

    closeForm = (): void => {
        this.editMode = false;
    }

    createActivity = async (activity: Activity): Promise<void> => {
        this.loading = true;
        activity.id = uuid();
        try {
            await agent.Activities.create(activity);
            runInAction(()=>{
                this.activityRegistry.set(activity.id, activity);
                this.selectedActivity = activity;
                this.editMode = false;
                this.loading = false;
            })
        } catch (e) {
            console.log(e);
            runInAction(()=>{
                this.editMode = false;
                this.loading = false;
            })
        }
    }

    updateActivity = async (activity: Activity): Promise<void> => {
        this.loading = true;
        try {
            await agent.Activities.update(activity);
            runInAction(()=>{
                this.activityRegistry.set(activity.id, activity);
                this.selectedActivity = activity;
                this.editMode = false;
                this.loading = false;
            })
        } catch (e) {
            console.log(e);
            runInAction(()=>{
                this.editMode = false;
                this.loading = false;
            })
        }
    }

    deleteActivity = async (id: string): Promise<void> => {
        this.loading = true;
        try {
            await agent.Activities.delete(id);
            runInAction(()=>{
                this.activityRegistry.delete(id)
                if(this.selectedActivity?.id === id) {
                    this.cancelSelectedActivity();
                }
                this.loading = false;
            })
        } catch (e) {
            console.log(e);
            runInAction(()=>{
                this.loading = false;
            })
        }
    }
}