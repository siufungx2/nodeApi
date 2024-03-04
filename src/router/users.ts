import express from 'express';
import { deleteUser, getAllUsers, updateUser } from '@/controllers/users';
import { isAuthentricated, isOwner } from '@/middlewares';

export default (router: express.Router) => {
    router.get('/users', isAuthentricated, getAllUsers);
    router.delete('/users/:id', isAuthentricated, isOwner, deleteUser);
    router.patch('/users/:id', isAuthentricated, isOwner, updateUser);
}