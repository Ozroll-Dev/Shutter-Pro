const openPopupBtn = document.getElementById('openPopupBtn');
const closePopupBtn = document.getElementById('closePopupBtn');
const popup = document.getElementById('popup');
const popupIframe = document.getElementById('popupIframe');
const tableBody = document.querySelector("#data-table tbody");
const dealerId = document.getElementById('dealerId')
const lastName = document.getElementById('lastName')
const orderId = document.getElementById('orderId')
const date = document.getElementById('date')
const product = document.getElementById('product')
const panel = document.getElementById('panel')
const totalSqm = document.getElementById('totalSqm')
const pricePerSqm = document.getElementById('pricePerSqm')
const totalPrice = document.getElementById('totalPrice')

orderId.value = localStorage.getItem('orderId')
dealerId.value = localStorage.getItem('dealerId')
lastName.value = localStorage.getItem('lastName')
const storedDate = localStorage.getItem('orderDate');
let displayDate;
if (storedDate) {
  let date = new Date(storedDate);
  displayDate = isNaN(date.getTime()) ? "" : date.toLocaleDateString();
} else {
  displayDate = "";
}
date.value = displayDate;


async function fetchData() {
  return layoutFrame ;
}
let TotalPriceInput = 0;
let PanelInput = 0;
let TotalSqmInput = 0;
let PricePerSqm = 0;
async function populateTable() {
  const data = await fetchData();
  data.forEach((row, index) => {
    let tr;
    let tpostVal = parseInt(row.tpostQty);
    PanelInput += row.panelQtyId;
    TotalPriceInput += row.salePrice;
    let Sqmt = (row.width*row.height/Math.pow(10,6));
    TotalSqmInput += Sqmt;
    Sqmt = Sqmt.toFixed(2);
    if (row.tpostQty == null) {
      tr = document.createElement("tr");
      let i = index + 1;
      let location = row.roomLocationId == 25 ? row.roomLocationOther : row.roomLocation;
      let Fold = "";
      if (row.panelQty == 1) {
        Fold = "L";
      } else if (row.panelQty == 2) {
        Fold = "LR";
      } else if (row.panelQty == 3) {
        Fold = "LLR";
      } else if (row.panelQty == 4) {
        Fold = "LLRR";
      }else if(row.panelQty == 5){
        Fold = "LLLRR";
      }else if(row.panelQty == 6){
        Fold = "LLLRRR";
      }
      let dr = row.midRailHeight == 0 ? "No" : "Yes";
      let midRailHeight = row.midRailHeight == 0 ? "" : row.midRailHeight;
      let SalePrice = (row.salePrice).toFixed(2);
      tr.innerHTML = `
      <td>${i}</td>
                    <td>P</td>
                    <td>1</td>
                    <td>${location}</td>
                    <td>${row.width}</td>
                    <td>${row.height}</td>
                    <td>${row.bladeSize}</td>
                    <td>${row.panelQty}</td>
                    <td>${Fold}</td>
                    <td>${dr}</td>
                    <td>${midRailHeight}</td>
                    <td>${row.installationArea}</td>
                    <td>${row.frameType}</td>
                    <td><input type="checkbox" class="post-checkbox" disabled><button class="check-btn">view</button></td>
                    <td></td>
                    <td></td>
                    <td>${Sqmt}</td>
                    <td>${SalePrice}</td>
                    <td>${SalePrice}</td>
                    <td>Memo</td>
                    <td>$</td>
    `;
    tableBody.appendChild(tr);
    } else if (tpostVal != 0) {
      let count = tpostVal;
      let start = index + 1;
      let No = `${start}`;
      let totalWidth = 0;
      let location = row.roomLocationId == 25 ? row.roomLocationOther : row.roomLocation;
      let tpostLocationId = row.tpostQtyLocationId;
      let dr = row.midRailHeight == 0 ? "No" : "Yes";
      let midRailHeight = row.midRailHeight == 0 ? "" : row.midRailHeight;
      let panelArr = new Array(count + 1).fill(1);
      let widthArr = new Array(count + 1).fill(0);
      let salePriceArr = new Array(count + 1).fill(0.00);
      let SqmtArr = new Array(count +1).fill(0.00);
      SqmtArr[count] = Sqmt;
      salePriceArr[count] = (row.salePrice).toFixed(2);
      let inc = 1;
      let panelCovered = 0;
      for (let i = 0; i <= count; i++) {
          if (tpostLocationId == 1) {
            widthArr[i] = (row.width / (count + 1)).toFixed(2) - 40;
            panelArr[i] = parseInt(row.panelQty) / (count + 1);
          }else{
            let item1 = row[`toCenterTpos${inc}`] == null ? null : parseInt(row[`toCenterTpos${inc}`]);
            if(item1 != null){
              widthArr[i] = item1 - 40 - totalWidth;
              panelArr[i] = inc - panelCovered;
              panelCovered = inc;
              totalWidth = item1 + 40;
            }else if(i == count && item1 == null){
              widthArr[i] = row.width - totalWidth;
              panelArr[i] = parseInt(row.panelQty) - panelCovered;
            }
            inc++;
          }
      }
      for (let i = 0; i <= count; i++) {
        No = `${No}.${i+1}`;
        location = `${location}.${i+1}`;
        tr = document.createElement("tr");
        let Fold = "";
        if (panelArr[i] == 1) {
          Fold = "L";
        } else if (panelArr[i] == 2) {
          Fold = "LR";
        } else if (panelArr[i] == 3) {
          Fold = "LLR";
        } else if (panelArr[i] == 4) {
          Fold = "LLRR";
        }
        tr.innerHTML = `
          <td>${No}</td>
                      <td>P</td>
                      <td>1</td>
                      <td>${location}</td>
                      <td>${widthArr[i]}</td>
                      <td>${row.height}</td>
                      <td>${row.bladeSize}</td>
                      <td>${panelArr[i]}</td>
                      <td>${Fold}</td>
                      <td>${dr}</td>
                    <td>${midRailHeight}</td>
                    <td>${row.installationArea}</td>
                    <td>${row.frameType}</td>   
                    <td><input type="checkbox" class="post-checkbox" disabled value="true" checked><button class="check-btn">view</button></td>
                 
                    <td></td>
                    <td></td>
                    <td>${SqmtArr[i]}</td>
                    <td>${salePriceArr[i]}</td>
                    <td>${salePriceArr[i]}</td>
                    <td>Memo</td>
                    <td>$</td>
      `;
      start = index + 1;
      No = `${start}`;
      location = row.roomLocationId == 25 ? row.roomLocationOther : row.roomLocation;
      tableBody.appendChild(tr);
      }
    }
  });
  panel.value = PanelInput;
  TotalPriceInput = TotalPriceInput.toFixed(2);
  totalPrice.value = TotalPriceInput;
  TotalSqmInput = TotalSqmInput.toFixed(2);
  totalSqm.value = TotalSqmInput;
  PricePerSqm = (TotalPriceInput/TotalSqmInput).toFixed(2);
  pricePerSqm.value = PricePerSqm;
  clickTableEvent();
}

