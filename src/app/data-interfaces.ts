import * as firebase from 'firebase/app';
import 'firebase/firestore';

export interface Job {
    title: string;
    company: string;
    department: string;
    description: string;
    start: firebase.firestore.Timestamp;
    end: firebase.firestore.Timestamp;
    current: true;
}

export interface Project {
    name: string;
    description: string;
    status: string;
    source: string;
    techStack: string[];
    date: firebase.firestore.Timestamp;
}

export interface Skill {
    name: string;
    proficiency: string;
}