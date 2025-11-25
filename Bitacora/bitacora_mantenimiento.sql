create database bitacora_mantenimiento;
use bitacora_mantenimiento;

create table bitacora(
	id int auto_increment primary key,
    fecha_hora datetime not null,
    area_sector varchar(255) not null,
    punto_control varchar(255) not null,
    estado enum('OK','Fallo') not null,
    observaciones text,
    seguimiento_requerido enum('Sí', 'No') not null,
    inspector_operador varchar(255) not null,
    created_at timestamp default current_timestamp,
    updated_at timestamp default current_timestamp on update current_timestamp
);

insert into bitacora(
	fecha_hora, 
	area_sector, 
	punto_control, 
	estado, observaciones, 
	seguimiento_requerido, 
	inspector_operador) 
values('2024-01-15 08:30:00', 
	'Línea de Producción A', 
	'Nivel de aceite en caja de engranajes', 
	'OK', 
	'Nivel dentro del rango normal', 
	'No', 
	'Juan Pérez'),

	('2024-01-15 09:15:00', 
	'Área de Empaque', 
	'Presión de aire en compresor', 
	'Fallo', 
	'Presión por debajo del mínimo requerido', 
	'Sí', 
	'María García'),
	('2024-01-15 10:00:00', 
	'Sala de Máquinas', 
	'Temperatura de operación', 
	'OK', 
	'Temperatura estable en 75°C', 
	'No', 
	'Carlos López');