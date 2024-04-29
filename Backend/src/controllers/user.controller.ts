import { Response } from "express";
import { StatusCodes } from "http-status-codes";
import prisma from "../db/prisma.client";
import { Req } from "../services/post.service";
import {
	handleDeleteUser,
	handleEditUser,
	handleFollowUser,
	handleGetAllUsers,
	handleGetUser,
} from "../services/user.service";

export const getUsers = async (req: Req, res: Response) => {
	const users = await handleGetAllUsers(req);
	res.json({ count: users.length, data: users }).status(StatusCodes.OK);
};

export const getUser = async (req: Req, res: Response) => {
	const { id } = req.params;
	const user = await handleGetUser(id);
	return res.json({ message: "success", data: user }).status(StatusCodes.OK);
};

export const editUser = async (req: Req, res: Response) => {
	const user = await handleEditUser(req);
	return res
		.json({ message: "success", data: user })
		.status(StatusCodes.CREATED);
};

export const activeUser = async (req: Req, res: Response) => {
	const user = await prisma.user.findUnique({
		where: { id: req.user.id },
		select: {
			id: true,
			username: true,
			profilePicture: true,
			email: true,
			role: true,
		},
	});
	return res.json({ message: "success", data: user }).status(StatusCodes.OK);
};

export const deleteUser = async (req: Req, res: Response) => {
	const user = handleDeleteUser(req);
	return res.json({ message: "success" }).status(StatusCodes.NO_CONTENT);
};

export const followUser = async (req: Req, res: Response) => {
	return res.json(await handleFollowUser(req));
};
