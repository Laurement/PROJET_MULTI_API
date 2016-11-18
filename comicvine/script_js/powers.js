// au chargement de la page - affiche la premiere vague.
$( document ).ready(function() {
    $.ajax({
        type: 'POST',
        dataType: "json",
        url: "script_json/powers.json",
        success: function(data) {
            $.each(data.results, function(key, value){
              debugger;
              $("#tbody").append("<tr><td>"+value.id+"</td><td>"+value.name+"</td><td>"+value.description+"</td><td>"+value.date_added+"</td><td>"+value.date_last_updated+"</td></tr>");});
            },
        error: function() {
            alert('La requête n\'a pas abouti - PAGE 1');
        }
    });
});
