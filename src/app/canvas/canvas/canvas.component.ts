import { Component, OnInit, ViewChild, ViewContainerRef, ComponentFactoryResolver, HostListener } from '@angular/core';
import { FormGroup, FormControl, FormArray } from '@angular/forms';
import * as $ from 'jquery';
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';
import { getLocaleId } from '@angular/common';
import { keys } from 'ts-transformer-keys';
import { HttpClient } from '@angular/common/http';
import { AlertsService } from 'angular-alert-module';
import { parse } from 'querystring';

@Component({
  selector: 'app-canvas',
  templateUrl: './canvas.component.html',
  styleUrls: ['./canvas.component.css']
})
export class CanvasComponent implements OnInit {

  constructor(private http: HttpClient, private alerts: AlertsService) { }

 

ngOnInit() {
  this.createForm();
//this.createStartElement();
//this.selectSize()
//this.createElement();
//this.drawBoard();

this.alerts.setMessage('All the fields are required','error');
this.alerts.setMessage('Configurations saved successfully!','success');
this.alerts.setMessage('Please save all the changes before closing','warn');
}

//==================CREATE NEW ELEMENT========================
count = 0; 
topPositon = 50;
createElement() {                
       let newDiv = document.createElement("div");       
       newDiv.setAttribute("id", "block" + this.count);
       newDiv.setAttribute("draggable", "true");       
      // newDiv.className = "block";       
      // newDiv.className = this.currentMinutia.name[0]; 
       newDiv.setAttribute("class", this.currentMinutia.name[0]);
       newDiv.setAttribute("name", "block");
       newDiv.setAttribute("data-toggle", "tooltip"); 
       newDiv.setAttribute("title", this.currentMinutia.name[0]);
       newDiv.setAttribute("coordinates", " ");
       newDiv.setAttribute("description", this.currentMinutia.description[0]);
      newDiv.style.setProperty("border-radius", "10px");
      newDiv.style.setProperty("position", "absolute");
      newDiv.style.setProperty("width", "10px");
      newDiv.style.setProperty("height", "10px");
      newDiv.style.setProperty("left", "535px");
      newDiv.style.setProperty("top", this.topPositon+"px");
      newDiv.style.setProperty("background-color", this.currentMinutia.color[0]);
      newDiv.style.setProperty("z-index", "2"); 
      document.getElementById("blocks").appendChild(newDiv);  
       this.count++;
      // this.topPositon = this.topPositon + 12;
        console.log(newDiv);   

      //==========================END===============================    
}

//==================CREATE NEW START ELEMENT========================

leftPosition = 10;
createStartElement() {
  let startcount = 0, topPositon = 20;
        
     for(let i = 0; i < 13; i++) {
      var newDiv = document.createElement("div");       
      newDiv.setAttribute("id", this.minutiaType.name[i]);
      newDiv.setAttribute("draggable", "false");       
     // newDiv.className = "block";       
     // newDiv.className = this.currentMinutia.name[0]; 
      newDiv.setAttribute("class", this.minutiaType.name[i]);
      newDiv.setAttribute("name", "example");
      newDiv.setAttribute("data-toggle", "tooltip"); 
      newDiv.setAttribute("title", this.minutiaType.name[i]);
      newDiv.setAttribute("coordinates", " ");
      newDiv.style.setProperty("border-radius", "0px");
      newDiv.style.setProperty("position", "absolute");
      newDiv.style.setProperty("width", "100px");
      newDiv.style.setProperty("height", "20px");
      newDiv.style.setProperty("left", this.leftPosition +"px");
      newDiv.style.setProperty("top", topPositon+"px");
      newDiv.style.setProperty("background-color", this.minutiaType.color[i]);
      newDiv.style.setProperty("z-index", "2");

      document.getElementById("stats").appendChild(newDiv);  
      this.count++;
      topPositon = topPositon + 30;      
      // console.log(newDiv);   
     }
     this.leftPosition = this.leftPosition + 12;
    // console.log(this.leftPosition);  
      //==========================END===============================    
}

//==========================CREATE ELEMENT=============================== 

countElementByClickOnImg = 0;
createElementByClickOnImg(event,scrollValuesXY) { 
this.selectSize();


  let width = this.currentSize.value[0]; 
  let height = this.currentSize.value[0];
  console.log(width, height);
   let posX = event.layerX - scrollValuesXY[0];
   let posY = event.layerY - scrollValuesXY[1];
  //let posX = event.layerX;
  //let posY = event.layerY; 
  //console.log("eventLayerXY",event.layerX,event.layerY);
  //console.log("posXY",posX,posY);
          //  layerX = layerX -35;
          //  layerY = layerY -55;
    var newDiv = document.createElement("div");       
    newDiv.setAttribute("id", "block" + this.countElementByClickOnImg);
    newDiv.setAttribute("draggable", "true");       
   // newDiv.className = "block";       
   // newDiv.className = this.currentMinutia.name[0]; 
    newDiv.setAttribute("class", this.currentMinutia.name[0]);
    newDiv.setAttribute("name", "block");
    newDiv.setAttribute("data-toggle", "tooltip"); 
    newDiv.setAttribute("title", this.currentMinutia.name[0]);
    newDiv.setAttribute("coordinates", " ");
    newDiv.setAttribute("description", this.currentMinutia.description[0]);
   newDiv.style.setProperty("border-radius", "10px");
   newDiv.style.setProperty("position", "absolute");
   newDiv.style.setProperty("width", width +"px");
   newDiv.style.setProperty("height", height + "px");
   newDiv.style.setProperty("left", posX+"px");
   newDiv.style.setProperty("top", posY+"px");
   newDiv.style.setProperty("background-color", this.currentMinutia.color[0]);
   newDiv.style.setProperty("z-index", "2"); 
   document.getElementById("dropzone").appendChild(newDiv);  
    this.countElementByClickOnImg++;
   // console.log(newDiv); 
   //this.saveViewMinutia(newDiv,posX, posY);
   this.saveDefaultMinutia(newDiv,posX, posY);
   //this.describeMinutia(newDiv.id);
   this.toolTipUpdate(newDiv.id,posX,posY);
}
//==========================END===============================    

//start point
 lineX1;lineY1;lineX2;lineY2;


drawGraphLine(ax,ay,bx,by,color, size) {
  let counterLine:number = 0;
  let lineStroke = size;
  (function($) {

    var helpers = {
      createLine: function(x1, y1, x2, y2, options){
        
                    // Check if browser is Internet Exploder ;)
                    var isIE = navigator.userAgent.indexOf("MSIE") > -1;
                    if (x2 < x1){
                      var temp = x1;
                      x1 = x2;
                      x2 = temp;
                      temp = y1;
                      y1 = y2;
                      y2 = temp;
                    }
                    var line = document.createElement("div");
  
                    line.className = options.class;
                    let lineId = options.class + counterLine;                          
                    line.id = lineId;
                  console.log(line.id);
                    // Formula for the distance between two points
                    var length = Math.sqrt((x1-x2)*(x1-x2) + (y1-y2)*(y1-y2));
  
                    line.style.width = length + "px";
                    line.style.borderBottom = options.stroke + "px " + options.style; 
                    console.log(options.stroke);                 
                    line.style.borderColor = options.color;
                    line.style.position = "absolute";
                    line.style.zIndex = options.zindex;
  
                    if(isIE){
                      line.style.top = (y2 > y1) ? y1 + "px" : y2 + "px";
                      line.style.left = x1 + "px";
                      var nCos = (x2-x1)/length;
                      var nSin = (y2-y1)/length;
                      line.style.filter = "progid:DXImageTransform.Microsoft.Matrix(sizingMethod='auto expand', M11=" + nCos + ", M12=" + -1*nSin + ", M21=" + nSin + ", M22=" + nCos + ")";
                    }else{
                      var angle = Math.atan((y2-y1)/(x2-x1));
                      line.style.top = y1 + 0.5*length*Math.sin(angle) + "px";
                      line.style.left = x1 - 0.5*length*(1 - Math.cos(angle)) + "px";
                      line.style.transform = "rotate(" + angle + "rad)";
                    }
                    return line;
                  }
    }
    
  
    $.fn.line = function( x1, y1, x2, y2, options, callbacks) {
                  return $(this).each(function(){
                    if($.isFunction(options)){
                        this.callback = options;
                        options = null;
                    }else{
                      this.callback = callbacks;
                    }
                    options = $.extend({}, $.fn.line.defaults, options);
  
                    $(this).append(helpers.createLine(x1,y1,x2,y2,options)).promise().done(function(){
                      if($.isFunction(this.callback)){
                        this.callback.call();
                      }
                    });                 
                });
    };
    $.fn.line.defaults = {  zindex : 10000,
                            color : '#000000',
                            stroke: lineStroke,                           
                            style: "solid",
                            class: "line",                           
                          };
  })($);
  $('#dropzone').line(this.lineX1,this.lineY1,this.lineX2,this.lineY2, {color:color, zindex:3});
  counterLine++;
}

pow2(n) {
  return n * n;
}

p1 = {
  id: "p1",
  x: 150,
  y: 50
};
p2 = {
  id: "p2",
  x: 300,
  y: 250
};
select = null;

getAngle() {

  var dist = Math.sqrt(this.pow2(this.p1.x - this.p2.x) + this.pow2(this.p1.y - this.p2.y));
  var l = document.getElementById("line");
  var cos = (this.p2.x - this.p1.x) / Math.sqrt(this.pow2(this.p2.x - this.p1.x) + this.pow2(this.p2.y - this.p1.y));
  var behind = this.p1.x < this.p2.x;
  var higher = this.p1.y > this.p2.y;
  l.style.width = (dist * 2) + "px";
  l.style.left = (this.p1.x - dist) + "px";
  l.style.top = (this.p1.y) + "px";

  l.style.transform = "rotateZ(" + (higher ? -1 : 1) * Math.acos(cos) * (180 / Math.PI) + "deg)";
}

down = false

//@HostListener("mousemove",['$event'])
mouseMove(e) {
  if (this.select) {
    this.select.x = e.pageX;
    this.select.y = e.pageY;
      var p = document.getElementById(this.select.id);
      p.style.left = (this.select.x - 5) + "px";
      p.style.top = (this.select.y - 5) + "px";
      this.getAngle();
  }
}

//@HostListener("mouseup",['$event'])
moseUp(e) {
  if (!this.select) this.select = this.p1;
  else if (this.select == this.p1) this.select = this.p2;
  else this.select = null;
}

//@HostListener("mousedown",['$event'])
mouseDown(e){
  this.down = true;
  console.log("yopla");
}


lineTrigger = 1;
prepareToDrawLine(event) {
  console.log("prepareToDrawLine", event.target.id);
  let minutia = document.getElementById(event.target.id);
  console.log(minutia.getAttribute("description"));
  if(minutia.getAttribute("description") == "line") {
//this.lineTrigger = 1;
    if(this.lineTrigger == 1) {
      this.lineTrigger = 2;
      this.lineX1 = parseInt(minutia.style.getPropertyValue("left").slice(0,-2));
      this.lineY1 = parseInt(minutia.style.getPropertyValue("top").slice(0,-2));
          console.log("line(1):",this.lineX1, this.lineY1);
          
    } else if(this.lineTrigger == 2) {
      this.lineTrigger = 3
      this.lineX2 = parseInt(minutia.style.getPropertyValue("left").slice(0,-2));
      this.lineY2 = parseInt(minutia.style.getPropertyValue("top").slice(0,-2));
          console.log("line(2):",this.lineX1, this.lineY1);
          this.drawGraphLine(this.lineX1, this.lineX2, this.lineY1, this.lineY2, 
            this.currentMinutia.color[0],
            this.currentSize.value[0] );
           this.lineTrigger = 1;        
    }  else if(this.lineTrigger == 3) {
    //  this.saveDefaultLineMinutia(this.lineX1, this.lineX2, this.lineY1, this.lineY2,);
    }
  }

}
//skasowac svg, skasowac diva z svg i z ifa.
//==========================EVENTS BY CLIK===============================
onClickMinutia(event,scrollValuesXY){ 
 
  //console.log(element.getAttribute("description"));
  if((event.target.id == "svg" || event.target.id == "image") && this.form.get('select').value != this.minutiaType.name[0]) {
  this.createElementByClickOnImg(event,scrollValuesXY);
    }
  }
//==========================END EVENTS BY CLIK===============================

describeMinutia(minutiaId: string) {
let minutia = document.getElementById(minutiaId);
//console.log(minutia);
document.getElementById(minutiaId).innerHTML = "" + minutia.title + "<br>" + minutia.style.left + ", " + minutia.style.top;
}

minutiaSet = []
minutiaCollector(minutia) {
  this.minutiaSet.push(minutia);
  console.log(this.minutiaSet);
}

saveViewMinutia(newDiv,layerX, layerY) {
layerX = layerX * this.currentZoom.choice[0];
layerY = layerY * this.currentZoom.choice[0];
   let minutia: Minutia = {
    id: 0,
    name: newDiv.className,
    divId: newDiv.id,
    color: newDiv.style.getPropertyValue("background-color"),
    posX: layerX,
    posY: layerY,
    posX1: 0,
    posY1: 0,
    description: null,
    sectorOnDroped:0 ,
    scoopeValue: 0,
    sizePX: newDiv.style.getPropertyValue("width")
   }
   
   console.log("COORDINATES BY VIEW",layerX, layerY);
}

//save
saveDefaultMinutia(newDiv,layerX, layerY) {
  layerX = layerX;
  layerY = layerY;
     let minutia: Minutia = {
      id: 0,
      name: newDiv.className,
      divId: newDiv.id,
      color: newDiv.style.getPropertyValue("background-color"),
      posX: layerX,
      posY: layerY,
      posX1: 0,
      posY1: 0,
      description: newDiv.description,
      sectorOnDroped:0 ,
      scoopeValue: 0,
      sizePX: newDiv.style.getPropertyValue("width")
     }

     console.log(newDiv);
    // console.log("COORDINATES BY DEFAULT ZOOM 1.0",layerX, layerY);
    this.minutiaCollector(minutia);     
    // console.log(this.minutiaSet);
  }

