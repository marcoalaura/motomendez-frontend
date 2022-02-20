'use strict';

class DatetimeService {

    constructor(Util, ArrayUtil) {
        "ngInject";

        this.Util = Util;
        this.ArrayUtil = ArrayUtil;

        this.formatDate = 'dd/MM/YYYY';
        this.months = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
        this.days = ["dom", "lun", "mar", "mié" , "jue", "vie" , "sáb"];
        this.dayslong = ["Domingo", "Lunes", "Martes", "Miércoles" , "Jueves", "Viernes" , "Sábado" ];
    }

    // TODO: Verificar si esto funciona
    date(date, separator) { 
        date = date.split(separator || '-');
        return new Date(date[0],date[1]-1,date[2]);
    }

    parse(date, separator) {
        return [date.getFullYear(), date.getMonth()+1, date.getDate()].join(separator || '-');
    }

    dateMonth() {
        var date = new Date();
        return new Date(date.getFullYear(), date.getMonth(), 1);
    }

    getPrevDateMonth(data) {
        data = data || 1;
        var date = new Date();
        var day = date.getDate();
        var month = date.getMonth();
        var year = date.getFullYear();

        if (day < data) {
            month--;
            if (month < 0) {
                month = 11;
                year--;
            }
        }
        return new Date(year, month, data);
    }

    toString(date) {
        if (this.Util.toType(date) == 'string') {                        
            let pos = date.indexOf('T');
            if (pos != -1 && pos <= 10 && pos >= 8) {
                let fecha = date.substring(0, pos);
                if (!/[a-zA-Z]+/g.test(fecha) && /^-?[0-9.]+\-?[0-9]+\-?[0-9]*$/g.test(fecha)) {
                    fecha = fecha.split('-');
                    return this.format(new Date(fecha[0], parseInt(fecha[1]) - 1, fecha[2]));
                }
            }
        } else {
            if (this.Util.toType(date) == 'date') {
                return this.format(new Date(date));
            }
        }
        return date;
    }

    toDate(string) {
        if (this.Util.toType(string) == 'string') {                        
            let pos = string.indexOf('T');
            if (pos != -1 && pos <= 10 && pos >= 8) {
                let fecha = string.substring(0, pos);
                if (!/[a-zA-Z]+/g.test(fecha) && /^-?[0-9.]+\-?[0-9]+\-?[0-9]*$/g.test(fecha)) {
                    fecha = fecha.split('-');
                    return new Date(fecha[0], parseInt(fecha[1]) - 1, fecha[2]);
                }
            }
        }
        return string;
    }

    isDate (date) {
        if (this.Util.toType(date) == 'string') {
            date = this.convert(date);
        }
        return this.isValid(date);
    }

    isValid (date) {
        if (this.Util.toType(date) != 'date')
            return false;
        return !isNaN(date.getTime());
    }

    isLessThan (date) {
        return this.milliseconds(date) < (new Date()).getTime();
    }

    isLessThanDays (date, data) {
        return this.milliseconds(date) > this.subtractDays(new Date(), data);
    }

    isGreaterThan (date) {
        return this.milliseconds(date) > (new Date()).getTime();
    }

    isGreaterThanDays (date, data) {
        return this.milliseconds(date) < this.addDays(new Date(), data);
    }

    addDays (date, days) {
        return this.milliseconds(date) + (days || 0)*24*60*60*1000;
    }

    subtractDays (date, days) {
        return this.milliseconds(date) - (days || 0)*24*60*60*1000;
    }

    diff (date2, date1) {
        return this.milliseconds(date2) - this.milliseconds(date1);
    }

    milliseconds (date) {
        if (this.Util.toType(date) == 'string') {
            date = this.convert(date);
        }
        return date.getTime();
    }

    convert (date) {
        date = date.split('/');
        return this.formatDate == 'dd/MM/YYYY' ? new Date(date[2], date[1]-1, date[0]) : 
        this.formatDate == 'MM/dd/YYYY' ? new Date(date[2], date[0]-1, date[1]) : 
        new Date(date[0], date[1]-1, date[2]);
    }

    setFormatDate (format) {
        this.formatDate = format;
    }    

    now (format) {
        return this.replace(new Date(), format || this.formatDate);
    }

    dateLiteral (date) {
        return this.format(date, 'dd de MMM del YYYY');
    }

    time (date) {
        return this.format(date, 'HH:mm');
    }

    timeLiteral(time, txt) {
        var text = '';
        if (typeof time == 'number') {
            if (time === 0) {
                return '';
            }
            if (time < 60) {
                text = time + 's';                  
            } else if (time < 3600) {
                text = Math.floor(time / 60) + 'm ' + (time % 60 > 0 ? (time % 60 + 's') : '');
            } else {
                text = Math.floor(time / 3600) + 'h ' + (time % 3600 > 0 ? (Math.floor(time / 60) + 'm ') : '') + (time % 60 > 0 ? (time % 60 + 's') : '');
            }
            return (txt || '') + text;
        } else {
            if (time.length === 0) {
                return '';
            }
            time = time.split(':');
            var hours = time[0],
                minutes = time[1];
            
            if (parseInt(hours) > 0) {
                text += parseInt(hours) + 'h ';
            }
            if (parseInt(minutes) > 0) {
                text += parseInt(minutes) + 'm ';
            }
            if (time.length == 3 && parseInt(time[2]) > 0) {
                text += parseInt(time[2]) + 's' ;
            }

            return (txt || '') + text;
        }
    }

