// au chargement de la page - affiche la premiere vague.
$( document ).ready(function() {
    $.ajax({
        type: 'GET',
        url: 'http://swapi.co/api/vehicles/',
        success: function(data) {
          setLocal('vehicles_page1', data);
          var vehicles_page1 = getLocal('vehicles_page1');
            $.each(vehicles_page1.results, function(key, value){
                $("#tbody").append("<tr><td>"+value.name+"</td><td>"+value.model+"</td><td>"+value.manufacturer+"</td><td>"+value.cost_in_credits+"</td><td>"+value.length+"</td><td>"+value.max_atmosphering_speed+"</td><td>"+value.crew+"</td><td>"+value.passengers+"</td><td>"+value.cargo_capacity+"</td><td>"+value.consumables+"</td></tr>");});
            if(data.next != "") {
                $("#tbody").append("<input id=\"next\" type=\"button\" name=" + data.next  + " value =\"Page Suivante\" onclick=\"suiteVehicles()\" />");
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
        var key = 'vehicles_page' + nextURL[35];
          setLocal(key, data);
          if(data.next != null) {
              preload(data.next);
        }},
  });
}

// permet d'afficher les 10 resultat suivant peut importe le nombre de valeur.
function suiteVehicles()
{
    $( "td" ).remove();
    var data = getLocal('vehicles_page'+$("#next").attr("name")[35]);
    $.each(
      data.results, function(key, value)
        {
            $("#tbody").append("<tr><td>"+value.name+"</td><td>"+value.model+"</td><td>"+value.manufacturer+"</td><td>"+value.cost_in_credits+"</td><td>"+value.length+"</td><td>"+value.max_atmosphering_speed+"</td><td>"+value.crew+"</td><td>"+value.passengers+"</td><td>"+value.cargo_capacity+"</td><td>"+value.consumables+"</td></tr>");
        }
      );
      if(data.next != null)
      {
          $( "#previous" ).remove();
          $( "#next" ).remove();
          $("#tbody").append("<input id=\"previous\" type=\"button\" name=" + data.previous  + " value =\"Page précédente\" onclick=\"previousVehicles()\" />");
          $("#tbody").append("<input id=\"next\" type=\"button\" name=" + data.next  + " value =\"Page suivante\" onclick=\"suiteVehicles()\" />");
      }
      else
      {
          $( "#previous" ).remove();
          $( "#next" ).remove();
          $("#tbody").append("<input id=\"previous\" type=\"button\" name=" + data.previous  + " value =\"Page previous\" onclick=\"previousVehicles()\" />");
      }
}

// permet d'afficher les 10 resultat precedent peut importe le nombre de valeur.
function previousVehicles()
{
    $( "td" ).remove();
    var data = getLocal('vehicles_page'+$("#previous").attr("name")[35]);
    $.each(
      data.results, function(key, value)
        {
            $("#tbody").append("<tr><td>"+value.name+"</td><td>"+value.model+"</td><td>"+value.manufacturer+"</td><td>"+value.cost_in_credits+"</td><td>"+value.length+"</td><td>"+value.max_atmosphering_speed+"</td><td>"+value.crew+"</td><td>"+value.passengers+"</td><td>"+value.cargo_capacity+"</td><td>"+value.consumables+"</td></tr>");
        }
      );
      if(data.previous != null)
      {
          $( "#previous" ).remove();
          $( "#next" ).remove();
          $("#tbody").append("<input id=\"previous\" type=\"button\" name=" + data.previous  + " value =\"Page previous\" onclick=\"previousVehicles()\" />");
          $("#tbody").append("<input id=\"next\" type=\"button\" name=" + data.next  + " value =\"Page Suivante\" onclick=\"suiteVehicles()\" />");
      }
      else
      {
          $( "#previous" ).remove();
          $( "#next" ).remove();
          $("#tbody").append("<input id=\"next\" type=\"button\" name=" + data.next  + " value =\"Page Suivante\" onclick=\"suiteVehicles()\" />");
      }
}

function setLocal(id, data){
  localStorage.setItem(id, JSON.stringify(data));
}
function getLocal(id){
  return JSON.parse(localStorage.getItem(id));
}