  saveDefaultLineMinutia(newDiv,layerX, layerY) {
    layerX = layerX;
    layerY = layerY;
       let minutia: Minutia = {
        id: 0,
        name: newDiv.className,
        divId: newDiv.id,
        color: newDiv.style.getPropertyValue("background-color"),
        posX: layerX,
        posY: layerY,
        posX1: 0,
        posY1: 0,
        description: newDiv.description,
        sectorOnDroped:0 ,
        scoopeValue: 0,
        sizePX: newDiv.style.getPropertyValue("width")
       }
  
       console.log(newDiv);
      // console.log("COORDINATES BY DEFAULT ZOOM 1.0",layerX, layerY);
      this.minutiaCollector(minutia);     
      // console.log(this.minutiaSet);
    }



@HostListener('dragstart', ['$event'])
dragStart(event) {
//  console.log("dragStart()");
  var style = window.getComputedStyle(event.target, null);
  var elem = document.getElementById(event.target.id);
     var str = (parseInt(style.getPropertyValue("left")) - event.clientX) + ',' + (parseInt(style.getPropertyValue("top")) - event.clientY)+ ',' + event.target.id;
     event.dataTransfer.setData("Text",str);
    }


  //  drawSectorsOnBoard() {
 //     let board = document.getElementById("whiteboard");
 //     let net = window.getComputedStyle(board, null);
 // console.log(net.width);
  
