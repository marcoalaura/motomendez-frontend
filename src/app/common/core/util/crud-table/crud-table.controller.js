'use strict';

import modalController from './crud-table.modal.controller';
import modalTemplate from './crud-table.modal.html';

class CrudTableController {

    constructor($scope, DataService, NgTableParams, Modal, CrudTable, Util, ArrayUtil, Message, Datetime, $log) {
        'ngInject';

        this.$scope = $scope;
        this.DataService = DataService;
        this.NgTableParams = NgTableParams;
        this.Modal = Modal;
        this.Message = Message;
        this.Util = Util;
        this.CrudTable = CrudTable;
        this.ArrayUtil = ArrayUtil;
        this.Datetime = Datetime;
        this.$log = $log;

        this.formlyDefault = [
            {
                key: '',
                templateOptions: {
                    required: false
                },
                hideExpression: 'true'
            },
            {
                key: 'updatedAt',
                templateOptions: {
                    required: false
                },
                hideExpression: 'true'
            },
            {
                key: 'createdAt',
                templateOptions: {
                    required: false
                },
                hideExpression: 'true'
            }
        ];

        this.permissions = {
            create: true,
            read: true,
            update: true,
            delete: true,
            print: false,
            filter: true
        };

        this.options = {};
    }

    $onInit () {
        this.getFields();

        if (this.data && this.data.list && this.Util.toType(this.data.list) == 'array') {
            this.showFilter = false;
        } else {
            this.showFilter = true;
        }
    }

    renderLabels(params) {
        setTimeout(() => {
            if (document.querySelector('.ng-table-counts')) {
                document.querySelector('.ng-table-counts').setAttribute('data-content', 'Filas: ');
            }
            if (document.querySelector('.ng-table-pagination')) {
                document.querySelector('.ng-table-pagination').setAttribute('data-content', `${params.ini} al ${params.end} de ${params.total} Registros.`);
            }
        }, 100);
    }

    addOptionSelected(data, options) {
        for (let i in data) {
            if (data[i].type == 'select') {
                let item = this.CrudTable.searchField(options, data[i].key);
                if (item) {
                    this.ArrayUtil.insert(data[i].templateOptions.options, 0, {
                        name: item.text || 'Seleccione',
                        value: item.value || ''
                    });
                }
            }
        }
    }

    getFields() {
        if (this.data && this.data.formly && this.Util.toType(this.data.formly) == 'array') {
            this.setDataFields(this.data.formly);
        } else {
            this.DataService.options(this.url)
            .then(response => {
                this.setDataFields(response);
            });
        }
    }

    setDataFields(fields = {}) {
        this.fieldsData = this.CrudTable.filterFields(fields, this.fields);
        this.idKey = this.CrudTable.getId(this.fieldsData);
        this.formlyDefault[0].key = this.idKey;

        if (this.formly && this.Util.toType(this.formly) == 'array') {
            this.formly = this.CrudTable.addPropertiesFormly(this.formlyDefault, this.formly);
        } else {
            this.formly = this.formlyDefault;
        }

        this.$log.log('formly:', this.formly);
        this.fieldsData = this.CrudTable.addPropertiesFormly(this.fieldsData, this.formly);
        this.addOptionSelected(this.fieldsData, this.optionSelected);
        this.DataService.setFormly(this.fieldsData);

        this.$log.log('fields:', this.fieldsData);
        this.setHeaders(this.fieldsData);
        if (this.editable) {
            this.types = this.CrudTable.getKeys(this.fieldsData);
        }
        this.getData();

        /**
         * Campos para el formulario de adición
         */
        if (this.Util.toType(this.fieldsCreate) == 'array') {
            this.fieldsCreate = this.CrudTable.filterFields(fields, this.fieldsCreate);
            this.fieldsCreate = this.CrudTable.addPropertiesFormly(this.fieldsCreate, this.formly);
        }

        /**
         * Campos para el formulario de actualización
         */
        if (this.Util.toType(this.fieldsUpdate) == 'array') {
            this.fieldsUpdate = this.CrudTable.filterFields(fields, this.fieldsUpdate);
            this.fieldsUpdate = this.CrudTable.addPropertiesFormly(this.fieldsUpdate, this.formly);
        }

        /**
         * Campos para el formulario de adición/actualización
         */
        if (this.Util.toType(this.fieldsSave) == 'array') {
            this.fieldsSave = this.CrudTable.filterFields(fields, this.fieldsSave);
            this.fieldsSave = this.CrudTable.addPropertiesFormly(this.fieldsSave, this.formly);
        }

        if (this.permission) {
            this.permissions = angular.merge(this.permissions, this.permission);
        }
    }

