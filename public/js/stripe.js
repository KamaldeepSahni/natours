import axios from 'axios';
import { showAlert } from './alerts';

const stripe = Stripe(
  'pk_test_51IAdidG01QBreGydOHkAHcKOqSLeW3XMkPzpKukS1fEQOH7Z6WIUfi4V5vdWKX92FMhnSS5hPtDvb5WUTCon14cs00V0aEMeh1'
);

export const bookTour = async tourId => {
  try {
    // Get checkout session from the server
    const session = await axios(
      `http://localhost:5000/api/v1/bookings/checkout-session/${tourId}`
    );
    console.log(session);

    // Create checkout from + charge credit card
    await stripe.redirectToCheckout({
      sessionId: session.data.session.id,
    });
  } catch (err) {
    console.error(err);
    showAlert('error', err);
  }
};