      //   for(let j = 0; j < sectorY; j++) {
      //     for(let i = 0; i < sectorX; i++) {
      //       newBoard = document.createElement("div");
      //       newBoard.setAttribute("class", "whiteboard");
      //       newBoard.setAttribute("id", "sector"+i);
      //       newBoard.style.width = widthX + "px";
      //       newBoard.style.height = heightY + "px";
      //       newBoard.style.left = left+ "px"; 
      //       newBoard.style.top = top+ "px";
      //       document.getElementById("app").appendChild(newBoard);
      //       left = left + widthX;
      //   }     
      //     top = top + heightY;
      //     left = 50;                   
      //   }
      // }
   // }
      

//@HostListener('click', ['$event'])


loadImageAndCreateBoard() {
  this.drawBoard();
}

  //singleton
  drawBoard() {  
   // let img = "url(src/assets/images/finger.jpg)";      
    if(document.getElementsByClassName("whiteboard").length == 0) {
      let newBoard = document.createElement("div");
      newBoard.setAttribute("class", "whiteboard");
      newBoard.setAttribute("id", "whiteboard");
      newBoard.setAttribute("dropable", "false");
     // newBoard.style.setProperty("position","absolute");
      newBoard.style.setProperty("width","500px");
      newBoard.style.setProperty("height","500px");
      newBoard.style.setProperty("border","black solid 1px");
      newBoard.style.setProperty("left","30px");
      newBoard.style.setProperty("top","50px");     
      document.getElementById("app").appendChild(newBoard);
      newBoard.style.setProperty("z-index","0");
      newBoard.style.setProperty("overflow","hidden");

       console.log(newBoard);
     //  this.drawSectorsOnBoard();
    } else{
      console.log("board exist!");
    }
  }

