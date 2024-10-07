SELECT DISTINCT c.nombre, c.apellidos
FROM Cliente c
JOIN Inscripcion i ON c.id = i.idCliente
JOIN Producto p ON i.idProducto = p.id
JOIN Disponibilidad d ON p.id = d.idProducto
JOIN Visitan v ON c.id = v.idCliente AND d.idSucursal = v.idSucursal
WHERE d.idSucursal = v.idSucursal;