    setHeaders(fields) {
        let headers = [{
            field: "action",
            title: "Acciones",
            dataType: "command"
        }];
        let hiddenFields = this.Util.toType(this.hiddenFields) == 'array';
        for (let field of fields) {
            let config = {
                field: field.key,
                title: field.templateOptions.label,
                headerTitle: field.templateOptions.label,
                sortable: field.key,
                show: hiddenFields ? this.hiddenFields.indexOf(field.key) === -1 && field.key != this.idKey : field.key != this.idKey
            };
            if (this.inline === undefined) {
                let filter = { [field.key] : field.templateOptions.type };
                // console.log('filter', filter);
                if (field.templateOptions.type == 'select' && field.templateOptions.options) {
                    config.filterData = field.templateOptions.options;
                }
                config.filter = filter;
            }
            headers.push(config);
        }
        this.headers = headers;
    }

    refresh() {
        this.getData();
    }

    getData() {
        if (this.data && this.data.list && this.Util.toType(this.data.list) == 'array') {            
            let data = { dataset: this.filterItems(this.data.list) };
            let config = {};
            if (this.pagination === false || this.pagination === 'false') {
                config.count = this.data.list.length;
                data.counts = [];
            }

            this.tableParams = new this.NgTableParams(config, data);
        } else {
            this.tableParams = new this.NgTableParams({}, {
                getData: params => {
                    let data = params.url();
                    let query = {
                        limit: data.count,
                        page: data.page,
                    };
                    let sort = this.getSorting(data);
                    if (sort) {
                        query.order = sort;
                    }
                    let filters = this.getFilters(data);
                    if (filters.length) {
                        if (filters[0].crudtable_search_term) {
                            query.filter = filters[0].crudtable_search_term;
                        } else {
                            for (let i in filters) {
                                let key = Object.keys(filters[i])[0];
                                if (filters[i][key] && filters[i][key] !== null && filters[i][key] != 'null') {
                                    query[key] = filters[i][key];
                                }
                            }
                            // query.filter = JSON.stringify(filters);
                        }
                    }

                    this.$log.log('data:', data);
                    return this.DataService.list(this.url, query)
                    .then(response => {
                        if (response && response.results) {
                            params.total(response.count);
                            this.emptyTable = response.count === 0;
                            let items = this.filterItems(response.results);
                            this.renderLabels({
                                ini: (query.page - 1) * query.limit + 1,
                                end: query.page * query.limit < response.count ? query.page * query.limit : response.count,
                                total: response.count
                            });
                            return items;
                        }
                    });
                }
            });
        }
    }

    getSorting(params) {
        for (let key in params) {
            if (key.indexOf('sorting') != -1) {
                return (params[key] == 'desc' ? "-" : "") + this.removeCorchete(key, 'sorting');
            }
        }
        return null;
    }

    getFilters(params) {
        let filters = [];
        for (let key in params) {
            if (key.indexOf('filter') != -1) {
                filters.push({ [this.removeCorchete(key, 'filter')] : params[key] });
            }
        }
        return filters;
    }

    removeCorchete(string, search) {
        return string.replace(`${search}[`, '').replace(']', '');
    }

