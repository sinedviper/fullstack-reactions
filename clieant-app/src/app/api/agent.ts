import axios, { AxiosResponse } from "axios";
import { Activity } from "../models/activity";

const sleep = (delay: number) => {
    return new Promise((resolve)=> {
        setTimeout(resolve, delay);
    })
}

axios.defaults.baseURL = "http://localhost:5000/api";

// @ts-ignore
axios.interceptors.response.use(async res => {
    try {
        await sleep(1000)
        return res
    } catch(err) {
        console.error;
        return Promise.reject(err);
    }
})

const responseBody = (response:AxiosResponse) => response.data;

const request = {
    get: <T> (url: string) =>  axios.get<T>(url).then(responseBody),
    post: <T> (url: string, body: {}) =>  axios.post<T>(url, body).then(responseBody),
    put: <T> (url: string, body: {}) =>  axios.put<T>(url, body).then(responseBody),
    del: <T> (url: string) =>  axios.delete<T>(url).then(responseBody)
}

const Activities = {
    list: () => request.get<Activity[]>("/activities"),
    details: (id: string) => request.get<Activity[]>(`/activities/${id}`),
    create: (activity: Activity) => axios.post<void>("/activities", activity),
    update: (activity: Activity) => axios.put<void>(`/activities/${activity.id}`, activity),
    delete: (id: string) => axios.delete<void>(`/activities/${id}`),
}

const agent = {
    Activities
}

export default agent;