import home from '../public/assets/icons/home.svg';
import create from '../public/assets/icons/create-new.svg';
import people from '../public/assets/icons/people.svg';
import saved from '../public/assets/icons/save-2.svg';
import liked from '../public/assets/icons/heart.svg';

export const sideBarLinks = [
    {
        icon: home,
        route: '/',
        label: 'Home',
    },
    {
        icon: create,
        route: '/create-post',
        label: 'Create Post',
    },
    {
        icon: people,
        route: '/people',
        label: 'People',
    },
    {
        icon: saved,
        route: '/saved-posts',
        label: 'Saved Posts',
    },
    {
        icon: liked,
        route: '/liked-posts',
        label: 'Liked Posts',
    },
];

export const pageTitles = [
    {
        url: '/',
        title: 'Feed',
    },
    {
        url: '/create-post',
        title: 'Create Post',
    },
    {
        url: '/saved-posts',
        title: 'Saved Posts',
    },
    {
        url: '/liked-posts',
        title: 'Liked Posts',
    },
    {
        url: '/edit-posts',
        title: 'Edit Post',
    },
    {
        url: '/people',
        title: 'People',
    },
];

export const tabs = [
    {
        link: 'posts',
        name: 'Posts',
    },
    {
        link: 'followers',
        name: 'Followers',
    },
    {
        link: 'followings',
        name: 'Followings',
    },
];