    filterItems(data) {
        data = angular.copy(data);
        let fields = this.fields !== undefined;
        let fks = this.fks !== undefined;
        let relations = this.relations !== undefined;
        let array = [];
        for (let i in data) {
            for (let j in data[i]) {
                if (fields && this.fields.indexOf(j) == -1) {
                    delete data[i][j];
                } else {
                    if (this.editable === undefined) {
                        if (typeof data[i][j] == 'boolean') {
                            data[i][j] = data[i][j] ? 'boolean_true' : 'boolean_false';
                        } else if (relations && this.relations[j]) {
                            data[i][j] = this.CrudTable.searchFieldData(this.relations[j], data[i][j]);
                        } else if (fks && this.fks.indexOf(j) != -1) {
                            if (this.Util.toType(data[i][j]) == 'array') {
                                let l = this.CrudTable.lengthOptions(this.fieldsData, j);
                                if (l > 1 && l == data[i][j].length) {
                                    data[i][j] = 'Todos';
                                } else {
                                    let text = [];
                                    for (let e of data[i][j]) {
                                        text.push(this.CrudTable.getFkData(this.fieldsData, j, e));
                                    }
                                    data[i][j] = text.join(', ');
                                }
                            } else {
                                data[i][j + '_fk'] = data[i][j];
                                data[i][j] = this.CrudTable.getFkData(this.fieldsData, j, data[i][j]);
                            }
                        } else if (this.Util.toType(data[i][j]) == 'array') {
                            data[i][j] = data[i][j][0];
                        }
                        if (this.mergeFields && typeof this.mergeFields[j] == 'function') {
                            data[i][j] = this.mergeFields[j](data[i]);
                        }
                    }
                }
            }
            array.push(this.orderItem(data[i], this.fieldsData, i));
        }
        return array;
    }

    orderItem(data, fields, pos) {
        if (fields === undefined || fields.length === 0) {
            return data;
        }

        let item = {};
        for (let i in fields) {
            let field = fields[i].key;
            if (data[field] !== undefined || data[field + '_fk'] !== undefined) {
                if (this.editable) {
                    if (typeof data[field] == 'string' && !/[a-zA-Z]+/g.test(data[field]) && /^-?[0-9.]+\-?[0-9]+\-?[0-9]*$/g.test(data[field]) && data[field].length == 10) {
                        let date = data[field].split('-');
                        this.dataGrid[pos + '_' + field] = new Date(date[0], date[1]-1, date[2]);
                    } else {
                        this.dataGrid[pos + '_' + field] = data[field];
                    }
                    item[field] = pos + '_' + field;
                } else {
                    if (item[field + '_fk']) {
                        item[field + '_fk'] = data[field];
                    } else {
                        item[field] = data[field];
                    }
                }
            }
        }

        return item;
    }

    add(item, editModalController, editModalTemplate) {
        if (typeof this.eventCreate == 'function') {
            this.eventCreate();
        } else {  
            let fields = null;
            if (item) {
                fields = this.fieldsSave || this.fieldsUpdate || this.fieldsData;
            } else {
                fields = this.fieldsSave || this.fieldsCreate || this.fieldsData;
            }

            let modalInstance = this.Modal.show({
                template: editModalTemplate || this.addModalTemplate || this.modalTemplate || modalTemplate,
                controller: editModalController || this.addModalController || this.modalController || modalController,
                data: {
                    fields: fields,
                    url: this.url,
                    title: this.ngTitle,
                    idKey: this.idKey,
                    item: item
                }
            });

            modalInstance.result
            .then(data => {
                if (data && data[this.idKey]) {
                    this.Message.success();
                    this.refresh();
                }
            }, error => {
                this.$log.info('Modal dismissed at: ' + new Date(), error);
            });
        }
    }    

    edit(item) {
        if (typeof this.eventEdit == 'function') {
            this.eventEdit(item);
        } else {            
            if (this.data && this.data.list) {
                this.editItem = true;
                this.modelInline = angular.copy(this.filterById(item[this.idKey], this.data.list));
            } else {
                this.DataService.get(this.url, item[this.idKey])
                .then(response => {
                    if (response) {
                        this.add(response, this.editModalController, this.editModalTemplate);
                    }
                });
            }
        }
    }

    editCancel() {
        this.editItem = false;
        this.modelInline = this.resetModel(this.modelInline);
        this.data.list.map(e => {
            delete e.edit;
            return e;
        });
    }

    delete(item) {
        this.Modal.confirm('¿Desea eliminar este registro?', () => {
            if (this.data && this.data.list) {
                if (this.data.urlUpdate) {
                    let list = angular.copy(this.data.list);
                    list.map(e => {
                        e = this.CrudTable.cleanData(e);
                        return e;
                    });

                    let pos = this.getIdPosition(list, item);
                    if (pos !== -1) {
                        list.splice( pos, 1 );
                        this.DataService.put(this.data.urlUpdate, list)
                        .then(response => {
                            if (response) {
                                this.data.list = response;
                                this.refresh();
                                if (typeof this.callbackDelete == 'function') {
                                    this.callbackDelete(this.data.list);
                                }
                            }
                        });
                    }
                } else {
                    let pos = this.getIdPosition(this.data.list, item);
                    if (pos !== -1) {
                        this.data.list.splice( pos, 1 );
                        this.refresh();
                    }
                }
                this.inlineOptions = false;
                this.itemSelected = null;
            } else {
                this.DataService.delete(this.url, item[this.idKey])
                .then(() => {
                    this.Message.success('Su registro fue eliminado correctamente.');
                    this.refresh();
                });
            }
        });
    }

