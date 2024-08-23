let canvasParent = document.getElementById("canvas");
let canvas = document.querySelector("canvas");
let resetBtn = document.getElementById("reset");
let ctx = canvas.getContext("2d");
let SubmitBtn = document.getElementById("Submit");
canvas.width = 800;
canvas.height = 500;

const storedData = localStorage.getItem("selectData");
const tableData = JSON.parse(storedData);

class mainPanel {
  constructor(x, y, w, h) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
  }
  create() {
    ctx.styleRect = "red";
    ctx.strokeRect(this.x, this.y, this.w, this.h);
  }
  getObj() {
    return {
      x: this.x,
      y: this.y,
      w: this.w,
      h: this.h,
    };
  }
}

class smallPanel extends mainPanel {
  constructor(x, y, w, h, text) {
    super(x, y, w, h);
    this.arr = [];
    this.seprator = [];
    this.count = 0;
    this.text = text;
  }
  create() {
    for (let i = 0; i < PanelPost; i++) {
      if (this.count == 0) {
        this.arr.push({x: this.x,y: this.y,w: this.w,h: this.h,text: this.text,});
      }
      ctx.strokeStyle = "blue";
      ctx.strokeRect(this.arr[i].x,this.arr[i].y,this.arr[i].w,this.arr[i].h);
      this.x = this.x + this.w;
      ctx.strokeStyle = "green";
      if (i < PanelPost - 1) {
        ctx.strokeRect(this.arr[i].x + this.arr[i].w - 5,this.arr[i].y,10,this.arr[i].h);
        if (this.count == 0) {
          this.seprator.push({x: this.arr[i].x + this.arr[i].w - 5,y: this.arr[i].y,w: 10,h: this.arr[i].h,text: postWidth,clicked: false,});
        }
      }
      ctx.font = "12px Arial";
      ctx.clearRect(this.arr[i].x + 6,this.arr[i].y + 1,this.arr[i].w - 12,this.arr[i].h - 2);
      ctx.textAlign = "center";
      ctx.fillText(Math.round(this.arr[i].text * 10) / 10,this.arr[i].x + this.arr[i].w / 2,this.arr[i].y + this.arr[i].h / 2);
      if (i < PanelPost - 1 && this.seprator[i].clicked) {
        ctx.fillStyle = "green";
        ctx.strokeStyle = "white";
        ctx.strokeRect(this.arr[i].x + this.arr[i].w - 10,this.arr[i].y - 30,40,25);
        ctx.fillRect(this.seprator[i].x,this.seprator[i].y,10,this.seprator[i].h);
        ctx.fillText(postWidth, this.seprator[i].x, this.seprator[i].y - 10);
      }
    }
    this.count++;
  }
  getObj() {
    let obj = super.getObj();
    obj.arr = this.arr;
    obj.seperator = this.seprator;
    return obj;
  }
}

class text extends mainPanel {
  constructor(x, y, w, h, text) {
    super(x, y, w, h);
    this.text = text;
  }
  create() {
    ctx.strokeStyle = "white";
    ctx.strokeRect(this.x, this.y, this.w, this.h);
    ctx.font = "12px Arial";
    ctx.textAlign = "center";
    ctx.fillText(this.text, this.x + this.w / 2, this.y + this.h / 2 + 5);
  }
  getObj() {
    let obj = super.getObj();
    obj.text = this.text;
    return obj;
  }
}

let WidthPost = tableData.Width;
let HeightPost = tableData.Height;
let PanelPost = tableData.PanelQty;
let btnPlus=0;
let btnMinus=0;
let widthFactor = Math.round((WidthPost / 620) * 100) / 100;
let heightFactor = Math.round((HeightPost / 300) * 100) / 100;
let factoredWidth = 620;
let factoredHeight = 300;
let topWidth = 0;
let mouseEvents = 50;
let bottomWidth = 0;
let leftWidth = 10;
let rightWidth = 10;
let inputBtn = 0;
let postWidth = 80;
let adjustWidth = 0;
let adjustHeight = 0;

