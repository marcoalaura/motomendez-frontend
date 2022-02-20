'use strict';

const DatetimeFilter = Datetime => {
    'ngInject';

    return (date, format) => {

        if (format) {
            if (format == 'literal') {
                return Datetime.dateLiteral(date);
            }
            if (format == 'year') {
                return Datetime.now('YYYY');
            }
            if (format == 'timeLiteral') {
                return Datetime.timeLiteral(date);
            }
            if (format == 'convert') {
                return Datetime.toString(date);
            }
        }

        return date;
    };
};

export default DatetimeFilter;