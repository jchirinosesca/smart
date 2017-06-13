var Users={
    all:function(dataUsers){
        $.post( "api/users/all",
        function(response) {
            dataUsers(response);
            //alert( "success" );
        })
        .done(function(response) {
            //alert( "second success" );
        })
        .fail(function(response) {
            //alert( "error" );
        })
        .always(function(response) {
            //alert( "finished" );
        });
    },
    get:function(id){
        $.get( "api/users/"+id,
        function(response) {
            vm.user = response;
            var rolesUser=[];
            var submodulosUser= [];
            for (var i = response.submodulos.length - 1; i >= 0; i--) {
                submodulosUser.push(response.submodulos[i].id);
            }
            for ( i = response.roles.length - 1; i >= 0; i--) {
                rolesUser.push(response.roles[i].id);
            }
            $selectModulos.val(submodulosUser).trigger("change");
            $selectRoles.val(rolesUser).trigger("change");
        })
        .done(function(response) {
            //alert( "second success" );
        })
        .fail(function(response) {
            //alert( "error" );
        })
        .always(function(response) {
            //alert( "finished" );
        });
    },
    /** guardar nuevo
    */
    store:function(){
        vm.user.submodulos = $('#modulos').val();
        vm.user.roles = $('#roles').val();
        $.post( "api/users",vm.user,
        function(response) {
            //user = response;
            reload();
            //$('#'+tabla).DataTable().ajax.reload();
            $("#userModal").modal('hide');
        })
        .done(function(response) {
            //alert( "second success" );
        })
        .fail(function(response) {
            //alert( "error" );
        })
        .always(function(response) {
            //alert( "finished" );
        });
    },
    /** guardar existente
    */
    update:function(id){
        //vm.user.submodulos = submodulosUser;
        vm.user.roles = $('#roles').val();
        $.put('api/users/'+id,vm.user, 
            function(response){
            reload();
            //$('#'+tabla).DataTable().ajax.reload();
            $("#userModal").modal('hide');
        })
        .done(function(response) {
            //alert( "second success" );
        })
        .fail(function(response) {
            //alert( "error" );
        })
        .always(function(response) {
            //alert( "finished" );
        });
    },
    destroy:function(id){
        $.delete( "api/users/"+id,
        function(response) {
            user = response;
        })
        .done(function(response) {
            //alert( "second success" );
        })
        .fail(function(response) {
            //alert( "error" );
        })
        .always(function(response) {
            //alert( "finished" );
        });
    },
    allPaginate:function(dataUsersPag){
        $.post( "api/users/all-paginate",
        { name: "John", time: "2pm" },
        function(response) {
            dataUsersPag(response);
            //alert( "success" );
        })
        .done(function(response) {
            //alert( "second success" );
        })
        .fail(function(response) {
            //alert( "error" );
        })
        .always(function(response) {
            //alert( "finished" );
        });
    },
    CambiarEstadoAreas:function(id,AD){

    }
};
var Modulos={
    all:function(/*dataUsers*/){
        $.get( "api/modulos", function(response) {
            vm.modulos = response;
            $selectModulos = $('#modulos').select2({
                dropdownParent: $('#userModal')
            });
            $selectModulos.on("change", function (e) {
                //actualizar objeto moduloUser
                //vm.submodulosUser = [];
                vm.user.submodulos = [];
                if ($('#modulos').val()) {
                    for (var i = vm.modulos.length - 1; i >= 0; i--) {
                        submodulo = vm.modulos[i].children;
                        for (var j = submodulo.length - 1; j >= 0; j--) {
                            if ($('#modulos').val().indexOf(submodulo[j].id.toString()) >=0) {
                                //vm.submodulosUser.push(submodulo[j]);
                                vm.user.submodulos.push(submodulo[j]);
                            }
                        }
                        
                    }
                }
            });
        })
        .done(function(response) {
            //alert( "second success" );
        })
        .fail(function(response) {
            //alert( "error" );
        })
        .always(function(response) {
            //alert( "finished" );
        });
    }
};
var Roles={
    all:function(/*dataUsers*/){
        $.get( "roles/lista",
        function(response) {
            vm.roles = response;
            $selectRoles = $('#roles').select2({
                dropdownParent: $('#userModal')
            });
            //dataUsers(response);
            //alert( "success" );
        })
        .done(function(response) {
            //alert( "second success" );
        })
        .fail(function(response) {
            //alert( "error" );
        })
        .always(function(response) {
            //alert( "finished" );
        });
    }
};