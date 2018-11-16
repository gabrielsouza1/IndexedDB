$(document).ready(function(){
	window.indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;
	var request, db;
	if(!window.indexedDB)
	{
		console.log("Seu navegador não suporta o recurso HTML5 IndexedDB");
	}
	else
	{
		request = window.indexedDB.open("frontEnd", 2);
		request.onerror = function(event){
			console.log("Erro ao abrir o banco de dados", event);
		}
	
		request.onupgradeneeded = function(event){
			console.log("Atualizando");
			db = event.target.result;
			var objectStore = db.createObjectStore("cadastro", { keyPath : "codigo" });
		};
		request.onsuccess = function(event){
			console.log("Banco de dados aberto com sucesso");
			db = event.target.result;
		}
	}
	$("#addBtn").click(function(){
		var name = $("#nome").val();
		var cpf = $("#cpf").val();
		var phone = $("#phone").val();
		var email = $("#email").val();
		var transaction = db.transaction(["cadastro"],"readwrite");
		transaction.oncomplete = function(event) {
			console.log("Sucesso :)");
			$("#result").html("Adicionado com Sucesso");
		};
		transaction.onerror = function(event) {
			console.log("Erro :(");
			$("#result").html("Erro ao Adicionar");
		};
		var objectStore = transaction.objectStore("cadastro");
		objectStore.add({name: name, cpf: cpf, phone: phone, email: email});
	});
	
	$("#removeBtn").click(function(){
		var codigo = $("#codigo").val();
		db.transaction(["cadastro"],"readwrite").objectStore("cadastro").delete(codigo);
                          transaction.oncomplete = function(event){
			$("#result").html("Removido");
		};	
	});s
	
	$("#getBtn").click(function(){
		var codigo = $("#codigo").val();
		var request = db.transaction(["cadastro"],"readwrite").objectStore("cadastro").get(codigo);
		request.onsuccess = function(event){
			$("#result").html("Nome : "+request.result.nome);
		};
	});
	$("#updateBtn").click(function(){
		var name = $("#name").val();
		var cpf = $("#cpf").val();
		var phone = $("#phone").val();
		var email = $("#email").val();
		var transaction = db.transaction(["cadastro"],"readwrite");
		var objectStore = transaction.objectStore("cadastro");
		var request = objectStore.get(codigo);
		request.onsuccess = function(event){
			$("#result").html("Atualizando : "+request.result.nome + " para " + nome);
			request.result.nome = nome;
			objectStore.put(request.result);
		};
	});
});