import User from '../models/User.js'; // Importamos el modelo de usuario

export const renderEditProfile = async (req, res) => {
  try {
    const userId = req.session.user.id;
    const user = await User.findById(userId);
    res.render('edit-profile', { user }); // Renderizamos la vista con los datos del usuario
  } catch (error) {
    console.error(error);
    res.status(500).send('Error al obtener el perfil del usuario');
  }
};

export const getUserById = async (req, res) => {
  const userId = req.params.id; // Obtener el ID del usuario desde los parámetros de la solicitud
  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).send('Usuario no encontrado');
    }
    res.send(user); // Devolver el usuario como respuesta
  } catch (error) {
    console.error(error);
    res.status(500).send('Error al obtener el usuario');
  }
};


export const updateProfile = async (req, res) => {
  const { name, email, bio } = req.body;
  const userId = req.session.user.id;

  try {
    const user = await User.findById(userId);
    user.name = name;
    user.email = email;
    user.bio = bio;
    await user.save();
    res.redirect('/welcome');
  } catch (error) {
    console.error(error);
    res.status(500).send('Error al guardar los datos del perfil');
  }
};
