import axios from 'axios';
import { showAlert } from './alerts';

export const signup = async (name, email, password, passwordConfirm) => {
  try {
    const res = await axios({
      method: 'POST',
      url: 'http://localhost:5000/api/v1/users/signup',
      data: {
        name,
        email,
        password,
        passwordConfirm,
      },
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
    });

    if (res.data.status === 'success') {
      showAlert('success', 'Sign up successfull!');
      window.setTimeout(() => {
        location.assign('/');
      }, 1500);
    }
  } catch (err) {
    showAlert('error', err.response.data.message);
  }
};
