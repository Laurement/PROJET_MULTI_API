// au chargement de la page - affiche la premiere vague.
$( document ).ready(function() {
    $.ajax({
        type: 'GET',
        url: 'http://swapi.co/api/starships/',
        success: function(data) {
            $.each(data.results, function(key, value){
                $("#tbody").append("<tr><td id=\"name\">" + value.name + "</td><td id=\"model\">" + value.model + "</td><td id=\"manufacturer\">"+value.manufacturer+"</td><td id=\"cost_in_credits\">"+value.cost_in_credits+"</td><td id=\"length\">"+value.length+"</td><td id=\"max_atmosphering_speed\">"+value.max_atmosphering_speed+"</td><td id=\"crew\">"+value.crew+"</td><td id=\"passengers\">"+value.passengers+"</td><td id=\"cargo_capacity\">"+value.cargo_capacity+"</td><td id=\"consumables\">"+value.consumables+"</td><td id=\"hyperdrive_rating\">"+value.hyperdrive_rating+"</td><td id=\"MGLT\">"+value.MGLT+"</td><td id=\"starship_class\">"+value.starship_class+"</td></tr>");}); //pilots
            if(data.next != "") {
                $("#tbody").append("<input id=\"next\" type=\"button\" name=" + data.next  + " value =\"Page Suivante\" onclick=\"suitestarships()\" />");
            }},
        error: function() {
            alert('La requête n\'a pas abouti - PAGE 1');
        }
    });
});

// permet d'afficher les 10 resultat suivant peut importe le nombre de valeur.
function suitestarships()
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
                  $("#tbody").append("<tr><td id=\"name\">" + value.name + "</td><td id=\"model\">" + value.model + "</td><td id=\"manufacturer\">"+value.manufacturer+"</td><td id=\"cost_in_credits\">"+value.cost_in_credits+"</td><td id=\"length\">"+value.length+"</td><td id=\"max_atmosphering_speed\">"+value.max_atmosphering_speed+"</td><td id=\"crew\">"+value.crew+"</td><td id=\"passengers\">"+value.passengers+"</td><td id=\"cargo_capacity\">"+value.cargo_capacity+"</td><td id=\"consumables\">"+value.consumables+"</td><td id=\"hyperdrive_rating\">"+value.hyperdrive_rating+"</td><td id=\"MGLT\">"+value.MGLT+"</td><td id=\"starship_class\">"+value.starship_class+"</td></tr>"); //pilots
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
        },
        error: function()
        {
            alert('La requête n\'a pas abouti - PAGE 2 ');
        }
      }
  );
}

// permet d'afficher les 10 resultat precedent peut importe le nombre de valeur.
function previousstarships()
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
                  $("#tbody").append("<tr><td id=\"name\">" + value.name + "</td><td id=\"model\">" + value.model + "</td><td id=\"manufacturer\">"+value.manufacturer+"</td><td id=\"cost_in_credits\">"+value.cost_in_credits+"</td><td id=\"length\">"+value.length+"</td><td id=\"max_atmosphering_speed\">"+value.max_atmosphering_speed+"</td><td id=\"crew\">"+value.crew+"</td><td id=\"passengers\">"+value.passengers+"</td><td id=\"cargo_capacity\">"+value.cargo_capacity+"</td><td id=\"consumables\">"+value.consumables+"</td><td id=\"hyperdrive_rating\">"+value.hyperdrive_rating+"</td><td id=\"MGLT\">"+value.MGLT+"</td></tr>"); //pilots
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
        },
        error: function()
        {
            alert('La requête n\'a pas abouti - PAGE 2 ');
        }
      }
  );
}
