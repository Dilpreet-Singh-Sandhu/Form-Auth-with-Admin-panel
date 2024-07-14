import express from 'express';
import { createForm, getForms, getFormById, updateForm, deleteForm } from '../controllers/FormController.js';

const FormRoutes = express.Router();

// POST /api/v1/forms/new
FormRoutes.post('/new', createForm);

// GET /api/v1/forms
FormRoutes.get('/', getForms);

// GET /api/v1/forms/:id
FormRoutes.get('/:id', getFormById);

// PUT /api/v1/forms/:id
FormRoutes.put('/:id', updateForm);

// DELETE /api/v1/forms/:id
FormRoutes.delete('/:id', deleteForm);

export default FormRoutes;
