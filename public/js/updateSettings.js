import axios from 'axios';
import { showAlert } from './alerts';

export const updateSettings = async (data, type) => {
  try {
    const url =
      type === 'password'
        ? '/api/v1/users/update-password'
        : '/api/v1/users/update-me';

    const res = await axios({
      method: 'PATCH',
      url,
      data,
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
    });

    if (res.data.status === 'success') {
      showAlert(
        'success',
        `${
          [...type][0].toUpperCase() + [...type].slice(1).join('')
        } updated successfully!`
      );
    }
  } catch (err) {
    showAlert('error', err.response.data.message);
  }
};