async function clickTableEvent(){
  const data = await fetchData();
  const rows = tableBody.querySelectorAll("tr");
  rows.forEach((tr)=>{
    tr.addEventListener("click", function () {
      let cells = tr.getElementsByTagName('td');
      let newIndex = parseInt(cells[0].innerHTML.split('.')[0]);
      let id = newIndex - 1;
      let TpostQty = data[id].tpostQty == null ? 0 : parseInt(data[id].tpostQty);
      let ToCenterTpost1 = data[id].toCenterTpos1 == null ? 0 : parseInt(data[id].toCenterTpos1);
      let ToCenterTpost2 = data[id].toCenterTpos2 == null ? 0 : parseInt(data[id].toCenterTpos2);
      let ToCenterTpost3 = data[id].toCenterTpos3 == null ? 0 : parseInt(data[id].toCenterTpos3);
      let ToCenterTpost4 = data[id].toCenterTpos4 == null ? 0 : parseInt(data[id].toCenterTpos4);
      let ToCenterTpost5= data[id].toCenterTpos5 == null ? 0 : parseInt(data[id].toCenterTpos5);
      let ToCenterTpost6 = data[id].toCenterTpos6 == null ? 0 : parseInt(data[id].toCenterTpos6);
      let ToCenterTpost7 = data[id].toCenterTpos7 == null ? 0 : parseInt(data[id].toCenterTpos7);
      let ToCenterTpost8 = data[id].toCenterTpos8 == null ? 0 : parseInt(data[id].toCenterTpos8);
      let selectData = {
          Index:id,
          Width:data[id].width,
          Height:data[id].height,
          PanelQty:parseInt(data[id].panelQty),
          TpostQty:TpostQty,
          TpostLocation:data[id].tpostQtyLocationId,
          ToCenterTpost1:ToCenterTpost1,
          ToCenterTpost2:ToCenterTpost2,
          ToCenterTpost3:ToCenterTpost3,
          ToCenterTpost4:ToCenterTpost4,
          ToCenterTpost5:ToCenterTpost5,
          ToCenterTpost6:ToCenterTpost6,
          ToCenterTpost7:ToCenterTpost7,
          ToCenterTpost8:ToCenterTpost8,
          PsdetailId:data[id].psdetailId,
          PlantationScheduleListId:data[id].plantationScheduleListId
        }
        localStorage.setItem("selectData",JSON.stringify(selectData));
      const previouslySelected = document.querySelector("tr.selected");
      if (previouslySelected) {
        previouslySelected.classList.remove("selected");
      }
      tr.classList.add("selected");
    });
    let cells = tr.getElementsByTagName('td');
    cells[13].addEventListener('click',function(){
       popupIframe.src = '/Home/TPost';
       popup.style.display = 'flex';
      });
  })
}
populateTable();

