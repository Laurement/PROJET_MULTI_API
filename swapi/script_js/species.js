function setLocal(id, data){
  localStorage.setItem(id, JSON.stringify(data));
}
function getLocal(id){
  return JSON.parse(localStorage.getItem(id));
}

// au chargement de la page - affiche la premiere vague.
$( document ).ready(function() {
    $.ajax({
      dataType: "json",
        type: 'GET',
        url: 'http://swapi.co/api/species/',
        success: function(data) {
            setLocal('species_page1', data);
            var species_page1 = getLocal('species_page1');
            $.each(species_page1.results, function(key, value){


                var species = {"name":value.name, "classification":value.classification, "designation":value.designation,"average_height":value.average_height, "average_lifespan":value.average_lifespan, "language":value.language};

                $("#tbody").append("<tr><td>"+ value.name +"</td><td>"+value.classification+"</td><td>"+value.designation+"</td><td>"+value.average_height+"</td><td>"+value.average_lifespan+"</td><td>"+value.language+"</td></tr>");});

            if(data.next != null) {
                $("#btnNavigation").append("<input id=\"next\" type=\"button\" name=" + data.next  + " value =\"Page Suivante\" onclick=\"suiteSpecies()\" />");
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
        var key = 'species_page' + nextURL[34];
          setLocal(key, data);
          var species_page1 = getLocal('species_page1');
          $.each(species_page1.results, function(key, value){


              var species = {"name":value.name, "classification":value.classification, "designation":value.designation,"average_height":value.average_height, "average_lifespan":value.average_lifespan, "language":value.language};

              });

          if(data.next != null) {


              preload(data.next);
          }},

      error: function() {
          alert('La requête n\'a pas abouti - PAGE 1');
      }
  });
}

// permet d'afficher les 10 resultat suivant peut importe le nombre de valeur.
function suiteSpecies()
{
  $( "td" ).remove();
  var data = getLocal('species_page'+$("#next").attr("name")[34]);
  $.each(
            data.results, function(key, value)
              {
                  $("#tbody").append("<tr><td>"+value.name+"</td><td>"+value.classification+"</td><td>"+value.designation+"</td><td>"+value.average_height+"</td><td>"+value.average_lifespan+"</td><td>"+value.language+"</td></tr>");
              }
            );
            if(data.next != null)
            {
                $( "#previous" ).remove();
                $( "#next" ).remove();
                $("#tbody").append("<input id=\"previous\" type=\"button\" name=" + data.previous  + " value =\"Page Precedente\" onclick=\"previousSpecies()\" />");
                $("#tbody").append("<input id=\"next\" type=\"button\" name=" + data.next  + " value =\"Page Suivante\" onclick=\"suiteSpecies()\" />");
            }
            else
            {
                $( "#previous" ).remove();
                $( "#next" ).remove();
                $("#tbody").append("<input id=\"previous\" type=\"button\" name=" + data.previous  + " value =\"Page Precedente\" onclick=\"previousSpecies()\" />");
            }
}

// permet d'afficher les 10 resultat precedent peut importe le nombre de valeur.
function previousSpecies()
{
  $( "td" ).remove();
  var data = getLocal('species_page'+$("#previous").attr("name")[34]);
  $.each(
    data.results, function(key, value)
      {
          $("#tbody").append("<tr><td>"+value.name+"</td><td>"+value.classification+"</td><td>"+value.designation+"</td><td>"+value.average_height+"</td><td>"+value.average_lifespan+"</td><td>"+value.language+"</td></tr>");
      }
    );
    if(data.previous != null)
    {
        $( "#previous" ).remove();
        $( "#next" ).remove();
        $("#tbody").append("<input id=\"previous\" type=\"button\" name=" + data.previous  + " value =\"Page Precedente\" onclick=\"previousSpecies()\" />");
        $("#tbody").append("<input id=\"next\" type=\"button\" name=" + data.next  + " value =\"Page Suivante\" onclick=\"suiteSpecies()\" />");
    }
    else
    {
        $( "#previous" ).remove();
        $( "#next" ).remove();
        $("#tbody").append("<input id=\"previous\" type=\"button\" name=" + data.next  + " value =\"Page Suivante\" onclick=\"previousSpecies()\" />");
    }
}

function searchSpecies()
{
  $("td").remove();
  $( "#previous" ).remove();
  $( "#next" ).remove();
  var test = "http://swapi.co/api/species/?search=" + $('#fieldValue').val();
  alert(test);
  $.ajax(
    {
      type: 'GET',
      url: 'http://swapi.co/api/species/?search=' + $('#fieldValue').val(),

      success: function(data)
      {
        $.each(
          data.results, function(key, value)
            {
                $("#tbody").append("<tr><td>"+value.name+"</td><td>"+value.classification+"</td><td>"+value.designation+"</td><td>"+value.average_height+"</td><td>"+value.average_lifespan+"</td><td>"+value.language+"</td></tr>");
            }
          );
      },
      error: function()
      {
        alert('La requête de recherche n\'a pas abouti');
      }
    }
  )
}
