// URL: Get /
const index = (req, res) => {
  // Calculando emoji
  const emojieDataset = [
    '😉',
    '😃',
    '🎅',
    '🏆',
    '💓',
    '🎁',
    '🎈',
    '🍕',
    '🍏',
    '🚗',
  ];
  const emojie =
    emojieDataset[Math.floor(Math.random() * emojieDataset.length)];
  // View-Models
  const viewModel = {
    title: 'Index Controller Working!!!',
    author: 'Ernest Rodriguez',
    emojie,
  };
  res.render('index', viewModel);
};

export default {
  // Action Methods
  index,
};
