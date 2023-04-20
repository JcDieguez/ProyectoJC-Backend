import UserRepository from "../dao/repository/UserRepository.js";

const userRepository = new UserRepository();

export const renderEditProfile = async (req, res) => {
  try {
    const userId = req.session.user.id;
    const user = await userRepository.getUserById(userId); // Cambiar findById por getUserById
    res.render('editProfile', { user });
  } catch (error) {
    console.error(error);
    res.status(500).send('Error al obtener el perfil del usuario');
  }
};

export const getUserById = async (req, res) => {
  const userId = req.params.id;
  try {
    const user = await userRepository.getUserById(userId); // Cambiar findById por getUserById
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
    const user = await userRepository.getUserById(userId);
    user.setName(name);
    user.setEmail(email);
    user.setBio(bio);
    await userRepository.update(user);
    res.redirect('/welcome');
  } catch (error) {
    console.error(error);
    res.status(500).send('Error al guardar los datos del perfil');
  }
};
