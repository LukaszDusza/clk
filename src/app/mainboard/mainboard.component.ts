import { Component, OnInit, HostListener } from '@angular/core';
import { NgbDropdown } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormControl } from '@angular/forms';
import { CanvasComponent } from '../canvas/canvas/canvas.component';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import * as $ from 'jquery';
import { parse } from 'querystring';
import { keys } from 'ts-transformer-keys';
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';

@Component({
  selector: 'app-mainboard',
  templateUrl: './mainboard.component.html',
  styleUrls: ['./mainboard.component.css']
})
export class MainboardComponent implements OnInit {

  constructor() { }

  ngOnInit() { }

// ============================== LOAD FILE =============================================
  range = 1;
  fileLoad: File = null;
  imgUrl;
  loadFile(file: FileList) {
this.fileLoad = file.item(0);
var reader = new FileReader();
reader.onload = (event: any) => {
  this.imgUrl = event.target.result;
}
reader.readAsDataURL(this.fileLoad);
    }
// ============================== END  ===================================================


// ============================== DRAW LINES =============================================
drawLines(event) {
  this.clearLines();
  const v = event.target.value;
  // tslint:disable-next-line:radix
  const actualHeight = parseInt((window.getComputedStyle(document.getElementById('dropzone')).height).slice(0, -2));
  const countV = (actualHeight / v);

  const h = event.target.value;
  // tslint:disable-next-line:radix
  const actualWidth = parseInt((window.getComputedStyle(document.getElementById('dropzone')).width).slice(0, -2));
  const countH = (actualWidth / h);

    for (let index = 1; index < v; index++) {
      const vertical = document.createElement('hr');
      vertical.id = 'line';
      vertical.style.zIndex = "2";
      vertical.style.position = 'absolute';
      vertical.style.border = '0.5px solid black';
      vertical.style.height = (actualHeight - 20) + 'px';
      vertical.style.marginLeft = (countV * index) + 'px';
      document.getElementById('dropzone').appendChild(vertical);
    }
    for (let index = 1; index < h; index++) {
      const horizontal = document.createElement('hr');
      horizontal.id = 'line';
      horizontal.style.position = 'absolute';
      horizontal.style.zIndex = "2";
      horizontal.style.border = '0.5px solid black';
      horizontal.style.width = (actualWidth - 20) + 'px';
      horizontal.style.marginTop = (countH * index) + 'px';
      document.getElementById('dropzone').appendChild(horizontal);
    }
}
clearLines() {
  while (document.getElementById("line") != null) {
    const elem = document.getElementById("line");
    elem.parentNode.removeChild(elem);
  }
}
// ============================== END =============================================


// ============================== ZOOM =============================================
zoom(event) {
  this.range = parseInt(event.target.value);
  let viewport = document.getElementById("viewport");
  viewport.style.width = (this.range * 100)+ "%";
  viewport.style.height = (this.range * 100)+ "%";

  let img = document.getElementById("img");
  img.style.maxWidth = (this.range * 100)+ "%";
  img.style.maxWidth = (this.range * 100)+ "%";

}
// ============================== END =============================================


// ============================== LISTENER'S =============================================
@HostListener('click', ['$event'])
oneClick(event){
const minName = document.getElementById(event.target.id);
let name = document.getElementById(event.target.id).getAttribute("name");
console.log(name);
  if(this.currentMinutia.name[0] != null ) {
    if(name != "block") {
      this.createElementByClickOnImg(event);    
    }
      this.prepareToDrawLine(event); 
  }
     
}

@HostListener('dblclick', ['$event'])
onDoubleClick(event) {

 
  this.deleteElement(event);
}

@HostListener('dragover', ['$event'])
allowDrop(event) {
//  console.log("allowDrop()");
  event.preventDefault();
  event.stopPropagation();
}

@HostListener('drop', ['$event'])
 drop(event) {
this.dropElement(event);
}

@HostListener('dragstart', ['$event'])
drag(event) {
//  console.log("dragStart()");
  var style = window.getComputedStyle(event.target, null);
  var elem = document.getElementById(event.target.id);
     var str = (parseInt(style.getPropertyValue("left")) - event.clientX) + ',' + (parseInt(style.getPropertyValue("top")) - event.clientY)+ ',' + event.target.id;
     event.dataTransfer.setData("Text",str);
  
    }

// ============================== SAVING ELEMENTS =============================================
minutiaSet = []
minutiaCollector(minutia) {
  this.minutiaSet.push(minutia);
  console.log(this.minutiaSet);
}

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
     }
     this.minutiaCollector(minutia);
    }
// ============================== END =============================================


updateCoordinatesAfterMove(elemId,posXnumber, posYnumber) {
  let movedMinutia = document.getElementById(elemId);
  for (let index = 0; index < this.minutiaSet.length; index++) {    
    if(movedMinutia.id === this.minutiaSet[index].divId){ 
  movedMinutia.style.left = posXnumber;
  movedMinutia.style.top = posYnumber;    
 this.minutiaSet[index].posX = posXnumber;
 this.minutiaSet[index].posY = posYnumber;
    }
  }

}

