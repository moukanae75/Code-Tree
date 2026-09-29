import { useState } from 'react';
import { Check, CreditCard, Building, User, Lock } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Pricing() {
  const [selectedPlan, setSelectedPlan] = useState<'individual' | 'school'>('individual');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handlePayment = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      setIsSuccess(true);
    }, 2000);
  };

  if (isSuccess) {
    return (
      <div className="max-w-2xl mx-auto mt-20 text-center bg-gray-800 p-12 rounded-xl border border-emerald-500/50 shadow-2xl shadow-emerald-500/20">
        <div className="w-20 h-20 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mx-auto mb-6">
          <Check className="w-10 h-10" />
        </div>
        <h2 className="text-4xl font-extrabold text-white mb-4">Payment Successful!</h2>
        <p className="text-gray-400 text-lg mb-8">
          Welcome to CodeTree Pro! Your {selectedPlan === 'individual' ? 'Individual' : 'School'} subscription is now active.
        </p>
        <Link to="/" className="bg-emerald-500 hover:bg-emerald-600 text-white px-8 py-3 rounded-lg font-bold transition">
          Go to Dashboard
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto space-y-12 pb-12">
      <header className="text-center py-12">
        <h2 className="text-4xl font-extrabold mb-4 bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
          Upgrade your Learning Experience
        </h2>
        <p className="text-gray-400 text-lg">Choose the perfect plan for you or your institution.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        {/* Individual Plan */}
        <div 
          onClick={() => setSelectedPlan('individual')}
          className={`cursor-pointer bg-gray-800 p-8 rounded-2xl border-2 transition-all ${selectedPlan === 'individual' ? 'border-emerald-500 shadow-xl shadow-emerald-500/20 scale-105' : 'border-gray-700 hover:border-gray-500'}`}
        >
          <div className="flex justify-between items-center mb-4">
            <div className="p-3 bg-emerald-500/20 text-emerald-400 rounded-lg"><User className="w-6 h-6" /></div>
            {selectedPlan === 'individual' && <span className="bg-emerald-500 text-white text-xs font-bold px-3 py-1 rounded-full">SELECTED</span>}
          </div>
          <h3 className="text-2xl font-bold mb-2">Individual Pro</h3>
          <div className="text-4xl font-extrabold mb-6">$9.99<span className="text-lg text-gray-500 font-normal">/mo</span></div>
          <ul className="space-y-3 text-gray-300">
            <li className="flex items-center"><Check className="w-5 h-5 text-emerald-400 mr-2" /> Unlimited Code Execution</li>
            <li className="flex items-center"><Check className="w-5 h-5 text-emerald-400 mr-2" /> Access all Python & C Courses</li>
            <li className="flex items-center"><Check className="w-5 h-5 text-emerald-400 mr-2" /> Exclusive Gamification Badges</li>
          </ul>
        </div>

        {/* School Plan */}
        <div 
          onClick={() => setSelectedPlan('school')}
          className={`cursor-pointer bg-gray-800 p-8 rounded-2xl border-2 transition-all ${selectedPlan === 'school' ? 'border-cyan-500 shadow-xl shadow-cyan-500/20 scale-105' : 'border-gray-700 hover:border-gray-500'}`}
        >
          <div className="flex justify-between items-center mb-4">
            <div className="p-3 bg-cyan-500/20 text-cyan-400 rounded-lg"><Building className="w-6 h-6" /></div>
            {selectedPlan === 'school' && <span className="bg-cyan-500 text-white text-xs font-bold px-3 py-1 rounded-full">SELECTED</span>}
          </div>
          <h3 className="text-2xl font-bold mb-2">School & Teachers</h3>
          <div className="text-4xl font-extrabold mb-6">$299<span className="text-lg text-gray-500 font-normal">/mo</span></div>
          <ul className="space-y-3 text-gray-300">
            <li className="flex items-center"><Check className="w-5 h-5 text-cyan-400 mr-2" /> Teacher Dashboard Access</li>
            <li className="flex items-center"><Check className="w-5 h-5 text-cyan-400 mr-2" /> Up to 500 Student Accounts</li>
            <li className="flex items-center"><Check className="w-5 h-5 text-cyan-400 mr-2" /> Custom Test Cases & Exercises</li>
          </ul>
        </div>
      </div>

      {/* Checkout Form */}
      <div className="max-w-2xl mx-auto bg-gray-900 p-8 rounded-2xl border border-gray-700 shadow-2xl mt-12">
        <div className="flex items-center space-x-2 mb-6 border-b border-gray-800 pb-4">
          <CreditCard className="w-6 h-6 text-gray-400" />
          <h3 className="text-xl font-bold">Secure Checkout</h3>
        </div>
        <form onSubmit={handlePayment} className="space-y-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm text-gray-400 mb-1">Cardholder Name</label>
              <input type="text" required placeholder="John Doe" className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 focus:outline-none focus:border-emerald-500 transition" />
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-1">Card Number</label>
              <div className="relative">
                <input type="text" required placeholder="•••• •••• •••• ••••" maxLength={19} className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 focus:outline-none focus:border-emerald-500 transition pl-10" />
                <Lock className="w-4 h-4 text-gray-500 absolute left-4 top-4" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-gray-400 mb-1">Expiry Date</label>
                <input type="text" required placeholder="MM/YY" maxLength={5} className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 focus:outline-none focus:border-emerald-500 transition" />
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-1">CVC</label>
                <input type="text" required placeholder="•••" maxLength={3} className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 focus:outline-none focus:border-emerald-500 transition" />
              </div>
            </div>
          </div>
          
          <button 
            type="submit" 
            disabled={isProcessing}
            className="w-full flex justify-center items-center space-x-2 bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-4 rounded-xl transition shadow-lg disabled:opacity-70"
          >
            {isProcessing ? (
              <span className="animate-pulse">Processing Payment...</span>
            ) : (
              <span>Pay {selectedPlan === 'individual' ? '$9.99' : '$299.00'} & Subscribe</span>
            )}
          </button>
          <p className="text-center text-xs text-gray-500 mt-4 flex items-center justify-center">
            <Lock className="w-3 h-3 mr-1" /> Payments are secure and encrypted.
          </p>
        </form>
      </div>
    </div>
  );
}