function reset() {
  ctx.clearRect(0, 0, 800, 500);
  track = new mainPanel(50, 100, WidthPost, HeightPost);
  track.create();
  topWidth = 0;
  bottomWidth = 0;
  leftWidth = 10;
  rightWidth = 10;
  postWidth = 80;
  adjustWidth = 0;
  adjustHeight = 0;
  topFrame = new mainPanel(track.x, track.y, track.w, topWidth);
  topFrame.create();
  bottomFrame = new mainPanel(track.x,track.y + track.h - bottomWidth,track.w,bottomWidth);
  bottomFrame.create();
  leftFrame = new mainPanel(track.x, track.y, leftWidth, track.h);
  leftFrame.create();
  rightFrame = new mainPanel(track.x + track.w - rightWidth,track.y,rightWidth,track.h);
  rightFrame.create();
  panel = new smallPanel(track.x + leftWidth,track.y + topWidth,Math.round(((track.w - leftWidth - rightWidth) * 10) / PanelPost) / 10,Math.round((track.h - topWidth - bottomWidth) * 10) / 10,Math.round(((track.w - leftWidth - rightWidth) * 10) / PanelPost) / 10);
  panel.create();
  width = new text(track.x + track.w / 2 - 20,track.y + track.h + 65,40,25,Math.round(track.w * 10) / 10);
  width.create();
  actualWidth = new text(track.x + track.w / 2 - 20,track.y + track.h + 35,40,25,Math.round((track.w - adjustWidth) * 10) / 10);
  actualWidth.create();
  panelWidth = new text(track.x + track.w / 2 - 20,track.y + track.h + 5,40,25,Math.round((track.w - leftWidth - rightWidth) * 10) / 10);
  panelWidth.create();
  leftFrameText = new text(track.x - 15,track.y - 30,40,25,Math.round(leftWidth * 10) / 10);
  leftFrameText.create();
  rightFrameText = new text(track.x + track.w - 25,track.y - 30,40,25,Math.round(rightWidth * 10) / 10);
  rightFrameText.create();

  ctx.beginPath();
  ctx.strokeStyle = "black";
  ctx.lineTo(track.x + leftWidth, track.y + track.h + 5);
  ctx.lineTo(track.x + leftWidth, track.y + track.h + 30);
  ctx.moveTo(track.x, track.y + track.h + 35);
  ctx.lineTo(track.x, track.y + track.h + 60);
  ctx.moveTo(track.x, track.y + track.h + 65);
  ctx.lineTo(track.x, track.y + track.h + 90);
  ctx.moveTo(track.x + leftWidth, track.y + track.h + 18);
  ctx.lineTo(track.x + track.w / 2 - 20, track.y + track.h + 18);
  ctx.moveTo(track.x + track.w / 2 + 20, track.y + track.h + 18);
  ctx.lineTo(track.x + track.w - rightWidth, track.y + track.h + 18);
  ctx.moveTo(track.x, track.y + track.h + 48);
  ctx.lineTo(track.x + track.w / 2 - 20, track.y + track.h + 48);
  ctx.moveTo(track.x + track.w / 2 + 20, track.y + track.h + 48);
  ctx.lineTo(track.x + track.w, track.y + track.h + 48);
  ctx.moveTo(track.x, track.y + track.h + 78);
  ctx.lineTo(track.x + track.w / 2 - 20, track.y + track.h + 78);
  ctx.moveTo(track.x + track.w / 2 + 20, track.y + track.h + 78);
  ctx.lineTo(track.x + track.w, track.y + track.h + 78);
  ctx.moveTo(track.x + track.w - rightWidth, track.y + track.h + 5);
  ctx.lineTo(track.x + track.w - rightWidth, track.y + track.h + 30);
  ctx.moveTo(track.x + track.w, track.y + track.h + 35);
  ctx.lineTo(track.x + track.w, track.y + track.h + 60);
  ctx.moveTo(track.x + track.w, track.y + track.h + 65);
  ctx.lineTo(track.x + track.w, track.y + track.h + 90);
  ctx.stroke();
  console.log("i am created");
}
resetBtn.addEventListener("click", () => {
  reset();
  for (let i = 0; i < panel.seprator.length; i++) {
    removeInp(i);
  }
});

