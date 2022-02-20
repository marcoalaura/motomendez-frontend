'use-strict';

class CrudTableService {
    constructor(Datetime) {
        'ngInject';

        this.Datetime = Datetime;
    }

    filterFields(data, fields) {
        if (typeof fields == 'undefined' || fields.length === 0) {
            return data;
        }
        var filter = [];
        for (var i in fields) {
            var field = this.searchField(data, fields[i]);
            if (field) {
                filter.push(field);
            }
        }
        return filter;
    }

    searchField(fields, field) {
        for (var i in fields) {
            if (fields[i].key == field) {
                return fields[i];
            }
        }   
        return null;
    } 

    searchFieldData(fields, field) {
        for (var i in fields) {
            if (fields[i].key == field) {
                return fields[i].value;
            }
        }   
        return field;
    } 

    addPropertiesFormly(data, formly) {
        if (typeof formly == 'undefined' || formly.length === 0) {
            return data;
        }
        for (var i in data) {
            var field = this.searchField(formly, data[i].key);
            if (field) {
                data[i] = angular.merge({}, data[i], field);
            }
        }
        return data;
    }    

    parseSave(data, formly) {
           
        var item = {};
        for (var i in data) {
            if (this.toType(data[i]) == 'date') {
                item[i] = this.Datetime.format(data[i], 'YYYY-MM-dd');
            } else {
                if (typeof data[i] == 'string' && (data[i] == 'true' || data[i] == 'false')) {
                    item[i] = item[i] == 'true'; 
                } else {
                    item[i] = data[i];
                }
            }
        }
        item.id = this.getId(item, formly);
        return item;
    }

    getId(formly, item) {
        for (var i in formly) {
            if (formly[i].templateOptions.label && formly[i].templateOptions.label == 'ID') {
                if (item) {
                    return item[formly[i].key];
                } else {
                    return formly[i].key;
                }
            }
        }
        return null;
    }

    getFkData(fieldsData, key, value) {
        fieldsData.filter((e) => {
            if (e.key == key && e.templateOptions.options) {
                e.templateOptions.options.filter((elem) => {
                    if (elem.value == value) {
                        value = elem.name;
                    }
                });
            }
        });
        return value;
    }

    filterItem(data) {
        for (var i in data) {
            if (typeof data[i] == 'string') {
                if (this.Datetime.isDate(new Date(data[i]))) {
                    data[i] = new Date(data[i]);
                } else if (!/[a-zA-Z]+/g.test(data[i]) && /^-?[0-9.]+\:?[0-9]+\:?[0-9]*$/g.test(data[i]) && data[i].length == 8) {
                    // data[i] = formatTime(data[i]);
                }
            }
        }
        return data;
    }

    lengthOptions(data, key) {
        for (var i in data) {
            if (data[i].key == key && data[i].templateOptions && data[i].templateOptions.options) {
                return data[i].templateOptions.options.length;
            }
        }
        return 0;
    }

    cleanData(item) {
        for (let key in item) {
            if (item[key + '_fk']) {
                item[key] = item[key + '_fk'];
                delete item[key + '_fk'];
            }
            if (item[key] == 'boolean_true') {
                item[key] = true;
            } else if (item[key] == 'boolean_false') {
                item[key] = false;
            } else {
                item[key] = this.Datetime.toDate(item[key]);
            }
        }
        return item;
    }
}

export default CrudTableService;