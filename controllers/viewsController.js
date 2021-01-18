const Tour = require('../models/tourModel');
const Booking = require('../models/bookingModel');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

exports.getOverview = catchAsync(async (req, res, next) => {
  // Get data from collection
  const tours = await Tour.find();

  // Build template and then render the page
  res
    .set('Content-Security-Policy', 'script-src-elem https: data: http: data:')
    .status(200)
    .render('overview', {
      title: 'All Tours',
      tours,
    });
});

exports.getTour = catchAsync(async (req, res, next) => {
  // Get data from collection and populate reviews
  const tour = await Tour.findOne({ slug: req.params.slug }).populate({
    path: 'reviews',
    fields: 'review rating user',
  });

  if (!tour) {
    return next(new AppError('No tour found with that name', 404));
  }

  // Build template and render the page
  res
    .set('Content-Security-Policy', 'script-src-elem https: data: http: data:')
    .status(200)
    .render('tour', {
      title: tour.name,
      tour,
    });
});

exports.getLoginForm = (req, res) => {
  res
    .set('Content-Security-Policy', 'script-src-elem https: data: http: data:')
    .status(200)
    .render('login', {
      title: 'Login',
    });
};

exports.getSignupForm = (req, res) => {
  res
    .set('Content-Security-Policy', 'script-src-elem https: data: http: data:')
    .status(200)
    .render('signup', {
      title: 'Signup',
    });
};

exports.getAccount = (req, res) => {
  res
    .set('Content-Security-Policy', 'script-src-elem https: data: http: data:')
    .status(200)
    .render('account', {
      title: 'Your Account',
    });
};

exports.getMyTours = catchAsync(async (req, res, next) => {
  // Find all bookings
  const bookings = await Booking.find({ user: req.user.id });

  // Find tours with returned IDs
  const tourIds = bookings.map(el => el.tour);
  const tours = await Tour.find({ _id: { $in: tourIds } });

  res
    .set('Content-Security-Policy', 'script-src-elem https: data: http: data:')
    .status(200)
    .render('overview', {
      title: 'My Tours',
      tours,
    });
});