function layout(){
  let orderId = localStorage.getItem("orderId");
  window.location.href = `/layout-frame?orderId=${orderId}`;
}

closePopupBtn.addEventListener('click', () => {
  popup.style.display = 'none';
  popupIframe.src = '';
});

window.addEventListener('click', (event) => {
  if (event.target == popup) {
    popup.style.display = 'none';
    popupIframe.src = '';
  }
});

function back(){
  window.location.href = "/"
}

window.parentFunctions = {
  closePopup: function(){
    var popup = document.getElementById('popup');
    var popupIframe = document.getElementById('popupIframe');
    popup.style.display = 'none';
    popupIframe.src = '';
  },
  populateTable: async function(){
    async function clickTableEvent(){
      const data = await fetchData();
      const rows = tableBody.querySelectorAll("tr");
      rows.forEach((tr)=>{
        tr.addEventListener("click", function () {
          let cells = tr.getElementsByTagName('td');
          let newIndex = parseInt(cells[0].innerHTML.split('.')[0]);
          let id = newIndex - 1;
          let TpostQty = data[id].tpostQty == null ? 0 : parseInt(data[id].tpostQty);
          let ToCenterTpost1 = data[id].toCenterTpos1 == null ? 0 : parseInt(data[id].toCenterTpos1);
          let ToCenterTpost2 = data[id].toCenterTpos2 == null ? 0 : parseInt(data[id].toCenterTpos2);
          let ToCenterTpost3 = data[id].toCenterTpos3 == null ? 0 : parseInt(data[id].toCenterTpos3);
          let ToCenterTpost4 = data[id].toCenterTpos4 == null ? 0 : parseInt(data[id].toCenterTpos4);
          let ToCenterTpost5= data[id].toCenterTpos5 == null ? 0 : parseInt(data[id].toCenterTpos5);
          let ToCenterTpost6 = data[id].toCenterTpos6 == null ? 0 : parseInt(data[id].toCenterTpos6);
          let ToCenterTpost7 = data[id].toCenterTpos7 == null ? 0 : parseInt(data[id].toCenterTpos7);
          let ToCenterTpost8 = data[id].toCenterTpos8 == null ? 0 : parseInt(data[id].toCenterTpos8);
          let selectData = {
              Index:id,
              Width:data[id].width,
              Height:data[id].height,
              PanelQty:parseInt(data[id].panelQty),
              TpostQty:TpostQty,
              TpostLocation:data[id].tpostQtyLocationId,
              ToCenterTpost1:ToCenterTpost1,
              ToCenterTpost2:ToCenterTpost2,
              ToCenterTpost3:ToCenterTpost3,
              ToCenterTpost4:ToCenterTpost4,
              ToCenterTpost5:ToCenterTpost5,
              ToCenterTpost6:ToCenterTpost6,
              ToCenterTpost7:ToCenterTpost7,
              ToCenterTpost8:ToCenterTpost8,
              PsdetailId:data[id].psdetailId,
              PlantationScheduleListId:data[id].plantationScheduleListId
            }
            localStorage.setItem("selectData",JSON.stringify(selectData));
          const previouslySelected = document.querySelector("tr.selected");
          if (previouslySelected) {
            previouslySelected.classList.remove("selected");
          }
          tr.classList.add("selected");
        });
        let cells = tr.getElementsByTagName('td');
        cells[13].addEventListener('click',function(){
           popupIframe.src = '/Home/TPost';
           popup.style.display = 'flex';
          });
      })
    }
    async function fetchData() {
      return layoutFrame ;
    }
    let TotalPriceInput = 0;
    let PanelInput = 0;
    let TotalSqmInput = 0;
    let PricePerSqm = 0;
    const data = await fetchData();
  data.forEach((row, index) => {
    let tr;
    let tpostVal = parseInt(row.tpostQty);
    PanelInput += row.panelQtyId;
    TotalPriceInput += row.salePrice;
    let Sqmt = (row.width*row.height/Math.pow(10,6));
    TotalSqmInput += Sqmt;
    Sqmt = Sqmt.toFixed(2);
    if (row.tpostQty == null) {
      tr = document.createElement("tr");
      let i = index + 1;
      let location = row.roomLocationId == 25 ? row.roomLocationOther : row.roomLocation;
      let Fold = "";
      if (row.panelQty == 1) {
        Fold = "L";
      } else if (row.panelQty == 2) {
        Fold = "LR";
      } else if (row.panelQty == 3) {
        Fold = "LLR";
      } else if (row.panelQty == 4) {
        Fold = "LLRR";
      }else if(row.panelQty == 5){
        Fold = "LLLRR";
      }else if(row.panelQty == 6){
        Fold = "LLLRRR";
      }
      let dr = row.midRailHeight == 0 ? "No" : "Yes";
      let midRailHeight = row.midRailHeight == 0 ? "" : row.midRailHeight;
      let SalePrice = (row.salePrice).toFixed(2);
      tr.innerHTML = `
      <td>${i}</td>
                    <td>P</td>
                    <td>1</td>
                    <td>${location}</td>
                    <td>${row.width}</td>
                    <td>${row.height}</td>
                    <td>${row.bladeSize}</td>
                    <td>${row.panelQty}</td>
                    <td>${Fold}</td>
                    <td>${dr}</td>
                    <td>${midRailHeight}</td>
                    <td>${row.installationArea}</td>
                    <td>${row.frameType}</td>
                    <td><input type="checkbox" class="post-checkbox" disabled><button class="check-btn">view</button></td>
                    <td></td>
                    <td></td>
                    <td>${Sqmt}</td>
                    <td>${SalePrice}</td>
                    <td>${SalePrice}</td>
                    <td>Memo</td>
                    <td>$</td>
    `;
    tableBody.appendChild(tr);
    } else if (tpostVal != 0) {
      let count = tpostVal;
      let start = index + 1;
      let No = `${start}`;
      let totalWidth = 0;
      let location = row.roomLocationId == 25 ? row.roomLocationOther : row.roomLocation;
      let tpostLocationId = row.tpostQtyLocationId;
      let dr = row.midRailHeight == 0 ? "No" : "Yes";
      let midRailHeight = row.midRailHeight == 0 ? "" : row.midRailHeight;
      let panelArr = new Array(count + 1).fill(1);
      let widthArr = new Array(count + 1).fill(0);
      let salePriceArr = new Array(count + 1).fill(0.00);
      let SqmtArr = new Array(count +1).fill(0.00);
      SqmtArr[count] = Sqmt;
      salePriceArr[count] = (row.salePrice).toFixed(2);
      let inc = 1;
      let panelCovered = 0;
      for (let i = 0; i <= count; i++) {
          if (tpostLocationId == 1) {
            widthArr[i] = (row.width / (count + 1)).toFixed(2) - 40;
            panelArr[i] = parseInt(row.panelQty) / (count + 1);
          }else{
            let item1 = row[`toCenterTpos${inc}`] == null ? null : parseInt(row[`toCenterTpos${inc}`]);
            if(item1 != null){
              widthArr[i] = item1 - 40 - totalWidth;
              panelArr[i] = inc - panelCovered;
              panelCovered = inc;
              totalWidth = item1 + 40;
            }else if(i == count && item1 == null){
              widthArr[i] = row.width - totalWidth;
              panelArr[i] = parseInt(row.panelQty) - panelCovered;
            }
            inc++;
          }
      }
      for (let i = 0; i <= count; i++) {
        No = `${No}.${i+1}`;
        location = `${location}.${i+1}`;
        tr = document.createElement("tr");
        let Fold = "";
        if (panelArr[i] == 1) {
          Fold = "L";
        } else if (panelArr[i] == 2) {
          Fold = "LR";
        } else if (panelArr[i] == 3) {
          Fold = "LLR";
        } else if (panelArr[i] == 4) {
          Fold = "LLRR";
        }
        tr.innerHTML = `
          <td>${No}</td>
                      <td>P</td>
                      <td>1</td>
                      <td>${location}</td>
                      <td>${widthArr[i]}</td>
                      <td>${row.height}</td>
                      <td>${row.bladeSize}</td>
                      <td>${panelArr[i]}</td>
                      <td>${Fold}</td>
                      <td>${dr}</td>
                    <td>${midRailHeight}</td>
                    <td>${row.installationArea}</td>
                    <td>${row.frameType}</td>   
                    <td><input type="checkbox" class="post-checkbox" disabled value="true" checked><button class="check-btn">view</button></td>
                 
                    <td></td>
                    <td></td>
                    <td>${SqmtArr[i]}</td>
                    <td>${salePriceArr[i]}</td>
                    <td>${salePriceArr[i]}</td>
                    <td>Memo</td>
                    <td>$</td>
      `;
      start = index + 1;
      No = `${start}`;
      location = row.roomLocationId == 25 ? row.roomLocationOther : row.roomLocation;
      tableBody.appendChild(tr);
      }
    }
  });
  panel.value = PanelInput;
  TotalPriceInput = TotalPriceInput.toFixed(2);
  totalPrice.value = TotalPriceInput;
  TotalSqmInput = TotalSqmInput.toFixed(2);
  totalSqm.value = TotalSqmInput;
  PricePerSqm = (TotalPriceInput/TotalSqmInput).toFixed(2);
  pricePerSqm.value = PricePerSqm;
  clickTableEvent();
  }
}