  selectedFile: File = null;
  previewFiles(event) {

    if(this.minutiaSet.length < 1) {
      this.selectedFile = <File>event.target.files[0];
      let preview = document.querySelector("img");
      let file = this.selectedFile;
      let reader  = new FileReader();   
      reader.addEventListener("load", function () {

        preview.src = reader.result;
      }, false);   
      if (file) {
        reader.readAsDataURL(file);
        }   
    } else {
      console.log("minutiaSet not empty!", this.minutiaSet);
      this.warning = true;
    }
  }



  warning = false;
  warningTrigger() {
  this.warning = false;
  }

  onUpload() {
    console.log("save button");
    const fd = new FormData();
  //  this.http.post('')
   }
 


   
createNewImage(event){
//  console.log(event);
  let reader = new FileReader();
  if(event.target.files && event.target.files.length > 0) {
    let file = event.target.files[0];
    //let imgPath = "url(" + event.target.value + ")";    
   // let imgPath = "url(http://www.tcd.ie/CAPSL/assets/img/eLearning/placeholder300.png)";
   // reader.readAsDataURL(imgPath);
    
  //  console.log(imgPath);
     reader.readAsDataURL(file);
    //  reader.onload = () => {
    //    this.form.get('avatar').setValue({
    //      filename: file.name,
    //      filetype: file.type,
    //      value: reader.result.split(',')[1]
    //    })    
    //  };

    let scale = this.currentZoom.choice[0]; 
    let top = 0; 
    let left = 0;
    let newImage = document.createElement("div");

    newImage.setAttribute("class", "img");
    newImage.setAttribute("id", "img");
    newImage.setAttribute("draggable", "false");
    newImage.setAttribute("dropabble", "false");
    //newImage.style.setProperty("background-image", imgPath);
    newImage.style.setProperty("z-index","2");
    //newImage.style.setProperty("position","absolute");
    newImage.style.setProperty("top", top + "px");
    newImage.style.setProperty("left", left + "px");
    newImage.style.setProperty("transform", "scale("+scale+")");
   // newImage.style.setProperty("moz-transform", "scale(0.5)");
    //newImage.style.setProperty("overflow", "hidden");
  //  newImage.style.setProperty("transform", "scale(0.5)");
    newImage.style.setProperty("transform-origin", "top left");
 if(document.getElementById("image") != null) {
  let element = document.getElementById("image");
  element.parentNode.removeChild(element);
  document.getElementById("dropzone").appendChild(newImage);
 } else {
  document.getElementById("dropzone").appendChild(newImage);
 } 
//console.log(newImage);


  }

//   let img = "url(https://img.redro.pl/fototapety/odcisk-palca-na-bialym-400-34125.jpg)";
//   let newImage = document.createElement("div");
//   newImage.setAttribute("class", "img");
//   newImage.setAttribute("id", "img");
//   newImage.setAttribute("dropable", "true");
//   newImage.style.setProperty("background-image", img);
//  // newImage.style.setProperty("overflow", "hidden");
//   newImage.style.setProperty("transform", "scale(0.5)");
//   //newImage.style.setProperty("transform-origin", "50% 50%");
//   document.getElementById("whiteboard").appendChild(newImage);

}



// onFileChange(event) {
 
//   let reader = new FileReader();
//   if(event.target.files && event.target.files.length > 0) {
//     let file = event.target.files[0];
//     let board = document.getElementById("whiteboard").appendChild(file);

//     // reader.readAsDataURL(file);
//     // reader.onload = () => {
//     //   this.form.get('avatar').setValue({
//     //     filename: file.name,
//     //     filetype: file.type,
//     //     value: reader.result.split(',')[1]
//     //   })
//     // };
//   }
// }


moveImage(event) {
  event.preventDefault();
  event.stopPropagation();
 //console.log("move");
}

//whiteboard
@HostListener('drop', ['$event'])
 drop(event) {
 //console.log("drop()");
let offset = event.dataTransfer.getData("Text").split(',');
let elem = document.getElementById(offset[2]);
let elemName = elem.id;
let position;
if(elem.id != "image") {

  let posX = elem.style.left = (event.clientX + parseInt(offset[0],10)) + 'px';
  let posY = elem.style.top = (event.clientY + parseInt(offset[1],10)) + 'px';
  
  let posXnumber = elem.style.left = (event.clientX + (offset[0],10));
  let posYnumber = elem.style.top = (event.clientY + (offset[1],10));
  posXnumber = posXnumber -40;
  posYnumber = posYnumber -60;
  
  //changing position
  this.minutiaSet.map(r => {
    if(elemName == r.id) {
      r.posX = posXnumber;
      r.posY = posYnumber;
    }  
  });
  console.log("new drop:",elemName,posXnumber, posYnumber);
  //console.log(posXnumber, posYnumber);
  event.preventDefault();
  position = [posXnumber, posYnumber];
  //this.writeCoordinates(elemName,posXnumber, posYnumber); 
  this.toolTipUpdate(elem.id,posX,posY); 

}

 
  return position;
}  

coordinates = {
  name: [],
  posX: [],
  posY: []
  };

writeCoordinates(elemName,x,y) {
console.log("writeCoordinates()");
this.coordinates.name = elemName;
this.coordinates.posX = x;
this.coordinates.posY = y;
//console.log(this.coordinates);
this.toolTipUpdate(elemName,x,y);
}

toolTipUpdate(elem,x,y){
let object = document.getElementById(elem);
let objectDesc = object.className + "," + " X:" + x + " Y:" + y;
object.setAttribute("title", objectDesc);
//console.log(object);
}

onReset(){
  let node = document.getElementById("dropzone");
    this.minutiaSet.map( r=> {      
      let a = document.getElementById(r.divId);
           node.removeChild(a);      
    });     
  document.getElementById("image").innerHTML = "";
 this.selectedFile = null;
 document.getElementById("image").setAttribute("src", " ");
}

scrollValue(event) {
let scrollLeft = document.getElementById(event.target.id).scrollLeft;
let scrollTop = document.getElementById(event.target.id).scrollTop;
//console.log(scrollLeft, scrollTop);
let values = [scrollLeft, scrollTop]
return values;
}

@HostListener('click', ['$event'])
oneClick(event){
  console.log("one click:",event.target.id);
  //console.log("Page coordinates px",event.pageX, event.pageY);
  //console.log("client px",event.clientX, event.clientY);
  //console.log("px",event.x, event.y);
  //console.log("layer px",event.layerX, event.layerY);
 let scrollValuesXY = this.scrollValue(event);
  if(this.form.get('activity').value == this.activity.name[0]) {
    this.onClickMinutia(event,scrollValuesXY);
    //this.scrollValue(event);
  } else if (this.form.get('activity').value == this.activity.name[1]) {  
    this.moveImage(event);
  } else if (this.form.get('activity').value == this.activity.name[2]) {
    this.prepareToDrawLine(event);
  }
  return null;
}

@HostListener('dblclick', ['$event'])
onDoubleClick(event) {
let parent = document.getElementById(event.target.parentNode.id);
let element = document.getElementById(event.target.id);
console.log("double click!", parent.id, element.id);
if((parent.id == "dropzone" || parent.id == "svg") && this.form.get('activity').value == this.activity.name[0]) {
  console.log("double click!", "if");
  event.preventDefault();
  event.stopPropagation();
for (let index = 0; index < this.minutiaSet.length; index++) {
  if(element.id == this.minutiaSet[index].divId){
this.minutiaSet.splice(index,1);
console.log("find & delete!",element.id);
parent.removeChild(element);
  } 
}

}  
return null;
}

@HostListener('select', ['$event'])
onSelect(event) { 
}

//whiteboard and block
@HostListener('dragover', ['$event'])
allowDrop(event) {
//  console.log("allowDrop()");
  event.preventDefault();
  event.stopPropagation(); 
}

