const canvasParent = document.getElementById('canvas')
const dividerBtn = document.getElementById("dividerBtn")
let canvas = document.querySelector('canvas');
canvas.width = 500;
canvas.height = 435;
let ctx = canvas.getContext("2d")
const SubmitButton = document.getElementById('Submit');

let panelWidth;
let panelHeight;
let fw;
let fh;
let slabHeight;
let factorWidth;
let factorHeight;
let factorSlabHeight;
let slabSize;
let maxSlab;
let panel;
let width;
let height;
let insidePanel;
let itemPanel = 10;
let upperLock;
let lowerLock;
let slab;
let mainSlabText;
let plusSlab;
let minusSlab;
let upperText;
let upperPlusBtn;
let upperMinusBtn;
let lowerText;
let lowerPlusBtn;
let lowerMinusBtn;
let bottomText;
let bottomPlusBtn;
let bottomMinusBtn;
let upperLimit;
let lowerLimit;
let dividerAns = false;
let upperHeight;
let lowerHeight;
let upperSlabSize;
let lowerSlabSize;
let lock1 = false;
let lock2 = false;
let lock3 = false;
let y1;
let y2;
let upperInp = document.createElement('input');
let upperInput = 0;
let upperInputValue;
let upperSlab;
let lowerInp = document.createElement('input');
let lowerInput = 0;
let lowerInputValue;
let lowerSlab;
let upperPanel;
let lowerPanel;
let middleLock;
let itemDivider = 1;
let upperSlabText;
let lowerSlabText;
let upperPlusSlab;
let upperMinusSlab;
let lowerPlusSlab;
let lowerMinusSlab;
let dividerPanel = 2;
let middleText;
let middlePositionInput = document.createElement('input');
let middlePositionInp = 0;
let middlePositionInpValue;
let middlePositionText;
let middleValue = 0;
let middlePlusBtn;
let middleMinusBtn;
let middlePositionPlusBtn;
let middlePositionMinusBtn;
let bottomInp = document.createElement('input');
let middleInput = document.createElement('input');

const tableBody = document.querySelector('#data-table tbody');
async function fetchData(){
    let layoutFrame = JSON.parse(localStorage.getItem("panelDesign"));
    return layoutFrame;
};

async function populateTable(){
    const data = await fetchData();
    data.forEach((row, index) => {
       const tr = document.createElement('tr');
        const i = index + 1;
        tr.innerHTML = `
        <td>${row.No}</td>
        <td>${row.Location}</td>
        <td>${row.Width}</td>
        <td>${row.Height}</td>
        <td>${row.Louvers}</td>
        <td>${row.Fold}</td>
    `;
    
        tr.addEventListener('click', function () {
            const selectedData = {
                No: row.No,
                Id:row.Id,
                Location: row.Location,
                Width: row.Width,
                Height: row.Height,
                Size: row.Louvers,
                Fold: row.Fold,
                Panel: row.Fold.length,
                MidRailHeight:row.MidRailHeight,
                Dr:row.Dr,
                PanelDesignId:row.PanelDesignId,
                Slab:row.Slab,
                UpperSlab:row.UpperSlab,
                LowerSlab:row.LowerSlab,
                UpperGap:row.UpperGap,
                LowerGap:row.LowerGap,
            };
            let Id = localStorage.setItem("Id", selectedData.Id);
            localStorage.setItem("panelDesignId",selectedData.PanelDesignId);
            let panelDesignWidth = Math.round((parseFloat(selectedData.Width) / selectedData.Panel) * 100) / 100;
            let panelDesignHeight = Math.round(((parseFloat(selectedData.Height))) * 100) / 100;
            let MidRailHeight = parseInt(selectedData.MidRailHeight);
            let UpperTextValue = parseInt(selectedData.UpperGap);
            let LowerTextValue = parseInt(selectedData.LowerGap);
            let SlabLength = parseInt(selectedData.Slab);
            let UpperSlabLength = parseInt(selectedData.UpperSlab);
            let LowerSlabLength = parseInt(selectedData.LowerSlab);
            let DR = selectedData.Dr;
            resetCanvas();
            resetState();
            CallCanvas(panelDesignWidth,panelDesignHeight,SlabLength,UpperTextValue,LowerTextValue,DR,MidRailHeight,UpperSlabLength,LowerSlabLength);

            const previouslySelected = document.querySelector('tr.selected');
            if (previouslySelected) {
                previouslySelected.classList.remove('selected');
            }
            tr.classList.add('selected');
        });
        tableBody.appendChild(tr);
    });
    let rowIndex = localStorage.getItem("rowIndex");
    let event = new Event('click');
    tableBody.children[rowIndex].dispatchEvent(event);
};
populateTable();

function resetState(){
panelWidth = null;
panelHeight = null;
fw = null;
fh = null;
slabHeight = null;
factorWidth = null;
factorHeight = null;
factorSlabHeight = null;
slabSize = null;
maxSlab = null;
panel = null;
itemPanel = null;
width = null;
height = null;
insidePanel = null;
upperLock = null;
lowerLock = null;
slab = null;
mainSlabText = null;
plusSlab = null;
minusSlab = null;
upperText = null;
upperInput = null;
upperInputValue = null;
upperPlusBtn = null;
upperMinusBtn = null;
lowerText = null;
lowerInput = null;
lowerInputValue = null;
lowerPlusBtn = null;
lowerMinusBtn = null;
bottomText = null;
bottomPlusBtn = null;
bottomMinusBtn = null;
upperLimit = null;
lowerLimit = null;
dividerAns = false;
upperHeight = null;
lowerHeight = null;
upperSlabSize = null;
lowerSlabSize = null;
lock1 = false;
lock2 = false;
lock3 = false;
y1 = null;
y2 = null;
upperSlab = null;
lowerSlab = null;
upperPanel = null;
lowerPanel = null;
middleLock = null;
itemDivider = null;
upperSlabText = null;
lowerSlabText = null;
upperPlusSlab = null;
upperMinusSlab = null;
lowerPlusSlab = null;
lowerMinusSlab = null;
middleText = null;
middlePositionText = null;
middlePositionInp = null;
middlePositionInpValue = null;
middlePlusBtn = null;
middleMinusBtn = null;
middlePositionPlusBtn = null;
middlePositionMinusBtn = null;
}

function resetCanvas(){
  const existingCanvases = canvasParent.querySelectorAll('canvas');
  existingCanvases.forEach(canvas => canvasParent.removeChild(canvas));
  const newCanvas = document.createElement('canvas');
  newCanvas.width = 500;
  newCanvas.height = 435;
  canvasParent.innerHTML = '';
  canvasParent.appendChild(newCanvas);
  canvas = newCanvas;
  ctx = newCanvas.getContext("2d");
};

function CallCanvas(panelDesignWidth, panelDesignHeight,SlabLength,UpperTextValue,LowerTextValue,DR,MidRailHeight,UpperSlabLength,LowerSlabLength) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    class Box {
        constructor(x, y, w, h) {
            this.x = x;
            this.y = y;
            this.w = w;
            this.h = h
        }
        create() {
            ctx.strokeStyle = "black";
            ctx.strokeRect(this.x, this.y, this.w, this.h)
        }
        getObj() {
            return {
                x: this.x,
                y: this.y,
                w: this.w,
                h: this.h
            }
        }
    }

    class Slab {
        constructor(x, y, w, h, s) {
            this.x = x;
            this.y = y;
            this.w = w;
            this.h = h;
            this.s = s;
            this.count = 0;
            this.arr = [];
        }
        create() {
            for (let i = 0; i < this.s; i++) {
                if (this.count == 0) {
                    this.arr.push({ x: this.x, y: this.y, w: this.w, h: this.h });
                }
                ctx.strokeStyle = "black";
                ctx.strokeRect(this.arr[i].x, this.arr[i].y, this.arr[i].w, this.arr[i].h);
                this.y = this.y + this.h;
            }
            this.count++;
        }
        getObj() {
            return {
                x: this.x,
                y: this.y,
                w: this.w,
                h: this.h,
                s: this.s,
                arr: this.arr,
            }
        }
    }

    class Text extends Box {
        constructor(x, y, w, h, text) {
            super(x, y, w, h);
            this.text = text;
            this.visible = true;
        }
        create(val) {
            ctx.fillStyle = "white"
            ctx.fillRect(this.x, this.y, this.w, this.h)
            ctx.strokeStyle = "black"
            ctx.strokeRect(this.x, this.y, this.w, this.h)
            if (this.visible) {
                ctx.font = `${val}px Arial`
                ctx.fillStyle = "black"
                ctx.textAlign = "center"
                ctx.textBaseline = "middle"
                ctx.fillText(this.text, this.x + this.w / 2, this.y + this.h / 2)
            }
        }
        create1() {
            ctx.strokeStyle = "black"
            ctx.strokeRect(this.x, this.y, this.w, this.h)
            if (this.visible) {
                ctx.font = "12px Arial"
                ctx.textAlign = "center"
                ctx.textBaseline = "middle"
                ctx.fillText(this.text, this.x + this.w / 3 + 3, this.y + this.h / 3 + 5);
            }
        }
        setVisible(visible) {
            this.visible = visible;
        }
        getObj() {
            let obj = super.getObj();
            obj.text = this.text;
            return obj;
        }
    }

    class Lock {
        constructor(x, y, w, h) {
            this.x = x;
            this.y = y;
            this.w = w;
            this.h = h;
        }
        locked() {
            ctx.clearRect(this.x, this.y, this.w, this.h);
            ctx.fillStyle = "red";
            ctx.fillRect(this.x, this.y, this.w, this.h);
        }
        unlocked() {
            ctx.clearRect(this.x, this.y, this.w, this.h);
            ctx.strokeStyle = "white";
            ctx.strokeRect(this.x, this.y, this.w, this.h);
        }
        getObj() {
            return {
                x: this.x,
                y: this.y,
                w: this.w,
                h: this.h
            }
        }
    }

    panelWidth = panelDesignWidth;
    panelHeight = panelDesignHeight;
    fw;
    fh;
    canvasParent.append(upperInp);
    canvasParent.append(lowerInp);
    canvasParent.append(bottomInp);

if(panelWidth <= 99){
  fw = (1/3).toFixed(2);
}else if(panelWidth <= 150){
  fw = (1/2).toFixed(2);
}else if(panelWidth <= 300){
  fw = 1;
}else if(panelWidth <= 600){
  fw = 2;
}else if(panelWidth <= 900){
  fw = 3;
}else{
  fw = 4;
}
if(panelHeight <= 350){
  fh = 1;
}else if(panelHeight <= 700){
  fh = 2;
}else if(panelHeight <= 1050){
  fh = 3;
}else if(panelHeight <= 1400){
  fh = 4;
}else if(panelHeight <= 1750){
  fh = 5;
}else{
  fh = 6;
}