let track = new mainPanel(50, 100, factoredWidth, factoredHeight);
track.create();
let topFrame = new mainPanel(track.x, track.y, track.w, topWidth);
topFrame.create();
let bottomFrame = new mainPanel(track.x,track.y + track.h - bottomWidth,track.w,bottomWidth);
bottomFrame.create();
let leftFrame = new mainPanel(track.x, track.y, leftWidth, track.h);
leftFrame.create();
let rightFrame = new mainPanel(track.x + track.w - rightWidth,track.y,rightWidth,track.h);
rightFrame.create();
let panel = new smallPanel(track.x + leftWidth,track.y + topWidth,Math.round(((WidthPost - leftWidth - rightWidth) * 10) / (PanelPost*widthFactor)) / 10,Math.round((track.h - topWidth - bottomWidth) * 10) / 10,Math.round(((WidthPost - leftWidth - rightWidth) * 10) / PanelPost) / 10);
panel.create();
let width = new text(track.x + track.w / 2 - 20,track.y + track.h + 65,40,25,Math.round(WidthPost * 10) / 10);
width.create();
let panelWidth = new text(track.x + track.w / 2 - 20,track.y + track.h + 5,40,25,Math.round((WidthPost - leftWidth - rightWidth) * 10) / 10);
panelWidth.create();
let actualWidth = new text(track.x + track.w / 2 - 20,track.y + track.h + 35,40,25,Math.round((WidthPost - adjustWidth) * 10) / 10);
actualWidth.create();
let leftFrameText = new text(track.x - 15,track.y - 30,40,25,Math.round(leftWidth * 10) / 10);
leftFrameText.create();
let rightFrameText = new text(track.x + track.w - 25,track.y - 30,40,25,Math.round(rightWidth * 10) / 10);
rightFrameText.create();

ctx.beginPath();
ctx.strokeStyle = "black";
ctx.lineTo(track.x + leftWidth, track.y + track.h + 5);
ctx.lineTo(track.x + leftWidth, track.y + track.h + 30);
ctx.moveTo(track.x, track.y + track.h + 35);
ctx.lineTo(track.x, track.y + track.h + 60);
ctx.moveTo(track.x, track.y + track.h + 65);
ctx.lineTo(track.x, track.y + track.h + 90);
ctx.moveTo(track.x + leftWidth, track.y + track.h + 18);
ctx.lineTo(track.x + track.w / 2 - 20, track.y + track.h + 18);
ctx.moveTo(track.x + track.w / 2 + 20, track.y + track.h + 18);
ctx.lineTo(track.x + track.w - rightWidth, track.y + track.h + 18);
ctx.moveTo(track.x, track.y + track.h + 48);
ctx.lineTo(track.x + track.w / 2 - 20, track.y + track.h + 48);
ctx.moveTo(track.x + track.w / 2 + 20, track.y + track.h + 48);
ctx.lineTo(track.x + track.w, track.y + track.h + 48);
ctx.moveTo(track.x, track.y + track.h + 78);
ctx.lineTo(track.x + track.w / 2 - 20, track.y + track.h + 78);
ctx.moveTo(track.x + track.w / 2 + 20, track.y + track.h + 78);
ctx.lineTo(track.x + track.w, track.y + track.h + 78);
ctx.moveTo(track.x + track.w - rightWidth, track.y + track.h + 5);
ctx.lineTo(track.x + track.w - rightWidth, track.y + track.h + 30);
ctx.moveTo(track.x + track.w, track.y + track.h + 35);
ctx.lineTo(track.x + track.w, track.y + track.h + 60);
ctx.moveTo(track.x + track.w, track.y + track.h + 65);
ctx.lineTo(track.x + track.w, track.y + track.h + 90);
ctx.stroke();

let removeInp;
let inpArr = new Array(panel.seprator.length).fill(-1);
let leftBtnArr = new Array(panel.seprator.length).fill(-1);
let rightBtnArr = new Array(panel.seprator.length).fill(-1);
let leftValArr = new Array(panel.seprator.length);
let rightValArr = new Array(panel.seprator.length);

function isInside(mousex, mousey, btn) {
  return (
    mousex > btn.x &&
    mousex < btn.x + btn.w &&
    mousey > btn.y &&
    mousey < btn.y + btn.h
  );
}

