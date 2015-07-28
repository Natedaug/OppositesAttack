<!--


  /*
   * JavaScript Blog System 1.0
   * Copyright (C) 2004, Martin Ultima.  All rights reserved.
   *
   * This script will let you create a "blog" (weblog) with nothing but
   * JavaScript.  It's not as easy to post as PHP-based blogs, like most people
   * use, but it's more flexible and customizable - and it's free.
   *
   * This program is free software; you can redistribute it and/or
   * modify it under the terms of the GNU General Public License
   * as published by the Free Software Foundation; either version 2
   * of the License, or (at your option) any later version.
   *
   * This program is distributed in the hope that it will be useful,
   * but WITHOUT ANY WARRANTY; without even the implied warranty of
   * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
   * GNU General Public License for more details.
   *
   * You should have received a copy of the GNU General Public License
   * along with this program; if not, write to the Free Software
   * Foundation, Inc., 675 Mass Ave, Cambridge, MA 02139, USA.
   */

/*
  function page_header() {

    var header = "";

    header += "<html>";

    header += "<head>";
    header += "  <title>The JavaScript Blog System</title>";
    header += "  <link rel=StyleSheet type=Text/CSS href=blog.css>";
    header += "</head>";

    header += "<body><center>";

    header += "<table width=75% border=0>";

    header += "<tr>";
    header += "  <td width=100% align=left valign=middle class=blogheading>";
    header += "    <p>&nbsp;";
    header += "  </td>";
    header += "</tr>";

    header += "<tr>";
    header += "  <td width=100% align=center valign=middle class=blogentry>";
    header += "    <p><a href=page1.html target=_blank><img src=logo.png alt=\"The JavaScript Blog System\" title=\"The JavaScript Blog System\" border=0></a>";
    header += "  </td>";
    header += "</tr>";

    return header;

  }
*/

  function add_entry(date,heading,entry) {

    var entrytext = "";
    entrytext += "<div class='hfeed valign2'><article class='entry post imagePost'><div class='entry-content'>";
   
    //entrytext += "<table class='table table-striped'>";

    //entrytext += "<tr>";
    //entrytext += "  <td class='bloghead'>";
    entrytext += "<p class='blogDate'>[" + date + "]</p>"; 
    entrytext += "<h3><sample>" + heading + "</sample></h3>";
    //entrytext += "  </td>";
    //entrytext += "</tr>";

    //entrytext += "<tr>";
    entrytext += "  <p>";
    entrytext +=      entry;
    entrytext += "  </p>";
    //entrytext += "</tr>";
   // entrytext += "</table>"
   
    entrytext += "&nbsp</div></article><div>";
    return entrytext;

  }

/*
  function page_footer() {

    var footer = "";

    footer += "<tr>";
    footer += "  <td width=100% align=center valign=middle>";
    footer += "    <p>&nbsp;";
    footer += "  </td>";
    footer += "</tr>";

    footer += "<tr>";
    footer += "  <td width=100% align=left valign=middle class=blogheading>";
    footer += "    <p>&nbsp;";
    footer += "  </td>";
    footer += "</tr>";

    footer += "<tr>";
    footer += "  <td width=100% align=center valign=middle class=blogentry>";
    footer += "    <p>Copyright &copy; yyyy, Your Name.  All rights reserved.";
    footer += "  </td>";
    footer += "</tr>";

    footer += "</table>";

    footer += "</center></body>";

    footer += "</html>";

    return footer;

  }*/

//page_header();

//my code
var $overlay = $("<div id = 'overlay'></div>");
var $postForm;
var postForm = "<div class='jumbotron' id='jumboForm'>";

postForm += "<form class='form-horizontal' role='form' action='/blog.json' method ='post' id='usrForm'>";
//header
postForm +=   "<div class='form-group'>";
postForm +=     "<label for='blogheading' class='col-sm-2 control-label'>Heading</label>";
postForm +=       "<input type='text' class='form-control' name='heading' id='blogheading'>";
postForm +=   '</div>';
//message
postForm +=   '<div class="form-group">';
postForm +=     '<label for="blogmessage" class="col-sm-2 control-label">Message</label>';
postForm +=       '<textarea class="form-control" id="blogmessage" name = "message" rows="5"></textarea>';
postForm +=   '</div>';
//submit button
postForm +=   '<div class="form-group">';
postForm +=       '<button type="submit" class="btn btn-default" id="postbtn">Post</button>';
postForm +=   '</div>';
postForm += "</form>";

postForm += "</div>"

$postForm = $(postForm);

$overlay.append($postForm);
$("body").append($overlay);

$("#write").click(function(e){
  $overlay.show();
  //cant seem to focus on blogheading
});

var url = "/blog.json"; 
var date ="xx/xx/xxxx"
var entry;
/*reads everrything from the blog.json file
$.getJSON(url, function (response) {
  $.each(response, function(index, blog){
    console.log("Heres the blog" + blog);
    $("#blogbody").append(add_entry(date,blog.heading,blog.message));
  });//end each
}).fail(function (jqXHR) {
    alert(jqXHR.statusText); 
  }); //end getJSON*/

$("form").submit(function(e){
  e.preventDefault();
  $overlay.hide();
  entry = add_entry(date,this.heading.value,this.message.value);
  console.log(entry);
  $("#blogBody").prepend(add_entry(date,this.heading.value,this.message.value));
  this.heading.value = "";
  this.message.value = "";
  /*var formData = $(this).serialize();
  var formData =  $("form").serialize();
  console.log(formData);
  $.post( "json.php" , formData , function(response){alert("success!");}).fail(function (jqXHR) {
    alert(jqXHR.statusText); 
  });// end post*/
    

});//end of form submit

$.fn.serializeObject = function()
{
    var o = {};
    var a = this.serializeArray();
    $.each(a, function() {
        if (o[this.name] !== undefined) {
            if (!o[this.name].push) {
                o[this.name] = [o[this.name]];
            }
            o[this.name].push(this.value || '');
        } else {
            o[this.name] = this.value || '';
        }
    });
    return o;
};
