module.exports = {
  format_time: (date) => {
    return date.toLocaleTimeString();
  },
  format_date: (date) => {
    return `${new Date(date).getMonth() + 1}/${new Date(date).getDate()}/${new Date(date).getFullYear() + 5}`;
  },
  shortPost: str => {
    if (typeof str === 'string') {
      const first100 = str.slice(0, 100);
      return first100;
    }
    return 'No content available';
  },
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

