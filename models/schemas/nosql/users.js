const usersSchema = {
	username: { type: String, required: true }, // -> Email del usuario
	password: { type: String, required: true },
	nombre: { type: String, required: true },
	direccion: { type: String, required: true },
	edad: { type: Number, required: true },
	telefono: { type: Number, required: true },
	foto: { type: String, required: true },
	administrator: { type: Boolean, required: true }
};

module.exports = usersSchema;