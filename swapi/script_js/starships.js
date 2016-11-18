// au chargement de la page - affiche la premiere vague.
$( document ).ready(function() {
    $.ajax({
        type: 'GET',
        url: 'http://swapi.co/api/starships/',
        success: function(data) {
          setLocal('starships_page1', data);
          var starships_page1 = getLocal('starships_page1');
            $.each(starships_page1.results, function(key, value){
                $("#tbody").append("<tr><td>"+value.name+"</td><td>"+value.model+"</td><td>"+value.manufacturer+"</td><td>"+value.cost_in_credits+"</td><td>"+value.length+"</td><td>"+value.max_atmosphering_speed+"</td><td>"+value.crew+"</td><td>"+value.passengers+"</td><td>"+value.cargo_capacity+"</td><td>"+value.consumables+"</td><td>"+value.hyperdrive_rating+"</td><td>"+value.MGLT+"</td><td>"+value.starship_class+"</td></tr>");}); //pilots
            if(data.next != "") {
                $("#tbody").append("<input id=\"next\" type=\"button\" name=" + data.next  + " value =\"Page Suivante\" onclick=\"suitestarships()\" />");
                preload(data.next);
            }},
        error: function() {
            alert('La requête n\'a pas abouti - PAGE 1');
        }
    });
});

function preload(nextURL){
  var nextURL = nextURL;
  debugger;
  $.ajax({
    dataType: "json",
      type: 'GET',
      url: nextURL,
      success: function(data) {
        var key = 'starships_page' + nextURL[36];
        setLocal(key, data);
        var starships_page1 = getLocal('starships_page1');
        if(data.next != null) {
            preload(data.next);
      }},
  });
}


// permet d'afficher les 10 resultat suivant peut importe le nombre de valeur.
function suitestarships()
{
    $( "td" ).remove();
    var data = getLocal('starships_page'+$("#next").attr("name")[36]);
    $.each(
      data.results, function(key, value)
        {
            $("#tbody").append("<tr><td>"+value.name+"</td><td>"+value.model+"</td><td>"+value.manufacturer+"</td><td>"+value.cost_in_credits+"</td><td>"+value.length+"</td><td>"+value.max_atmosphering_speed+"</td><td>"+value.crew+"</td><td>"+value.passengers+"</td><td>"+value.cargo_capacity+"</td><td>"+value.consumables+"</td><td>"+value.hyperdrive_rating+"</td><td>"+value.MGLT+"</td><td>"+value.starship_class+"</td></tr>");
        }
      );
      if(data.next != null)
      {
          $( "#previous" ).remove();
          $( "#next" ).remove();
          $("#tbody").append("<input id=\"previous\" type=\"button\" name=" + data.previous  + " value =\"Page précédente\" onclick=\"previousstarships()\" />");
          $("#tbody").append("<input id=\"next\" type=\"button\" name=" + data.next  + " value =\"Page suivante\" onclick=\"suitestarships()\" />");
      }
      else
      {
          $( "#previous" ).remove();
          $( "#next" ).remove();
          $("#tbody").append("<input id=\"previous\" type=\"button\" name=" + data.previous  + " value =\"Page previous\" onclick=\"previousstarships()\" />");
      }
}

// permet d'afficher les 10 resultat precedent peut importe le nombre de valeur.
function previousstarships()
{
    $( "td" ).remove();
    var data = getLocal('starships_page'+$("#previous").attr("name")[36]);
    $.each(
      data.results, function(key, value)
        {
            $("#tbody").append("<tr><td>"+value.name+"</td><td>"+value.model+"</td><td>"+value.manufacturer+"</td><td>"+value.cost_in_credits+"</td><td>"+value.length+"</td><td>"+value.max_atmosphering_speed+"</td><td>"+value.crew+"</td><td>"+value.passengers+"</td><td>"+value.cargo_capacity+"</td><td>"+value.consumables+"</td><td>"+value.hyperdrive_rating+"</td><td>"+value.MGLT+"</td><td>"+value.starship_class+"</td></tr>");
        }
      );
      if(data.previous != null)
      {
          $( "#previous" ).remove();
          $( "#next" ).remove();
          $("#tbody").append("<input id=\"previous\" type=\"button\" name=" + data.previous  + " value =\"Page previous\" onclick=\"previousstarships()\" />");
          $("#tbody").append("<input id=\"next\" type=\"button\" name=" + data.next  + " value =\"Page Suivante\" onclick=\"suitestarships()\" />");
      }
      else
      {
          $( "#previous" ).remove();
          $( "#next" ).remove();
          $("#tbody").append("<input id=\"next\" type=\"button\" name=" + data.next  + " value =\"Page Suivante\" onclick=\"suitestarships()\" />");
      }
}

function setLocal(id, data){
  localStorage.setItem(id, JSON.stringify(data));
}
function getLocal(id){
  return JSON.parse(localStorage.getItem(id));
}
