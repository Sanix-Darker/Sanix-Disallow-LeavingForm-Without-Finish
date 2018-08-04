    var ids = new Array();

    function DisplayFormValues()
    {
        var formsCollection = document.getElementsByTagName("form");
        for(var j=0;j<formsCollection.length;j++)
        {
          console.log("Form:");
          var str = '';
          var elem = formsCollection[j].elements;
          for(var i = 0; i < elem.length; i++)
          {
            if(elem[i].type == "text" || elem[i].type == "number" || elem[i].type == "password" || elem[i].type == "checkbox" || elem[i].type == "radio"){
              ids.push(elem[i]);
              console.log(elem[i]);
            }
          } 
        }
    }
    DisplayFormValues();


    // Setting inut submit onsubmit 
    document.querySelectorAll('form input[type*=submit],form button[type*=submit]')
        .forEach((function(x){ x.setAttribute("onclick","needToConfirm = false;");}))

    var values = new Array();
    for (var i = 0; i<=ids.length; i++) {
      values.push('');
    }

    function populateArrays()
    {
      // assign the default values to the items in the values array
      for (var i = 0; i < ids.length; i++)
      {
        var elem = ids[i];
        if (elem)
          if (elem.type == 'checkbox' || elem.type == 'radio')
            values[i] = elem.checked;
          else
            values[i] = elem.value;
      }      
    }

    var needToConfirm = true;
    window.onbeforeunload = confirmExit;
    function confirmExit()
    {
      if (needToConfirm)
      {
        // check to see if any changes to the data entry fields have been made
        for (var i = 0; i < values.length; i++)
        {
          var elem = ids[i];
          if (elem)
            if ((elem.type == 'checkbox' || elem.type == 'radio')
                    && values[i] != elem.checked)
              return "You have attempted to leave this page.  If you have made any changes to the fields without clicking the Save button, your changes will be lost.  Are you sure you want to exit this page?";
            else if (!(elem.type == 'checkbox' || elem.type == 'radio') &&
                    elem.value != values[i])
              return "You have attempted to leave this page.  If you have made any changes to the fields without clicking the Save button, your changes will be lost.  Are you sure you want to exit this page?";
        }

        // no changes - return nothing      
      }
    }
    populateArrays();