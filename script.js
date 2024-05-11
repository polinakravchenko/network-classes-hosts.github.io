function decimalToBinary(decimal) {
    return (decimal >>> 0).toString(2).padStart(8, '0');
}

function determineNetworkClass(ipAddress) {
    const firstOctet = parseInt(ipAddress.split('.')[0]);
    if (firstOctet < 128) {
        return 'A';
    } else if (firstOctet < 192) {
        return 'B';
    } else if (firstOctet < 224) {
        return 'C';
    } else {
        return 'D or E (Reserved)';
    }
}

function maxHostsAndBroadcast(ipAddress, cidrPrefix) {
    const prefixLength = parseInt(cidrPrefix);
    const maxAddresses = Math.pow(2, 32 - prefixLength);
    const maxHosts = maxAddresses - 2; // Віднімаємо мережеву та broadcast адресу

    return maxHosts;
}

function calculate() {
    const ipAddress = document.getElementById('ipAddress').value;
    const cidrPrefix = document.getElementById('cidrPrefix').value;
    const maxHosts = maxHostsAndBroadcast(ipAddress, cidrPrefix);
    const binaryIpAddress = ipAddress.split('.').map(octet => decimalToBinary(parseInt(octet))).join('.');
    const networkClass = determineNetworkClass(ipAddress);
    const outputDiv = document.getElementById('output');

    outputDiv.innerHTML = `
        <table>
            <tr>
                <td>IP-адреса:</td>
                <td>${ipAddress}</td>
            </tr>
            <tr>
                <td>Двійковий запис ІР-адреси:</td>
                <td>${binaryIpAddress}</td>
            </tr>
            <tr>
                <td>Клас мережі ІР-адреси:</td>
                <td>${networkClass}</td>
            </tr>
            <tr>
                <td>Довжина маски:</td>
                <td>${cidrPrefix}</td>
            </tr>
            <tr>
                <td>Максимальна кількість хостів:</td>
                <td>${maxHosts}</td>
            </tr>
        </table>
    `;
}

function handleEnter(event) {
    if (event.key === 'Enter') {
        calculate();
    }
}