   //----------------------------- FORM --------------------

// DOCELOWO DANE JSON Z SERWERA.
activity = {
  name: [
    "minucje",
    "obraz",
    "linia"
  ],
  choice: [
    "minutia",
    "picture"
  ] 
}

zoom = {
  name: [
    "1X",
    "2X",
    "3X",
    "4X"
  ],
  choice: [
    1,
    2,
    3,
    4
  ] 
}



sectors = {
  name: [
    "ON",
    "OFF"
  ],
  choice: [
    1,
    0
  ] 
}

minutiaType = {
  name: [
    "WYBIERZ MINUCJĘ",
    "POCZATEK", 
    "ZAKONCZENIE", 
    "ROZWIDLENIE",
    "ZLACZENIE",
    "ODCINEK",
    "KROPKA",
    "STYK_BOCZNY",
    "OCZKO",
    "HACZYK",
    "LINIA_PRZECHODZACA",
    "MOSTEK",
    "SKRZYZOWANIE",
    "PRZERWA"         
    ],
  color: [
    "",
    "#7FFF00",
    "#228B22",
    "#00BFFF",
    "#00008B",
    "#FFD700",
    "goldenrod",
    "#FF8C00",
    "#FF4500",
    "#B22222",
    "#9400D3",
    "#FF1493",
    "#FF69B4",
    "#FFB6C1",
    ],
description:[
  "point",
  "line"
]

}
// END DOCELOWO DANE JSON Z SERWERA


currentMinutia = {
  name: [],
  color: [],
  description: []
};

forms() {
  this.selectMinutia();
  this.selectActivity();
  this.selectZoom();
  this.showSectors();
}

selectMinutia() {
  let select = this.form.get('select').value;
  for (let i = 0; i < this.minutiaType.name.length; i++) {
    switch (select) {
      case this.minutiaType.name[i]:
      if(select != "ODCINEK" && select != "OCZKO" && select != "HACZYK" && select != "PRZERWA") {
        let minutia = this.minutiaType.color[i];
        this.currentMinutia.color[0] = this.minutiaType.color[i];
        this.currentMinutia.name[0] = this.minutiaType.name[i];
        this.currentMinutia.description[0] = this.minutiaType.description[0]
      } else {
        let minutia = this.minutiaType.color[i];
        this.currentMinutia.color[0] = this.minutiaType.color[i];
        this.currentMinutia.name[0] = this.minutiaType.name[i];
        this.currentMinutia.description[0] = this.minutiaType.description[1]
      }                  
    }
  }  
  console.log(this.currentMinutia);
};

currentActivity = {
  name: [],
  choice: []
};
selectActivity() {
  let activity = this.form.get('activity').value;
  for (let i = 0; i < this.activity.name.length; i++) {
    switch (activity) {
      case this.activity.name[i]:
        let activity = this.activity.choice[i];
        this.currentActivity.choice[0] = this.activity.choice[i];
        this.currentActivity.name[0] = this.activity.name[i];      
      //  console.log( this.currentActivity);       
    }
  }  
};

currentZoom = {
  name: [],
  choice: []
};
selectZoom() {
  let zoom = this.form.get('zoom').value;
  for (let i = 0; i < this.zoom.name.length; i++) {
    switch (zoom) {
      case this.zoom.name[i]:
        let zoom = this.zoom.choice[i];
        this.currentZoom.choice[0] = this.zoom.choice[i];
        this.currentZoom.name[0] = this.zoom.name[i];      
      //  console.log( this.currentZoom);       
    }
  }  
};

currentSize = {
  name: [],
  value: []
};
selectSize() {
  let size = this.form.get('size').value;
  for (let i = 0; i < this.size.name.length; i++) {
    switch (size) {
      case this.size.name[i]:
        this.currentSize.value[0] = this.size.value[i];
        this.currentSize.name[0] = this.size.name[i];           
    }
  } 
  console.log(this.currentSize.value[0]); 
};
size = {
  name: [
    "8px",
    "10px",
    "13px",
    "15px",
    "25px"
  ],
  value: [
    8,
    10,
    13,
    15,
    25
  ]
}


currentSectors = {
  name: [],
  choice: []
};
showSectors() {
  let sectors = this.form.get('sectors').value;
  for (let i = 0; i < this.sectors.name.length; i++) {
    switch (sectors) {
      case this.sectors.name[i]:
        let sectors = this.sectors.choice[i];
        this.currentSectors.choice[0] = this.sectors.choice[i];
        this.currentSectors.name[0] = this.sectors.name[i];      
      //  console.log( this.currentSectors);       
    }
  }  
};
  
