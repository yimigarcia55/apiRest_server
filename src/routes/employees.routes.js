import { Router } from "express";
import { getEmployees, createEmployee, updateEmployee, deleteEmployee, getEmployeeById, updatePartialEmployee } from "../controllers/employees.controllers.js";

const router = Router();

router.get('/employees', getEmployees);
router.get('/employees/:id', getEmployeeById);
router.post('/employees', createEmployee);
router.put('/employees/:id', updateEmployee); 
router.patch('/employees/:id', updatePartialEmployee); 
router.delete('/employees/:id', deleteEmployee);

export default router;