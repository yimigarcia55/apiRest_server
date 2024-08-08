import { pool } from '../db.js'

export const getEmployees = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM employee')
    res.json(rows)
  } catch (error) {
    return res.status(500).json({ message: 'Error al obtener los empleados', error: error.message })
  }
}

export const getEmployeeById = async (req, res) => {
  const { id } = req.params
  try {
    const [rows] = await pool.query('SELECT * FROM employee WHERE id = ?', [id])
    if (rows.length == 0) {
      return res.status(404).json({ message: 'Empleado no encontrado' })
    }
    res.json(rows)
  } catch (error) {
    return res.status(500).json({ message: 'Error al obtener el empleado', error: error.message })
  }
}

export const createEmployee = async (req, res) => {
  const { name, salary } = req.body
  try {
    const [rows] = await pool.query('INSERT INTO employee (name, salary) VALUES (?,?)', [name, salary])

    if (rows.affectedRows == 0) {
      return res.status(400).json({ message: 'No se pudo insertar el empleado' })
    }

    res.status(201).send({
      id: rows.insertId,
      name,
      salary,
    })
  } catch (error) {
    return res.status(500).json({ message: 'Error al crear el empleado', error: error.message })
  }
}

export const updateEmployee = async (req, res) => {
  const { id } = req.params
  try {
    const { name, salary } = req.body

    const rows = await pool.query('UPDATE employee SET name = ?, salary = ? WHERE id = ?', [name, salary, id])
    if (rows.affectedRows == 0) {
      return res.status(404).json({ message: 'Empleado no encontrado' })
    }
    res.status(204).send()
  } catch (error) {
    return res.status(500).json({ message: 'Error al actualizar el empleado', error: error.message })
  }
}

export const updatePartialEmployee = async (req, res) => {
  const { id } = req.params
  try {
    const { name, salary } = req.body

    const [rows] = await pool.query(
      'UPDATE employee SET name = IFNULL(?, name), salary = IFNULL(?, salary) WHERE id = ?',
      [name, salary, id]
    )
    if (rows.affectedRows == 0) {
      return res.status(404).json({ message: 'Empleado no encontrado' })
    }
    res.status(204).send()
  } catch (error) {
    return res.status(500).json({ message: 'Error al actualizar el empleado', error: error.message })
  }
}

export const deleteEmployee = async (req, res) => {
  const { id } = req.params
  try {
    const [rows] = await pool.query('DELETE FROM employee WHERE id = ?', [id])

    if (rows.affectedRows == 0) {
      return res.status(404).json({ message: 'Empleado no encontrado' })
    }

    res.status(204)
  } catch (error) {
    return res.status(500).json({ message: 'Error al eliminar el empleado', error: error.message })
  }
}
