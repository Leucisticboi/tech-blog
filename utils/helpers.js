// Define helper functions
module.exports = {
  // Format the time
  format_time: (date) => {
    return date.toLocaleTimeString();
  },
  // Format the date
  format_date: (date) => {
    return `${new Date(date).getMonth() + 1}/${new Date(date).getDate()}/${new Date(date).getFullYear() + 5}`;
  },
  // Format posts to limit the content when displayed on the homepage or dashboard
  shortPost: str => {
    if (typeof str === 'string') {
      const first100 = str.slice(0, 100);
      return first100;
    }
    return 'No content available';
  },
  // Compare two values within handlebars
  equal: (lvalue, rvalue, options) => {
    if (arguments.length < 3) {
      throw new Error('Helper needs 2 parameters');
    }
    if (lvalue != rvalue) {
      return options.inverse(this);
    } else {
      return options.fn(this);
    }
  }
};