    search() {
        this.tableParams.filter({ 'crudtable_search_term': this.searchTerm });
    }

    cleanSearch() {
        this.searchTerm = '';
        this.refresh();
    }

    buttonEvent(event, item, callback) {
        if (typeof callback == 'function') {
            callback(item);
        }
    }

    // Form inline
    saveFormInline() {
        if (this.data && this.data.list && this.Util.toType(this.data.list) == 'array') {
            if (this.formInline.$valid) {
                let data = this.modelInline;
                if (data[this.idKey] === undefined) {
                    if (this.data.urlUpdate) {
                        let list = angular.copy(this.data.list);
                        list.map(e => {
                            e = this.CrudTable.cleanData(e);
                            return e;
                        });
                        list.push(data);
                        this.DataService.put(this.data.urlUpdate, list)
                        .then(response => {
                            if (response) {
                                this.data.list = response;
                                this.modelInline = this.resetModel(this.modelInline);
                                this.formInline.$submitted = false;
                                this.Util.setTouchedForm(this.formInline, false);
                                this.refresh();
                                if (typeof this.callbackSave == 'function') {
                                    this.callbackSave(this.data.list);
                                }
                            }
                        });
                    } else {
                        data[this.idKey] = this.Util.id();
                        data.new = true;
                        this.data.list.push(data);
                        this.modelInline = this.resetModel(this.modelInline);
                        this.formInline.$submitted = false;
                        this.Util.setTouchedForm(this.formInline, false);
                        this.refresh();
                    }
                } else {
                    delete data.edit;
                    this.editItem = false;
                    if (this.data.urlUpdate) {
                        let list = angular.copy(this.data.list);
                        list.map(e => {
                            e = this.CrudTable.cleanData(e);
                            return e;
                        });
                        this.setItem(list, data);
                        this.DataService.put(this.data.urlUpdate, list)
                        .then(response => {
                            if (response) {
                                this.data.list = response;
                                this.modelInline = this.resetModel(this.modelInline);
                                this.formInline.$submitted = false;
                                this.Util.setTouchedForm(this.formInline, false);
                                this.refresh();
                                if (typeof this.callbackSave == 'function') {
                                    this.callbackSave(this.data.list);
                                }
                            }
                        });
                    } else {
                        this.setItem(this.data.list, data);
                        this.modelInline = this.resetModel(this.modelInline);
                        this.formInline.$submitted = false;
                        this.Util.setTouchedForm(this.formInline, false);
                        this.refresh();
                    }
                    this.inlineOptions = false;
                    this.itemSelected = null;
                }
                this.$log.log('Lista:', this.data.list);
            }
        }
    }

    resetModel(model) {
        let obj = {};
        for (let key in model) {
            let formly = this.CrudTable.searchField(this.fieldsData, key);
            if (formly && formly.defaultValue) {
                obj[key] = formly.defaultValue;
            }
        }
        return obj;
    }

    getIdPosition(list, item) {
        for (let i in list) {
            if (list[i][this.idKey] == item[this.idKey]) {
                return i;
            }
        }
        return -1;
    }

    setItem(list, item) {
        for (let i in list) {
            if (list[i][this.idKey] == item[this.idKey]) {
                list[i] = item;
                break;
            }
        }
    }

    filterById(id, list) {
        for (let i in list) {
            if (list[i][this.idKey] == id) {
                return this.CrudTable.cleanData(list[i]);
            }
        }
        return null;
    }    

    selectRow(row, list) {
        list.map((e, i) => {
            if (row[this.idKey] != list[i][this.idKey]) {
                delete list[i].edit;
            }
        });
        if (row.edit) {
            row.edit = false;
            this.inlineOptions = false;
            this.itemSelected = null;
        } else {
            row.edit = true;
            this.inlineOptions = true;
            this.itemSelected = row;
        }
    }

}

export default CrudTableController;
