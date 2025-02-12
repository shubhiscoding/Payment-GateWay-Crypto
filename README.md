NOTE: CURRENTLY IT ONLY SUPPORTS ZK EVM CARDONA TESTNET AND BASE SEPOLIA TESTNET ONLY!!


# Payment Gateway Crypto

A simple crypto payment gateway using ethers.js. This package allows you to handle payments, check balances, and collect fees using Ethereum smart contracts.

## Installation

You can install this package using npm:

```bash
npm install payment-gateway-crypto
```

## Usage

### Importing the Module

You can import the `handlePayment` function using ES6 module syntax:

```javascript
import { handlePayment } from 'payment-gateway-crypto';
```

Or using CommonJS syntax:

```javascript
const { handlePayment } = require('payment-gateway-crypto');
```

### Using the `handlePayment` Function

The `handlePayment` function allows you to make payments to a specified Ethereum address. Here's an example of how to use it:

```javascript
import { handlePayment } from 'payment-gateway-crypto';

const amount = 0.001; // Example amount in Ether
const address = '0x1F85a21033Da743136C1808D635e8679221418d1'; // Receiver's wallet address
const netwrok = 'POLzk'; //'POLzk' for Polygon zkEVM and 'BASE' for Base Sepolia network
handlePayment(amount, address, network).then(() => {
    console.log('Payment successful');
}).catch(error => {
    console.error('Payment failed', error);
});
```

#### `handlePayment(amount, address)`

- `amount` (number): The amount of Ether to send.
- `address` (string): The recipient's Ethereum address.
- `network` (string): 'POLzk' for Polygon zkEVM CARDONA Testnet and 'BASE' for Base Sepolia network

This function sends the specified amount of Ether to the given address using the connected Ethereum wallet.

### Example

Here is a complete example of a simple React component that uses the `handlePayment` function:

```javascript
import React from 'react';
import { handlePayment } from 'payment-gateway-crypto';

const PaymentComponent = ({ amount }) => {
    const address = '0x1F85a21033Da743136C1808D635e8679221418d1';
    const network = 'BASE';
    const handleButtonClick = async () => {
        try {
           const tx = await handlePayment(amount, address, network);
            console.log('Payment successful', tx);
        } catch (error) {
            console.error('Payment failed', error);
        }
    };

    return (
        <div>
            <h1>Pay {amount} ETH</h1>
            <button onClick={handleButtonClick}>Confirm</button>
        </div>
    );
};

export default PaymentComponent;
```

## Author

Shubh Kesharwani - [Your Email](mailto:kesharwanis084@gmail.com)

## Acknowledgements

- [ethers.js](https://docs.ethers.io/v5/) for providing the library to interact with the Ethereum blockchain.
