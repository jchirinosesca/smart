var vm=new Vue({el:"#main",data:{user:{},roles:[],accion:""},methods:{guardarUser:function(){"nuevo"==vm.accion?Users.store():Users.update(vm.user.id)},storeUser:function(){$("#userModal").modal(),vm.accion="nuevo",vm.user={},$selectRoles.val([]).trigger("change")},roles:function(){Roles.all()}}}),tabla="datatable_tabletools",responsiveHelper_datatable_tabletools=void 0,$selectRoles,breakpointDefinition={tablet:1024,phone:480},columns=[{data:"id",name:"id",searchable:!1},{data:"nombres",name:"nombres"},{data:"apellidos",name:"apellidos"},{data:"numero_telefono",name:"numero_telefono",searchable:!1},{data:"genero",name:"genero",searchable:!1},{name:"verified",searchable:!1,data:function(e,a,t,o){return'<td><button type="button" onClick="editar('+e.id+')" class="btn btn-primary">Editar</button></td>'},defaultContent:""},{name:"deleted_at",searchable:!1,data:function(e,a,t,o){return estado='<button type="button"  onClick="activar('+e.id+')" class="btn btn-success">Inactivo</button>',null===e.deleted_at&&(estado='<button type="button" onClick="desactivar('+e.id+')" class="btn btn-success">Activo</button>'),estado},defaultContent:""}],url="api/users",tableTools={aButtons:["copy","csv","xls",{sExtends:"pdf",sTitle:"SmartAdmin_PDF",sPdfMessage:"SmartAdmin PDF Export",sPdfSize:"letter"},{sExtends:"print",sMessage:"Generated by SmartAdmin <i>(press Esc to close)</i>"}],sSwfPath:"js/plugin/datatables/swf/copy_csv_xls_pdf.swf"},dataTable={processing:!0,serverSide:!0,stateSave:!0,searching:!0,ordering:!0,stateLoadCallback:function(e){},stateSaveCallback:function(e){},ajax:function(e,a,t){Users.getAll(e,a)},columns:columns,sDom:"<'dt-toolbar'<'col-xs-12 col-sm-6'f><'col-sm-6 col-xs-6 hidden-xs'T>r>t<'dt-toolbar-footer'<'col-sm-6 col-xs-12 hidden-xs'i><'col-sm-6 col-xs-12'p>>",oLanguage:{sSearch:'<span class="input-group-addon"><i class="glyphicon glyphicon-search"></i></span>'},oTableTools:tableTools,autoWidth:!0,preDrawCallback:function(){responsiveHelper_datatable_tabletools||(responsiveHelper_datatable_tabletools=new ResponsiveDatatablesHelper($("#"+tabla),breakpointDefinition))},rowCallback:function(e,a){responsiveHelper_datatable_tabletools.createExpandIcon(e)},drawCallback:function(e){responsiveHelper_datatable_tabletools.respond()}},datatable;$(document).ready(function(){pageSetUp(),Roles.all(),datatable=$("#"+tabla).DataTable(dataTable)}),editar=function(e){vm.accion="editar",Users.get(e),$("#userModal").modal()},desactivar=function(e){reload()},activar=function(e){reload()},reload=function(){datatable.ajax.reload(null,!1)},roles=function(){var e=[];for(i=vm.user.roles.length-1;i>=0;i--)e.push(vm.user.roles[i].id);$selectRoles.val(e).trigger("change")};