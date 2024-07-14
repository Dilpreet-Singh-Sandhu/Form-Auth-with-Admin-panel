import { Form } from "../models/FormSchema.js";
import {asyncHandler} from "../utlis/asyncHandler.js";

const createForm = asyncHandler(async (req, res) => {
	const { title, description, userId } = req.body;

	const form = await Form.create({ title, description, userId });

	res.status(201).json({
		success: true,
		data: form,
	});
});

const getForms = asyncHandler(async (req, res) => {
	const forms = await Form.find();

	res.status(200).json({
		success: true,
		data: forms,
	});
});

const getFormById = asyncHandler(async (req, res) => {
	const form = await Form.findById(req.params.id);

	if (!form) {
		res.status(404);
		throw new Error("Form not found");
	}

	res.status(200).json({
		success: true,
		data: form,
	});
});

const updateForm = asyncHandler(async (req, res) => {
	const { title, description, userId } = req.body;

	const form = await Form.findByIdAndUpdate(
		req.params.id,
		{ title, description, userId },
		{
			new: true,
			runValidators: true,
		}
	);

	if (!form) {
		res.status(404);
		throw new Error("Form not found");
	}

	res.status(200).json({
		success: true,
		data: form,
	});
});

const deleteForm = asyncHandler(async (req, res) => {
	const form = await Form.findByIdAndDelete(req.params.id);

	if (!form) {
		res.status(404);
		throw new Error("Form not found");
	}

	res.status(200).json({
		success: true,
		message: "Form deleted successfully",
	});
});

export { createForm, getForms, getFormById, updateForm, deleteForm };
