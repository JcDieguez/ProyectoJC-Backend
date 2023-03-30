import User from '../models/User.js';

export const renderEditProfile = (req, res) => {
  res.render('editProfile', { user: req.user });
};

export const updateProfile = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email) {
      throw new Error('Debe proporcionar un nombre y un email');
    }

    const user = await User.findOne({ _id: req.user._id });

    if (!user) {
      throw new Error('No se encontró el usuario');
    }

    user.name = name;
    user.email = email;

    if (password) {
      user.password = password;
    }

    await user.save();

    res.redirect('/welcome');
  } catch (error) {
    console.error(error);
    res.status(500).send('Error al actualizar el perfil');
  }
};
