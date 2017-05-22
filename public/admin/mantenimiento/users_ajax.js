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
            submodulos = response.submodulos;
            //seleccionar los submodulos obtenidos
            for (var i = vm.modulos.length - 1; i >= 0; i--) {
                //  console.log(vm.modulos[i].id);
                if ( vm.modulos[i].children.length > 0 ) {
                    submodulos = vm.modulos[i].children;
                    for (var j = submodulos.length - 1; j >= 0; j--) {
                        console.log( submodulos[j]  );
                    }
                }
            }
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
        $.get( "api/modulos",
        function(response) {
            vm.modulos = response;
                $('.select2').select2({
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