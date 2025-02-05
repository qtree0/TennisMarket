// 주문 추가 함수
function addToOrder(productName) {
    alert(productName + "! Check the Order List."); // 알림 메시지

    let orders = JSON.parse(localStorage.getItem("orders")) || []; // 기존 주문 내역 불러오기

    // 현재 날짜와 시간 가져오기
    let now = new Date();
    let formattedDate = now.getFullYear() + "-" +  // 연도 (YYYY)
                        String(now.getMonth() + 1).padStart(2, "0") + "-" + // 월 (MM)
                        String(now.getDate()).padStart(2, "0") + " " + // 일 (DD)
                        String(now.getHours()).padStart(2, "0") + ":" + // 시 (HH)
                        String(now.getMinutes()).padStart(2, "0") + ":" + // 분 (MM)
                        String(now.getSeconds()).padStart(2, "0"); // 초 (SS)

    let newOrder = {
        product: productName,
        dateTime: formattedDate // 날짜 + 시간 저장 (YYYY-MM-DD HH:MM:SS 형식)
    };

    orders.push(newOrder); // 새 주문 추가
    localStorage.setItem("orders", JSON.stringify(orders)); // localStorage에 저장
}

// 주문 리스트 페이지에서 실행될 함수
function loadOrderList() {
    let orders = JSON.parse(localStorage.getItem("orders")) || [];
    let tableBody = document.getElementById("orderTableBody");

    if (!tableBody) return; // orderlist.html이 아닌 경우 함수 종료

    tableBody.innerHTML = ""; // 기존 목록 초기화

    orders.forEach((order, index) => {
        let row = document.createElement("tr"); // 새로운 행 생성
        row.innerHTML = `
            <td>${index + 1}</td>
            <td>${order.product}</td>
            <td>${order.dateTime}</td>
        `;
        tableBody.appendChild(row); // 테이블에 추가
    });
}

// 주문 목록 초기화 함수
function clearOrderList() {
    localStorage.removeItem("orders"); // localStorage에서 주문 데이터 삭제
    document.getElementById("orderTableBody").innerHTML = ""; // 테이블 초기화
}

// 페이지 로드 시 주문 리스트 불러오기
document.addEventListener("DOMContentLoaded", () => {
    loadOrderList();

    // Clear List 버튼 이벤트 추가
    let clearButton = document.getElementById("clearButton");
    if (clearButton) {
        clearButton.addEventListener("click", () => {
            if (confirm("Delete all orders?")) { // 확인 메시지
                clearOrderList();
            }
        });
    }
});
