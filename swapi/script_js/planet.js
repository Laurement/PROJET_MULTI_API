// au chargement de la page - affiche la premiere vague.
$( document ).ready(function() {
    $.ajax({
        type: 'GET',
        url: 'http://swapi.co/api/planets/',
        success: function(data) {
          setLocal('planets_page1', data);
          var planets_page1 = getLocal('planets_page1');
            $.each(planets_page1.results, function(key, value){
                $("#tbody").append("<tr><td>"+value.name+"</td><td>"+value.rotation_period+"</td><td>"+value.orbital_period+"</td><td>"+value.diameter+"</td><td>"+value.climate+"</td><td>"+value.gravity+"</td><td>"+value.terrain+"</td><td>"+value.surface_water+"</td><td>"+value.population+"</td></tr>");});
            if(data.next != "") {
                $("#tbody").append("<input id=\"next\" type=\"button\" name=" + data.next  + " value =\"Page Suivante\" onclick=\"suitePlanets()\" />");
                preload(data.next);
            }},
        error: function() {
            alert('La requête n\'a pas abouti - PAGE 1');
        }
    });
});

function preload(nextURL){
  var nextURL = nextURL;
  $.ajax({
    dataType: "json",
      type: 'GET',
      url: nextURL,
      success: function(data) {
        var key = 'planets_page' + nextURL[34];
        setLocal(key, data);
        if(data.next != null) {
          preload(data.next);
      }},
  });
}


// permet d'afficher les 10 resultat suivant peut importe le nombre de valeur.
function suitePlanets()
{
    $( "td" ).remove();
    var data = getLocal('planets_page'+$("#next").attr("name")[34]);
    $.each(
      data.results, function(key, value)
        {
            $("#tbody").append("<tr><td>"+value.name+"</td><td>"+value.rotation_period+"</td><td>"+value.orbital_period+"</td><td>"+value.diameter+"</td><td>"+value.climate+"</td><td>"+value.gravity+"</td><td>"+value.terrain+"</td><td>"+value.surface_water+"</td><td>"+value.population+"</td></tr>");
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
}

// permet d'afficher les 10 resultat precedent peut importe le nombre de valeur.
function previousPlanets()
{
    $( "td" ).remove();
    var data = getLocal('planets_page'+$("#previous").attr("name")[34]);
    $.each(
      data.results, function(key, value)
        {
            $("#tbody").append("<tr><td>"+value.name+"</td><td>"+value.rotation_period+"</td><td>"+value.orbital_period+"</td><td>"+value.diameter+"</td><td>"+value.climate+"</td><td>"+value.gravity+"</td><td>"+value.terrain+"</td><td>"+value.surface_water+"</td><td>"+value.population+"</td></tr>");
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
}

function setLocal(id, data){
  localStorage.setItem(id, JSON.stringify(data));
}
function getLocal(id){
  return JSON.parse(localStorage.getItem(id));
}
