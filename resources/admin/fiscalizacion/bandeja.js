let vm = new Vue({
    el: '#main',
    data: {
        errors: [],
        tarea: [],
        accion:'',
        trabajadores:[],
        estadotarea:[],
        tipotarea:[],
        construcciones:[],
        datos:[],
        domicilios:[],
        instalaciones:[],
        prediouno:[],
        prediodos:[],
        prediotres:[],
        propietarios:[],

        formulario:[],
        imagenes:[],
        map:[],
        markers:[],
        bounds:[],
        line:[],
        nomarkers:[],
    },
    methods: {
        guardarNuevo:function(){
            vm.tarea.DueDate =  $('input[name=DueDate_nuevo]').val();
            vm.tarea.estado_tarea_id = $('#estado_tarea_id').val();
            vm.tarea.tipo_tarea_id = $('#tipo_tarea_id').val();
            vm.tarea.EmployeeNumber = $('#EmployeeNumber').val();
            Tareas.store();
        },
        guardarEditar:function(){
            vm.tarea.DueDate =  $('input[name=DueDate_editar]').val();
            vm.tarea.estado_tarea_id = $('#estado_tarea_id').val();
            vm.tarea.tipo_tarea_id = $('#tipo_tarea_id').val();
            vm.tarea.EmployeeNumber = $('#EmployeeNumber').val();
            Tareas.update();
        },
        /**boton llama a modal, nuevo user */
        abrirNuevoModal: function () {
            $("#"+nuevo_modal).modal();
            vm.accion = 'nuevo';
            vm.tarea = {};
            vm.construcciones = {};
        },
        roles: function(){
            Roles.all();
        },
        verFormulario:function(id){
            Formulario.get(id);
        },
    },
});
var gm = google.maps;

var config = {
    el: 'mapa_tarea',
    lat: -12.109129,
    lon: -77.016123,
    zoom: 15,
    minZoom: 15,
    type: gm.MapTypeId.ROADMAP
};

var spiderConfig = {
    keepSpiderfied: true,
    event: 'mouseover'
};

var mapOptions = {
    center: new gm.LatLng(config.lat, config.lon),
    zoom: config.zoom,
    mapTypeId: config.type
};
var markerSpiderfier;
var infoWindows = [];
removeMarkers = function() {
    for (var i = 0; i < vm.markers.length; i++) {
        vm.markers[i].setMap(null);
    }
    vm.markers=[];
};

addMarker=function(location,label,icon,drag){
    var marker = new gm.Marker({
        position: location,
        //icon: icon,
        draggable: drag,
        map: vm.map
    });
    vm.markers.push(marker);
    vm.bounds.extend(location);
    marker.infowindow = new gm.InfoWindow({content: label});

    gm.event.addListener(marker,'click', function() {
        if(infoWindows.length>0){
            for (var j=0;j<infoWindows.length;j++) {
                infoWindows[j].close();
            }
        }
        this.infowindow.open(vm.map,this);
        infoWindows.push(this.infowindow);
    });
    markerSpiderfier.addMarker(marker);
};

////////////////////////////
var tabla='tabla_registro_tarea';
var editar_modal='editar_modal';//modal-tarea
var nuevo_modal='nuevo_modal';

/* BASIC ;*/
var responsiveHelper_datatable_tabletools = undefined;

var $EmployeeNumber;
var $tipo_tarea_id;
var $estado_tarea_id;

var breakpointDefinition = {
    tablet : 1024,
    phone : 480
};

