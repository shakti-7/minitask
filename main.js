var dat = [];
var showing = [];
var sorting = [];
var rest = [];
var i,j;
var flag;
var disp = document.querySelector("#content");
var all = document.querySelector("#showall");
var sortb = document.querySelector("#sortby");
var place = document.querySelector("#country");
var topt = document.querySelector("#topt");

var getJSON = function(url,callback){
    var xhr = new XMLHttpRequest();
    xhr.open('GET',url,true);
    xhr.responseType="json";
    xhr.onload = function(){
        var status = xhr.status;
        if(status ==200){
            callback(null,xhr.response);
        }else{
            callback(status);
        }
    };
    xhr.send();
};
getJSON("https://api.jsonbin.io/b/5ea441ca98b3d53752344cc5",function(err,data){
    if(err!=null){
        console.error(err);
    }else{
        dat = data;
        show();
    }
});

function show(){
    for(i=0;i<37;i++){
        make(i);
    }
}

function make(i){
    showing.push(i);
    var div1 = document.createElement('div');
    div1.className = "sho"
    var brand = document.createElement('p');
    brand.innerHTML = "<b>" + dat[i].Brand + "</b>";
    div1.appendChild(brand);
    var stars = document.createElement('p');
    if(dat[i].Stars == "NaN"){
        stars.innerHTML = "No rating available";
    }else{
        for(j=0;j<Math.floor(dat[i].Stars);j++){
           stars.innerHTML = stars.innerHTML + '<i class="fa fa-star"></i>';
        }
        if(Math.floor(dat[i].Stars)!=dat[i].Stars){
            stars.innerHTML = stars.innerHTML + '<i class="fa fa-star-half-o"></i>';
        }
    }
    div1.appendChild(stars);
    var variety = document.createElement('p');
    variety.innerHTML = "<b>Variety</b> : " + dat[i].Variety;
    div1.appendChild(variety);
    var style = document.createElement('p');
    style.innerHTML = "<b>Style</b> : " + dat[i].Style;
    div1.appendChild(style);
    var country = document.createElement('p');
    country.innerHTML = "<b>Country</b> : " + dat[i].Country;
    div1.appendChild(country);
    var topten = document.createElement('p');
    if(dat[i].TopTen == "NaN"){
        topten.innerHTML = "No record of previous ranking";
    }else{
        topten.innerHTML = "No. " + dat[i].TopTen[6] + " in " + dat[i].TopTen[0] + dat[i].TopTen[1] + dat[i].TopTen[2] + dat[i].TopTen[3];
    }
    div1.appendChild(topten);
    disp.appendChild(div1);    
    var line = document.createElement('hr');
    disp.appendChild(line);
}

all.addEventListener('click',function(){
    showing = [];
    place.selectedIndex = 0;
    sortb.selectedIndex = 0;
    topt.selectedIndex = 0;
    disp.innerHTML = "";
    show(); 
});

function sort(){
    if(showing.length>0){
        var x = sortb.value;
        var temp;
        if(x==="Stars"){
            for(i=0;i<showing.length;i++){
                if(dat[showing[i]].Stars!="NaN"){
                    sorting.push(showing[i]);
                }else{
                    rest.push(showing[i]);
                }
            }
            disp.innerHTML = "";
            showing = [];
            for(i=0;i<sorting.length-1;i++){
                var loc = i;
                for(j=i+1;j<sorting.length;j++){
                    if(dat[sorting[j]].Stars>dat[sorting[loc]].Stars){
                        loc = j;
                    }
                }
                temp = sorting[loc];
                sorting[loc] = sorting[i];
                sorting[i] = temp;
            }
            for(i=0;i<sorting.length;i++){
                make(sorting[i]);
            }
            for(i=0;i<rest.length;i++){
                make(rest[i]);
            }
            sorting = [];
            rest = [];
        }else if(x==="Name"){
            for(i=0;i<showing.length;i++){
                sorting[i]=showing[i];
            }
            disp.innerHTML = "";
            showing = [];
            for(i=0;i<sorting.length-1;i++){
                var loc = i;
                for(j=i+1;j<sorting.length;j++){
                    if(dat[sorting[j]].Brand<dat[sorting[loc]].Brand){
                        loc = j;
                    }
                }
                temp = sorting[loc];
                sorting[loc] = sorting[i];
                sorting[i] = temp;
            }
            for(i=0;i<sorting.length;i++){
                make(sorting[i]);
            }
            sorting = [];
        }else if(x==="Country"){
            for(i=0;i<showing.length;i++){
                sorting[i]=showing[i];
            }
            disp.innerHTML = "";
            showing = [];
            for(i=0;i<sorting.length-1;i++){
                var loc = i;
                for(j=i+1;j<sorting.length;j++){
                    if(dat[sorting[j]].Country<dat[sorting[loc]].Country){
                        loc = j;
                    }
                }
                temp = sorting[loc];
                sorting[loc] = sorting[i];
                sorting[i] = temp;
            }
            for(i=0;i<sorting.length;i++){
                make(sorting[i]);
            }
            sorting = [];
        }
    }
}

function loc(){
    var x = place.value;
    showing = [];
    disp.innerHTML = "";
    topt.selectedIndex = 0;
    if(x==="All"){
        show();
    }else{
        for(i=0;i<37;i++){
            if(x.toUpperCase()==dat[i].Country.toUpperCase()){
                make(i);
            }
        }
        if(x=="Singapore"){
            for(i=0;i<37;i++){
                if("SG"==dat[i].Country.toUpperCase()){
                    make(i);
                }
            }
        }
        if(x=="Japan"){
            for(i=0;i<37;i++){
                if(dat[i].Country.toUpperCase()=="JPN"){
                    make(i);
                }
            }
        }
    }
    sort();
}

function year(){
    var x = topt.value;
    showing = [];
    disp.innerHTML = [];
    place.selectedIndex = 0;
    if(x==="None"){
        show();
    }else{
        for(i=0;i<37;i++){
            if(x==dat[i].TopTen[0]+dat[i].TopTen[1]+dat[i].TopTen[2]+dat[i].TopTen[3]){
                make(i);
            }
        }
    }
    sort();
}

$(document).ready(function(){
    $("input").on("keyup", function() {
      var value = $(this).val();
      if(value==''){
          disp.innerHTML="";
          showing=[];
          show();
      }else{
      showing = [];
      flag = 0;
      disp.innerHTML= "";
      for(i=0;i<37;i++){
          if(dat[i].Brand.toUpperCase().search(value.toUpperCase())!=-1){
              make(i);
              flag = 1;
          }
      }
      if(flag == 0){
          disp.innerHTML = "Sorry we couldn't find the restaurant you were looking for :(";
      }else{
          sort();
      }
    }
    });
});
