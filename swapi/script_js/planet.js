// au chargement de la page - affiche la premiere vague.
$( document ).ready(function() {
    $.ajax({
        type: 'GET',
        url: 'http://swapi.co/api/planets/',
        success: function(data) {
            $.each(data.results, function(key, value){
                $("#tbody").append("<tr><td id=\"name\">" + value.name + "</td><td id=\"rotation_period\">" + value.rotation_period + "</td><td id=\"orbital_period\">"+value.orbital_period+"</td><td id=\"diameter\">"+value.diameter+"</td><td id=\"climate\">"+value.climate+"</td><td id=\"gravity\">"+value.gravity+"</td><td id=\"terrain\">"+value.terrain+"</td><td id=\"surface_water\">"+value.surface_water+"</td><td id=\"population\">"+value.population+"</td></tr>");});
            if(data.next != "") {
                $("#btnNavigation").append("<input id=\"next\" type=\"button\" name=" + data.next  + " value =\"Page Suivante\" onclick=\"suitePlanets()\" />");
            }},
        error: function() {
            alert('La requête n\'a pas abouti - PAGE 1');
        }
    });
});

// permet d'afficher les 10 resultat suivant peut importe le nombre de valeur.
function suitePlanets()
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
                  $("#tbody").append("<tr><td id=\"name\">" + value.name + "</td><td id=\"rotation_period\">" + value.rotation_period + "</td><td id=\"orbital_period\">"+value.orbital_period+"</td><td id=\"diameter\">"+value.diameter+"</td><td id=\"climate\">"+value.climate+"</td><td id=\"gravity\">"+value.gravity+"</td><td id=\"terrain\">"+value.terrain+"</td><td id=\"surface_water\">"+value.surface_water+"</td><td id=\"population\">"+value.population+"</td></tr>");
              }
            );
            if(data.next != null)
            {
                $( "#previous" ).remove();
                $( "#next" ).remove();
                $("#tbody").append("<input id=\"previous\" type=\"button\" name=" + data.previous  + " value =\"Page précédente\" onclick=\"previousPlanets()\" />");
                $("#tbody").append("<input id=\"next\" type=\"button\" name=" + data.next  + " value =\"Page suivante\" onclick=\"suitePlanets()\" />");
            }
            else
            {
                $( "#previous" ).remove();
                $( "#next" ).remove();
                $("#tbody").append("<input id=\"previous\" type=\"button\" name=" + data.previous  + " value =\"Page previous\" onclick=\"previousPlanets()\" />");
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
function previousPlanets()
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
                  $("#tbody").append("<tr><td id=\"name\">" + value.name + "</td><td id=\"rotation_period\">" + value.rotation_period + "</td><td id=\"orbital_period\">"+value.orbital_period+"</td><td id=\"diameter\">"+value.diameter+"</td><td id=\"climate\">"+value.climate+"</td><td id=\"gravity\">"+value.gravity+"</td><td id=\"terrain\">"+value.terrain+"</td><td id=\"surface_water\">"+value.surface_water+"</td><td id=\"population\">"+value.population+"</td></tr>");
              }
            );
            if(data.previous != null)
            {
                $( "#previous" ).remove();
                $( "#next" ).remove();


                $("#tbody").append("<input id=\"previous\" type=\"button\" name=" + data.previous  + " value =\"Page previous\" onclick=\"previousPlanets()\" />");
                $("#tbody").append("<input id=\"next\" type=\"button\" name=" + data.next  + " value =\"Page Suivante\" onclick=\"suitePlanets()\" />");
            }
            else
            {
                $( "#previous" ).remove();
                $( "#next" ).remove();
                $("#tbody").append("<input id=\"next\" type=\"button\" name=" + data.next  + " value =\"Page Suivante\" onclick=\"suitePlanets()\" />");
            }
        },
        error: function()
        {
            alert('La requête n\'a pas abouti - PAGE 2 ');
        }
      }
  );
}