   form: FormGroup;
   createForm() {
    this.form = new FormGroup({
      select: new FormControl(this.minutiaType.name[0]),
      activity: new FormControl(this.activity.name[0]),
      zoom: new FormControl(this.zoom.name[0]),
      sectors: new FormControl(this.sectors.name[0]),
      size: new FormControl(this.size.name[0])
    });   
  };
  //----------------------------- END FORM -------------------- 



}


export interface Image {
  id: number;
  name: string; 
  creationDate: Date;
  lasModifiedDate: Date;
  minuties: Minutia []
}

export interface User {
  id: number,
  userName: string,
  userSign: Date,
  lastActivity: Date,
  imageModified: Image []
}


export interface Minutia {
  id: number; //auto increment on base
  name: string; //class name
  divId: string; //div id
  color: string; 
  posX: number;
  posY: number;
  posX1: number;
  posY1: number;
  description: string;
  sectorOnDroped: number;
  scoopeValue: number;
  sizePX: number;
}

// ========================== DRAFT ==================================

//@HostListener('drag', ['$event'])
// onDragStart(event, data) {
//   event.preventDefault();
//   event.stopPropagation();
//   console.log("onDragStart()");
//   event.dataTransfer.setData('data', data);
//   console.log(event);
// }
//@HostListener('drop', ['$event'])
// onDrop(event, data) {  
//   console.log("onDrop()");
//   let dataTransfer = event.dataTransfer.getData('data');
//   event.stopPropagation();    
//   event.preventDefault();
// }
