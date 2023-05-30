import User from '../models/User.js';


export const getUserById = async (req, res) => {
  const userId = req.params.id;
  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).send('Usuario no encontrado');
    }
    res.send(user);
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