canvas.addEventListener("click", (event) => {
  var mouseX = event.clientX - canvas.getBoundingClientRect().left;
  var mouseY = event.clientY - canvas.getBoundingClientRect().top;
  let input = document.createElement("input");
  let leftBtn = document.createElement("button");
  leftBtn.innerHTML = `<p>&#x2190;</p>`;
  let rightBtn = document.createElement("button");
  rightBtn.innerHTML = `<p>&#x2192;</p>`;
  let allBtn = document.getElementById("allBtn");
  panel.seprator.map((item, index) => {
    if (item.clicked == false) {
      if (isInside(mouseX, mouseY, item)) {
        ctx.fillStyle = "green";
        item.clicked = true;
        ctx.fillRect(item.x, item.y, item.w, item.h);
        canvasParent.appendChild(input);
        canvasParent.appendChild(leftBtn);
        canvasParent.appendChild(rightBtn);
        inpArr[index] = input;
        let CountTrue = index;
        let index1 = null;
        let index2 = null;
        let halfPostWidth = postWidth / 2;
        for (let i = CountTrue - 1; i >= 0; i--) {
          if (panel.seprator[i].clicked) {
            index1 = i;
            break;
          }
        }
        if (index1 == null) {
          let Panels = CountTrue + 1;
          for (let i = 0; i < Panels; i++) {
            panel.arr[i].text -= halfPostWidth / Panels;
          }
        } else {
          let Panels = CountTrue - index1;
          for (let i = index1; i < CountTrue; i++) {
            panel.arr[i + 1].text -= halfPostWidth / Panels;
          }
        }
        for (let i = CountTrue + 1; i < panel.seprator.length; i++) {
          if (panel.seprator[i].clicked) {
            index2 = i;
            break;
          }
        }
        if (index2 == null) {
          let Panels = panel.seprator.length - CountTrue;
          for (let i = CountTrue; i < panel.seprator.length; i++) {
            panel.arr[i + 1].text -= halfPostWidth / Panels;
          }
        } else {
          let Panels = index2 - CountTrue;
          for (let i = CountTrue; i < index2; i++) {
            panel.arr[i + 1].text -= halfPostWidth / Panels;
          }
        }
        btnPlus++;
        btnMinus++;
        let mousePosition = 70;
        if(btnPlus+btnMinus+inputBtn>= mousePosition){
          for(let i=0;i<panel.seprator.length;i++){
            panel.seprator[i].x -=50;
            panel.seprator[i].y+=10;
          }
        }
        let count = 0;
        let leftValue = leftWidth + panel.arr[0].text;
        if (CountTrue > 0) {
          for (let i = 0; i < CountTrue; i++) {
            if (panel.seprator[i].clicked == true) {
              count++;
            }
            leftValue = leftValue + panel.arr[i + 1].text;
          }
        }
        let newLeftValue =
          leftValue + count * postWidth + Math.round((postWidth * 10) / 2) / 10;
        leftBtnArr[index] = { button: leftBtn, clicked: true };
        rightBtnArr[index] = { button: rightBtn, clicked: false };
        leftValArr[index] = Math.round(newLeftValue * 10) / 10;
        rightValArr[index] = Math.round((WidthPost - newLeftValue) * 10) / 10;

        input.classList.add("custom-input");
        leftBtn.classList.add("custom-leftBtn");
        rightBtn.classList.add("custom-rightBtn");
        input.setAttribute("id", `input${index}`);
        leftBtn.setAttribute("id", `leftBtn${index}`);
        rightBtn.setAttribute("id", `rightBtn${index}`);

        leftBtn.style.top = item.y - 55 + "px";
        rightBtn.style.top = item.y - 55 + "px";
        leftBtn.style.left = item.x - 28 + "px";
        rightBtn.style.left = item.x + 2 + "px";
        input.style.top = item.y - 85 + "px";
        input.style.left = item.x - 30 + "px";
        input.type = "number";
        input.value = leftValArr[index];
        panel.create();
        leftBtn.addEventListener("click", () => {
          leftBtnArr[index].clicked = true;
          rightBtnArr[index].clicked = false;
          input.value = leftValArr[index];
        });
        rightBtn.addEventListener("click", () => {
          rightBtnArr[index].clicked = true;
          leftBtnArr[index].clicked = false;
          input.value = rightValArr[index];
        });

        input.addEventListener("input", (event) => {
          inputBtn++;
          let inputValue = parseInt(event.target.value);
          input.addEventListener("keyup", (e) => {
            if (e.key == "Enter") {
              if (inputValue >= 0) {
                if (rightBtnArr[index].clicked) {
                  let newValue = inputValue - rightValArr[index];
                  rightValArr[index] += newValue;
                  leftValArr[index] -= newValue;
                  let newIndex1 = null;
                  let newIndex2 = null;
                  for (let i = index - 1; i >= 0; i--) {
                    if (panel.seprator[i].clicked) {
                      newIndex1 = i;
                      break;
                    }
                  }
                  if(inputBtn > mouseEvents){
                    for (let i = 0; i < totalPanel; i++) {
                      panel.arr[i].w -= newValue ;
                      panel.arr[i].text -= newValue ;
                      panel.arr[i + 1].x = panel.arr[i].x ;
                      panel.seprator[i].x = panel.arr[i].x ;
                    }
                  }
                  if (newIndex1 == null) {
                    let totalPanel = index + 1;
                    for (let i = 0; i < totalPanel; i++) {
                      panel.arr[i].w -= newValue / (totalPanel*widthFactor);
                      panel.arr[i].text -= newValue / totalPanel;
                      panel.arr[i + 1].x = panel.arr[i].x + panel.arr[i].w;
                      panel.seprator[i].x = panel.arr[i].x + panel.arr[i].w - 5;
                    }
                  } else {
                    let totalPanel = index - newIndex1;
                    for (let i = newIndex1; i < index; i++) {
                      panel.arr[i + 1].w -= newValue / (totalPanel*widthFactor);
                      panel.arr[i + 1].text -= newValue / totalPanel;
                      panel.arr[i + 2].x =
                        panel.arr[i + 1].x + panel.arr[i + 1].w;
                      panel.seprator[i + 1].x =
                        panel.arr[i + 1].x + panel.arr[i + 1].w - 5;
                    }
                  }
                  for (let i = index + 1; i < panel.seprator.length; i++) {
                    if (panel.seprator[i].clicked) {
                      newIndex2 = i;
                      break;
                    }
                  }
                  if (newIndex2 == null) {
                    let totalPanel = panel.seprator.length - index;
                    for (let i = index; i < panel.seprator.length; i++) {
                      panel.arr[i + 1].w += newValue / (totalPanel*widthFactor);
                      panel.arr[i + 1].text += newValue / totalPanel;
                      panel.arr[i + 1].x = panel.arr[i].x + panel.arr[i].w;
                      panel.seprator[i].x = panel.arr[i].x + panel.arr[i].w - 5;
                    }
                  } else {
                    let totalPanel = newIndex2 - index;
                    for (let i = index; i < newIndex2; i++) {
                      panel.arr[i + 1].w += newValue / (totalPanel*widthFactor);
                      panel.arr[i + 1].text += newValue / totalPanel;
                      panel.arr[i + 2].x =
                        panel.arr[i + 1].x + panel.arr[i + 1].w;
                      panel.seprator[i + 1].x =
                        panel.arr[i + 1].x + panel.arr[i + 1].w - 5;
                    }
                  }
                } else if (leftBtnArr[index].clicked) {
                  let newValue = inputValue - leftValArr[index];
                  rightValArr[index] -= newValue;
                  leftValArr[index] += newValue;
                  let newIndex1 = null;
                  let newIndex2 = null;
                  for (let i = index - 1; i >= 0; i--) {
                    if (panel.seprator[i].clicked) {
                      newIndex1 = i;
                      break;
                    }
                  }
                  if(inputBtn > mouseEvents){
                    for (let i = 0; i < totalPanel; i++) {
                      panel.arr[i].w -= newValue ;
                      panel.arr[i].text -= newValue ;
                      panel.arr[i + 1].x = panel.arr[i].x ;
                      panel.seprator[i].x = panel.arr[i].x ;
                    }
                  }
                  if (newIndex1 == null) {
                    let totalPanel = index + 1;
                    for (let i = 0; i < totalPanel; i++) {
                      panel.arr[i].w += newValue / (totalPanel*widthFactor);
                      panel.arr[i].text += newValue / totalPanel;
                      panel.arr[i + 1].x = panel.arr[i].x + panel.arr[i].w;
                      panel.seprator[i].x = panel.arr[i].x + panel.arr[i].w - 5;
                    }
                  } else {
                    let totalPanel = index - newIndex1;
                    for (let i = newIndex1; i < index; i++) {
                      panel.arr[i + 1].w += newValue / (totalPanel*widthFactor);
                      panel.arr[i + 1].text += newValue / totalPanel;
                      panel.arr[i + 2].x =
                        panel.arr[i + 1].x + panel.arr[i + 1].w;
                      panel.seprator[i + 1].x =
                        panel.arr[i + 1].x + panel.arr[i + 1].w - 5;
                    }
                  }
                  for (let i = index + 1; i < panel.seprator.length; i++) {
                    if (panel.seprator[i].clicked) {
                      newIndex2 = i;
                      break;
                    }
                  }
                  if (newIndex2 == null) {
                    let totalPanel = panel.seprator.length - index;
                    for (let i = index; i < panel.seprator.length; i++) {
                      panel.arr[i + 1].w -= newValue / (totalPanel*widthFactor);
                      panel.arr[i + 1].text -= newValue / totalPanel;
                      panel.arr[i + 1].x = panel.arr[i].x + panel.arr[i].w;
                      panel.seprator[i].x = panel.arr[i].x + panel.arr[i].w - 5;
                    }
                  } else {
                    let totalPanel = newIndex2 - index;
                    for (let i = index; i < newIndex2; i++) {
                      panel.arr[i + 1].w -= newValue / (totalPanel*widthFactor);
                      panel.arr[i + 1].text -= newValue / totalPanel;
                      panel.arr[i + 2].x =
                        panel.arr[i + 1].x + panel.arr[i + 1].w;
                      panel.seprator[i + 1].x =
                        panel.arr[i + 1].x + panel.arr[i + 1].w - 5;
                    }
                  }
                }
                ctx.clearRect(track.x - 1,track.y - 1,track.w + 2,track.h + 2);
                ctx.clearRect(0, 0, 49, canvas.height);
                ctx.clearRect(track.x + leftWidth + 10,track.y - 31,track.x + track.w - leftWidth - rightWidth - 60,27);
                ctx.clearRect(track.x + track.w + 1, track.y - 1, 800, 435);
                track.create();
                panel.create();
                topFrame.create();
                bottomFrame.create();
                leftFrame.create();
                rightFrame.create();
                leftBtn.style.top =
                  Math.round(panel.seprator[index].y * 10) / 10 - 55 + "px";
                rightBtn.style.top =
                  Math.round(panel.seprator[index].y * 10) / 10 - 55 + "px";
                leftBtn.style.left =
                  Math.round(panel.seprator[index].x * 10) / 10 - 28 + "px";
                rightBtn.style.left =
                  Math.round(panel.seprator[index].x * 10) / 10 + 2 + "px";
                input.style.top =
                  Math.round(panel.seprator[index].y * 10) / 10 - 85 + "px";
                input.style.left =
                  Math.round(panel.seprator[index].x * 10) / 10 - 30 + "px";
                ctx.clearRect(leftFrameText.x,leftFrameText.y,leftFrameText.w,leftFrameText.h);
                ctx.clearRect(rightFrameText.x,rightFrameText.y,rightFrameText.w,rightFrameText.h);
                leftFrameText.create();
                rightFrameText.create();
              }
            }
          });
        });
      }
    } else if (isInside(mouseX, mouseY, item)) {
      item.clicked = false;
      ctx.clearRect(item.x - 16, item.y - 31, 42,27)
      ctx.clearRect(item.x+1, item.y+1, 8, item.h-2);
      ctx.beginPath();
      ctx.strokeStyle = "blue";
      ctx.moveTo(item.x + item.w / 2, item.y);
      ctx.lineTo(item.x + item.w / 2, item.h+item.y);
      ctx.stroke();
      removeInp=function(index){
        let removed= document.getElementById(`input${index}`)
        let removedLeft= document.getElementById(`leftBtn${index}`)
        let removedRight= document.getElementById(`rightBtn${index}`)
        inpArr[index] = -1;
        leftBtnArr[index] = -1;
        rightBtnArr[index] = -1;
      if(removed || removedLeft || removedRight){
        canvasParent.removeChild(removed)
        canvasParent.removeChild(removedLeft)
        canvasParent.removeChild(removedRight)
      }
      }
      removeInp(index) ;
      let CountTrue = index;
        let index1 = null;
        let index2 = null;
        let halfPostWidth = postWidth/2;
       for(let i=CountTrue-1;i >= 0;i--){
        if(panel.seprator[i].clicked){
          index1 = i;
          break;
        }
       }
       for(let i=CountTrue+1;i<panel.seprator.length;i++){
        if(panel.seprator[i].clicked){
          index2 = i;
          break;
        }
       }
        
       if(index1 == null && index2 == null){
        ctx.clearRect(panel.arr[0].x + panel.arr[0].w/2,panel.arr[0].y+1,panel.arr[panel.arr.length-1].x + panel.arr[panel.arr.length-1].w/2 - panel.arr[0].x-panel.arr[0].w/2,panel.arr[0].h-2);
        let Panels = panel.arr.length;
        let totalVal = WidthPost - leftWidth - rightWidth;
        let avgVal = totalVal/Panels;
        for(let i=0;i<Panels;i++){
         panel.arr[i].w = (avgVal/widthFactor);
         panel.arr[i].text = avgVal.toFixed(2);
         if(i<Panels - 1){
          panel.arr[i+1].x = panel.arr[i].x + panel.arr[i].w;
          panel.seprator[i].x = panel.arr[i].x + panel.arr[i].w - 5;
         }
        }
       }else if(index1 != null && index2 == null){
        ctx.clearRect(panel.arr[0].x + panel.arr[0].w/2,panel.arr[0].y+1,panel.arr[panel.arr.length-1].x + panel.arr[panel.arr.length-1].w/2 - panel.arr[0].x-panel.arr[0].w/2,panel.arr[0].h-2);
        let Panels = panel.seprator.length - index1;
        let totalVal = rightValArr[index1] - rightWidth;
        let avgVal = totalVal/Panels;
        for(let i=index1+1;i<panel.arr.length;i++){
          panel.arr[i].w = (avgVal/widthFactor);
          panel.arr[i].text = (avgVal.toFixed(2) - (halfPostWidth/Panels).toFixed(2)).toFixed(2);
          if(i<panel.arr.length-1){
            panel.arr[i+1].x = panel.arr[i].x + panel.arr[i].w;
            panel.seprator[i].x = panel.arr[i].x + panel.arr[i].w - 5;
          }
        }
       }else if(index1 == null && index2 != null){
        ctx.clearRect(panel.arr[0].x + panel.arr[0].w/2,panel.arr[0].y+1,panel.arr[panel.arr.length-1].x + panel.arr[panel.arr.length-1].w/2 - panel.arr[0].x-panel.arr[0].w/2,panel.arr[0].h-2);
       let Panels = index2 + 1;
       let totalVal = leftValArr[index2] - leftWidth;
       let avgVal = totalVal/Panels;
       for(let i=0;i<=index2;i++){
        panel.arr[i].w = (avgVal/widthFactor);
        panel.arr[i].text = (avgVal.toFixed(2) - (halfPostWidth/Panels).toFixed(2)).toFixed(2);
        if(i<index2){
          panel.arr[i+1].x = panel.arr[i].x + panel.arr[i].w;
          panel.seprator[i].x = panel.arr[i].x + panel.arr[i].w - 5;
        }
       }
       }else if(index1 != null && index2 != null){
        ctx.clearRect(panel.arr[0].x + panel.arr[0].w/2,panel.arr[0].y+1,panel.arr[panel.arr.length-1].x + panel.arr[panel.arr.length-1].w/2 - panel.arr[0].x-panel.arr[0].w/2,panel.arr[0].h-2);
        let Panels = index2 - index1;
        let totalval = leftValArr[index2] - leftValArr[index1];
        let avgVal = totalval/Panels;
        for(let i=index1+1;i<=index2;i++){
          panel.arr[i].w = (avgVal/widthFactor);
          panel.arr[i].text = (avgVal.toFixed(2) - (2*halfPostWidth/Panels).toFixed(2)).toFixed(2);
          if(i<index2){
            panel.arr[i+1].x = panel.arr[i].x + panel.arr[i].w;
            panel.seprator[i].x = panel.arr[i].x + panel.arr[i].w - 5;
          }
        }
       }
       panel.create();
       leftFrame.create();
       rightFrame.create();
    }
  });
});