slabHeight = 76;
upperInputValue = 15;
lowerInputValue = 15;
middlePositionInpValue = 15;
factorWidth = Math.round((panelWidth/fw)*100)/100;
factorHeight = Math.round((panelHeight/fh)*100)/100;
factorSlabHeight = Math.round((slabHeight/fh)*100)/100;
slabSize = SlabLength;
maxSlab = Math.floor((factorHeight-40)/factorSlabHeight);
panel = new Box(85,40,factorWidth,factorHeight);
panel.create();
width = new Text(panel.x + panel.w/2 - 15, panel.y - 25, 30, 20,panelWidth);
width.create1();
height = new Text(panel.x - 84, panel.y + panel.h/2 - 15,25,20,panelHeight);
height.create1();
let upperChangeValue = Math.round((UpperTextValue/fh)*100)/100;
insidePanel = new Box(panel.x + 20,panel.y + upperChangeValue,panel.w - 40,Math.round((factorSlabHeight*slabSize)*100)/100);
insidePanel.create();
upperLock = new Lock(panel.x + 1,panel.y + 1,panel.w - 2,insidePanel.y - panel.y - 2);
upperLock.unlocked();
lowerLock = new Lock(panel.x + 1,insidePanel.y + insidePanel.h + 1,panel.w - 2,panel.y + panel.h - insidePanel.y - insidePanel.h - 2);
lowerLock.unlocked();
slab = new Slab(insidePanel.x, insidePanel.y,insidePanel.w,factorSlabHeight,slabSize);
slab.create();
mainSlabText = new Text(insidePanel.x + insidePanel.w/2 - 13 , insidePanel.y + insidePanel.h/2 - 37, 25,25,slabSize);
mainSlabText.create(12);
plusSlab = new Text(insidePanel.x + insidePanel.w/2,insidePanel.y + insidePanel.h/2-10,20,20,"+")
plusSlab.create(20);
minusSlab = new Text(insidePanel.x + insidePanel.w/2-25,insidePanel.y + insidePanel.h/2-10,20,20,"-")
minusSlab.create(20);
upperText = new Text(panel.x + panel.w + 5, insidePanel.y + 5,50,25,UpperTextValue);
upperText.setVisible(false);
upperText.create(12);
upperInpText();
upperPlusBtn = new Text(upperText.x + 35,upperText.y,15,12,"+");
upperPlusBtn.create(20);
upperMinusBtn = new Text(upperText.x + 35,upperText.y + 13,15,12,"-")
upperMinusBtn.create(20);
lowerText = new Text(panel.x + panel.w + 5, insidePanel.y + insidePanel.h - 30,50,25,LowerTextValue);
lowerText.setVisible(false);
lowerText.create(12);
lowerInpText();
lowerPlusBtn = new Text(lowerText.x + 35,lowerText.y,15,12,"+");
lowerPlusBtn.create(20);
lowerMinusBtn = new Text(lowerText.x + 35,lowerText.y + 13,15,12,"-");
lowerMinusBtn.create(20);
bottomText = new Text(insidePanel.x + insidePanel.w - 55, panel.y + panel.h + 5, 50,25,Math.round((-insidePanel.x - insidePanel.w + panel.x + panel.w)*fw*10)/10);
bottomText.setVisible(false);
bottomText.create(12);
bottomInpText();
bottomPlusBtn = new Text(bottomText.x + 35,bottomText.y,15,12,"+");
bottomPlusBtn.create(20);
bottomMinusBtn = new Text(bottomText.x + 35,bottomText.y + 13, 15,12 ,"-");
bottomMinusBtn.create(20);
upperLimit = 20*fh;
lowerLimit = (panelHeight - maxSlab*slabHeight - 20*fh);

ctx.beginPath();
ctx.lineTo(panel.x - 80,panel.y)
ctx.lineTo(panel.x - 60,panel.y)
ctx.moveTo(panel.x - 70,panel.y + 1)
ctx.lineTo(panel.x -70, panel.y + panel.h/2 - 20)
ctx.moveTo(panel.x - 70,panel.y + panel.h/2 + 20)
ctx.lineTo(panel.x - 70, panel.y + panel.h-1)
ctx.moveTo(panel.x - 80, panel.y + panel.h)
ctx.lineTo(panel.x - 60,panel.y + panel.h)
ctx.moveTo(panel.x,panel.y - 25)
ctx.lineTo(panel.x,panel.y - 5)
ctx.moveTo(panel.x + 1,panel.y - 15)
ctx.lineTo(panel.x + panel.w/2 - 20,panel.y - 15)
ctx.moveTo(panel.x + panel.w/2 + 20,panel.y - 15)
ctx.lineTo(panel.x + panel.w - 1 ,panel.y - 15)
ctx.moveTo(panel.x + panel.w, panel.y - 25)
ctx.lineTo(panel.x + panel.w, panel.y - 5)
ctx.moveTo(panel.x + panel.w + 5,panel.y)
ctx.lineTo(panel.x + panel.w + 55, panel.y)
ctx.moveTo(panel.x + panel.w + 5,insidePanel.y)
ctx.lineTo(panel.x + panel.w + 55,insidePanel.y)
ctx.moveTo(panel.x + panel.w + 5,insidePanel.y +insidePanel.h)
ctx.lineTo(panel.x + panel.w + 55,insidePanel.y +insidePanel.h)
ctx.moveTo(panel.x + panel.w + 5, panel.y + panel.h)
ctx.lineTo(panel.x + panel.w + 55,panel.y + panel.h)
ctx.moveTo(insidePanel.x +insidePanel.w , panel.y + panel.h + 5);
ctx.lineTo(insidePanel.x +insidePanel.w , panel.y + panel.h + 40);
ctx.moveTo(panel.x + panel.w, panel.y + panel.h + 5);
ctx.lineTo(panel.x + panel.w, panel.y + panel.h + 40)
ctx.stroke()

