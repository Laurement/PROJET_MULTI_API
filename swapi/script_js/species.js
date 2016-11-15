// au chargement de la page - affiche la premiere vague.
$( document ).ready(function() {
    $.ajax({
        type: 'GET',
        url: 'http://swapi.co/api/species/',
        success: function(data) {
            $.each(data.results, function(key, value){
                $("#tbody").append("<tr><td id=\"name\">" + value.name + "</td><td id=\"classification\">" + value.classification + "</td><td id=\"designation\">"+value.designation+"</td><td id=\"average_height\">"+value.average_height+"</td><td id=\"average_lifespan\">"+value.average_lifespan+"</td><td id=\"language\">"+value.language+"</td></tr>");});
            if(data.next != "") {
                $("#tbody").append("<input id=\"next\" type=\"button\" name=" + data.next  + " value =\"Page Suivante\" onclick=\"suiteSpecies()\" />");
            }},
        error: function() {
            alert('La requête n\'a pas abouti - PAGE 1');
        }
    });
});

// permet d'afficher les 10 resultat suivant peut importe le nombre de valeur.
function suiteSpecies()
{
    $( "td" ).remove();
    $.ajax(
      {
        type: 'GET',
        url: $("#next").attr("name"),

        success: function(data)
        {
          $.each(
            data.results, function(key, value)
              {
                  $("#tbody").append("<tr><td id=\"name\">" + value.name + "</td><td id=\"classification\">" + value.classification + "</td><td id=\"designation\">"+value.designation+"</td><td id=\"average_height\">"+value.average_height+"</td><td id=\"average_lifespan\">"+value.average_lifespan+"</td><td id=\"language\">"+value.language+"</td></tr>");
              }
            );
            if(data.next != null)
            {
                $( "#previous" ).remove();
                $( "#next" ).remove();
                $("#tbody").append("<input id=\"previous\" type=\"button\" name=" + data.previous  + " value =\"Page précédente\" onclick=\"previousSpecies()\" />");
                $("#tbody").append("<input id=\"next\" type=\"button\" name=" + data.next  + " value =\"Page suivante\" onclick=\"suiteSpecies()\" />");
            }
            else
            {
                $( "#previous" ).remove();
                $( "#next" ).remove();
                $("#tbody").append("<input id=\"previous\" type=\"button\" name=" + data.previous  + " value =\"Page previous\" onclick=\"previousSpecies()\" />");
            }
        },
        error: function()
        {
            alert('La requête n\'a pas abouti - PAGE 2 ');
        }
      }
  );
}

// permet d'afficher les 10 resultat precedent peut importe le nombre de valeur.
function previousSpecies()
{
    $( "td" ).remove();
    $.ajax(
      {
        type: 'GET',
        url: $("#previous").attr("name"),

        success: function(data)
        {
          $.each(
            data.results, function(key, value)
              {
                  $("#tbody").append("<tr><td id=\"name\">" + value.name + "</td><td id=\"classification\">" + value.classification + "</td><td id=\"designation\">"+value.designation+"</td><td id=\"average_height\">"+value.average_height+"</td><td id=\"average_lifespan\">"+value.average_lifespan+"</td><td id=\"language\">"+value.language+"</td></tr>");
              }
            );
            if(data.previous != null)
            {
                $( "#previous" ).remove();
                $( "#next" ).remove();


                $("#tbody").append("<input id=\"previous\" type=\"button\" name=" + data.previous  + " value =\"Page previous\" onclick=\"previousSpecies()\" />");
                $("#tbody").append("<input id=\"next\" type=\"button\" name=" + data.next  + " value =\"Page Suivante\" onclick=\"suiteSpecies()\" />");
            }
            else
            {
                $( "#previous" ).remove();
                $( "#next" ).remove();
                $("#tbody").append("<input id=\"next\" type=\"button\" name=" + data.next  + " value =\"Page Suivante\" onclick=\"suiteSpecies()\" />");
            }
        },
        error: function()
        {
            alert('La requête n\'a pas abouti - PAGE 2 ');
        }
      }
  );
}