    getSeconds(time) {
        time = time.split(':');
        var hours = time[0],
            minutes = time[1],
            total = 0;

        if (parseInt(hours) > 0) {
            total += parseInt(hours)*3600;
        }
        if (parseInt(minutes) > 0) {
            total += parseInt(minutes)*60;
        }
        if (time.length == 3 && parseInt(time[2]) > 0) {
            total += parseInt(time[2]);
        }

        return total;
    }

    datetimeLiteral (date) {
        return this.format(date, 'dddd dd de MMM del YYYY a la(s) HH:mm');
    }

    format (date, format) {
        var d = new Date(date);
        if (this.isDate(d)) {
            return this.replace(d, format || this.formatDate);
        }
        return date;
    }

    standar (date, format) {
        if (date) {
            var type = this.Util.toType(date);
            if (type == 'date') {
                return date;
            }
            var day, month, year;
            if (type == 'string') {
                format = format || this.formatDate;
                var separator = date.indexOf('/') != -1 ? '/' : '-';
                date = date.split(separator);
                
                if (format == 'dd-MM-YYYY' || format == 'dd/MM/YYYY') {
                    day = date[0];
                    month = date[1]-1;
                    year = date[2];
                }
                
                if (format == 'MM-dd-YYYY' || format == 'MM/dd/YYYY') {
                    day = date[1];
                    month = date[0]-1;
                    year = date[2];
                }
                
                if (format == 'YYYY-MM-dd' || format == 'YYYY/MM/dd') {
                    day = date[2];
                    month = date[1]-1;
                    year = date[0];
                }
                
                if (format == 'YYYY-dd-MM' || format == 'YYYY/dd/MM') {
                    day = date[1];
                    month = date[2]-1;
                    year = date[0];
                }
            }
            return new Date(year, month, day);
        }
        return null;
    }

    replace (date, format) {
        format = format || this.formatDate;
        date = this.standar(date, format);
        var monthLiteral = format.indexOf('MMM') != -1;
        return this.ArrayUtil.replace(format, [
            "dddd", "ddd", "dd", monthLiteral ? 'MMM' : 'MM', 'YYYY', 'HH', 'mm', 'ss'
        ], [
            this.dayslong[date.getDay()],
            this.days[date.getDay()],
            (date.getDate() < 10 ? '0' : '') + date.getDate(), 
            monthLiteral ? this.months[date.getMonth()] : ((date.getMonth() + 1 < 10 ? '0' : '') + (date.getMonth() + 1)), 
            date.getFullYear(), 
            (date.getHours() < 10 ? '0' : '') + date.getHours(), 
            (date.getMinutes() < 10 ? '0' : '') + date.getMinutes(), 
            (date.getSeconds() < 10 ? '0' : '') + date.getSeconds()
        ]);
    }

    last (date) {
        let now = new Date();
        let days = this.daysBetweenTwoDates(date, now);
        if (days > 31) {
            return this.dateLiteral(date);
        } else {
            if (days > 7) {
                var weeks = parseInt(days / 7);
                return 'Hace ' + weeks + ' semana' + (weeks > 1 ? 's' : '');
            } else {
                if (days >= 1) {
                    return this.format(date, 'ddd a la(s) HH:mm');
                } else {
                    var hours = this.hoursBetweenTwoDates(date, now);
                    if (this.isYesterday(date, hours)) {
                        return 'Ayer a la(s) ' + this.time(date);
                    } else {
                        if (hours >= 1) {
                            return 'Hace ' + hours + ' hora' + (hours > 1 ? 's' : '');
                        } else {
                            var minutes = this.minutesBetweenTwoDates(date, now);
                            if (minutes >= 1) {
                                return 'Hace ' + minutes + ' minuto' + (minutes > 1 ? 's' : ''); 
                            } else {
                                var seconds = this.secondsBetweenTwoDates(date, now);
                                return 'Hace ' + seconds + ' segundo' + (seconds > 1 ? 's' : '');
                            }
                        }
                    }
                }
            }        
        }
    }

    secondsBetweenTwoDates (date1, date2, absolute) {
        return this.betweenTwoDates(date1, date2, "s", absolute);
    }

    minutesBetweenTwoDates (date1, date2, absolute) {
        return this.betweenTwoDates(date1, date2, "i", absolute);
    }

    hoursBetweenTwoDates (date1, date2, absolute) {
        return this.betweenTwoDates(date1, date2, "h", absolute);
    }

    daysBetweenTwoDates (date1, date2, absolute) {
        return this.betweenTwoDates(date1, date2, "d", absolute);
    }

    betweenTwoDates (date1, date2, type, absolute) {
        var types = {s : 1000, i : 60*1000, h : 60*60*1000, d : 24*60*60*1000};
        var diff = parseInt((this.standar(date2).getTime() - this.standar(date1).getTime())/types[type]);

        if (typeof absolute !== 'undefined' && absolute !== false) {
            return Math.abs(diff);
        }
        return diff;
    }

    isYesterday (date, hours) {
        if (this.isDate(date)) {
            date = date.split(' ');
            var time = date[1].split(':');
            return hours >= parseInt(time[0]);    
        }
        return false;
    }

    parseDate(date) {
        return [date.getDate(), date.getMonth() + 1, date.getFullYear()].join('/');
    }

    parseDateDjango(date) {
        return [date.getFullYear(),date.getMonth()+1,date.getDate()].join('-');
    }
}

export default DatetimeService;
