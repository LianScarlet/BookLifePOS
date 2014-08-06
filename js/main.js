 var detail_list = [];
    var detail_index=0;
    var cid = "20166307";
    var detailapiP1="http://10.10.59.238:8080/"
    var detailapiP2="?v=view_cbookcase&cid=" + cid + "&";
    var searchapi="";
    var searchdata="";
    var mySource = [];
    var input_temp ="";



    $(function(){
      $( "#input_search" ).keyup(function(data) {
        var ele = $(this);
        var inputval = ele.val();

        if( inputval != "" && inputval != input_temp )
        {

          searchapi= detailapiP1 + "datafeedjson2.ashx" + detailapiP2 + 'Title=' + inputval;
          $.getJSON(searchapi, function(jstr) {
            // appen data to input element
            searchdata = jstr;
            appenData(ele,jstr);            
          });  
        }

        var splitsearch = inputval.split(',');
        if(data.keyCode==13 && (splitsearch[2] != undefined || inputval.length == 13 || inputval.length == 10))
        {
          searchresult();
        }  

        input_temp = inputval;

        $("#search").click(searchresult);
        $("#complete").click(dealcomplete);

        //搜尋結果
        function searchresult(){

          var splitsearch = $('#input_search').val().split(',');

          if(splitsearch[2] != undefined){

            $("#resultinfo").empty();

            $.each(searchdata.item, function(i, o) {

              if(o.OID == splitsearch[2]){
                var imgpath = "http://static.findbook.tw/image/book/"+o.ISBN+"/large",
                img_book = $('<img>').attr({
                  alt: o.Title,
                  src: imgpath
                }).addClass('book-img'),


                h3_title = $('<h3>').attr('id', 'title').addClass('book-info-tit').text(o.Title),
                p_bookinfo = $('<p>').html(o.ISBN+"<br/>"+o.Author+"<br/>"+o.Publisher+"<br/>"+o.PDate),
                infodiv = $('<div>').addClass('book-info').append(h3_title).append(p_bookinfo),
                
                div_box = $('<div>').addClass('content-tmplate').append(img_book).append(infodiv);

              

                $("#resultinfo").append(div_box);
                

                var lab_price = $('<label>').attr('for', 'price').text('售價'),
                inp_price = $('<input>').attr({
                  name: 'price',
                  id: 'price' 
                  }).focus(),
                lab_amount= $('<label>').attr('for', 'amount').text('數量'),
                inp_amount = $('<input>').attr({
                  name: 'amount',
                  id: 'amount',
                  value: '1' }),
                btn_ok = $('<button>').attr({
                  href: '#',
                  id: 'ok'
                }).addClass('btn btn-default').text('OK');

                $("#resultinfo").append(lab_price).append(inp_price).append('<br>')
                .append(lab_amount).append(inp_amount).append('<br>').append(btn_ok);


                inp_price.on('keyup', function(event) {
                 if(event.keyCode==13)inp_amount.focus();  
               });

                inp_amount.on('keyup', function(event) {
                 if(event.keyCode==13)btn_ok.focus();  
               });

                btn_ok.on('click', function(event) {
                 adddetail(o.OID);  
               });
              }
            }); 


$('#price').focus();
}else{

  $("#resultinfo").empty();
  var searchtxt = $("#input_search").val();

  if(searchtxt=="")
  {
    $("#resultinfo").empty();
    $("#resultinfo").append("<h4 class=\"content-tmplate\"> 請輸入 ISBN 或 書名 </h4>");

  }else{

    searchapi= detailapiP1 + "datafeedjson.ashx" + detailapiP2 + 'ISBN=' + searchtxt;

    $.getJSON(searchapi, function(jstr) {
      if(jstr.item.length == 1){

        var imgpath = "http://static.findbook.tw/image/book/"+jstr.item[0].ISBN+"/large",
                img_book = $('<img>').attr({
                  alt: jstr.item[0].Title,
                  src: imgpath
                }).addClass('book-img'),


                h3_title = $('<h3>').attr('id', 'title').addClass('book-info-tit').text(jstr.item[0].Title),
                p_bookinfo = $('<p>').html(jstr.item[0].ISBN+"<br/>"+jstr.item[0].Author+"<br/>"+jstr.item[0].Publisher+"<br/>"+jstr.item[0].PDate),
                infodiv = $('<div>').addClass('book-info').append(h3_title).append(p_bookinfo),
                
                div_box = $('<div>').addClass('content-tmplate').append(img_book).append(infodiv);

              

                $("#resultinfo").append(div_box);

        /*var imgpath = "http://static.findbook.tw/image/book/"+jstr.item[0].ISBN+"/large",
        img_book = $('<img>').attr({
          alt: jstr.item[0].Title,
          src: imgpath
        }).css({
          margin: '10px',
          height: '120px',
          float: 'left'
        }),
        h3_title = $('<h3>').attr('id', 'title').text(jstr.item[0].Title),
        p_bookinfo = $('<p>').html(jstr.item[0].ISBN+"<br/>"+jstr.item[0].Author+"<br/>"+jstr.item[0].Publisher+"<br/>"+jstr.item[0].PDate),
        div_box = $('<div>').css({
          border: '1px solid',
          padding: '0px 15px'
        }).addClass('content-tmplate').append(img_book).append(h3_title).append(p_bookinfo);
        $("#resultinfo").append(div_box);*/


        var lab_price = $('<label>').attr('for', 'price').text('售價'),
        inp_price = $('<input>').attr({
          name: 'price',
          id: 'price' }).focus(),
        lab_amount= $('<label>').attr('for', 'amount').text('數量'),
        inp_amount = $('<input>').attr({
          name: 'amount',
          id: 'amount' ,
          value: '1'}),
        btn_ok = $('<button>').attr({
          href: '#',
          id: 'ok'
        }).addClass('btn btn-default').text('OK');

        $("#resultinfo").append(lab_price).append(inp_price).append('<br>')
        .append(lab_amount).append(inp_amount).append('<br>').append(btn_ok);


        btn_ok.click(adddetail(jstr.item[0].OID));

        inp_price.on('keyup', function(event) {
         if(event.keyCode==13)inp_amount.focus();  
       });

        inp_amount.on('keyup', function(event) {
         if(event.keyCode==13)btn_ok.focus();  
       });
        btn_ok.on('click', function(event) {
         adddetail(jstr.item[0].OID);  
       });

      }else{
        $("#resultinfo").append("<h3 class=\"content-tmplate\"> No Result </h3>");
      }
    });
}
}
$('#input_search').val('');
}
});


    //auto complete
    function appenData (ele,data){
      console.log(ele,data);
      mySource = [] ;
      for(var i=0;i<data.item.length;i++)
        mySource.push( { id : data.item[i].OID, name : data.item[i].Title + "," + data.item[i].Publisher + "," + data.item[i].OID});
      console.log(mySource);
      ele.typeahead().data('typeahead').source=mySource;
      ele.typeahead({ source: mySource}).data('typeahead').lookup();
    }
  });

    //增加清單資料
    function adddetail(oid){
      var btitle = $("#title").text();
      var bprice = $("#price").val();
      var bamount = $("#amount").val();

      if($.isNumeric(bprice) && $.isNumeric(bamount))
      {

        detail_list.push({ OID : oid, Title : btitle, Price : parseInt(bprice), Amount : bamount});
        $("#resultinfo").empty();
        $('#input_search').focus();

      }else{
       if($('#price').val() == "")
       {
        $('#price').focus();
      }else{
        $('#amount').focus();
      }
    }
    showdetail();
  }
    //刪除所選清單資料
    function deldetail(index){
      //alert();
      for(var i=0; i <detail_list.length; i++)
      {
        if ( index == detail_list[i].OID ){
          detail_list.splice(i,1);
          break;
        }
      }
      showdetail();

    }
    //顯示購買清單
    function showdetail(){
      $("#detailtable").empty();
      //$("#detailtable").append("<tr></tr>");
      for(var i=detail_list.length-1;i>=0;i--){      
        /*var icon_del = $('i').addClass('fa fa-times');
        var btn_del = $('<button>').append(icon_del);

        var td_del = $('<td>').append(btn_del);*/
        var td_del = $('<td>').html("<button onclick=\"+ deldetail("+ detail_list[i].OID +") \"><i class=\"fa fa-times\"></i></button>");
        var td_title = $('<td>').text(detail_list[i].Title);
        var td_price = $('<td>').attr({
          id: 'price' + i }).text(detail_list[i].Price);
        var td_amount = $('<td>').attr({
          id: 'amount' + i }).text(detail_list[i].Amount);
        var tr_row = $('<tr>');
        if(i==detail_list.length-1) tr_row.addClass('tr-focus');
        tr_row.append(td_del).append(td_title).append(td_price).append(td_amount)
        $("#detailtable").append(tr_row);
        //(function(ele,index){
            //ele.click(deldetail(index));
        //})(btn_del,detail_list[i].OID);
}
totalcost();
}
    // 顯示總價
    function totalcost(){

      var total = 0;
      var price = 0;
      var amount = 0;

      for(var i=0;i<detail_list.length;i++)
      {
        price = document.getElementById("price"+i).textContent;
        amount = document.getElementById("amount"+i).textContent;
        total += price * amount;
      }
      document.getElementById("totalprice").innerHTML = 'NT$ ' + total;
    }

    function dealcomplete(){
      $("#detailtable").empty();
      //$("#detailtable").append("<tr></tr>");
      detail_list = [];
      totalcost();
      $('#input_search').val('');;
    }


