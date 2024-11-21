const long_months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

const short_months = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
];

export const convert_to_full_date = date => {
  let dateArray = date.split('-');
  return (
    dateArray[2] +
    ' ' +
    long_months[parseInt(dateArray[1], 10) - 1] +
    ', ' +
    dateArray[0]
  );
};

export const convert_to_short_date = date => {
  let dateArray = date.split('-');
  return (
    dateArray[2] +
    ' ' +
    short_months[parseInt(dateArray[1], 10) - 1] +
    ', ' +
    dateArray[0]
  );
};
