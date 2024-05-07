document.getElementById('loan-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const amount = parseFloat(document.getElementById('loan-amount').value);
    const years = parseFloat(document.getElementById('loan-years').value);
    const rate = parseFloat(document.getElementById('loan-rate').value);

    const monthlyPayment = calculateMonthlyPayment({ amount, years, rate });
    document.getElementById('monthly-payment').innerText = `$${monthlyPayment}`;

    const schedule = calculateAmortization({ amount, years, rate });
    displayAmortization(schedule);
});

function calculateMonthlyPayment({ amount, years, rate }) {
    const monthlyRate = (rate / 100) / 12;
    const n = Math.floor(years * 12);
    return (
        (monthlyRate * amount) /
        (1 - Math.pow((1 + monthlyRate), -n))
    ).toFixed(2);
}

function calculateAmortization({ amount, years, rate }) {
    let schedule = [];
    let monthlyPayment = calculateMonthlyPayment({ amount, years, rate });
    let balance = amount;
    let monthlyRate = (rate / 100) / 12;
    for (let n = 1; n <= years * 12; n++) {
        let interest = balance * monthlyRate;
        let principal = monthlyPayment - interest;
        balance -= principal;
        schedule.push({ month: n, principal: principal.toFixed(2), interest: interest.toFixed(2), balance: balance.toFixed(2) });
    }
    return schedule;
}

function displayAmortization(schedule) {
    const container = document.getElementById('amortizationSchedule');
    container.innerHTML = ''; // Clear previous entries
    const table = document.createElement('table');
    schedule.forEach((item, index) => {
        const row = table.insertRow();
        const monthCell = row.insertCell();
        monthCell.textContent = item.month;
        const principalCell = row.insertCell();
        principalCell.textContent = item.principal;
        const interestCell = row.insertCell();
        interestCell.textContent = item.interest;
        const balanceCell = row.insertCell();
        balanceCell.textContent = item.balance;
    });
    container.appendChild(table);
}
