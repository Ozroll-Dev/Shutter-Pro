const tableBody = document.querySelector('#data-table tbody');
async function fetchData(){
    return layoutFrame;
};

async function populateTable(){
  const data = await fetchData();
  data.forEach((row, index) => {
  const tr = document.createElement('tr');
  const i = index;
  let CustomerName = row.customerName != null ? row.customerName : "";
  let OrderDate = row.orderDate != null ? new Date(row.orderDate).toLocaleDateString('en-US') : "";
  let ScheduleDate = row.scheduledDate != null ? new Date(row.scheduledDate).toLocaleDateString('en-US') : "";
  let TotalSqm = row.totalSqm != 0 ? row.totalSqm.toFixed(2) : 0;
  let SalePrice = row.salePrice != 0 ? row.salePrice.toFixed(2) : 0;
  tr.innerHTML = `
    <td>${row.customeriD}</td>
    <td>${CustomerName}</td>
    <td>${row.id}</td>
    <td>Fake ${CustomerName}</td>
    <td>${OrderDate}</td>
    <td>${ScheduleDate}</td>
    <td>${TotalSqm}</td>
    <td>${SalePrice}</td>
    <td>${row.orderReference}</td>
    <td>Edit</td>
    `;
    
  tr.addEventListener('click', function () {
    const selectedData = {
      No: i,
      customeriD: row.customeriD,
      customerName: row.customerName,
      id: row.id,
      orderDate: row.orderDate,
      scheduledDate: row.scheduledDate,
      totalSqm: row.totalSqm,
      salePrice:row.salePrice,
      orderReference:row.orderReference
    };
    localStorage.setItem("orderId", selectedData.id);
    localStorage.setItem("dealerId",selectedData.customeriD);
    localStorage.setItem("lastName",selectedData.customerName);
    localStorage.setItem("orderDate",selectedData.orderDate);
    const previouslySelected = document.querySelector('tr.selected');
    if (previouslySelected) {
      previouslySelected.classList.remove('selected');
    }
    tr.classList.add('selected');
    });
    tableBody.appendChild(tr);
    })
}
populateTable();

function ok(){
  let orderId = localStorage.getItem("orderId");
  window.location.href = `/order-entry?orderId=${orderId}`;
}