var columns=[
    {
        data: "ficha_p",
        name: "ficha_p",
        searchable:false
    },
    {
        data: "codigo_p",
        name: "codigo_p",
        searchable:false
    },
    {
        data: "FirstName",
        name: "FirstName",
        searchable:false
    },
    {
        data: "nombres_declarantes",
        name: "nombres_declarantes",
        searchable:false
    },
    {
        data: "dni_declarantes",
        name: "dni_declarantes",
        searchable:false
    },
    {
        data: "nombres_propietarios",
        name: "nombres_propietarios",
        searchable:false
    },
    {
        data: "dni_propietario",
        name: "dni_propietario",
        searchable:false
    },
    {
        data: "nombres_fiscalizador",
        name: "nombres_fiscalizador",
        searchable:false
    },
    {
        data: "dni_fiscalizador",
        name: "dni_fiscalizador",
        searchable:false
    },
    {
        data: "created_at",
        name: "created_at",
        searchable:false
    },
    {
        data: "observaciones",
        name: "observaciones",
        searchable:false
    },
    {
        name:"edicion",
        searchable:false,
        data: function ( row, type, val, meta ) {
            return '<td><button type="button" onClick="editar('+row.id+')" class="btn btn-primary">Editar</button></td>';
        },
        "defaultContent": '',
    },
    {
        name: "deleted_at",
        searchable:false,
        data: function ( row, type, val, meta ) {
            estado='<button type="button"  onClick="activar('+row.id+')" class="btn btn-success">Inactivo</button>';
            if (row.deleted_at===null){
                estado='<button type="button" onClick="desactivar('+row.id+')" class="btn btn-success">Activo</button>';
            }
            return estado;
        },
        defaultContent: '',
    }
];
var url = "api/fiscalizaciones";
var tableTools = {
    "aButtons": [
        "copy",
        "csv",
        "xls",
        {
            "sExtends": "pdf",
            "sTitle": "SmartAdmin_PDF",
            "sPdfMessage": "SmartAdmin PDF Export",
            "sPdfSize": "letter"
        },
        {
            "sExtends": "print",
            "sMessage": "Generated by SmartAdmin <i>(press Esc to close)</i>"
        }
    ],
    "sSwfPath": "js/plugin/datatables/swf/copy_csv_xls_pdf.swf"
};
var dataTable={
    "processing": true,
    "serverSide": true,
    "stateSave": true,
    "searching": true,
    "ordering": true,
    "stateLoadCallback": function (settings) {
        //$("body").append('<div class="overlay"></div><div class="loading-img"></div>');
    },
    "stateSaveCallback": function (settings) { // Cuando finaliza el ajax
        //$(".overlay,.loading-img").remove();
    },
    ajax: function(data, callback, settings) {
        Tareas.getAll(data,callback);
    },
    "columns":columns,
    "sDom": "<'dt-toolbar'<'col-xs-12 col-sm-6'f><'col-sm-6 col-xs-6 hidden-xs'T>r>"+
            "t"+
            "<'dt-toolbar-footer'<'col-sm-6 col-xs-12 hidden-xs'i><'col-sm-6 col-xs-12'p>>",
    "oLanguage": {
        "sSearch": '<span class="input-group-addon"><i class="glyphicon glyphicon-search"></i></span>'
    },
    "oTableTools": tableTools,
    "autoWidth" : true,
    "preDrawCallback" : function() {
        // Initialize the responsive datatables helper once.
        if (!responsiveHelper_datatable_tabletools) {
            responsiveHelper_datatable_tabletools = new ResponsiveDatatablesHelper($('#'+tabla), breakpointDefinition);
        }
    },
    "rowCallback" : function(nRow,data) {
        responsiveHelper_datatable_tabletools.createExpandIcon(nRow);
    },
    "drawCallback" : function(oSettings) {
        responsiveHelper_datatable_tabletools.respond();
    }
};
var datatable;
$(document).ready(function() {
    pageSetUp();
    $EmployeeNumber = $('#EmployeeNumber').select2();
    $tipo_tarea_id = $('#tipo_tarea_id').select2();
    $estado_tarea_id = $('#estado_tarea_id').select2();
    datatable = $('#'+tabla).DataTable(dataTable);

    Listas.all();
    $('#'+editar_modal).on('shown.bs.modal', function (event) {
        clearMapa();
        iniciarMapa('editar_mapa_tarea');
        addClickMarker();
        Tareas.get(vm.tarea.id);
    });
    $('#'+nuevo_modal).on('shown.bs.modal', function (event) {
        clearMapa();
        iniciarMapa('nuevo_mapa_tarea');
        addClickMarker();
    });
    $('#nav_modal a').on('shown.bs.tab', function(e){
        /*if ($(this)[0].hash=='#tab_datos') {
            $('#footer_datos').show();
            $('#footer_movimientos').hide();
        } else if ($(this)[0].hash=='#tab_movimientos'){
            $('#footer_datos').hide();
            $('#footer_movimientos').show();
        }*/
    });
});
/**
   
*/
editar=function(id){
    vm.tarea.id=id;
    vm.accion='editar';
    $("#"+editar_modal).modal();
};
desactivar=function(id){
    reload();
};
activar=function(id){
    reload();
};
reload=function(){
    datatable.ajax.reload(null,false);
};
clearMapa=function(){
    try { markerSpiderfier.clearMarkers(); }catch(c){}
    removeMarkers();
};

iniciarMapa=function (id) {
    vm.map = new gm.Map(
        document.getElementById(id),
        mapOptions
    );
};
addClickMarker=function (id) {
    vm.map.addListener('click',function(event) {
        icon = "/img/icons/tap.png";
        vm.tarea.coordy = event.latLng.lat();
        vm.tarea.coordx = event.latLng.lng();
        removeMarkers();
        addMarker(event.latLng, 'Click Generated Marker',icon, true);
    });
    vm.bounds = new gm.LatLngBounds();
    markerSpiderfier = new OverlappingMarkerSpiderfier(vm.map, spiderConfig);
};

pintarMarkers=function () {
    /*for (var i = vm.movimientos.length - 1; i >= 0; i--) {
        var coordx = parseFloat(vm.movimientos[i].coordx);
        var coordy = parseFloat(vm.movimientos[i].coordy);
        icon = "/img/icons/tap.png";
        label = "<label><b>"+vm.movimientos[i].created_at+"</b></label>";
        var location = new gm.LatLng(coordy, coordx);
        addMarker( location, label, icon,false);
    }
    var markerCluster = new MarkerClusterer(vm.map, vm.markers);
    markerCluster.setMaxZoom(config.minZoom);
    vm.map.fitBounds(vm.bounds);*/
};