// ============================== CREATE ELEMENT =============================================
countElementByClickOnImg = 0;
createElementByClickOnImg(event) {
if(event.target.id == "dropzone" || event.target.id == "img") {
  let posX = event.layerX;
  let posY = event.layerY;
   var newDiv = document.createElement("div");
   newDiv.setAttribute("id", "block" + this.countElementByClickOnImg);
   newDiv.setAttribute("draggable", "true");
   newDiv.setAttribute("class", this.currentMinutia.name[0]);
   newDiv.setAttribute("name", "block");
   newDiv.setAttribute("data-toggle", "tooltip");
   newDiv.setAttribute("title", this.currentMinutia.name[0]);
   newDiv.setAttribute("coordinates", " ");
   newDiv.setAttribute("description", this.currentMinutia.description[0]);
  newDiv.style.setProperty("border-radius", "10px");
  newDiv.style.setProperty("position", "absolute");
  newDiv.style.setProperty("width", 10 +"px");
  newDiv.style.setProperty("height", 10 + "px");
  newDiv.style.setProperty("left", (posX-5)+"px");
  newDiv.style.setProperty("top", (posY-5)+"px");
  newDiv.style.setProperty("background-color", this.currentMinutia.color[0]);
  newDiv.style.setProperty("z-index", "3");
  document.getElementById("dropzone").appendChild(newDiv);
   this.countElementByClickOnImg++;
   console.log(newDiv);
   this.saveDefaultMinutia(newDiv,posX, posY);
}

}

// ============================== END =============================================


// ============================== SELECT  MINUTIA =============================================
selectMinutia(select) {
//  console.log(select.value);
  for (let i = 0; i < this.minutiaType.name.length; i++) {
    switch (select.value) {
      case this.minutiaType.name[i]:
      if(select.value != "ODCINEK" && select.value != "OCZKO" && select.value != "HACZYK" && select.value != "PRZERWA") {
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

// ============================== END =============================================

// ============================== MOVE ELEMENT =============================================
deleteElement(event){
console.log("double click!", event.target.id);
  let parent = document.getElementById(event.target.parentNode.id);
  let element = document.getElementById(event.target.id);
  if(parent.id == "dropzone" || parent.id == "line") {
  //  event.preventDefault();
  //  event.stopPropagation();
  for (let index = 0; index < this.minutiaSet.length; index++) {
    if(element.id == this.minutiaSet[index].divId){
  this.minutiaSet.splice(index,1);
  parent.removeChild(element);
    }
  }
}
}
// ============================== END =============================================

deleteLastAdded() {
let last = document.getElementById("dropzone");
  last.removeChild(last.lastChild);
  this.minutiaSet.splice(-1,1);
}

// ============================== DROP ELEMENT =============================================
dropElement(event) {
 // console.log("drop");
  let offset = event.dataTransfer.getData("Text").split(',');
  let elem = document.getElementById(offset[2]);
  let elemName = elem.id;
  let position;
  let posX = event.layerX;
  let posY = event.layerY;

    let posXnumber = elem.style.left = ((event.layerX-5) + 'px');
    let posYnumber = elem.style.top = ((event.layerY-5) + 'px');

    this.updateCoordinatesAfterMove(elem.id,posXnumber, posYnumber);
    this.minutiaSet.map(r => {
      if(elemName == r.id) {
        r.posX = posXnumber;
        r.posY = posYnumber;
      }
    });
    event.preventDefault(); 
}
// ============================== END =============================================


// ============================== DRAW MINUTIES BY LINES =============================================

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

lineTrigger = 0;
prepareToDrawLine(event) {
  let minutia = document.getElementById(event.target.id);
  if(minutia.getAttribute("description") == "line") {
    if(this.lineTrigger == 0) {  
      this.lineX1 = parseInt(minutia.style.getPropertyValue("left").slice(0,-2));
      this.lineY1 = parseInt(minutia.style.getPropertyValue("top").slice(0,-2));
      minutia.style.borderRadius = "0.1px";
      this.lineTrigger++;
    } else if (this.lineTrigger == 1) {
      this.lineX2 = parseInt(minutia.style.getPropertyValue("left").slice(0,-2));
      this.lineY2 = parseInt(minutia.style.getPropertyValue("top").slice(0,-2));
    //  minutia.style.borderRadius = "10.0px";
    //  minutia.style.borderLeft =  "5px solid transparent";
    //  minutia.style.borderRight =  "5px solid transparent";
    //  minutia.style.borderBottom =  "10px solid transparent";

     // border-left: 50px solid transparent;
    //  border-right: 50px solid transparent;
    //  border-bottom: 100px solid red;

      this.lineTrigger = 0;  
      this.drawGraphLine(this.lineX1, this.lineX2, this.lineY1, this.lineY2, 
                     this.currentMinutia.color[0],2);
      
    }   
   }

}

// ============================== END =============================================


// ============================== PROPERTIES  =============================================
currentMinutia = {
  name: [],
  color: [],
  description: []
};

  minutiaType = {
    name: [
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

  // ============================== END =============================================


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
//  sizePX: number;
}


