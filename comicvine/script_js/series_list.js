// au chargement de la page - affiche la premiere vague.
$( document ).ready(function() {
    $.ajax({
        type: 'POST',
        dataType: "json",
        url: "script_json/series_list.json",
        success: function(data) {
            $.each(data.results, function(key, value){
              debugger;
              $("#tbody").append("<tr><td>"+value.id+"</td><td>"+value.name+"</td><td>"+value.aliases+"</td><td>"+value.count_of_episodes+"</td><td>"+value.description+"</td><td>"+value.start_year+"</td></tr>");});
            },
        error: function() {
            alert('La requête n\'a pas abouti - PAGE 1');
        }
    });
});
