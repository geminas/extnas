Ext.require([
    'Ext.grid.*',
    'Ext.data.*',
    'Ext.util.*',
    'Ext.state.*',
    'Ext.form.*'
]);

Ext.onReady(function(){
    // Define our data model
    Ext.define('Employee', {
        extend: 'Ext.data.Model',
        fields: [
            'name',
            'email',
            { name: 'start', type: 'date', dateFormat: 'n/j/Y' },
            { name: 'salary', type: 'float' },
            { name: 'active', type: 'bool' }
        ]
    });

    // Generate mock employee data
    var data = (function() {
        var lasts = ['Jones', 'Smith', 'Lee', 'Wilson', 'Black', 'Williams', 'Lewis', 'Johnson', 'Foot', 'Little', 'Vee', 'Train', 'Hot', 'Mutt'],
            firsts = ['Fred', 'Julie', 'Bill', 'Ted', 'Jack', 'John', 'Mark', 'Mike', 'Chris', 'Bob', 'Travis', 'Kelly', 'Sara'],
            lastLen = lasts.length,
            firstLen = firsts.length,
            usedNames = {},
            data = [],
            eDate = Ext.Date,
            now = new Date(),
            s = new Date(now.getFullYear() - 4, 0, 1),
            end = Ext.Date.subtract(now, Ext.Date.MONTH, 1),
            getRandomInt = Ext.Number.randomInt,

            generateName = function() {
                var name = firsts[getRandomInt(0, firstLen - 1)] + ' ' + lasts[getRandomInt(0, lastLen - 1)];
                if (usedNames[name]) {
                    return generateName();
                }
                usedNames[name] = true;
                return name;
            };

        while (s.getTime() < end) {
            var ecount = getRandomInt(0, 3);
            for (var i = 0; i < ecount; i++) {
                var name = generateName();
                data.push({
                    start : eDate.add(eDate.clearTime(s, true), eDate.DAY, getRandomInt(0, 27)),
                    name : name,
                    email: name.toLowerCase().replace(' ', '.') + '@sencha-test.com',
                    active: getRandomInt(0, 1),
                    salary: Math.floor(getRandomInt(35000, 85000) / 1000) * 1000
                });
            }
            s = eDate.add(s, eDate.MONTH, 1);
        }
        console.log(data)
        //alert(data)
        return data;
    })();

    // create the Data Store
    var store = Ext.create('Ext.data.Store', {
        // destroy the store if the grid is destroyed
        autoDestroy: true,
        model: 'Employee',
        proxy: {
            type: 'memory'
        },
        data: data,
        sorters: [{
            property: 'start',
            direction: 'DESC'
        }]
    });

    var rowEditing = Ext.create('Ext.grid.plugin.RowEditing', {
        clicksToMoveEditor: 1,
        autoCancel: false
    });

    // create the grid and specify what field you want
    // to use for the editor at each column.
    // Ext.create('Ext.Component', {
    //     html: 'Hello world!',
    //     alias: 'widget.hello',
    //     width: 300,
    //     height: 200,
    //     padding: 20,
    //     style: {
    //         color: '#FFFFFF',
    //         backgroundColor:'#000000'
    //     },
    //     renderTo: Ext.getBody()
    // });
    Ext.define('Ext.form.SearchField', {
        extend: 'Ext.form.field.Text',
        alias: 'widget.searchfield',

        inputType: 'text',
        html:'<strong></strong>',
        // Config defining the search URL
        searchUrl: 'http://www.google.com/search?q={0}',

        // Add specialkey listener
        initComponent: function() {
            this.callParent();
            this.on('keydown', this.checkEnterKey, this);
        },
        plugins:[],
        // Handle enter key presses, execute the search if the field has a value
        checkEnterKey: function(field, e) {
            // var value = this.getValue();
            // if (e.getKey() === e.ENTER && !Ext.isEmpty(value)) {
            //     location.href = Ext.String.format(this.searchUrl, value);
            // }
            console.log("typing")
            console.log(field)
            console.log(e)
            console.log(this)
        }
    });

    Ext.define('Ext.form.IdComBox',{
        extend:'Ext.form.field.ComboBox',
        alias:'widget.idcombo',
        inputType:'text',
        initComponent:function(){
            this.callParent();
            this.on('keydown', this.checkEnterKey, this);
        },
         checkEnterKey: function(field, e) {
            // var value = this.getValue();
            // if (e.getKey() === e.ENTER && !Ext.isEmpty(value)) {
            //     location.href = Ext.String.format(this.searchUrl, value);
            // }
            console.log("typing")
            console.log(field)
            console.log(e)
            console.log(this)
        }
    });

    var states = Ext.create('Ext.data.Store', {
        fields: ['abbr', 'name'],
        data : [
            {"abbr":"AL", "name":"Alabama"},
            {"abbr":"AK", "name":"Alaska"},
            {"abbr":"AZ", "name":"Arizona"}
        ]
    });

    var grid = Ext.create('Ext.grid.Panel', {
        store: store,
        columns: [{
            header: 'Name',
            dataIndex: 'name',
            flex: 1,
            editor: {
                // defaults to textfield if no xtype is supplied
                xtype:'combobox',
                store:states,
                allowBlank: false,
                enableKeyEvents:true,
                selectOnFocus:true,
                valueField: 'name',
                displayField: 'name',
                queryMode:'local',
               // triggerAction: 'all'
               // forceSelection: true,
                enableKeyEvents: true,
                listeners:{
                    specialkey: function(combo, e, eOpts) {
                        if (e.getKey() == e.ENTER) {
                       //      //move to next control
                            
                       //          var editPlugin = this.up().editingPlugin,
                       //          editor = editPlugin.getEditor(), // Ext.grid.RowEditor
                       //          curCol = editPlugin.context.colIdx,
                       //          currentField = editor.getEditor(curCol),
                       //          nextField = editor.getEditor(curCol + 1);
                       //          if (currentField) {
                       //              // ensure the combo is collapsed when the field is blurred
                       //              currentField.triggerBlur();
                       //          }
                       //          if (nextField) {
                       //              // startEdit will reset the edit state... What we need
                       //              // is simply to focus the field, the value will be
                       //              // updated when the user clicks the "update" button.
                       //              nextField.focus();
                       //          }
                       //          this.nowFive = true;
                       //      }
                      //  console.log(this.up().editingPlugin)
                        //console.log(this.up('grid').walkCells)
                            console.log("here")
                            sm = grid.startEditing(0, 1);
                           // if (sm.onEditorTab) {
                                //sm.onEditorTab(this, e);
                            //}
                        }
                    }
                },
                //selectOnTab:true
                tpl: Ext.create('Ext.XTemplate',
                    '<ul class="x-list-plain"><tpl for=".">',
                        '<li role="option" class="x-boundlist-item">{abbr} - {name}</li>',
                    '</tpl></ul>'
                ),
                // template for the content inside text field
                displayTpl: Ext.create('Ext.XTemplate',
                    '<tpl for=".">',
                        '{abbr} - {name}',
                    '</tpl>'
                )
                // renderer:function(value){
                //     //console.log("hahahah")
                //     //return value+"aas"
                // }
                // ,
                // style: {
                //     borderColor: 'red',
                //     borderStyle: 'solid'
                // }
            },
            //renderer is the hook when at the end update 
            renderer:function(value){
                //console.log(value)
                return value
            }
        }, {
            header: 'Email',
            dataIndex: 'email',
            width: 160,

            editor: {
                allowBlank: false,
                vtype: 'email',
                editable:false
            }
        }, {
            xtype: 'datecolumn',
            header: 'Start Date',
            dataIndex: 'start',
            width: 135,
            editor: {
                xtype: 'datefield',
                allowBlank: false,
                format: 'm/d/Y',
                minValue: '01/01/2006',
                minText: 'Cannot have a start date before the company existed!',
                maxValue: Ext.Date.format(new Date(), 'm/d/Y')
            }
        }, {
            xtype: 'numbercolumn',
            header: 'Salary',
            dataIndex: 'salary',
            format: '$0,0',
            width: 130,
            editor: {
                xtype: 'numberfield',
                allowBlank: false,
                minValue: 1,
                maxValue: 150000
            }
        }, {
            xtype: 'checkcolumn',
            header: 'Active?',
            dataIndex: 'active',
            width: 60,
            editor: {
                xtype: 'checkbox',
                cls: 'x-grid-checkheader-editor'
            }
        }],
        tbar: [{
            text: 'Add',
            iconCls: 'employee-add',
            handler : function() {
                rowEditing.cancelEdit();

                // Create a model instance
                var r = Ext.create('Employee', {
                    name: 'New Guy',
                    email: 'new@sencha-test.com',
                    start: Ext.Date.clearTime(new Date()),
                    salary: 50000,
                    active: true
                });

                store.insert(0, r);
                rowEditing.startEdit(0, 0);
            }
        }, {
            itemId: 'removeEmployee',
            text: 'Remove',
            iconCls: 'employee-remove',
            handler: function() {
                var sm = grid.getSelectionModel();
                rowEditing.cancelEdit();
                store.remove(sm.getSelection());
                if (store.getCount() > 0) {
                    sm.select(0);
                }
            },
            disabled: true
        }],
        plugins: [Ext.create('Ext.grid.plugin.CellEditing', {
            clicksToEdit: 1
        })],
        listeners: {
            'selectionchange': function(view, records) {
                grid.down('#removeEmployee').setDisabled(!records.length);
            }
        }
    });
    // var hello=Ext.create('Ext.Component', {
    //     html: 'Hello world!',
    //     width: 300,
    //     height: 200,
    //     padding: 20,
    //     style: {
    //         color: '#FFFFFF',
    //         backgroundColor:'#000000'
    //     },
    //     renderTo: Ext.getBody()
    // });

    new Ext.window.Window({
        width: 700,
        height: 400,
        title: 'Test Table Input',
        items: grid,
        layout: 'fit',
        closable: false
    }).show();
    // new Ext.window.Window({
    //     width: 700,
    //     height: 200,
    //     title: 'Employee Salaries',
    //     items: hello,
    //     //layout: 'fit',
    //     closable: true
    // }).show();
});
