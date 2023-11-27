sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, JSONModel) {
        "use strict";

        return Controller.extend("projetonetflix.controller.Inicio", {
            onInit: function () {

                var menu = {
                    primeiro: "BEGIN",
                    segundo: "MOVIES"
                };

                //CRIAR MODELO E PREENCHER COM DADOS
                var menuModel = new JSONModel();
                menuModel.setData(menu);
                
                //ATRIBUIR O MODELO A TELA
                var tela = this.getView();
                tela.setModel(menuModel , "ModeloMenu");

                //CRIAR E INICIANDO UMA NOVA LISTA VAZIA
                var resultados = {
                    titles: []
                };
                var filmesModel = new JSONModel();
                filmesModel.setData(resultados);
                tela.setModel(filmesModel , "APIFilmes");

            },
            onPressLinkInicio: function() {
                alert("Você clicou em Inicio")
            },

            onPressLinkSeries: function() {
                alert("Você apertou o link em Series")
            },

            onApertarBuscar: function() {
                //OBTER VALOR DO CAMPO DE BUSCA
                var filtro = this.byId("InputBuscar").getValue();
              //alert("Você quiz realizar uma BUSCAR " + filtro)

              const settings = {
                async: true,
                crossDomain: true,
                url: 'https://netflix54.p.rapidapi.com/search/?query=' + filtro + '&offset=0&limit_titles=50&limit_suggestions=20&lang=en',
                method: 'GET',
                headers: {
                    'X-RapidAPI-Key': '32b9d3391amsh80b602c32fe580cp1fab77jsn38dae00e080b',
                    'X-RapidAPI-Host': 'netflix54.p.rapidapi.com'
                }
            };
            
            $.ajax(settings).done(function (response) {
                console.log(response);
                // RESGATAR O MODELO E ATUALIZAR OS DADOS
                var view = this.getView();
                var model = view.getModel("APIFilmes");
                var dados = model.getData();

                // LIMPAR LISTA
                dados.titles = [];
                dados.titles = response.titles;
                model.refresh();

            }.bind(this) );

            }
        });
    });
