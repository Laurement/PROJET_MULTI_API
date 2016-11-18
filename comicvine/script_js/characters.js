// au chargement de la page - affiche la premiere vague.
$( document ).ready(function() {
    $.ajax({
        type: 'GET',
        dataType: "json",
        url: "script_json/characters.json",
        success: function(data) {
            $.each(data.results, function(key, value){
              debugger;
              $("#tbody").append("<tr><td>"+value.name+"</td><td>"+value.real_name+"</td><td>"+value.aliases+"</td><td>"+value.deck+"</td></tr>");});
            },
        error: function() {
            alert('La requête n\'a pas abouti - PAGE 1');
        }
    });
});
