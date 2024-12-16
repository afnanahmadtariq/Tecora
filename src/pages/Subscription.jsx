import { useState } from 'react';

export default function SubscriptionPage() {
  const [comingSoon, setComingSoon] = useState(true);

  return (
    <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-sm max-w-3xl mx-auto">
      {/* Coming Soon Message */}
      {comingSoon ? (
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Coming Soon!</h1>
          <p className="text-xl text-gray-700 dark:text-gray-300 mb-6">
            We are working hard to launch our subscription plans. Stay tuned for updates!
          </p>
          <div className="text-sm text-gray-500 dark:text-gray-400">
            <p>Subscribe to our newsletter or follow us on social media to get notified when we launch.</p>
          </div>
        </div>
      ) : (
        <>
          {/* Original Subscription Form (if needed) */}
          <h1 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">Choose Your Plan</h1>

          {/* Plan Selection */}
          <div className="flex justify-between mb-6">
            <div className="plan-card">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Basic Plan</h2>
              <p className="text-sm text-gray-600 dark:text-gray-300">$10 / month</p>
            </div>
            <div className="plan-card">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Premium Plan</h2>
              <p className="text-sm text-gray-600 dark:text-gray-300">$25 / month</p>
            </div>
            <div className="plan-card">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Pro Plan</h2>
              <p className="text-sm text-gray-600 dark:text-gray-300">$50 / month</p>
            </div>
          </div>

          {/* Billing Information Form */}
          <section className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg shadow-sm mb-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Billing Information</h2>
            {/* The form code would go here, same as your original */}
          </section>

          {/* Payment Confirmation */}
          <div className="flex justify-between items-center mb-6">
            <span className="text-gray-700 dark:text-gray-300">Total: $10 / month</span>
            <button
              className="bg-blue-600 dark:bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors duration-200"
            >
              Confirm Payment
            </button>
          </div>
        </>
      )}
    </div>
  );
}




// import { useState } from 'react';

// export default function SubscriptionPage() {
//   const [selectedPlan, setSelectedPlan] = useState('basic'); // Default plan
//   const [billingInfo, setBillingInfo] = useState({
//     name: '',
//     address: '',
//     cardNumber: '',
//     expirationDate: '',
//     cvv: ''
//   });
//   const [paymentSuccess, setPaymentSuccess] = useState(false);

//   const handlePlanChange = (plan) => {
//     setSelectedPlan(plan);
//   };

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setBillingInfo({ ...billingInfo, [name]: value });
//   };

//   const handlePayment = async () => {
//     // Simulating a payment process
//     // In real-world apps, this would be handled with an API call to a payment gateway (Stripe, PayPal, etc.)
//     const paymentResponse = true; // Placeholder for successful payment

//     if (paymentResponse) {
//       setPaymentSuccess(true);
//     } else {
//       setPaymentSuccess(false);
//     }
//   };

//   return (
//     <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-sm max-w-3xl mx-auto">
//       <h1 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">Choose Your Plan</h1>

//       {/* Plan Selection */}
//       <div className="flex justify-between mb-6">
//         <div className={`plan-card ${selectedPlan === 'basic' ? 'selected' : ''}`} onClick={() => handlePlanChange('basic')}>
//           <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Basic Plan</h2>
//           <p className="text-sm text-gray-600 dark:text-gray-300">$10 / month</p>
//         </div>
//         <div className={`plan-card ${selectedPlan === 'premium' ? 'selected' : ''}`} onClick={() => handlePlanChange('premium')}>
//           <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Premium Plan</h2>
//           <p className="text-sm text-gray-600 dark:text-gray-300">$25 / month</p>
//         </div>
//         <div className={`plan-card ${selectedPlan === 'pro' ? 'selected' : ''}`} onClick={() => handlePlanChange('pro')}>
//           <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Pro Plan</h2>
//           <p className="text-sm text-gray-600 dark:text-gray-300">$50 / month</p>
//         </div>
//       </div>

//       {/* Billing Information Form */}
//       <section className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg shadow-sm mb-6">
//         <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Billing Information</h2>
//         <div className="space-y-4">
//           <div className="flex flex-col">
//             <label className="text-sm text-gray-700 dark:text-gray-300" htmlFor="name">Full Name</label>
//             <input
//               type="text"
//               name="name"
//               value={billingInfo.name}
//               onChange={handleInputChange}
//               className="border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-2 text-sm w-full bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
//               placeholder="John Doe"
//             />
//           </div>
//           <div className="flex flex-col">
//             <label className="text-sm text-gray-700 dark:text-gray-300" htmlFor="address">Billing Address</label>
//             <input
//               type="text"
//               name="address"
//               value={billingInfo.address}
//               onChange={handleInputChange}
//               className="border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-2 text-sm w-full bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
//               placeholder="1234 Elm Street, City, Country"
//             />
//           </div>
//           <div className="grid grid-cols-3 gap-4">
//             <div className="flex flex-col">
//               <label className="text-sm text-gray-700 dark:text-gray-300" htmlFor="cardNumber">Card Number</label>
//               <input
//                 type="text"
//                 name="cardNumber"
//                 value={billingInfo.cardNumber}
//                 onChange={handleInputChange}
//                 className="border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-2 text-sm w-full bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
//                 placeholder="1234 5678 9101 1121"
//               />
//             </div>
//             <div className="flex flex-col">
//               <label className="text-sm text-gray-700 dark:text-gray-300" htmlFor="expirationDate">Expiration Date</label>
//               <input
//                 type="text"
//                 name="expirationDate"
//                 value={billingInfo.expirationDate}
//                 onChange={handleInputChange}
//                 className="border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-2 text-sm w-full bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
//                 placeholder="MM/YY"
//               />
//             </div>
//             <div className="flex flex-col">
//               <label className="text-sm text-gray-700 dark:text-gray-300" htmlFor="cvv">CVV</label>
//               <input
//                 type="text"
//                 name="cvv"
//                 value={billingInfo.cvv}
//                 onChange={handleInputChange}
//                 className="border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-2 text-sm w-full bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
//                 placeholder="123"
//               />
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Payment Confirmation */}
//       <div className="flex justify-between items-center mb-6">
//         <span className="text-gray-700 dark:text-gray-300">Total: ${selectedPlan === 'basic' ? 10 : selectedPlan === 'premium' ? 25 : 50} / month</span>
//         <button
//           onClick={handlePayment}
//           className="bg-blue-600 dark:bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors duration-200"
//         >
//           {paymentSuccess ? 'Payment Successful' : 'Confirm Payment'}
//         </button>
//       </div>

//       {/* Success Message */}
//       {paymentSuccess && (
//         <div className="p-4 bg-green-200 dark:bg-green-600 text-green-800 dark:text-green-100 rounded-lg mb-6">
//           <p className="text-sm">Your payment has been successfully processed. Welcome to the {selectedPlan.charAt(0).toUpperCase() + selectedPlan.slice(1)} Plan!</p>
//         </div>
//       )}
//     </div>
//   );
// }