function upperInpText(){
  upperInp.value = Math.round(upperText.text*10)/10;
  upperInp.style.left = Math.floor(upperText.x).toString() + "px"
  upperInp.style.top = Math.floor(upperText.y).toString() + "px"
}
function lowerInpText(){
  lowerInp.value = Math.round(lowerText.text*10)/10;
  lowerInp.style.left = Math.floor(lowerText.x).toString() + "px"
  lowerInp.style.top = Math.floor(lowerText.y).toString() + "px"
}
function bottomInpText(){
  bottomInp.value = Math.round(bottomText.text*10)/10;
  bottomInp.style.left = Math.floor(bottomText.x).toString() + "px"
  bottomInp.style.top = Math.floor(bottomText.y).toString() + "px"
  bottomInp.disabled = true;
}
function midInpText(){
  middleInput.value = Math.round(middleText.text*10)/10;
  middleInput.style.left = Math.floor(middleText.x).toString() + "px"
  middleInput.style.top = Math.floor(middleText.y).toString() + "px"
  middleInput.disabled = true;
}
function midPosInpText(){
  middlePositionInput.value = Math.round(middlePositionText.text*10)/10;
  middlePositionInput.style.left = Math.floor(middlePositionText.x).toString() + "px"
  middlePositionInput.style.top = Math.floor(middlePositionText.y).toString() + "px"
}
function isInsideButton(mouseX,mouseY,btn){
  return mouseX > btn.x && mouseY > btn.y && mouseX < btn.x + btn.w && mouseY < btn.y + btn.h ;
}
function sideText(){
upperText = new Text(panel.x + panel.w + 5, upperText.y,50,25,Math.round(upperText.text*100)/100);
upperText.setVisible(false);
upperText.create(12);
upperInpText()
upperPlusBtn = new Text(upperText.x + 35,upperText.y,15,12,"+");
upperPlusBtn.create(20);
upperMinusBtn = new Text(upperText.x + 35,upperText.y + 13,15,12,"-")
upperMinusBtn.create(20);
lowerText = new Text(lowerText.x, lowerText.y,50,25,Math.round(lowerText.text*100)/100);
lowerText.setVisible(false);
lowerText.create(12);
lowerInpText()
lowerPlusBtn = new Text(lowerText.x + 35,lowerText.y,15,12,"+");
lowerPlusBtn.create(20);
lowerMinusBtn = new Text(lowerText.x + 35,lowerText.y + 13,15,12,"-");
lowerMinusBtn.create(20);
}
function mainBox(){
  insidePanel = new Box(insidePanel.x,insidePanel.y,insidePanel.w,insidePanel.h);
  insidePanel.create();
  slab = new Slab(insidePanel.x , insidePanel.y , insidePanel.w ,factorSlabHeight,slabSize);
  slab.create()
  mainSlabText = new Text(insidePanel.x + insidePanel.w/2 - 13 , insidePanel.y + insidePanel.h/2 - 37, 25,25,slabSize);
  mainSlabText.create(12);
  plusSlab = new Text(insidePanel.x + insidePanel.w/2, insidePanel.y + insidePanel.h/2 - 10,20,20,"+");
  plusSlab.create(20);
  minusSlab = new Text(insidePanel.x + insidePanel.w/2-25,insidePanel.y + insidePanel.h/2 - 10,20,20,"-");
  minusSlab.create(20);
  upperLock = new Lock(panel.x + 1.5,panel.y + 1.5,panel.w - 3,insidePanel.y - panel.y - 3);
  lowerLock = new Lock(panel.x + 1.5,insidePanel.y + insidePanel.h + 1.5,panel.w - 3,panel.y + panel.h - insidePanel.y - insidePanel.h - 3);
  sideText();
}
function dividerBox(){
upperPanel = new Box(upperPanel.x,upperPanel.y,upperPanel.w,upperPanel.h);
upperPanel.create();
upperSlab = new Slab(upperPanel.x , upperPanel.y , upperPanel.w ,factorSlabHeight,upperSlabSize);
upperSlab.create()
upperSlabText = new Text(upperPanel.x + upperPanel.w/2 - 13 , upperPanel.y + upperPanel.h/2 - 37, 25,25,upperSlabSize);
upperSlabText.create(12);
upperPlusSlab = new Text(upperPanel.x + upperPanel.w/2, upperPanel.y + upperPanel.h/2 -10,20,20,"+");
upperPlusSlab.create(20);
upperMinusSlab = new Text(upperPanel.x + upperPanel.w/2-25,upperPanel.y + upperPanel.h/2-10,20,20,"-");
upperMinusSlab.create(20);
lowerPanel = new Box(lowerPanel.x,lowerPanel.y,lowerPanel.w,lowerPanel.h);
lowerPanel.create();
lowerSlab = new Slab(lowerPanel.x , lowerPanel.y , lowerPanel.w , factorSlabHeight,lowerSlabSize);
lowerSlab.create()
lowerSlabText = new Text(lowerPanel.x + lowerPanel.w/2 - 13 , lowerPanel.y + lowerPanel.h/2 - 37, 25,25,lowerSlabSize);
lowerSlabText.create(12);
lowerPlusSlab = new Text(lowerPanel.x + lowerPanel.w/2, lowerPanel.y + lowerPanel.h/2 -10,20,20,"+");
lowerPlusSlab.create(20);
lowerMinusSlab = new Text(lowerPanel.x + lowerPanel.w/2-25,lowerPanel.y + lowerPanel.h/2-10,20,20,"-");
lowerMinusSlab.create(20);
middleText = new Text(middleText.x,middleText.y, 50, 25,slabHeight);
middleText.setVisible(false);
middleText.create(12);
midInpText()
middlePlusBtn = new Text(middleText.x + 35,middleText.y,15,12,"+");
middlePlusBtn.create(20);
middleMinusBtn = new Text(middleText.x + 35,middleText.y + 13,15,12,"-");
middleMinusBtn.create(20);
middlePositionText = new Text(middlePositionText.x,middlePositionText.y,50,25,Math.round(middlePositionText.text*10)/10);
middlePositionText.setVisible(false);
middlePositionText.create(12);
midPosInpText()
middlePositionPlusBtn = new Text(middlePositionText.x + 35,middlePositionText.y,15,12,"+");
middlePositionPlusBtn.create(20);
middlePositionMinusBtn = new Text(middlePositionText.x + 35,middlePositionText.y + 13,15,12,"-")
middlePositionMinusBtn.create(20);
upperLock = new Lock(panel.x + 1.5,panel.y + 1.5,panel.w - 3,upperPanel.y - panel.y - 3);
lowerLock = new Lock(panel.x + 1.5,lowerPanel.y + lowerPanel.h + 1.5,panel.w - 3,panel.y + panel.h - lowerPanel.y - lowerPanel.h - 3);
middleLock = new Lock(panel.x + 1.5,upperPanel.y + upperPanel.h + 1.5,panel.w - 3,lowerPanel.y - upperPanel.y - upperPanel.h - 3);
sideText();
}
function drawMain(){
ctx.beginPath()
ctx.moveTo(panel.x + panel.w + 5,panel.y)
ctx.lineTo(panel.x + panel.w + 55, panel.y)
ctx.moveTo(panel.x + panel.w + 5, insidePanel.y)
ctx.lineTo(panel.x + panel.w + 55, insidePanel.y)
ctx.moveTo(panel.x + panel.w + 5,panel.y + panel.h)
ctx.lineTo(panel.x + panel.w + 55, panel.y + panel.h)
ctx.moveTo(panel.x + panel.w + 5, insidePanel.y + insidePanel.h)
ctx.lineTo(panel.x + panel.w + 55, insidePanel.y + insidePanel.h)
ctx.stroke()
}
function drawDivider(){
ctx.beginPath()
ctx.moveTo(panel.x + panel.w + 5,panel.y)
ctx.lineTo(panel.x + panel.w + 55, panel.y)
ctx.moveTo(panel.x + panel.w + 5, upperPanel.y)
ctx.lineTo(panel.x + panel.w + 55, upperPanel.y)
ctx.moveTo(panel.x + panel.w + 5,panel.y + panel.h)
ctx.lineTo(panel.x + panel.w + 55, panel.y + panel.h)
ctx.moveTo(panel.x + panel.w + 5, lowerPanel.y + lowerPanel.h)
ctx.lineTo(panel.x + panel.w + 55, lowerPanel.y + lowerPanel.h)
ctx.moveTo(panel.x + panel.w + 60,upperPanel.y + upperPanel.h)
ctx.lineTo(panel.x + panel.w + 110,upperPanel.y + upperPanel.h)
ctx.moveTo(panel.x + panel.w + 60, lowerPanel.y)
ctx.lineTo(panel.x + panel.w + 110, lowerPanel.y)
ctx.moveTo(panel.x -55,y2 - (factorSlabHeight/2))
ctx.lineTo(panel.x - 35,y2 - (factorSlabHeight/2))
ctx.moveTo(panel.x -45,y2 - (factorSlabHeight/2)+1)
ctx.lineTo(panel.x - 45, panel.y + panel.h - 1)
ctx.moveTo(panel.x -55, panel.y + panel.h)
ctx.lineTo(panel.x - 35, panel.y + panel.h)
ctx.stroke()
}
dividerBtn.addEventListener('click',()=>{
     dividerAns = true;
})
canvas.addEventListener("click",function(event){
  var mouseX = event.clientX - canvas.getBoundingClientRect().left;
  var mouseY = event.clientY - canvas.getBoundingClientRect().top;

  // ---------------- create divider rail -------------------------
  if(dividerAns == true){
    for(let i=0;i<slab.arr.length;i++){
      if(isInsideButton(mouseX,mouseY,slab.arr[i])){
        dividerAns = false;
        if(i>=3 && i<slab.arr.length-1){
          ctx.clearRect(panel.x+1,panel.y+1,panel.w-2,panel.h-2);
          y1 = slab.arr[i].y;
          y2 = y1 + factorSlabHeight;
          canvasParent.append(middleInput);
          canvasParent.append(middlePositionInput)
          upperHeight = y1 - insidePanel.y;
          upperSlabSize = i;
          lowerHeight = insidePanel.h + insidePanel.y - y2;
          lowerSlabSize = slabSize - i - 1;
          upperPanel = new Box(insidePanel.x,insidePanel.y,insidePanel.w,y1-insidePanel.y);
          upperPanel.create();
          upperSlab = new Slab(upperPanel.x , upperPanel.y, upperPanel.w,factorSlabHeight,upperSlabSize);
          upperSlab.create()
          upperSlabText = new Text(upperPanel.x + upperPanel.w/2 - 13 , upperPanel.y + upperPanel.h/2 - 37, 25 , 25 ,upperSlabSize)
          upperSlabText.create(12);
          upperPlusSlab = new Text(upperPanel.x + upperPanel.w/2, upperPanel.y + upperPanel.h/2 - 10,20,20,"+");
          upperPlusSlab.create(20);
          upperMinusSlab = new Text(upperPanel.x + upperPanel.w/2-25,upperPanel.y + upperPanel.h/2 - 10,20,20,"-");
          itemPanel++;
          itemDivider++;
          dividerPanel++;
          middleValue--;
          upperMinusSlab.create(20);
          lowerPanel = new Box(insidePanel.x,y2,insidePanel.w,insidePanel.h + insidePanel.y - y2);
          lowerPanel.create();
          lowerSlab = new Slab(lowerPanel.x, lowerPanel.y, lowerPanel.w,factorSlabHeight,lowerSlabSize);
          lowerSlab.create()
          lowerSlabText = new Text(lowerPanel.x + lowerPanel.w/2 - 13 , lowerPanel.y + lowerPanel.h/2 - 37, 25,25,lowerSlabSize)
          lowerSlabText.create(12);
          upperLock = new Lock(panel.x + 1.5,panel.y + 1.5,panel.w - 3,upperPanel.y - panel.y - 3);
          upperLock.unlocked();
          lowerLock = new Lock(panel.x + 1.5,lowerPanel.y + lowerPanel.h + 1.5,panel.w - 3,panel.y + panel.h - lowerPanel.y - lowerPanel.h - 3);
          lowerLock.unlocked();
          middleLock = new Lock(panel.x + 1.5,upperPanel.y + upperPanel.h + 1.5,panel.w - 3,lowerPanel.y - upperPanel.y - upperPanel.h - 3);
          middleLock.unlocked();
          lowerPlusSlab = new Text(lowerPanel.x + lowerPanel.w/2, lowerPanel.y + lowerPanel.h/2 - 10,20,20,"+");
          lowerPlusSlab.create(20);
          lowerMinusSlab = new Text(lowerPanel.x + lowerPanel.w/2-25,lowerPanel.y + lowerPanel.h/2 - 10,20,20,"-");
          lowerMinusSlab.create(20);
          ctx.clearRect(panel.x + panel.w + 59,panel.y - 1,52,panel.h + 2)
          ctx.clearRect(panel.x - 56,panel.y - 1,52,panel.h + 2)
          ctx.beginPath()
          ctx.lineTo(panel.x + panel.w + 60,y1)
          ctx.lineTo(panel.x + panel.w + 110, y1)
          ctx.moveTo(panel.x + panel.w + 60, y2)
          ctx.lineTo(panel.x + panel.w + 110,y2)
          ctx.moveTo(panel.x -55,y2 - (factorSlabHeight/2))
          ctx.lineTo(panel.x - 35,y2 - (factorSlabHeight/2))
          ctx.moveTo(panel.x - 45,y2-(factorSlabHeight/2)+1)
          ctx.lineTo(panel.x - 45, panel.y + panel.h - 1)
          ctx.moveTo(panel.x - 55, panel.y + panel.h)
          ctx.lineTo(panel.x - 35, panel.y + panel.h)
          ctx.stroke()
          middleText = new Text(panel.x + panel.w + 60, y2 + 5, 50, 25,slabHeight);
          middleText.setVisible(false);
          middleText.create(12);
          midInpText();
          middlePositionText = new Text(panel.x- 55,y2 - 26 -(factorSlabHeight/2),50,25,Math.round((panel.y + panel.h - y2 + 8)*fh*10)/10);
          middlePositionText.setVisible(false);
          middlePositionText.create(12);
          midPosInpText();
          middlePlusBtn = new Text(middleText.x + 35,middleText.y, 15,12, "+")
          middlePlusBtn.create(20);
          middleMinusBtn = new Text(middleText.x + 35, middleText.y + 13, 15 , 12,"-")
          middleMinusBtn.create(20);
          middlePositionPlusBtn = new Text(middlePositionText.x + 35,middlePositionText.y, 15,12, "+")
          middlePositionPlusBtn.create(20);
          middlePositionMinusBtn = new Text(middlePositionText.x + 35,middlePositionText.y + 13, 15 ,12,"-")
          middlePositionMinusBtn.create(20);
        }
      }
    }
  }

  // ---------------- upper lock ---------------------
  if(isInsideButton(mouseX,mouseY,upperLock)){
     if(upperPanel){
      if(lock1 == false && lock2 == false && lock3 == false){
        lock1 = true;
        upperLock = new Lock(panel.x + 1.5,panel.y + 1.5,panel.w - 3,upperPanel.y - panel.y - 3);
        upperInp.disabled = true;
        lowerInp.disabled = true;
        middlePositionInput.disabled = true;
        upperLock.locked();
      }else if(lock1 == true){
        lock1 = false;
        upperInp.disabled = false;
        lowerInp.disabled = false;
        middlePositionInput.disabled = false;
        upperLock = new Lock(panel.x + 1.5,panel.y + 1.5,panel.w - 3,upperPanel.y - panel.y - 3);
        upperLock.unlocked();
      }else{
        alert("you already locked lower or middle part.");
      }
     }else if(insidePanel){
      if(lock1 == false && lock2 == false && lock3 == false){
        lock1 = true;
        upperInp.disabled = true;
        lowerInp.disabled = true;
        upperLock = new Lock(panel.x + 1.5,panel.y + 1.5,panel.w - 3,insidePanel.y - panel.y - 3);
        upperLock.locked();
      }else if(lock1 == true){
        lock1 = false;
        upperInp.disabled = false;
        lowerInp.disabled = false;
        upperLock = new Lock(panel.x + 1.5,panel.y + 1.5,panel.w - 3,insidePanel.y - panel.y - 3);
        upperLock.unlocked();
      }else{
        alert("you already locked lower or middle part.");
      }
     }
  }
  
  // -------------- lower lock --------------------------
  if(isInsideButton(mouseX,mouseY,lowerLock)){
   if(lowerPanel){
    if(lock1 == false && lock2 == false && lock3 == false){
      lock3 = true;
      upperInp.disabled = true;
        lowerInp.disabled = true;
        middlePositionInput.disabled = true;
      lowerLock = new Lock(panel.x + 1.5,lowerPanel.y + lowerPanel.h + 1.5,panel.w - 3,panel.y + panel.h - lowerPanel.y - lowerPanel.h - 3);
      lowerLock.locked();
    }else if(lock3 == true){
      lock3 = false;
      upperInp.disabled = false;
        lowerInp.disabled = false;
        middlePositionInput.disabled = false;
      lowerLock = new Lock(panel.x + 1.5,lowerPanel.y + lowerPanel.h + 1.5,panel.w - 3,panel.y + panel.h - lowerPanel.y - lowerPanel.h - 3);
      lowerLock.unlocked();
    }else{
      alert(" you already locked upper or middle part.")
    }
   }else if(insidePanel){
    if(lock1 == false && lock2 == false && lock3 == false){
      lock3 = true;
      lowerInp.disabled = true;
      upperInp.disabled = true;
      lowerLock = new Lock(panel.x + 1.5,insidePanel.y + insidePanel.h + 1.5,panel.w - 3,panel.y + panel.h - insidePanel.y - insidePanel.h - 3);
      lowerLock.locked();
    }else if(lock3 == true){
      lock3 = false;
      lowerInp.disabled = false;
      upperInp.disabled = false;
      lowerLock = new Lock(panel.x + 1.5,insidePanel.y + insidePanel.h + 1.5,panel.w - 3,panel.y + panel.h - insidePanel.y - insidePanel.h - 3);
      lowerLock.unlocked();
    }else{
      alert(" you already locked upper or middle part.")
    }
   }
  }

  // ----------------- middle lock -------------------------
  if(middleLock && middleLock.getObj){
    middleLock.getObj();
    if(isInsideButton(mouseX,mouseY,middleLock.getObj())){
      if(lock1 == false && lock2 == false && lock3 == false){
        lock2 = true;
        upperInp.disabled = true;
        lowerInp.disabled = true;
        middlePositionInput.disabled = true;
        middleLock = new Lock(panel.x + 1.5,upperPanel.y + upperPanel.h + 1.5,panel.w - 3,lowerPanel.y - upperPanel.y - upperPanel.h - 3);
        middleLock.locked();
      }else if(lock2 == true){
        lock2 = false;
        upperInp.disabled = false;
        lowerInp.disabled = false;
        middlePositionInput.disabled = false;
        middleLock = new Lock(panel.x + 1.5,upperPanel.y + upperPanel.h + 1.5,panel.w - 3,lowerPanel.y - upperPanel.y - upperPanel.h - 3);
        middleLock.unlocked();
      }else{
        alert("you already locked upper or lower part.");
      }
    }
  }
   
  // ------------ main minus slabs --------------------
  if(isInsideButton(mouseX,mouseY,minusSlab.getObj())){
    if(slabSize > 1){
      let roundedValue = Math.round((factorSlabHeight/2)*100)/100;
      if(lock1 == false && lock3 == false){
        ctx.clearRect(panel.x + 1,panel.y + 1,panel.w - 2,panel.h - 2);
        ctx.clearRect(panel.x + panel.w + 4,panel.y - 1,100,panel.h + 2);
        slabSize--;
        insidePanel.h -= factorSlabHeight;
        insidePanel.y += roundedValue;
        upperText.y += roundedValue;
        upperText.text += roundedValue*fh;
        lowerText.y -= roundedValue;
        lowerText.text += roundedValue*fh;
        mainBox();
        drawMain();
        upperLock.unlocked();
        lowerLock.unlocked();
      }else if(lock1){
        ctx.clearRect(panel.x + 1,panel.y + 1,panel.w - 2,panel.h - 2);
        ctx.clearRect(panel.x + panel.w + 4,panel.y - 1,100,panel.h + 2);
        slabSize--;
        insidePanel.h -= factorSlabHeight;
          lowerText.y -= roundedValue*2;
          lowerText.text += roundedValue*2*fh;
          mainBox();
          drawMain();
          upperLock.locked();
          lowerLock.unlocked();
      }else if(lock3){
        ctx.clearRect(panel.x + 1,panel.y + 1,panel.w - 2,panel.h - 2);
        ctx.clearRect(panel.x + panel.w + 4,panel.y - 1,100,panel.h + 2);
        slabSize--;
        insidePanel.h -= factorSlabHeight;
        insidePanel.y += roundedValue*2;
        upperText.y += roundedValue*2;
        upperText.text += roundedValue*2*fh;
        mainBox();
        drawMain();
        upperLock.unlocked();
        lowerLock.locked();
      }
    }else{
      alert("slabs cannot be negative.")
    }
  }

  // ------------------------ main plus slabs --------------------
  if(isInsideButton(mouseX,mouseY ,plusSlab.getObj())){
    console.log("plus btn clcicked");
    if(slabSize < maxSlab){
      let roundedValue = Math.round((factorSlabHeight/2)*100)/100;
      if(lock1 == false && lock3 == false){
        if(upperText.text >= upperLimit + roundedValue*fh && lowerText.text >= lowerLimit + roundedValue*fh){
          ctx.clearRect(panel.x + 1,panel.y + 1,panel.w - 2,panel.h - 2);
          ctx.clearRect(panel.x + panel.w + 4,panel.y - 1,112,panel.h + 2);
          slabSize++;
          insidePanel.h += factorSlabHeight;
          insidePanel.y -= roundedValue;
        upperText.y -= roundedValue;
        upperText.text -= roundedValue*fh;
        lowerText.y += roundedValue;
        lowerText.text -= roundedValue*fh;
        mainBox();
        drawMain();
        upperLock.unlocked();
        lowerLock.unlocked();
        }else if(upperText.text < upperLimit + roundedValue*fh){
         alert("reached minimum upper limit.")
        }else if(lowerText.text < lowerLimit + roundedValue*fh){
          alert("reached minimum lower limit.");
        }
      }else if(lock1){
        if(lowerText.text >= lowerLimit + factorSlabHeight*fh){
          ctx.clearRect(panel.x + 1,panel.y + 1,panel.w - 2,panel.h - 2);
          ctx.clearRect(panel.x + panel.w + 4,panel.y - 1,112,panel.h + 2);
          slabSize++;
          insidePanel.h += factorSlabHeight;
          lowerText.y += roundedValue*2;
          lowerText.text -= roundedValue*2*fh;
          mainBox();
          drawMain();
          upperLock.locked();
          lowerLock.unlocked();
        }else{
          alert("reached minimum lower limit.")
        }
      }else if(lock3){
        if(upperText.text >= upperLimit + factorSlabHeight*fh){
          ctx.clearRect(panel.x + 1,panel.y + 1,panel.w - 2,panel.h - 2);
          ctx.clearRect(panel.x + panel.w + 4,panel.y - 1,112,panel.h + 2);
          slabSize++;
          insidePanel.h += factorSlabHeight;
        insidePanel.y -= roundedValue*2;
        upperText.y -= roundedValue*2;
        upperText.text -= roundedValue*2*fh;
        mainBox();
        drawMain();
        upperLock.unlocked();
        lowerLock.locked();
        }else{
          alert("reached minimum upper limit.");
        }
      }
    }else{
      alert("reached maximum limit of slabs.")
    }
  }

  // -------------- upper panel plus slabs ------------------
  if(upperPlusSlab && upperPlusSlab.getObj){
    upperPlusSlab.getObj()
    if(isInsideButton(mouseX,mouseY,upperPlusSlab.getObj())){
      if(upperSlabSize + lowerSlabSize == maxSlab - 1 && lowerSlabSize > 1){
        if(lock1 == false && lock2 == false && lock3 == false){
          let roundedValue = Math.round((factorSlabHeight/2)*100)/100;
          if(upperText.text >= upperLimit + roundedValue*fh && lowerText.text >= lowerLimit + roundedValue*fh){
            ctx.clearRect(panel.x + 1,panel.y + 1,panel.w - 2,panel.h - 2);
            ctx.clearRect(panel.x + panel.w + 4,panel.y - 1,110,panel.h + 2);
            ctx.clearRect(panel.x - 56,panel.y - 1,52,panel.h + 2);
            upperSlabSize++;
            lowerSlabSize--;
            upperPanel.y -= roundedValue;
            upperPanel.h += factorSlabHeight;
            lowerPanel.y += roundedValue;
            lowerPanel.h -= factorSlabHeight;
            upperText.y -= roundedValue;
            upperText.text -= roundedValue*fh;
            lowerText.y -= roundedValue;
            lowerText.text += roundedValue*fh;
            middleText.y += roundedValue;
            middlePositionText.y += roundedValue;
            y2 += roundedValue;
            middlePositionText.text -= roundedValue*fh;
            dividerBox();
            drawDivider();
            upperLock.unlocked();
            lowerLock.unlocked();
            middleLock.unlocked();
          }else if(upperText.text < upperLimit + roundedValue*fh){
           alert("reached minimum upper limit.")
          }else if(lowerText.text < lowerLimit + roundedValue*fh){
           alert("reached minimum lower limit.")
          }
        }else if(lock1){
          ctx.clearRect(panel.x + 1,panel.y + 1,panel.w - 2,panel.h - 2);
          ctx.clearRect(panel.x + panel.w + 4,panel.y - 1,110,panel.h + 2);
          ctx.clearRect(panel.x - 56,panel.y - 1,52,panel.h + 2);
          console.log("upperplus slab lock1")
          upperSlabSize++;
          lowerSlabSize--;
          upperPanel.h += factorSlabHeight;
          lowerPanel.y += factorSlabHeight;
          lowerPanel.h -= factorSlabHeight;
          middleText.y += factorSlabHeight;
          middlePositionText.y += factorSlabHeight;
          middlePositionText.text -= factorSlabHeight*fh;
          y2 += factorSlabHeight;
          dividerBox();
          drawDivider();
          upperLock.locked();
          lowerLock.unlocked();
          middleLock.unlocked();
        }else if(lock2){
          alert("reached maximum slabs limit.")
        }else if(lock3){
          ctx.clearRect(panel.x + 1,panel.y + 1,panel.w - 2,panel.h - 2);
          ctx.clearRect(panel.x + panel.w + 4,panel.y - 1,110,panel.h + 2);
          ctx.clearRect(panel.x - 56,panel.y - 1,52,panel.h + 2);
          console.log("upperplus slab lock3")
          upperSlabSize++;
          lowerSlabSize--;
          upperPanel.h += factorSlabHeight;
          lowerPanel.y += factorSlabHeight;
          lowerPanel.h -= factorSlabHeight;
          middleText.y += factorSlabHeight;
          middlePositionText.y += factorSlabHeight;
          middlePositionText.text -= factorSlabHeight*fh;
          y2 += factorSlabHeight;
          dividerBox();
          drawDivider();
          upperLock.unlocked();
          lowerLock.locked();
          middleLock.unlocked();
        }
      }else if(upperSlabSize + lowerSlabSize < maxSlab - 1){
        if(lock1 == false && lock2 == false && lock3 == false){
          let roundedValue = Math.round((factorSlabHeight/2)*100)/100;
          if(upperText.text >= upperLimit + roundedValue*fh && lowerText.text >= lowerLimit + roundedValue*fh){
            ctx.clearRect(panel.x + 1,panel.y + 1,panel.w - 2,panel.h - 2);
            ctx.clearRect(panel.x + panel.w + 4,panel.y - 1,110,panel.h + 2);
            ctx.clearRect(panel.x - 56,panel.y - 1,52,panel.h + 2);
            upperSlabSize++;
            upperPanel.y -= roundedValue;
            upperPanel.h += factorSlabHeight;
            lowerPanel.y += roundedValue;
            upperText.y -= roundedValue;
            upperText.text -= roundedValue*fh;
            lowerText.y += roundedValue;
            lowerText.text -= roundedValue*fh;
            middleText.y += roundedValue;
            middlePositionText.y += roundedValue;
            y2 += roundedValue;
            middlePositionText.text -= roundedValue*fh
            dividerBox();
            drawDivider();
            upperLock.unlocked();
            lowerLock.unlocked();
            middleLock.unlocked();
          }else if(upperText.text < upperLimit + roundedValue*fh){
            alert("you reached minimum upper limit.")
          }else{
            alert("reached minimum lower limit.");
          }
        }else if(lock1){
          if(lowerText.text >= lowerLimit + factorSlabHeight*fh){
            ctx.clearRect(panel.x + 1,panel.y + 1,panel.w - 2,panel.h - 2);
            ctx.clearRect(panel.x + panel.w + 4,panel.y - 1,110,panel.h + 2);
            ctx.clearRect(panel.x - 56,panel.y - 1,52,panel.h + 2);
            upperSlabSize++;
            upperPanel.h += factorSlabHeight;
            lowerPanel.y += factorSlabHeight;
            middleText.y += factorSlabHeight;
            lowerText.y += factorSlabHeight;
            lowerText.text -= factorSlabHeight*fh;
            middlePositionText.y += factorSlabHeight;
            middlePositionText.text -= factorSlabHeight*fh;
            y2 += factorSlabHeight;
            dividerBox();
            drawDivider();
            upperLock.locked();
            lowerLock.unlocked();
            middleLock.unlocked();
          }else{
            alert("reached minimum lower limit.")
          }
        }else if(lock2){
          if(upperText.text >= upperLimit + factorSlabHeight*fh){
            ctx.clearRect(panel.x + 1,panel.y + 1,panel.w - 2,panel.h - 2);
            ctx.clearRect(panel.x + panel.w + 4,panel.y - 1,110,panel.h + 2);
            ctx.clearRect(panel.x - 56,panel.y - 1,52,panel.h + 2);
            upperSlabSize++;
            upperPanel.y -= factorSlabHeight;
            upperPanel.h += factorSlabHeight;
            upperText.y -= factorSlabHeight;
            upperText.text -= factorSlabHeight*fh;
            dividerBox();
            drawDivider();
            upperLock.unlocked();
            lowerLock.unlocked();
            middleLock.locked();
          }else{
            alert("reached minimum upper limit.");
          }
        }else if(lock3){
          if(upperText.text >= upperLimit + factorSlabHeight*fh){
            ctx.clearRect(panel.x + 1,panel.y + 1,panel.w - 2,panel.h - 2);
            ctx.clearRect(panel.x + panel.w + 4,panel.y - 1,110,panel.h + 2);
            ctx.clearRect(panel.x - 56,panel.y - 1,52,panel.h + 2);
            upperSlabSize++;
            upperPanel.y -= factorSlabHeight;
            upperPanel.h += factorSlabHeight;
            upperText.y -= factorSlabHeight;
            upperText.text -= factorSlabHeight*fh;
            dividerBox();
            drawDivider();
            upperLock.unlocked();
            lowerLock.locked();
            middleLock.unlocked();
          }else{
            alert("reached minimum upper limit.");
          }
        }
      }else{
        alert("lower slabs cannot be negative.");
      }
    }
  }

  // ----------------- upper panel minus slabs ----------------------
  if(upperMinusSlab && upperMinusSlab.getObj){
    upperMinusSlab.getObj()
    if(isInsideButton(mouseX,mouseY,upperMinusSlab.getObj())){
      if(upperSlabSize > 1){
        if(lock1 == false && lock2 == false && lock3 == false){
          ctx.clearRect(panel.x + 1, panel.y + 1,panel.w - 2 ,panel.h - 2);
          ctx.clearRect(panel.x + panel.w + 4,panel.y - 1,112,panel.h + 2);
          ctx.clearRect(panel.x - 56,panel.y - 1,52,panel.h + 2);
          upperSlabSize--;
          console.log("clciked event: ",upperSlabSize,lowerSlabSize,upperPanel,lowerPanel,insidePanel);
          let roundedValue = Math.round((factorSlabHeight/2)*100)/100;
          upperPanel.y += roundedValue;
          upperPanel.h -= factorSlabHeight;
          lowerPanel.y -= roundedValue;
          upperText.y += roundedValue;
          upperText.text += roundedValue*fh;
          lowerText.y -= roundedValue;
          lowerText.text += roundedValue*fh;
          middleText.y -= roundedValue;
          middlePositionText.y -= roundedValue;
          y2 -= roundedValue;
          middlePositionText.text += roundedValue*fh
          dividerBox();
          drawDivider();
          upperLock.unlocked();
          lowerLock.unlocked();
          middleLock.unlocked();
        }else if(lock1){
          ctx.clearRect(panel.x + 1, panel.y + 1,panel.w - 2 ,panel.h - 2);
          ctx.clearRect(panel.x + panel.w + 4,panel.y - 1,110,panel.h + 2);
          ctx.clearRect(panel.x - 56,panel.y - 1,52,panel.h + 2);
          upperSlabSize--;
          upperPanel.h -= factorSlabHeight;
          lowerPanel.y -= factorSlabHeight;
          lowerText.y -= factorSlabHeight;
          lowerText.text += factorSlabHeight*fh;
          middleText.y -= factorSlabHeight;
          middlePositionText.y -= factorSlabHeight;
          middlePositionText.text += factorSlabHeight*fh;
          y2 -= factorSlabHeight;
          dividerBox();
          drawDivider();
          upperLock.locked();
          lowerLock.unlocked();
          middleLock.unlocked();
        }else if(lock2){
          ctx.clearRect(panel.x + 1, panel.y + 1,panel.w - 2 ,panel.h - 2);
          ctx.clearRect(panel.x + panel.w + 4,panel.y - 1,110,panel.h + 2);
          ctx.clearRect(panel.x - 56,panel.y - 1,52,panel.h + 2);
          upperSlabSize--;
          upperPanel.y += factorSlabHeight;
          upperPanel.h -= factorSlabHeight;
          upperText.y += factorSlabHeight;
          upperText.text += factorSlabHeight*fh;
          dividerBox();
          drawDivider();
          upperLock.unlocked();
          lowerLock.unlocked();
          middleLock.locked();
        }else if(lock3){
          ctx.clearRect(panel.x + 1, panel.y + 1,panel.w - 2 ,panel.h - 2);
          ctx.clearRect(panel.x + panel.w + 4,panel.y - 1,110,panel.h + 2);
          ctx.clearRect(panel.x - 56,panel.y - 1,52,panel.h + 2);
          upperSlabSize--;
          upperPanel.y += factorSlabHeight;
          upperPanel.h -= factorSlabHeight;
          upperText.y += factorSlabHeight;
          upperText.text += factorSlabHeight* fh;
          dividerBox();
          drawDivider();
          upperLock.unlocked();
          lowerLock.locked();
          middleLock.unlocked();
        }
      }else {
        alert("upper slab cannot be negative.");
      }
    }
  }

  // --------------------lower panel plus slabs ----------------------------
  if(lowerPlusSlab && lowerPlusSlab.getObj){
    lowerPlusSlab.getObj()
    if(isInsideButton(mouseX,mouseY,lowerPlusSlab.getObj())){
      if(upperSlabSize + lowerSlabSize == maxSlab - 1 && upperSlabSize > 1){
        if(lock1 == false && lock2 == false && lock3 == false){
          let roundedValue = Math.round((factorSlabHeight/2)*100)/100;
          if(lowerText.text >= lowerLimit + roundedValue*fh && upperText.text >= upperLimit + roundedValue.fh){
            ctx.clearRect(panel.x + 1, panel.y + 1,panel.w - 2 ,panel.h - 2);
            ctx.clearRect(panel.x + panel.w + 4,panel.y - 1,112,panel.h + 2);
            ctx.clearRect(panel.x - 56,panel.y - 1,52,panel.h + 2);
            lowerSlabSize++;
            upperSlabSize--;
            upperPanel.y += roundedValue;
            upperPanel.h -= factorSlabHeight;
            upperText.y += roundedValue;
            upperText.text += roundedValue*fh;
            lowerPanel.y -= roundedValue;
            lowerPanel.h += factorSlabHeight;
            lowerText.y -= roundedValue;
            lowerText.text -= roundedValue*fh;
            middleText.y -= roundedValue;
            middlePositionText.y -= roundedValue;
            middlePositionText.text += roundedValue*fh;
            y2 -= roundedValue;
            dividerBox();
            drawDivider();
            upperLock.unlocked();
            lowerLock.unlocked();
            middleLock.unlocked();
          }else if(upperText.text < upperLimit + roundedValue.fh){
            alert("reached minimum upper limit.")
          }else if(lowerText.text < lowerLimit + roundedValue*fh){
            alert("reached minimum lower limit.")
          }
        }else if(lock1){
            ctx.clearRect(panel.x + 1, panel.y + 1,panel.w - 2 ,panel.h - 2);
            ctx.clearRect(panel.x + panel.w + 4,panel.y - 1,112,panel.h + 2);
            ctx.clearRect(panel.x - 56,panel.y - 1,52,panel.h + 2);
            lowerSlabSize++;
            upperSlabSize--;
            upperPanel.h -= factorSlabHeight;
            lowerPanel.y -= factorSlabHeight;
            lowerPanel.h += factorSlabHeight;
            middleText.y -= factorSlabHeight;
            middlePositionText.y -= factorSlabHeight;
            middlePositionText.text += factorSlabHeight*fh;
            y2 -= factorSlabHeight;
            dividerBox();
            drawDivider();
            upperLock.locked();
            lowerLock.unlocked();
            middleLock.unlocked();
        }else if(lock2){
         alert("reached maimum slabs limit.");
        }else if(lock3){
          ctx.clearRect(panel.x + 1, panel.y + 1,panel.w - 2 ,panel.h - 2);
          ctx.clearRect(panel.x + panel.w + 4,panel.y - 1,112,panel.h + 2);
          ctx.clearRect(panel.x - 56,panel.y - 1,52,panel.h + 2);
          lowerSlabSize++;
          upperSlabSize--;
          upperPanel.h -= factorSlabHeight;
          lowerPanel.y -= factorSlabHeight;
          lowerPanel.h += factorSlabHeight;
          middleText.y -= factorSlabHeight;
          middlePositionText.y -= factorSlabHeight;
          middlePositionText.text += factorSlabHeight*fh;
          y2 -= factorSlabHeight;
          dividerBox();
          drawDivider();
          upperLock.unlocked();
          lowerLock.locked();
          middleLock.unlocked();
        }
      }else if(upperSlabSize + lowerSlabSize < maxSlab - 1){
        if(lock1 == false && lock2 == false && lock3 == false){
          let roundedValue = Math.round((factorSlabHeight/2)*100)/100;
          if(lowerText.text >= lowerLimit + roundedValue*fh && upperText.text >= upperLimit + roundedValue*fh){
            ctx.clearRect(panel.x + 1, panel.y + 1,panel.w - 2 ,panel.h - 2);
            ctx.clearRect(panel.x + panel.w + 4,panel.y - 1,112,panel.h + 2);
            ctx.clearRect(panel.x - 56,panel.y - 1,52,panel.h + 2);
           lowerSlabSize++;
           upperPanel.y -= roundedValue;
           upperText.y -= roundedValue;
           upperText.text -= roundedValue*fh;
           lowerPanel.y -= roundedValue;
           lowerPanel.h += factorSlabHeight;
           lowerText.y += roundedValue;
           lowerText.text -= roundedValue*fh;
           middleText.y -= roundedValue;
           middlePositionText.y -= roundedValue;
           middlePositionText.text += roundedValue*fh;
           y2 -= roundedValue;
           dividerBox();
           drawDivider();
           upperLock.unlocked();
           lowerLock.unlocked();
           middleLock.unlocked();
          }else if(lowerText.text < lowerLimit + roundedValue*fh){
           alert("reached minimum lower limit.")
          }else{
           alert("reached minimum upper limit.")
          }
        }else if(lock1){
         if(lowerText.text >= lowerLimit + factorSlabHeight*fh){
          ctx.clearRect(panel.x + 1, panel.y + 1,panel.w - 2 ,panel.h - 2);
            ctx.clearRect(panel.x + panel.w + 4,panel.y - 1,112,panel.h + 2);
            ctx.clearRect(panel.x - 56,panel.y - 1,52,panel.h + 2);
           lowerSlabSize++;
           lowerPanel.h += factorSlabHeight;
           lowerText.y += factorSlabHeight;
           lowerText.text -= factorSlabHeight*fh;
           dividerBox();
           drawDivider();
           upperLock.locked();
           lowerLock.unlocked();
           middleLock.unlocked();
         }else{
          alert("reached minimum lower limit.");
         }
        }else if(lock2){
          if(lowerText.text >= lowerLimit + factorSlabHeight*fh){
            ctx.clearRect(panel.x + 1, panel.y + 1,panel.w - 2 ,panel.h - 2);
              ctx.clearRect(panel.x + panel.w + 4,panel.y - 1,112,panel.h + 2);
              ctx.clearRect(panel.x - 56,panel.y - 1,52,panel.h + 2);
             lowerSlabSize++;
             lowerPanel.h += factorSlabHeight;
             lowerText.y += factorSlabHeight;
             lowerText.text -= factorSlabHeight*fh;
             dividerBox();
             drawDivider();
             upperLock.unlocked();
             lowerLock.unlocked();
             middleLock.locked();
           }else{
            alert("reached minimum lower limit.");
           }
        }else if(lock3){
          if(upperText.text >= upperLimit + factorSlabHeight*fh){
             ctx.clearRect(panel.x + 1, panel.y + 1,panel.w - 2 ,panel.h - 2);
             ctx.clearRect(panel.x + panel.w + 4,panel.y - 1,112,panel.h + 2);
             ctx.clearRect(panel.x - 56,panel.y - 1,52,panel.h + 2);
             lowerSlabSize++;
             upperPanel.y -= factorSlabHeight;
             upperText.y -= factorSlabHeight;
             upperText.text -= factorSlabHeight*fh;
             lowerPanel.y -= factorSlabHeight;
             lowerPanel.h += factorSlabHeight;
             middleText.y -= factorSlabHeight;
             middlePositionText.y -= factorSlabHeight;
             middlePositionText.text += factorSlabHeight*fh;
             y2 -= factorSlabHeight;
             dividerBox();
             drawDivider();
             upperLock.unlocked();
             lowerLock.locked();
             middleLock.unlocked();
           }else{
            alert("reached minimum upper limit.");
           }
        }
      }else{
        alert("upper slabs cannot be negative.");
      }
    }
  }

  // --------------------- lower panel minus slabs -----------------------------
  if(lowerMinusSlab && lowerMinusSlab.getObj){
    lowerMinusSlab.getObj()
    if(isInsideButton(mouseX,mouseY,lowerMinusSlab.getObj())){
      if(lowerSlabSize > 1){
        if(lock1 == false && lock2 == false && lock3 == false){
          ctx.clearRect(panel.x + 1, panel.y + 1,panel.w - 2 ,panel.h - 2);
          ctx.clearRect(panel.x + panel.w + 4,panel.y - 1,112,panel.h + 2);
          ctx.clearRect(panel.x - 56,panel.y - 1,52,panel.h + 2);
          let roundedValue = Math.round((factorSlabHeight/2)*100)/100;
          lowerSlabSize--;
          console.log("clciked event minus: ",upperSlabSize,lowerSlabSize,upperPanel,lowerPanel,insidePanel);

          upperPanel.y += roundedValue;
          upperText.y += roundedValue;
          upperText.text += roundedValue*fh;
          lowerPanel.y += roundedValue;
          lowerPanel.h -= factorSlabHeight;
          lowerText.y -= roundedValue;
          lowerText.text += roundedValue*fh;
          middleText.y += roundedValue;
          middlePositionText.y += roundedValue;
          middlePositionText.text -= roundedValue*fh;
          y2 += roundedValue;
          dividerBox();
          drawDivider();
          upperLock.unlocked();
          lowerLock.unlocked();
          middleLock.unlocked();
        }else if(lock1){
          ctx.clearRect(panel.x + 1, panel.y + 1,panel.w - 2 ,panel.h - 2);
          ctx.clearRect(panel.x + panel.w + 4,panel.y - 1,112,panel.h + 2);
          ctx.clearRect(panel.x - 56,panel.y - 1,52,panel.h + 2);
          lowerSlabSize--;
          lowerPanel.h -= factorSlabHeight;
          lowerText.y -= factorSlabHeight;
          lowerText.text += factorSlabHeight*fh;
          dividerBox();
          drawDivider();
          upperLock.locked();
          lowerLock.unlocked();
          middleLock.unlocked();
        }else if(lock2){
          ctx.clearRect(panel.x + 1, panel.y + 1,panel.w - 2 ,panel.h - 2);
          ctx.clearRect(panel.x + panel.w + 4,panel.y - 1,110,panel.h + 2);
          ctx.clearRect(panel.x - 56,panel.y - 1,52,panel.h + 2);
          lowerSlabSize--;
          lowerPanel.h -= factorSlabHeight;
          lowerText.y -= factorSlabHeight;
          lowerText.text += factorSlabHeight*fh;
          dividerBox();
          drawDivider();
          upperLock.unlocked();
          lowerLock.unlocked();
          middleLock.locked();
        }else if(lock3){
          ctx.clearRect(panel.x + 1, panel.y + 1,panel.w - 2 ,panel.h - 2);
          ctx.clearRect(panel.x + panel.w + 4,panel.y - 1,110,panel.h + 2);
          ctx.clearRect(panel.x - 56,panel.y - 1,52,panel.h + 2);
          lowerSlabSize--;
          upperPanel.y += factorSlabHeight;
          upperText.y += factorSlabHeight;
          upperText.text += factorSlabHeight*fh;
          lowerPanel.h -= factorSlabHeight;
          lowerPanel.y += factorSlabHeight;
          middleText.y += factorSlabHeight;
          middlePositionText.y += factorSlabHeight;
          middlePositionText.text -= factorSlabHeight*fh;
          y2 += factorSlabHeight;
          dividerBox();
          drawDivider();
          upperLock.unlocked();
          lowerLock.locked();
          middleLock.unlocked();
        }
      }else{
        alert("lower slabs cannot be negative.");
      }
    }
  }
  
  // --------------------- upper plus btn --------------------------------
  if(isInsideButton(mouseX,mouseY,upperPlusBtn)){
   if(lock1 == false && lock2 == false && lock3 == false){
     if(lowerText.text >= lowerLimit + fh){
          ctx.clearRect(panel.x + 1, panel.y + 1,panel.w - 2 ,panel.h - 2);
          ctx.clearRect(panel.x + panel.w + 4,panel.y - 1,112,panel.h + 2);
          ctx.clearRect(panel.x - 56,panel.y - 1,52,panel.h + 2);
      if(upperPanel && lowerPanel){
        if(upperInput >= upperInputValue){
          upperSlabSize++;
          upperInput++;
          upperPanel.h += factorSlabHeight;
          upperText.y += fh;
          upperText.text += fh;
        }else{
        upperPanel.y += 1;
        upperText.y += 1;
        upperText.text += fh
        upperInput++;
        lowerPanel.y += 1;
        lowerText.y += 1;
        lowerText.text -= fh;
        middleText.y += 1;
        y2 += 1;
        middlePositionText.y += 1;
        middlePositionText.text -= fh;
        }
        dividerBox();
        drawDivider();
        upperLock.unlocked();
        lowerLock.unlocked();
        middleLock.unlocked();
      }else if(insidePanel){
        if(upperInput >= upperInputValue){
          slabSize++;
          upperInput++;
          insidePanel.h += factorSlabHeight;
          upperText.y += fh;
          upperText.text += fh;
        }else{
        insidePanel.y += 1;
        upperText.y += 1;
        upperText.text += fh;
        upperInput++;
        lowerText.y += 1;
        lowerText.text -= fh;
        }
        mainBox();
        drawMain();
        upperLock.unlocked();
        lowerLock.unlocked();
      }
     }else{
      alert("reached the minimum lower limit.")
     }
   }else{
    alert("first remove the lock.");
   }
  }

  // ------------------- upper minus btn ----------------------------------
  if(isInsideButton(mouseX,mouseY,upperMinusBtn)){
    if(lock1 == false && lock2 == false && lock3 == false){
     if(upperText.text >= upperLimit + fh){
          ctx.clearRect(panel.x + 1, panel.y + 1,panel.w - 2 ,panel.h - 2);
          ctx.clearRect(panel.x + panel.w + 4,panel.y - 1,112,panel.h + 2);
          ctx.clearRect(panel.x - 56,panel.y - 1,52,panel.h + 2);
        if(upperPanel && lowerPanel){
          if(upperInput >= upperInputValue){
           upperSlabSize--;
           upperInput++;
           upperPanel.h -= factorSlabHeight;
           upperText.y -= fh;
           upperText.text -= fh;
          }else{
          upperPanel.y -= 1;
          upperText.y -= 1;
          upperText.text -= fh;
          upperInput++;
          lowerPanel.y -= 1;
          lowerText.y -= 1;
          lowerText.text += fh;
          middleText.y -= 1;
          y2 -= 1;
          middlePositionText.y -= 1;
          middlePositionText.text += fh;
          }
          dividerBox();
          drawDivider();
          upperLock.unlocked();
          lowerLock.unlocked();
          middleLock.unlocked();
        }else if(insidePanel){
          if(upperInput >= upperInputValue){
            slabSize--;
            upperInput++;
            insidePanel.h -= factorSlabHeight;
            upperText.y -= fh;
            upperText.text -= fh;
           }else{
          insidePanel.y -= 1;
          upperText.y -= 1;
          upperInput++;
          upperText.text -= fh;
          lowerText.y -= 1;
          lowerText.text += fh;
           }
          mainBox();
          drawMain();
          upperLock.unlocked();
          lowerLock.unlocked();
        }
     }else {
      alert("reached the minimum upper limit.")
     }
    }else{
     alert("first remove the lock.");
    }
  }

  // ------------------- lower plus btn ----------------------------------
  if(isInsideButton(mouseX,mouseY,lowerPlusBtn)){
    if(lock1 == false && lock2 == false && lock3 == false){
      if(upperText.text >= upperLimit + fh){
        ctx.clearRect(panel.x + 1, panel.y + 1,panel.w - 2 ,panel.h - 2);
          ctx.clearRect(panel.x + panel.w + 4,panel.y - 1,112,panel.h + 2);
          ctx.clearRect(panel.x - 56,panel.y - 1,52,panel.h + 2);
        if(upperPanel && lowerPanel){
          if(lowerInput >= lowerInputValue){
            lowerSlabSize++;
            lowerInput++;
            lowerPanel.h += factorSlabHeight;
            lowerText.y -= fh;
            lowerText.text -= fh;
          }else{
          upperPanel.y -= 1;
          upperText.y -= 1;
          upperText.text -= fh
          lowerInput++;
          lowerPanel.y -= 1;
          lowerText.y -= 1;
          lowerText.text += fh;
          middleText.y -= 1;
          y2 -= 1;
          middlePositionText.y -= 1;
          middlePositionText.text += fh;
          }
          dividerBox();
          drawDivider();
          upperLock.unlocked();
          lowerLock.unlocked();
          middleLock.unlocked();
        }else if(insidePanel){
          if(lowerInput >= lowerInputValue){
            slabSize++;
            lowerInput++;
            insidePanel.h += factorSlabHeight;
            lowerText.y -= fh;
            lowerText.text -= fh;
          }else{
          insidePanel.y -= 1;
          upperText.y -= 1;
          upperText.text -= fh;
          lowerInput++;
          lowerText.y -= 1;
          lowerText.text += fh;
          }
          mainBox();
          drawMain();
          upperLock.unlocked();
          lowerLock.unlocked();
        }
     }else {
      alert("reached the minimum upper limit.")
     }
    }else{
     alert("first remove the lock.");
    }
  }

  // ----------------------lower minus btn --------------------------
  if(isInsideButton(mouseX,mouseY,lowerMinusBtn)){
    if(lock1 == false && lock2 == false && lock3 == false){
      if(lowerText.text >= lowerLimit + fh){
        ctx.clearRect(panel.x + 1, panel.y + 1,panel.w - 2 ,panel.h - 2);
          ctx.clearRect(panel.x + panel.w + 4,panel.y - 1,112,panel.h + 2);
          ctx.clearRect(panel.x - 56,panel.y - 1,52,panel.h + 2);
        if(upperPanel && lowerPanel){
          if(lowerInput >= lowerInputValue){
            lowerSlabSize--;
            lowerInput++;
            lowerPanel.h -= factorSlabHeight;
            lowerText.y += fh;
            lowerText.text += fh;
          }else{
          upperPanel.y += 1;
          upperText.y += 1;
          upperText.text += fh
          lowerPanel.y += 1;
          lowerText.y += 1;
          lowerText.text -= fh;
          lowerInput++;
          middleText.y += 1;
          y2 += 1;
          middlePositionText.y += 1;
          middlePositionText.text -= fh;
          }
          dividerBox();
          drawDivider();
          upperLock.unlocked();
          lowerLock.unlocked();
          middleLock.unlocked();
        }else if(insidePanel){
          if(lowerInput >= lowerInputValue){
            slabSize--;
            lowerInput++;
            insidePanel.h -= factorSlabHeight;
            lowerText.y += fh;
            lowerText.text += fh;
          }else{
          insidePanel.y += 1;
          upperText.y += 1;
          upperText.text += fh;
          lowerInput++;
          lowerText.y += 1;
          lowerText.text -= fh;
          }
          mainBox();
          drawMain();
          upperLock.unlocked();
          lowerLock.unlocked();
        }
       }else{
        alert("reached the minimum lower limit.")
       }
    }else{
     alert("first remove the lock.");
    }
  }

  // ------------------- mid position plus btn ------------------------
  if(middlePositionPlusBtn && middlePositionPlusBtn.getObj){
    middlePositionPlusBtn.getObj()
    if(isInsideButton(mouseX,mouseY,middlePositionPlusBtn.getObj())){
      if(lock1 == false && lock2 == false && lock3 == false){
        if(upperText.text >= upperLimit + fh){
          ctx.clearRect(panel.x + 1, panel.y + 1,panel.w - 2 ,panel.h - 2);
          ctx.clearRect(panel.x + panel.w + 4,panel.y - 1,112,panel.h + 2);
          ctx.clearRect(panel.x - 56,panel.y - 1,52,panel.h + 2);
          if(middlePositionInp >= middlePositionInpValue){
            upperSlabSize++;
            lowerSlabSize--;
            middlePositionInp++;
            upperPanel.h += factorHeight;
            upperText.y += fh;
            upperText.text += fh;
            lowerPanel.h -= factorSlabHeight;
            lowerText.y += fh;
            lowerText.text += fh;
          }else{
            upperPanel.y -= 1;
            upperText.y -= 1;
            upperText.text -= fh;
            middlePositionInp++;
            lowerPanel.y -= 1;
            lowerText.y -= 1;
            lowerText.text += fh;
            middleText.y -= 1;
            y2 -= 1;
            middlePositionText.y -= 1;
            middlePositionText.text += fh;
          }
            dividerBox();
            drawDivider();
            upperLock.unlocked();
            lowerLock.unlocked();
            middleLock.unlocked();
       }else if(upperSlabSize > 1){
          ctx.clearRect(panel.x + 1, panel.y + 1,panel.w - 2 ,panel.h - 2);
          ctx.clearRect(panel.x + panel.w + 4,panel.y - 1,112,panel.h + 2);
          ctx.clearRect(panel.x - 56,panel.y - 1,52,panel.h + 2);
          if(middlePositionInp >= middlePositionInpValue){
            upperSlabSize++;
            lowerSlabSize--;
            middlePositionInp++;
            upperPanel.h += factorHeight - 1;
            upperText.y += fh;
            upperText.text += fh*(factorSlabHeight-1);
            lowerPanel.h -= factorSlabHeight - 1;
            lowerText.y += fh;
            lowerText.text += fh*(factorSlabHeight-1);
          }else{
          upperSlabSize--;
          upperPanel.y += (factorSlabHeight - 1);
          upperText.y += (factorSlabHeight - 1);
          upperPanel.h -= (factorSlabHeight);
          upperText.text += fh*(factorSlabHeight - 1);
          lowerPanel.y -= 1;
          middlePositionInp++;
          lowerText.y -= 1;
          lowerText.text += fh;
          middleText.y -= 1;
          y2 -= 1;
          middlePositionText.y -= 1;
          middlePositionText.text += fh;
          }
          dividerBox();
          drawDivider();
          upperLock.unlocked();
          lowerLock.unlocked();
          middleLock.unlocked();
       }else{
        alert("middle position can not be shift above it.")
       }
      }else{
       alert("first remove the lock.");
      }
    }
  }

  // ------------------- mid position minus btn ------------------------
  if(middlePositionMinusBtn && middlePositionMinusBtn.getObj){
    middlePositionMinusBtn.getObj()
    if(isInsideButton(mouseX,mouseY,middlePositionMinusBtn.getObj())){
      if(lock1 == false && lock2 == false && lock3 == false){
        if(lowerText.text >= lowerLimit + fh){
          ctx.clearRect(panel.x + 1, panel.y + 1,panel.w - 2 ,panel.h - 2);
            ctx.clearRect(panel.x + panel.w + 4,panel.y - 1,112,panel.h + 2);
            ctx.clearRect(panel.x - 56,panel.y - 1,52,panel.h + 2);
            if(middlePositionInp >= middlePositionInpValue){
              upperSlabSize--;
              lowerSlabSize++;
              middlePositionInp++;
              upperPanel.h -= factorHeight;
              upperText.y -= fh;
              upperText.text -= fh;
              lowerPanel.h += factorSlabHeight;
              lowerText.y -= fh;
              lowerText.text -= fh;
            }else{
            upperPanel.y += 1;
            upperText.y += 1;
            upperText.text += fh
            lowerPanel.y += 1;
            lowerText.y += 1;
            middlePositionInp++;
            lowerText.text -= fh;
            middleText.y += 1;
            y2 += 1;
            middlePositionText.y += 1;
            middlePositionText.text -= fh;
            }
            dividerBox();
            drawDivider();
            upperLock.unlocked();
            lowerLock.unlocked();
            middleLock.unlocked();
         }else if(lowerSlabSize > 1){
          ctx.clearRect(panel.x + 1, panel.y + 1,panel.w - 2 ,panel.h - 2);
            ctx.clearRect(panel.x + panel.w + 4,panel.y - 1,112,panel.h + 2);
            ctx.clearRect(panel.x - 56,panel.y - 1,52,panel.h + 2);
            if(middlePositionInp >= middlePositionInpValue){
              upperSlabSize--;
              lowerSlabSize++;
              middlePositionInp++;
              upperPanel.h -= factorHeight;
              upperText.y -= fh;
              upperText.text -= fh;
              lowerPanel.h += factorSlabHeight;
              lowerText.y -= fh;
              lowerText.text -= fh;
            }else{
           lowerSlabSize--;
           upperPanel.y += 1;
           upperText.y += 1;
           upperText.text += fh;
           middlePositionInp++;
           lowerPanel.y += 1;
           middleText.y += 1;
           lowerText.y -= (factorSlabHeight - 1);
           lowerPanel.h -= (factorSlabHeight);
           lowerText.text += fh*(factorSlabHeight - 1);
           y2 += 1;
           middlePositionText.y += 1;
           middlePositionText.text -= fh;
            }
           dividerBox();
           drawDivider();
           upperLock.unlocked();
           lowerLock.unlocked();
           middleLock.unlocked();
         }else{
          alert("middle position can not be reached below it.")
         }
      }else{
       alert("first remove the lock.");
      }
    }
  }
})
function upperInpInputEvent(event){
  let inputValue = parseFloat(event.target.value);
  upperInp.dataset.inputValue = inputValue;
}
function upperInpKeyupEvent(e){
    if(e.key == "Enter"){
      e.preventDefault();
      let inputValue = parseFloat(upperInp.dataset.inputValue);
      if(inputValue >= upperLimit  && inputValue <= (upperText.text + (lowerText.text - lowerLimit))){
        let newValue = Math.round(((inputValue - upperText.text)/fh)*100)/100;
        ctx.clearRect(panel.x + 1, panel.y + 1,panel.w - 2 ,panel.h - 2);
        ctx.clearRect(panel.x + panel.w + 4,panel.y - 1,112,panel.h + 2);
        ctx.clearRect(panel.x - 56,panel.y - 1,52,panel.h + 2);
        if(upperPanel){ 
          if(upperInput >= upperInputValue){
            upperSlabSize++;
            upperInput++;
            upperPanel.h += factorSlabHeight;
            upperText.y += newValue;
            upperText.text += newValue*fh;
          }else{
        upperPanel.y += newValue;
        upperText.y += newValue;
        upperText.text += newValue*fh;
        lowerPanel.y += newValue;
        upperInput++;
        lowerText.y += newValue;
        lowerText.text -= newValue*fh;
        middleText.y += newValue;
        middlePositionText.y += newValue;
        y2 += newValue;
        middlePositionText.text -= newValue*fh;
          }
        dividerBox();
        drawDivider();
        upperLock.unlocked();
        lowerLock.unlocked();
        middleLock.unlocked();
       }else if(insidePanel){
        if(upperInput >= upperInputValue){
          slabSize++;
          upperInput++;
          insidePanel.h += factorSlabHeight;
          upperText.y += newValue;
          upperText.text += newValue*fh;
        }else{
        insidePanel.y += newValue;
        upperText.y += newValue;
        upperInput++;
        upperText.text += newValue*fh;
        lowerText.y += newValue;
        lowerText.text -= newValue*fh;
        }
        mainBox();
        drawMain();
        upperLock.unlocked();
        lowerLock.unlocked();
       }
      }else{
        upperInp.value = upperText.text;
        // alert("cannot exceed the minimum upper or lower limit.");
      }
    }
}
function lowerInpInputEvent(event){
  let inputValue = parseFloat(event.target.value);
  lowerInp.dataset.inputValue = inputValue;
}
function lowerInpKeyupEvent(e) {
  if(e.key == "Enter"){
    e.preventDefault();
      let inputValue = parseFloat(lowerInp.dataset.inputValue);
      if(inputValue >= lowerLimit && inputValue <= (lowerText.text + (upperText.text - upperLimit))){
        let newValue = Math.round(((inputValue - lowerText.text)/fh)*100)/100;
        ctx.clearRect(panel.x + 1, panel.y + 1,panel.w - 2 ,panel.h - 2);
        ctx.clearRect(panel.x + panel.w + 4,panel.y - 1,112,panel.h + 2);
        ctx.clearRect(panel.x - 56,panel.y - 1,52,panel.h + 2);
        if(lowerPanel){ 
          if(lowerInput >= lowerInputValue){
            lowerSlabSize++;
            lowerInput++;
            lowerPanel.h += factorSlabHeight;
            lowerText.y -= newValue;
            lowerText.text -= newValue*fh;
          }else{
        upperPanel.y -= newValue;
        upperText.y -= newValue;
        upperText.text -= newValue*fh;
        lowerPanel.y -= newValue;
        lowerText.y -= newValue;
        lowerInput++;
        lowerText.text += newValue*fh;
        middleText.y -= newValue;
        middlePositionText.y -= newValue;
        y2 -= newValue;
        middlePositionText.text += newValue*fh;
          }
        dividerBox();
        drawDivider();
        upperLock.unlocked();
        lowerLock.unlocked();
        middleLock.unlocked();
       }else if(insidePanel){
        if(lowerInput >= lowerInputValue){
          slabSize++;
          lowerInput++;
          insidePanel.h += factorSlabHeight;
          lowerText.y -= newValue;
          lowerText.text -= newValue*fh;
        }else{
        insidePanel.y -= newValue;
        upperText.y -= newValue;
        lowerInput++;
        upperText.text -= newValue*fh;
        lowerText.y -= newValue;
        lowerText.text += newValue*fh;
        }
        mainBox();
        drawMain();
        upperLock.unlocked();
        lowerLock.unlocked();
       }
      }else{
        lowerInp.value = lowerText.text;
        alert("cannot exceed the minimum upper or lower limit.");
      }
    }
}
function middlePositionInputEvent(event) {
  let inputValue = parseFloat(event.target.value);
  middlePositionInput.dataset.inputValue = inputValue;
}
function middlePositionKeyupEvent(event) {
  if (event.key == "Enter") {
      event.preventDefault();
      let inputValue = parseFloat(middlePositionInput.dataset.inputValue);
      let belowLimit = middlePositionText.text - (lowerText.text - lowerLimit) - (lowerSlabSize - 1) * (factorSlabHeight * fh);
      let aboveLimit = middlePositionText.text + (upperText.text - upperLimit) + (upperSlabSize - 1) * (factorSlabHeight * fh);
      if (inputValue >= belowLimit && inputValue <= aboveLimit) {
          let upMidLimit = middlePositionText.text + (upperText.text - upperLimit);
          let downMidLimit = middlePositionText.text - (lowerText.text - lowerLimit);
          let newValue = Math.round(((inputValue - middlePositionText.text) / fh) * 100) / 100;
          
          if (inputValue > middlePositionText.text && inputValue <= upMidLimit) {
              ctx.clearRect(panel.x + 1, panel.y + 1, panel.w - 2, panel.h - 2);
              ctx.clearRect(panel.x + panel.w + 4, panel.y - 1, 112, panel.h + 2);
              ctx.clearRect(panel.x - 56, panel.y - 1, 52, panel.h + 2);
              if(middlePositionInp >= middlePositionInpValue){
              upperSlabSize++;
              lowerSlabSize--;
              middlePositionInp++;
              upperPanel.h += factorSlabHeight;
              upperText.y += newValue;
              upperText.text += newValue*fh;
              lowerPanel.h -= factorSlabHeight;
              lowerText.y += newValue;
              lowerText.text += newValue*fh;
              }else{
              upperPanel.y -= newValue;
              upperText.y -= newValue;
              upperText.text -= newValue * fh;
              lowerPanel.y -= newValue;
              middlePositionInp++;
              lowerText.y -= newValue;
              lowerText.text += newValue * fh;
              middleText.y -= newValue;
              middlePositionText.y -= newValue;
              middlePositionText.text += newValue * fh;
              y2 -= newValue;
              middlePositionInput.value = middlePositionText.text;
              }
              dividerBox();
              drawDivider();
              upperLock.unlocked();
              lowerLock.unlocked();
              middleLock.unlocked();
          } else if (inputValue <= middlePositionText.text && inputValue >= downMidLimit) {
              ctx.clearRect(panel.x + 1, panel.y + 1, panel.w - 2, panel.h - 2);
              ctx.clearRect(panel.x + panel.w + 4, panel.y - 1, 112, panel.h + 2);
              ctx.clearRect(panel.x - 56, panel.y - 1, 52, panel.h + 2);
              if(middlePositionInp >= middlePositionInpValue){
                upperSlabSize++;
                lowerSlabSize--;
                middlePositionInp++;
                upperPanel.h += factorSlabHeight;
                upperText.y += newValue;
                upperText.text += newValue*fh;
                lowerPanel.h -= factorSlabHeight;
                lowerText.y += newValue;
                lowerText.text += newValue*fh;
                }else{
              upperPanel.y -= newValue;
              upperText.y -= newValue;
              upperText.text -= newValue * fh;
              lowerPanel.y -= newValue;
              lowerText.y -= newValue;
              middlePositionInp++;
              lowerText.text += newValue * fh;
              middleText.y -= newValue;
              middlePositionText.y -= newValue;
              middlePositionText.text += newValue * fh;
              y2 -= newValue;
              middlePositionInput.value = middlePositionText.text;
                }
              dividerBox();
              drawDivider();
              upperLock.unlocked();
              lowerLock.unlocked();
              middleLock.unlocked();
          } else if (inputValue > upMidLimit && inputValue <= aboveLimit) {
              let countSlab = Math.floor((newValue / factorSlabHeight));
              let changeValue = Math.round((newValue - Math.round((countSlab * factorSlabHeight * 100) / 100)) * 100) / 100;
              if (upperText.text >= upperLimit + changeValue * fh) {
                  ctx.clearRect(panel.x + 1, panel.y + 1, panel.w - 2, panel.h - 2);
                  ctx.clearRect(panel.x + panel.w + 4, panel.y - 1, 112, panel.h + 2);
                  ctx.clearRect(panel.x - 56, panel.y - 1, 52, panel.h + 2);
                  if(middlePositionInp >= middlePositionInpValue){
                    upperSlabSize--;
                    lowerSlabSize++;
                    middlePositionInp++;
                    upperPanel.h -= factorSlabHeight;
                    upperText.y -= newValue;
                    upperText.text -= newValue*fh;
                    lowerPanel.h += factorSlabHeight;
                    lowerText.y -= newValue;
                    lowerText.text -= newValue*fh;
                    }else{
                  upperSlabSize -= countSlab;
                  upperPanel.y -= changeValue;
                  upperPanel.h -= countSlab * factorSlabHeight;
                  upperText.y -= changeValue;
                  upperText.text -= changeValue * fh;
                  middlePositionInp++;
                  lowerPanel.y -= newValue;
                  lowerText.y -= newValue;
                  lowerText.text += newValue * fh;
                  middleText.y -= newValue;
                  middlePositionText.y -= newValue;
                  middlePositionText.text += newValue * fh;
                  y2 -= newValue;
                  middlePositionInput.value = middlePositionText.text;
                    }
                  dividerBox();
                  drawDivider();
                  upperLock.unlocked();
                  lowerLock.unlocked();
                  middleLock.unlocked();
              } else {
                  middlePositionInput.value = middlePositionText.text;
                  alert("cannot exceed minimum upper limit.")
              }
          } else if (inputValue >= belowLimit && inputValue < downMidLimit) {
              let newVal = Math.round(((middlePositionText.text - inputValue) / fh) * 100) / 100;
              let countSlab = Math.floor((newVal / factorSlabHeight));
              let changeValue = Math.round((newVal - Math.round((countSlab * factorSlabHeight * 100) / 100)) * 100) / 100;
              if (lowerText.text >= lowerLimit + changeValue * fh) {
                  ctx.clearRect(panel.x + 1, panel.y + 1, panel.w - 2, panel.h - 2);
                  ctx.clearRect(panel.x + panel.w + 4, panel.y - 1, 112, panel.h + 2);
                  ctx.clearRect(panel.x - 56, panel.y - 1, 52, panel.h + 2);
                  if(middlePositionInp >= middlePositionInpValue){
                    upperSlabSize--;
                    lowerSlabSize++;
                    middlePositionInp++;
                    upperPanel.h -= factorSlabHeight;
                    upperText.y -= newValue;
                    upperText.text -= newValue*fh;
                    lowerPanel.h += factorSlabHeight;
                    lowerText.y -= newValue;
                    lowerText.text -= newValue*fh;
                    }else{
                  lowerSlabSize -= countSlab;
                  upperPanel.y += newVal;
                  upperText.y += newVal;
                  upperText.text += newVal * fh;
                  lowerPanel.y += newVal;
                  lowerPanel.h -= countSlab * factorSlabHeight;
                  lowerText.y += changeValue;
                  lowerText.text -= changeValue * fh;
                  middleText.y += newVal;
                  middlePositionText.y += newVal;
                  middlePositionText.text -= newVal * fh;
                  y2 += newVal;
                  middlePositionInput.value = middlePositionText.text;
                    }
                  dividerBox();
                  drawDivider();
                  upperLock.unlocked();
                  lowerLock.unlocked();
                  middleLock.unlocked();
              } else {
                  middlePositionInput.value = middlePositionText.text;
                  alert("cannot exceed the minimum lower limit.")
              }
          }
      } else {
          middlePositionInput.value = middlePositionText.text;
          alert("cannot exceed the minimum upper or lower limit.");
      }
  }
}

