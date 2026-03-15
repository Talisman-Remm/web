import React, { useState } from 'react';
import { TrendingUp, Clock, DollarSign, Zap } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';

const ROICalculator = () => {
  const { t } = useTranslation();
  const [employees, setEmployees] = useState(10);
  const [hoursPerWeek, setHoursPerWeek] = useState(10);
  const [hourlyRate, setHourlyRate] = useState(50);

  const weeklyHours = employees * hoursPerWeek;
  const monthlySavings = weeklyHours * 4.33 * hourlyRate * 0.7;
  const yearlySavings = monthlySavings * 12;
  const timeRecovered = weeklyHours * 52 * 0.7;
  const roi = ((monthlySavings * 12 - (monthlySavings * 3)) / (monthlySavings * 3)) * 100;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="space-y-6"
    >
      {/* Header */}
      <motion.div variants={itemVariants} className="text-center mb-8">
        <h3 className="font-['Playfair_Display'] text-3xl font-semibold mb-2 text-[#D4AF37]">
          Real-Time ROI Calculator
        </h3>
        <p className="font-['Inter'] text-gray-400 text-sm">
          Adjust the sliders to see your potential savings with AI automation
        </p>
      </motion.div>

      {/* Sliders Section */}
      <div className="space-y-8">
        {/* Slider 1 */}
        <motion.div variants={itemVariants} className="space-y-3">
          <div className="flex justify-between items-center">
            <label className="font-['Inter'] text-white text-sm font-medium">
              Number of Employees
            </label>
            <motion.span
              key={employees}
              initial={{ scale: 1.2, color: '#F4E4A6' }}
              animate={{ scale: 1, color: '#D4AF37' }}
              className="font-['Inter'] text-lg font-semibold"
            >
              {employees}
            </motion.span>
          </div>
          <input
            type="range"
            min="1"
            max="500"
            value={employees}
            onChange={(e) => setEmployees(parseInt(e.target.value))}
            className="w-full h-2 bg-[#1A1A1A] rounded-lg appearance-none cursor-pointer"
            style={{
              background: `linear-gradient(to right, #D4AF37 0%, #D4AF37 ${(employees / 500) * 100}%, #1A1A1A ${(employees / 500) * 100}%, #1A1A1A 100%)`
            }}
          />
        </motion.div>

        {/* Slider 2 */}
        <motion.div variants={itemVariants} className="space-y-3">
          <div className="flex justify-between items-center">
            <label className="font-['Inter'] text-white text-sm font-medium">
              Hours/Week on Repetitive Tasks
            </label>
            <motion.span
              key={hoursPerWeek}
              initial={{ scale: 1.2, color: '#F4E4A6' }}
              animate={{ scale: 1, color: '#D4AF37' }}
              className="font-['Inter'] text-lg font-semibold"
            >
              {hoursPerWeek}h
            </motion.span>
          </div>
          <input
            type="range"
            min="0"
            max="40"
            value={hoursPerWeek}
            onChange={(e) => setHoursPerWeek(parseInt(e.target.value))}
            className="w-full h-2 bg-[#1A1A1A] rounded-lg appearance-none cursor-pointer"
            style={{
              background: `linear-gradient(to right, #D4AF37 0%, #D4AF37 ${(hoursPerWeek / 40) * 100}%, #1A1A1A ${(hoursPerWeek / 40) * 100}%, #1A1A1A 100%)`
            }}
          />
        </motion.div>

        {/* Slider 3 */}
        <motion.div variants={itemVariants} className="space-y-3">
          <div className="flex justify-between items-center">
            <label className="font-['Inter'] text-white text-sm font-medium">
              Average Hourly Rate
            </label>
            <motion.span
              key={hourlyRate}
              initial={{ scale: 1.2, color: '#F4E4A6' }}
              animate={{ scale: 1, color: '#D4AF37' }}
              className="font-['Inter'] text-lg font-semibold"
            >
              ${hourlyRate}
            </motion.span>
          </div>
          <input
            type="range"
            min="10"
            max="200"
            value={hourlyRate}
            onChange={(e) => setHourlyRate(parseInt(e.target.value))}
            className="w-full h-2 bg-[#1A1A1A] rounded-lg appearance-none cursor-pointer"
            style={{
              background: `linear-gradient(to right, #D4AF37 0%, #D4AF37 ${((hourlyRate - 10) / 190) * 100}%, #1A1A1A ${((hourlyRate - 10) / 190) * 100}%, #1A1A1A 100%)`
            }}
          />
        </motion.div>
      </div>

      {/* Results Section */}
      <motion.div
        variants={containerVariants}
        className="grid md:grid-cols-2 gap-6 mt-10"
      >
        {[
          { icon: DollarSign, label: 'Monthly Savings', value: `$${monthlySavings.toLocaleString('en-US', { maximumFractionDigits: 0 })}`, sub: `$${yearlySavings.toLocaleString('en-US', { maximumFractionDigits: 0 })}/year` },
          { icon: Clock, label: 'Time Recovered', value: `${timeRecovered.toLocaleString('en-US', { maximumFractionDigits: 0 })}`, sub: 'hours per year' },
          { icon: TrendingUp, label: 'Expected ROI', value: `${roi > 0 ? '+' : ''}${roi.toFixed(0)}%`, sub: 'within 12 months' },
          { icon: Zap, label: 'Productivity Boost', value: '70%', sub: 'automation efficiency' }
        ].map((item, idx) => (
          <motion.div
            key={idx}
            variants={itemVariants}
            whileHover={{ scale: 1.03, borderColor: '#D4AF37' }}
            className="bg-gradient-to-br from-[#D4AF37]/10 to-transparent border border-[#D4AF37]/30 p-6 relative overflow-hidden group transition-all duration-300"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-[#D4AF37]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="relative z-10">
              <div className="flex items-center space-x-3 mb-3">
                <div className="w-10 h-10 bg-[#D4AF37]/20 flex items-center justify-center">
                  <item.icon className="w-5 h-5 text-[#D4AF37]" />
                </div>
                <span className="font-['Inter'] text-gray-400 text-sm">{item.label}</span>
              </div>
              <motion.p
                key={item.value}
                initial={{ scale: 1.1, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="font-['Playfair_Display'] text-4xl font-bold text-[#D4AF37]"
              >
                {item.value}
              </motion.p>
              <p className="font-['Inter'] text-gray-500 text-xs mt-2">{item.sub}</p>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Automatable Tasks */}
      <motion.div
        variants={itemVariants}
        className="bg-[#0A0A0A] border border-[#D4AF37]/20 p-6 mt-6"
      >
        <h4 className="font-['Inter'] text-white text-sm font-semibold mb-4 flex items-center">
          <span className="w-2 h-2 bg-[#D4AF37] mr-2"></span>
          Tasks That Could Be Automated
        </h4>
        <div className="grid md:grid-cols-2 gap-3">
          {[
            'Email filtering & responses',
            'Data entry & processing',
            'Report generation',
            'Meeting scheduling',
            'Customer support tickets',
            'Invoice processing',
            'Social media posting',
            'Document classification'
          ].map((task, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="flex items-center space-x-2 font-['Inter'] text-gray-400 text-sm"
            >
              <span className="text-[#D4AF37]">✓</span>
              <span>{task}</span>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* CTA */}
      <motion.div variants={itemVariants} className="text-center mt-8">
        <p className="font-['Inter'] text-gray-400 text-sm mb-4">
          Ready to unlock these savings?
        </p>
        <motion.button
          whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(212,175,55,0.5)' }}
          whileTap={{ scale: 0.95 }}
          className="px-8 py-3 bg-[#D4AF37] text-[#050505] font-['Inter'] font-semibold text-sm transition-all duration-300 shadow-[0_0_20px_rgba(212,175,55,0.3)]"
        >
          Schedule a Demo
        </motion.button>
      </motion.div>

      <style>{`
        input[type="range"]::-webkit-slider-thumb {
          appearance: none;
          width: 20px;
          height: 20px;
          background: #D4AF37;
          cursor: pointer;
          border-radius: 50%;
          box-shadow: 0 0 10px rgba(212, 175, 55, 0.5);
          transition: all 0.2s ease;
        }
        input[type="range"]::-webkit-slider-thumb:hover {
          transform: scale(1.2);
          box-shadow: 0 0 20px rgba(212, 175, 55, 0.8);
        }
        input[type="range"]::-moz-range-thumb {
          width: 20px;
          height: 20px;
          background: #D4AF37;
          cursor: pointer;
          border-radius: 50%;
          border: none;
          box-shadow: 0 0 10px rgba(212, 175, 55, 0.5);
          transition: all 0.2s ease;
        }
        input[type="range"]::-moz-range-thumb:hover {
          transform: scale(1.2);
          box-shadow: 0 0 20px rgba(212, 175, 55, 0.8);
        }
      `}</style>
    </motion.div>
  );
};

export default ROICalculator;