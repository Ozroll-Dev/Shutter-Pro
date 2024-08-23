const tableBody = document.querySelector("#data-table tbody");
const openPopupBtn = document.getElementById('openPopupBtn');
const closePopupBtn = document.getElementById('closePopupBtn');
const popup = document.getElementById('popup');
const popupIframe = document.getElementById('popupIframe');
const orderId = document.getElementById('orderId')
const dealerId = document.getElementById('dealerId')
const lastName = document.getElementById('lastName')

orderId.value = localStorage.getItem('orderId')
dealerId.value = localStorage.getItem('dealerId')
lastName.value = localStorage.getItem('lastName')


async function fetchData() {
  return layoutFrame ;
}

async function populateTable() {
  const data = await fetchData();
  data.forEach((row, index) => {
    let tr;
    let tpostVal = parseInt(row.tpostQty);
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
      }
  let width = row.width - 61;
  let height = row.height - 61;
      tr.innerHTML = `
      <td>${i}</td>
                    <td>P</td>
                    <td>${location}</td>
                    <td>${width}</td>
                    <td>${height}</td>
                    <td>${row.bladeSize}</td>
                    <td>${Fold}</td>
                    <td>Zt</td>
                    <td>Zt</td>
                    <td>Zt</td>
                    <td>Zt</td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td>Memo</td>
                    <td>$</td>
                    <td><button class="check-btn">Click here</button></td>
    `;
    tableBody.appendChild(tr);
    } else if (tpostVal != 0) {
      let start = index + 1;
      let No = `${start}`;
      let count = tpostVal;
      let location = row.roomLocationId == 25 ? row.roomLocationOther : row.roomLocation;
      let panelArr = new Array(count + 1).fill(1);
      let tpostLocationId = row.tpostQtyLocationId;
      let widthArr = new Array(count + 1).fill(0);
      let salePriceArr = new Array(count + 1).fill(0);
      salePriceArr[count] = row.salePrice;
      let totalWidth = 0;
      let panelCovered = 0;
      let inc = 1;
        for (let i = 1; i <= count + 1; i++) {
          if (tpostLocationId == 1) {
            widthArr[i - 1] = (row.width / (count + 1)).toFixed(2) - 101;
            panelArr[i - 1] = parseInt(row.panelQty) / (count + 1);
          } else {
            let item1 = row[`toCenterTpos${inc}`] == null ? 0 : parseInt(row[`toCenterTpos${inc}`]);
            if(item1 != 0){
              widthArr[i-1] = item1 - 101 - totalWidth;
              panelArr[i-1] = inc - panelCovered;
              panelCovered = inc;
              totalWidth = item1 + 40;
            }else if(i == count + 1 && item1 == 0){
              widthArr[i-1] = row.width - totalWidth;
              panelArr[i-1] = parseInt(row.panelQty) - panelCovered;
            }
            inc++;
          }
        }

      let height = row.height - 61;
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
                      <td>${location}</td>
                      <td>${widthArr[i]}</td>
                      <td>${height}</td>
                      <td>${row.bladeSize}</td>
                      <td>${Fold}</td>
                    <td>Zt</td>
                    <td>Zt</td>
                    <td>Zt</td>
                    <td>Zt</td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td>Memo</td>
                    <td>$</td>
                    <td><button class="check-btn">Click here</button></td>
      `;
      start = index + 1;
      No = `${start}`;
      location = row.roomLocationId == 25 ? row.roomLocationOther : row.roomLocation;
      tableBody.appendChild(tr);
      }
    }
  });
  clickTableEvent();
}

async function clickTableEvent(){
 const rows = tableBody.querySelectorAll("tr");
 rows.forEach((tr)=>{
  tr.addEventListener("click",async function(){
    const rowIndex = Array.from(tr.parentNode.children).indexOf(tr);
    localStorage.setItem("rowIndex",rowIndex);
    const data = await getTableData();
    localStorage.setItem("panelDesign",JSON.stringify(data));
    const previouslySelected = document.querySelector("tr.selected");
    if (previouslySelected) {
      previouslySelected.classList.remove("selected");
    }
    tr.classList.add("selected");
    popupIframe.src = '/Home/PanelDesign';
    popup.style.display = 'flex';
  })
 })
}

populateTable();

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

async function getTableData(){
  const rows = tableBody.getElementsByTagName('tr');
  let tableData = [];
  let data = await fetchData();
  for(let i=0;i<rows.length;i++){
    let cells = rows[i].getElementsByTagName('td');
    let id = parseInt(cells[0].innerHTML.split('.')[0]) - 1;
    let midRailHeight = data[id].midRailHeight == 0 ? 0 : parseInt(data[id].midRailHeight);
    let rowData = {
      No:cells[0].innerHTML,
      Location:cells[2].innerHTML,
      Width:parseInt(cells[3].innerHTML),
      Height:parseInt(cells[4].innerHTML),
      Louvers:cells[5].innerHTML,
      Fold:cells[6].innerHTML,
      Panels:parseInt((cells[6].innerHTML.length)),
      Id:id,
      MidRailHeight:midRailHeight,
      PsdetailId:data[id].psdetailId,
      PlantationScheduleListId:data[id].plantationScheduleListId,
      PanelDesignId:data[id].panelDesignId,
      UpperSlab:data[id].upperSlab,
      LowerSlab:data[id].lowerSlab,
      Slab:data[id].slab,
      Dr:data[id].dr,
      UpperGap: data[id].upperGap,
      LowerGap:data[id].lowerGap,
    }
    tableData.push(rowData);
  }
  return tableData;
}

function back(){
  let orderId = localStorage.getItem("orderId");
  window.location.href = `/order-entry?orderId=${orderId}`;
}
