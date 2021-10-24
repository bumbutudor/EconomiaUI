import moveButtonToRight from './settings/moveButtonToRight.js';
import dispatchSortItems from './settings/dispatchSortItems.js';
// import CardItem from './settings/CardItem.js';

app.initializers.add('tudor/economia-ui', () => {
  moveButtonToRight();
  dispatchSortItems();
  // CardItem();
});