function triggerClick(mouseX, mouseY) {
  let event = new Event('click');
  event.clientX = mouseX + canvas.getBoundingClientRect().left;
  event.clientY = mouseY + canvas.getBoundingClientRect().top;
  canvas.dispatchEvent(event);
}

function triggerInputKeyup(index, separatorVal) {
  let input = document.getElementById(`input${index}`);
  if (input) {
    input.value = separatorVal;
    const inputEvent = new Event('input', {
      bubbles: true,
      cancelable: true
    });
    input.dispatchEvent(inputEvent);
    const keyupEvent = new KeyboardEvent('keyup', {
      bubbles: true,
      cancelable: true,
      key: 'Enter',
      code: 'Enter'
    });
    input.dispatchEvent(keyupEvent);
  } else {
    console.log(`Input element with ID input${index} not found.`);
  }
}

let myArr = panel.seprator;
let incre = 1;
for(let i=0;i<myArr.length;i++){
  let item1 = `ToCenterTpost${incre}`;
  if(tableData["TpostLocation"] == 2){
    if(tableData[item1] != 0){
     triggerClick(myArr[i].x+2,myArr[i].y+5);
     triggerInputKeyup(i,tableData[item1]);
    }
    incre++;
  }else if(tableData["TpostLocation"] == 1){
    if(i == Math.floor((myArr.length)/2)){
      triggerClick(myArr[i].x+2,myArr[i].y + 5);
    }
  }
}