upperInp.addEventListener("input",upperInpInputEvent)
upperInp.addEventListener("keyup",upperInpKeyupEvent);
lowerInp.addEventListener("input",lowerInpInputEvent);
lowerInp.addEventListener("keyup",lowerInpKeyupEvent);
middlePositionInput.addEventListener("input", middlePositionInputEvent);
middlePositionInput.addEventListener("keyup", middlePositionKeyupEvent);

let X = slab.arr[0].x + 5;
let Y = 0;
function triggerDividerClick(mouseX, mouseY) {
       let event = new Event('click');
       event.clientX = mouseX + canvas.getBoundingClientRect().left;
       event.clientY = mouseY + canvas.getBoundingClientRect().top;
       canvas.dispatchEvent(event);
}

function triggerMiddleLockClick(mouseX, mouseY) {
  let event = new Event('click');
  event.clientX = mouseX + canvas.getBoundingClientRect().left;
  event.clientY = mouseY + canvas.getBoundingClientRect().top;
  canvas.dispatchEvent(event);
}

if(MidRailHeight != 0){
    let dividerEvent = new Event('click');
    let positionAssign = SlabLength - LowerSlabLength - 1;
    Y = slab.arr[positionAssign].y + 2;
    dividerBtn.dispatchEvent(dividerEvent);
    if (dividerAns) {
      triggerDividerClick(X, Y);
    }
    triggerMiddleLockClick(X,Y);
}
}

SubmitButton.addEventListener('click',()=>{
  let panelDesignId = localStorage.getItem("panelDesignId");
  let MidRailHeight = middlePositionText?.text != null ? parseInt(middlePositionText.text) : 0;
  let model = {
    MidRailHeight: MidRailHeight,
    UpperGap:parseInt(upperText.text),
    LowerGap:parseInt(lowerText.text),
    Slab: MidRailHeight == 0 ? slabSize : upperSlabSize + lowerSlabSize + 1,
    Dr: MidRailHeight == 0 ? false :true,
    UpperSlab: upperSlabSize != null ? upperSlabSize : 0,
    LowerSlab:lowerSlabSize != null ? lowerSlabSize : 0,
  }
  fetch(`/save-panel?panelDesignId=${panelDesignId}`,{
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
        console.log("received data: ",data);
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
    })
})