SubmitBtn.addEventListener("click", () => {
  track.getObj();
  panel.getObj();
  let count = 0;
  let separatorArr = panel.seprator;
  for(let i=0;i<separatorArr.length;i++){
    if(panel.seprator[i].clicked){
       count++;
    }
  }
  let TpostQtyLocationId = count > 0 ? 2 : 0;
  let TpostQtyId = count > 0 ? count : 0;
  let ToCenterTpos = [null,null,null,null,null,null,null,null];
  let Width = WidthPost;
  let Height = HeightPost;
  let PanelQtyId = PanelPost;
  for(let i=0;i<panel.seprator.length;i++){
    ToCenterTpos[i] = panel.seprator[i].clicked ? leftValArr[i].toString() : null;
  }
  let [ToCenterTpos1,ToCenterTpos2,ToCenterTpos3,ToCenterTpos4,ToCenterTpos5,ToCenterTpos6,ToCenterTpos7,ToCenterTpos8] = ToCenterTpos;
  let model = {
    Width:Width,
    Height:Height,
    PanelQtyId:PanelQtyId,
    PanelQty:PanelPost.toString(),
    TpostQtyId:TpostQtyId,
    TpostQty: TpostQtyId == 0 ? null : TpostQtyId.toString(),
    TpostQtyLocationId:TpostQtyLocationId,
    ToCenterTpos1:ToCenterTpos1,
    ToCenterTpos2:ToCenterTpos2,
    ToCenterTpos3:ToCenterTpos3,
    ToCenterTpos4:ToCenterTpos4,
    ToCenterTpos5:ToCenterTpos5,
    ToCenterTpos6:ToCenterTpos6,
    ToCenterTpos7:ToCenterTpos7,
    ToCenterTpos8:ToCenterTpos8,
    PsdetailId:tableData.PsdetailId,
    PlantationScheduleListId:tableData.PlantationScheduleListId,
  }

  fetch("/save-entry",{
    method:"POST",
    headers: {
      'Content-Type': 'application/json'
  },
  body: JSON.stringify(model)
  })
  .then(res => {
    if(!res.ok){
    return res.json().then(err => {
      throw new Error(err.message);
    });
  }
  return res.json();
  })
  .then(data => {
    if(data.message == "success"){
      alert("data updated successfully");
      window.parent.parentFunctions.closePopup();
      let orderId = localStorage.getItem("orderId");
      window.location.href = `/order-entry?orderId=${orderId}`;
      window.parent.populateTable();
    }
  })
  .catch(err => {
    if(err.message == "already exist"){
      alert("changes are not affected");
    }else if(err.message == "data not found"){
      alert("data not found. please check details");
    }else if(err.message == "failed to save data"){
      alert("failed to update data, try again");
    }else{
      console.log("internal server error: ",err);
    }
    window.parent.parentFunctions.closePopup();
    let orderId = localStorage.getItem("orderId");
    window.location.href = `/order-entry?orderId=${orderId}`;
    })
});